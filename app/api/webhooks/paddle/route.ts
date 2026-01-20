import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with service role (bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify Paddle webhook signature
function verifyWebhookSignature(
  signatureHeader: string,
  body: string,
  secret: string
): boolean {
  try {
    // Paddle signature format: "ts=1234567890;h1=signature"
    const parts = signatureHeader.split(";");
    let timestamp = "";
    let signature = "";

    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key === "ts") timestamp = value;
      if (key === "h1") signature = value;
    }

    if (!timestamp || !signature) {
      console.error("Invalid signature header format");
      return false;
    }

    // Construct the signed payload: timestamp + ":" + body
    const signedPayload = `${timestamp}:${body}`;

    // Create HMAC
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(signedPayload);
    const expectedSignature = hmac.digest("hex");

    // Compare signatures
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

// Map Paddle price IDs to our plan tiers
const PRICE_TO_PLAN: { [key: string]: "basic" | "core" | "pro" } = {
  [process.env.BASIC_PRICE_ID!]: "basic",
  [process.env.CORE_PRICE_ID!]: "core",
  [process.env.PRO_PRICE_ID!]: "pro",
};

// Map plan tiers to session counts
const PLAN_SESSIONS = {
  basic: 12,
  core: 20,
  pro: 30,
};

export async function POST(req: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("paddle-signature");

    if (!signature) {
      console.error("No signature provided");
      return NextResponse.json({ error: "No signature" }, { status: 401 });
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      signature,
      body,
      process.env.PADDLE_WEBHOOK_SECRET!
    );

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse webhook event
    const event = JSON.parse(body);
    const eventType = event.event_type;

    console.log(`📥 Received Paddle webhook: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case "subscription.created":
      case "subscription.activated": {
        const subscription = event.data;
        const clerkUserId = subscription.custom_data?.clerk_user_id;
        const priceId = subscription.items[0]?.price.id;

        if (!clerkUserId) {
          console.error("No clerk_user_id in custom_data");
          return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        const planTier = PRICE_TO_PLAN[priceId];
        if (!planTier) {
          console.error("Unknown price ID:", priceId);
          return NextResponse.json(
            { error: "Unknown price ID" },
            { status: 400 }
          );
        }

        const totalSessions = PLAN_SESSIONS[planTier];

        // Calculate reset date (1 month from now)
        const resetDate = new Date();
        resetDate.setMonth(resetDate.getMonth() + 1);

        // Upsert subscription
        const { error } = await supabase.from("user_subscriptions").upsert(
          {
            user_id: clerkUserId,
            paddle_subscription_id: subscription.id,
            plan_tier: planTier,
            sessions_remaining: totalSessions,
            total_sessions: totalSessions,
            subscription_status: "active",
            reset_date: resetDate.toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

        if (error) {
          console.error("Error upserting subscription:", error);
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
        }

        console.log(`✅ Subscription created for user ${clerkUserId}`);
        break;
      }

      case "subscription.updated": {
        const subscription = event.data;
        const clerkUserId = subscription.custom_data?.clerk_user_id;
        const priceId = subscription.items[0]?.price.id;

        if (!clerkUserId) {
          console.error("No clerk_user_id in custom_data");
          return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        const planTier = PRICE_TO_PLAN[priceId];
        if (!planTier) {
          console.error("Unknown price ID:", priceId);
          return NextResponse.json(
            { error: "Unknown price ID" },
            { status: 400 }
          );
        }

        const totalSessions = PLAN_SESSIONS[planTier];

        // Update subscription (keep current sessions_remaining)
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            paddle_subscription_id: subscription.id,
            plan_tier: planTier,
            total_sessions: totalSessions,
            subscription_status: subscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", clerkUserId);

        if (error) {
          console.error("Error updating subscription:", error);
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
        }

        console.log(`✅ Subscription updated for user ${clerkUserId}`);
        break;
      }

      case "subscription.canceled":
      case "subscription.past_due": {
        const subscription = event.data;
        const clerkUserId = subscription.custom_data?.clerk_user_id;

        if (!clerkUserId) {
          console.error("No clerk_user_id in custom_data");
          return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        // Update subscription status
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            subscription_status:
              eventType === "subscription.canceled" ? "cancelled" : "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", clerkUserId);

        if (error) {
          console.error("Error updating subscription status:", error);
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
        }

        console.log(`✅ Subscription ${eventType} for user ${clerkUserId}`);
        break;
      }

      case "subscription.paused":
      case "subscription.resumed": {
        const subscription = event.data;
        const clerkUserId = subscription.custom_data?.clerk_user_id;

        if (!clerkUserId) {
          console.error("No clerk_user_id in custom_data");
          return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        // Update subscription status
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            subscription_status: subscription.status,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", clerkUserId);

        if (error) {
          console.error("Error updating subscription status:", error);
          return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
          );
        }

        console.log(`✅ Subscription ${eventType} for user ${clerkUserId}`);
        break;
      }

      case "transaction.completed":
      case "transaction.payment_failed": {
        // Log transaction events for monitoring
        console.log(`💰 Transaction ${eventType}:`, event.data.id);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
