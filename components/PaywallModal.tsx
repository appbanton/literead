"use client";

import { X } from "lucide-react";
import { PLAN_CONFIG, type PlanTier } from "@/lib/types/subscription.types";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

interface PaywallModalProps {
  currentPlan?: PlanTier | null;
  onClose?: () => void;
  passageId?: string; // NEW: Optional passage ID to redirect to after payment
}

// Declare Paddle global type
declare global {
  interface Window {
    Paddle: any;
  }
}

export default function PaywallModal({
  currentPlan,
  onClose,
  passageId, // NEW
}: PaywallModalProps) {
  const { user } = useUser();

  // Initialize Paddle.js
  useEffect(() => {
    // Load Paddle.js script
    if (!document.getElementById("paddle-js")) {
      const script = document.createElement("script");
      script.id = "paddle-js";
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;
      script.onload = () => {
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        console.log("🔍 Paddle token:", token);

        if (window.Paddle) {
          // Set environment to sandbox BEFORE initializing
          window.Paddle.Environment.set("sandbox");

          window.Paddle.Initialize({
            token: token,
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.Paddle) {
      // Paddle already loaded
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      console.log("🔍 Paddle token (already loaded):", token);

      // Set environment to sandbox BEFORE initializing
      window.Paddle.Environment.set("sandbox");

      window.Paddle.Initialize({
        token: token,
      });
    }
  }, []);

  const handleUpgrade = (tier: PlanTier) => {
    if (!user) {
      console.error("No user found");
      return;
    }

    if (!window.Paddle) {
      console.error("Paddle not loaded");
      return;
    }

    // Map plan tier to price ID
    const priceIds: Record<PlanTier, string> = {
      basic: process.env.NEXT_PUBLIC_BASIC_PRICE_ID!,
      core: process.env.NEXT_PUBLIC_CORE_PRICE_ID!,
      pro: process.env.NEXT_PUBLIC_PRO_PRICE_ID!,
    };

    const priceId = priceIds[tier];

    console.log("🔍 Opening checkout with:", {
      tier,
      priceId,
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
    });

    try {
      // Open Paddle checkout
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData: {
          clerk_user_id: user.id,
        },
        customer: {
          email: user.primaryEmailAddress?.emailAddress,
        },
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
        },
        successCallback: (data: any) => {
          console.log("✅ Checkout success:", data);
          // Redirect to specific passage if provided, otherwise to passages list
          const redirectUrl = passageId
            ? `/passages/${passageId}`
            : "/passages";
          window.location.href = redirectUrl;
        },
        closeCallback: () => {
          console.log("Checkout closed");
        },
      });
    } catch (error) {
      console.error("❌ Paddle checkout error:", error);
      alert("Failed to open checkout. Check console for details.");
    }
  };

  const plans: { tier: PlanTier; popular?: boolean }[] = [
    { tier: "basic" },
    { tier: "core", popular: true },
    { tier: "pro" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full p-8 max-h-[90vh] overflow-y-auto relative">
        {/* Close button (optional) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            {currentPlan ? "You're Out of Sessions" : "Choose Your Plan"}
          </h2>
          <p className="text-gray-600 text-lg">
            {currentPlan
              ? "Upgrade your plan to continue reading and practicing"
              : "Select a plan to start improving your reading comprehension"}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map(({ tier, popular }) => {
            const config = PLAN_CONFIG[tier];
            const isCurrentPlan = currentPlan === tier;

            return (
              <div
                key={tier}
                className={`relative border-2 rounded-lg p-6 ${
                  popular ? "border-primary shadow-lg" : "border-gray-200"
                } ${isCurrentPlan ? "opacity-50" : ""}`}
              >
                {/* Popular Badge */}
                {popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Current Plan
                  </div>
                )}

                {/* Plan Details */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 capitalize">
                    {config.name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${config.price}</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 text-xl">✓</span>
                    <span>{config.sessions} sessions per month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 text-xl">✓</span>
                    <span>5-minute AI coaching per session</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 text-xl">✓</span>
                    <span>All grade levels (Pre-K to 12)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 text-xl">✓</span>
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 text-xl">✓</span>
                    <span>Unlimited passage library</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => !isCurrentPlan && handleUpgrade(tier)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    isCurrentPlan
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : popular
                      ? "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
                      : "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                  }`}
                >
                  {isCurrentPlan ? "Current Plan" : "Get Started"}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-1">
                What happens when I run out of sessions?
              </p>
              <p className="text-gray-600">
                You'll need to wait until your monthly reset or upgrade to a
                higher plan to continue.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">When do sessions reset?</p>
              <p className="text-gray-600">
                Sessions reset monthly on your subscription anniversary date.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Can I cancel anytime?</p>
              <p className="text-gray-600">
                Yes! You can cancel anytime and keep access through the end of
                your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
