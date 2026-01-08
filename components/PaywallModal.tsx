"use client";

import { X } from "lucide-react";
import { PLAN_CONFIG, type PlanTier } from "@/lib/types/subscription.types";

interface PaywallModalProps {
  currentPlan?: PlanTier | null;
  onClose?: () => void;
}

export default function PaywallModal({
  currentPlan,
  onClose,
}: PaywallModalProps) {
  const handleUpgrade = (tier: PlanTier) => {
    // TODO: Integrate with Clerk billing
    // This will be added when we set up Clerk billing in the dashboard
    console.log(`Upgrading to ${tier}`);

    // For now, redirect to Clerk billing page (placeholder)
    // window.location.href = `/api/billing/upgrade?tier=${tier}`;
  };

  const plans: { tier: PlanTier; popular?: boolean }[] = [
    { tier: "basic" },
    { tier: "core", popular: true },
    { tier: "pro" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full p-8 max-h-[90vh] overflow-y-auto">
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
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2 capitalize">
                  {config.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold">${config.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                {/* Sessions */}
                <div className="mb-6">
                  <p className="text-lg font-semibold mb-2">
                    {config.sessions} Sessions per Month
                  </p>
                  <p className="text-sm text-gray-600">
                    Each session includes 5 minutes of AI voice coaching
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>All grade levels (Pre-K to 12)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Limitless reading passages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>AI comprehension coaching</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleUpgrade(tier)}
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
