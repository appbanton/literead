// Types for subscription data

export type PlanTier = "basic" | "core" | "pro";
export type SubscriptionStatus =
  | "active"
  | "cancelled"
  | "past_due"
  | "trialing";

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_tier: PlanTier;
  sessions_remaining: number;
  total_sessions: number;
  subscription_status: SubscriptionStatus;
  clerk_subscription_id: string | null;
  reset_date: string; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionParams {
  user_id: string;
  plan_tier: PlanTier;
  clerk_subscription_id: string;
}

export interface UpdateSubscriptionParams {
  sessions_remaining?: number;
  subscription_status?: SubscriptionStatus;
  plan_tier?: PlanTier;
}

// Plan configuration
export const PLAN_CONFIG: Record<
  PlanTier,
  { sessions: number; price: number; name: string }
> = {
  basic: {
    sessions: 12,
    price: 20,
    name: "Basic",
  },
  core: {
    sessions: 20,
    price: 30,
    name: "Core",
  },
  pro: {
    sessions: 30,
    price: 50,
    name: "Pro",
  },
};

export function getPlanSessions(tier: PlanTier): number {
  return PLAN_CONFIG[tier].sessions;
}

export function getPlanPrice(tier: PlanTier): number {
  return PLAN_CONFIG[tier].price;
}

export function getPlanName(tier: PlanTier): string {
  return PLAN_CONFIG[tier].name;
}
