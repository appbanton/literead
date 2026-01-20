"use server";

/**
 * Get Paddle customer billing portal URL
 * MVP approach: Links to general Paddle customer portal where users log in with email
 * This is standard practice (Stripe, Paddle, etc. all do this)
 *
 * Future enhancement: Generate authenticated portal sessions via Paddle API
 */
export async function getPaddleCustomerPortalUrl(): Promise<string> {
  // Determine environment (sandbox vs production)
  const environment =
    process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox"
      ? "sandbox-buy"
      : "buy";

  // Return Paddle's customer subscriptions portal URL
  // Users will log in with their email to manage their subscription
  return `https://${environment}.paddle.com/subscriptions`;
}
