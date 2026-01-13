"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Get user's progress record
 * Returns null if doesn't exist (DOES NOT THROW ERROR)
 */
export async function getUserProgress() {
  const user = await currentUser();
  if (!user) return null;

  const supabase = createSupabaseServerClient();

  // Use .maybeSingle() instead of .single() to avoid throwing error
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle(); // Returns null if no row, doesn't throw error

  if (error) {
    console.error("Error fetching user progress:", error);
    return null;
  }

  return data;
}

/**
 * Create initial user_progress record during onboarding
 * Called when user first selects their grade
 */
export async function createUserProgress(gradeLevel: string): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const supabase = createSupabaseServerClient();

  // Check if user_progress already exists
  const { data: existing } = await supabase
    .from("user_progress")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    // User already has progress record, just update grade
    return updateUserGrade(gradeLevel);
  }

  // Create new user_progress record
  const { error } = await supabase.from("user_progress").insert({
    user_id: user.id,
    current_grade_level: gradeLevel,
    student_name: user.firstName || "Student",
    last_active_date: new Date().toISOString().split("T")[0],
  });

  if (error) {
    console.error("Error creating user progress:", error);
    return false;
  }

  revalidatePath("/passages");
  return true;
}

/**
 * Update user's grade level
 * Called when user changes their grade
 */
export async function updateUserGrade(gradeLevel: string): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("user_progress")
    .update({
      current_grade_level: gradeLevel,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating user grade:", error);
    return false;
  }

  revalidatePath("/passages");
  return true;
}

/**
 * Check if user has completed onboarding
 * Returns true if user_progress record exists
 */
export async function hasCompletedOnboarding(): Promise<boolean> {
  const progress = await getUserProgress();
  return progress !== null;
}

/**
 * Update user's last active date
 * Called whenever user accesses the app
 */
export async function updateLastActive(): Promise<void> {
  const user = await currentUser();
  if (!user) return;

  const supabase = createSupabaseServerClient();

  await supabase
    .from("user_progress")
    .update({
      last_active_date: new Date().toISOString().split("T")[0],
    })
    .eq("user_id", user.id);
}
