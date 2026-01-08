"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/lib/actions/user.actions";

/**
 * Server component that checks if authenticated user has completed onboarding
 * Use this in layouts or pages that require onboarding
 *
 * Usage in layout/page:
 * await requireOnboarding();
 */
export async function requireOnboarding() {
  const user = await currentUser();

  // If not authenticated, Clerk will handle redirect
  if (!user) return;

  // Check if user has completed onboarding
  const progress = await getUserProgress();

  // If no progress record exists, redirect to onboarding
  if (!progress) {
    redirect("/onboarding");
  }
}

/**
 * Check if user should see onboarding
 * Returns true if user needs onboarding
 * Use this for conditional rendering
 */
export async function needsOnboarding(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const progress = await getUserProgress();
  return progress === null;
}
