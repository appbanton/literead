"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Mark a passage as completed for the current user
 * Updates reading streak and total reading time
 */
export async function markPassageComplete(
  passageId: string,
  path?: string
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const supabase = createSupabaseClient();

  // Get passage details for duration
  const { data: passage } = await supabase
    .from("reading_passages")
    .select("estimated_duration_minutes")
    .eq("id", passageId)
    .single();

  const durationMinutes = passage?.estimated_duration_minutes || 10;

  // Check if already completed
  const { data: existing } = await supabase
    .from("completed_passages")
    .select("id")
    .eq("user_id", userId)
    .eq("passage_id", passageId)
    .single();

  if (existing) {
    return { success: true }; // Already completed
  }

  // Mark as completed
  const { error } = await supabase.from("completed_passages").insert({
    user_id: userId,
    passage_id: passageId,
  });

  if (error) {
    console.error("Error marking passage complete:", error);
    return { success: false, error: error.message };
  }

  // Update user progress (streak and reading time)
  await updateReadingProgress(userId, durationMinutes);

  if (path) {
    revalidatePath(path);
  }
  revalidatePath("/my-journey");

  return { success: true };
}

/**
 * Update user's reading progress (streak and total time)
 */
async function updateReadingProgress(
  userId: string,
  minutesRead: number
): Promise<void> {
  const supabase = createSupabaseClient();

  // Get current progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("reading_streak, total_reading_minutes, last_read_date")
    .eq("user_id", userId)
    .single();

  if (!progress) return;

  const today = new Date().toISOString().split("T")[0];
  const lastRead = progress.last_read_date;
  const currentStreak = progress.reading_streak || 0;
  const totalMinutes = progress.total_reading_minutes || 0;

  let newStreak = currentStreak;

  if (lastRead) {
    const lastReadDate = new Date(lastRead);
    const todayDate = new Date(today);
    const diffDays = Math.floor(
      (todayDate.getTime() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Already read today, keep streak
      newStreak = currentStreak;
    } else if (diffDays === 1) {
      // Read yesterday, increment streak
      newStreak = currentStreak + 1;
    } else {
      // Missed days, reset to 1
      newStreak = 1;
    }
  } else {
    // First time reading
    newStreak = 1;
  }

  // Update progress
  await supabase
    .from("user_progress")
    .update({
      reading_streak: newStreak,
      total_reading_minutes: totalMinutes + minutesRead,
      last_read_date: today,
    })
    .eq("user_id", userId);
}

/**
 * Get all completed passages for current user with full passage details and transcripts
 */
export async function getCompletedPassages(): Promise<
  Array<
    ReadingPassage & {
      completed_at: string;
      completed_id: string;
      transcript?: {
        transcript: Array<{ role: "user" | "assistant"; content: string }>;
        duration_seconds: number;
        created_at: string;
      } | null;
    }
  >
> {
  const { userId } = await auth();
  if (!userId) return [];

  const supabase = createSupabaseClient();

  // Fetch completed passages
  const { data: completedData, error: completedError } = await supabase
    .from("completed_passages")
    .select(
      `
      id,
      completed_at,
      passage_id,
      reading_passages:passage_id (*)
    `
    )
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (completedError) {
    console.error("Error fetching completed passages:", completedError);
    return [];
  }

  // Fetch all transcripts for this user
  const { data: transcriptsData, error: transcriptsError } = await supabase
    .from("reading_transcripts")
    .select("passage_id, transcript, duration_seconds, created_at")
    .eq("user_id", userId);

  console.log("📊 Transcripts fetched:", transcriptsData);
  console.log("📊 Transcripts error:", transcriptsError);

  // Create a map of passage_id -> transcript
  const transcriptMap = new Map();
  if (transcriptsData) {
    transcriptsData.forEach((t) => {
      console.log("📝 Adding transcript for passage_id:", t.passage_id);
      transcriptMap.set(t.passage_id, {
        transcript: t.transcript,
        duration_seconds: t.duration_seconds,
        created_at: t.created_at,
      });
    });
  }

  console.log("🗺️ Transcript map size:", transcriptMap.size);

  type CompletedWithPassage = {
    id: string;
    completed_at: string;
    passage_id: string;
    reading_passages: ReadingPassage | null;
  };

  // Map and attach transcripts
  const result =
    ((completedData ?? []) as unknown as CompletedWithPassage[])
      .filter((item) => item.reading_passages !== null)
      .map((item) => {
        const transcript = transcriptMap.get(item.passage_id);
        console.log(
          `📄 Passage ${item.reading_passages?.title} (${item.passage_id}):`,
          transcript ? "HAS TRANSCRIPT" : "NO TRANSCRIPT"
        );
        return {
          ...item.reading_passages!,
          completed_at: item.completed_at,
          completed_id: item.id,
          transcript: transcript || null,
        };
      }) || [];

  console.log("✅ Final result count:", result.length);
  return result;
}

/**
 * Get only the IDs of completed passages (for PassageCard status)
 */
export async function getCompletedPassageIds(): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("completed_passages")
    .select("passage_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching completed passage IDs:", error);
    return [];
  }

  return data?.map((item) => item.passage_id) || [];
}

/**
 * Check if a specific passage is completed
 */
export async function isPassageCompleted(passageId: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const supabase = createSupabaseClient();

  const { data } = await supabase
    .from("completed_passages")
    .select("id")
    .eq("user_id", userId)
    .eq("passage_id", passageId)
    .single();

  return !!data;
}
