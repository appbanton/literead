"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type {
  UserSubscription,
  PlanTier,
  CreateSubscriptionParams,
  UpdateSubscriptionParams,
} from "@/lib/types/subscription.types";
import { PLAN_CONFIG } from "@/lib/types/subscription.types";

/**
 * Get the current user's subscription
 * Returns null if no subscription exists
 */
export async function getUserSubscription(): Promise<UserSubscription | null> {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }

  return data;
}

/**
 * Create a new subscription for a user
 * Called after successful payment via webhook
 */
export async function createSubscription(
  params: CreateSubscriptionParams
): Promise<UserSubscription | null> {
  const supabase = createSupabaseClient();

  const { user_id, plan_tier, clerk_subscription_id } = params;
  const total_sessions = PLAN_CONFIG[plan_tier].sessions;

  // Set reset date to 1 month from now
  const reset_date = new Date();
  reset_date.setMonth(reset_date.getMonth() + 1);

  const { data, error } = await supabase
    .from("user_subscriptions")
    .insert({
      user_id,
      plan_tier,
      sessions_remaining: total_sessions,
      total_sessions,
      subscription_status: "active",
      clerk_subscription_id,
      reset_date: reset_date.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating subscription:", error);
    return null;
  }

  revalidatePath("/passages");
  return data;
}

/**
 * Update a user's subscription
 * Used for status changes, plan upgrades, etc.
 */
export async function updateSubscription(
  userId: string,
  updates: UpdateSubscriptionParams
): Promise<boolean> {
  const supabase = createSupabaseClient();

  // If plan tier is changing, update total_sessions too
  if (updates.plan_tier) {
    updates = {
      ...updates,
      // @ts-ignore - We know plan_tier exists
      total_sessions: PLAN_CONFIG[updates.plan_tier].sessions,
    };
  }

  const { error } = await supabase
    .from("user_subscriptions")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating subscription:", error);
    return false;
  }

  revalidatePath("/passages");
  return true;
}

/**
 * Check if user has sessions remaining
 * Returns false if no subscription or no sessions left
 */
export async function hasSessionsRemaining(): Promise<boolean> {
  const subscription = await getUserSubscription();

  if (!subscription) return false;
  if (subscription.subscription_status !== "active") return false;
  if (subscription.sessions_remaining <= 0) return false;

  return true;
}

/**
 * Decrement user's session count by 1
 * Called after completing a reading discussion
 */
export async function decrementSession(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const subscription = await getUserSubscription();
  if (!subscription) return false;

  if (subscription.sessions_remaining <= 0) {
    console.error("No sessions remaining to decrement");
    return false;
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("user_subscriptions")
    .update({ sessions_remaining: subscription.sessions_remaining - 1 })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error decrementing session:", error);
    return false;
  }

  revalidatePath("/passages");
  revalidatePath("/my-journey");
  return true;
}

/**
 * Reset monthly sessions to total_sessions
 * Called by webhook or cron job on reset_date
 */
export async function resetMonthlySessions(userId: string): Promise<boolean> {
  const supabase = createSupabaseClient();

  // Get current subscription
  const { data: subscription, error: fetchError } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (fetchError || !subscription) {
    console.error("Error fetching subscription for reset:", fetchError);
    return false;
  }

  // Set new reset date (1 month from now)
  const newResetDate = new Date();
  newResetDate.setMonth(newResetDate.getMonth() + 1);

  const { error } = await supabase
    .from("user_subscriptions")
    .update({
      sessions_remaining: subscription.total_sessions,
      reset_date: newResetDate.toISOString(),
    })
    .eq("user_id", userId);

  if (error) {
    console.error("Error resetting sessions:", error);
    return false;
  }

  revalidatePath("/passages");
  return true;
}

/**
 * Cancel a subscription (set status to cancelled)
 * User keeps access until end of billing period
 */
export async function cancelSubscription(userId: string): Promise<boolean> {
  return updateSubscription(userId, { subscription_status: "cancelled" });
}

/**
 * Get all subscriptions that need to be reset
 * Called by cron job to find subscriptions past their reset_date
 */
export async function getSubscriptionsToReset(): Promise<UserSubscription[]> {
  const supabase = createSupabaseClient();

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("subscription_status", "active")
    .lte("reset_date", now);

  if (error) {
    console.error("Error fetching subscriptions to reset:", error);
    return [];
  }

  return data || [];
}
