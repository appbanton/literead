"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface TranscriptMessage {
  role: "user" | "system" | "assistant"; // Match SavedMessage type
  content: string;
  timestamp?: string;
}

interface ReadingTranscript {
  id: string;
  user_id: string;
  passage_id: string;
  completed_passage_id: string | null;
  transcript: TranscriptMessage[];
  duration_seconds: number;
  created_at: string;
}

/**
 * Save a reading discussion transcript
 */
export async function saveTranscript(
  passageId: string,
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
  }>,
  durationSeconds: number,
  completedPassageId?: string
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const supabase = createSupabaseClient();

  // Add timestamps to messages if not present
  const messagesWithTimestamps = messages.map((msg, index) => ({
    ...msg,
    timestamp: msg.timestamp || new Date().toISOString(),
  }));

  const { error } = await supabase.from("reading_transcripts").insert({
    user_id: userId,
    passage_id: passageId,
    completed_passage_id: completedPassageId || null,
    transcript: messagesWithTimestamps,
    duration_seconds: durationSeconds,
  });

  if (error) {
    console.error("Error saving transcript:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/my-journey");
  return { success: true };
}

/**
 * Get transcript for a specific completed passage
 */
export async function getTranscriptForCompletion(
  completedPassageId: string
): Promise<ReadingTranscript | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reading_transcripts")
    .select("*")
    .eq("user_id", userId)
    .eq("completed_passage_id", completedPassageId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching transcript:", error);
    return null;
  }

  return data as ReadingTranscript;
}

/**
 * Get all transcripts for a specific passage
 */
export async function getTranscriptsForPassage(
  passageId: string
): Promise<ReadingTranscript[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reading_transcripts")
    .select("*")
    .eq("user_id", userId)
    .eq("passage_id", passageId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transcripts:", error);
    return [];
  }

  return (data as ReadingTranscript[]) || [];
}

/**
 * Get all transcripts for current user
 */
export async function getAllTranscripts(): Promise<ReadingTranscript[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reading_transcripts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transcripts:", error);
    return [];
  }

  return (data as ReadingTranscript[]) || [];
}

/**
 * Delete a transcript
 */
export async function deleteTranscript(
  transcriptId: string
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "Not authenticated" };
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("reading_transcripts")
    .delete()
    .eq("id", transcriptId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting transcript:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/my-journey");
  return { success: true };
}
