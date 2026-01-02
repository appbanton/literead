"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createReadingPassage = async (formData: CreateReadingPassage) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reading_passages")
    .insert({ ...formData, created_by: author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create reading passage");

  return data[0];
};

export const getAllReadingPassages = async ({
  limit = 10,
  page = 1,
  grade_level,
  lesson_type,
  subject,
}: GetAllReadingPassages) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("reading_passages").select();

  // Filter by grade level
  if (grade_level) {
    if (Array.isArray(grade_level)) {
      query = query.in("grade_level", grade_level);
    } else {
      query = query.eq("grade_level", grade_level);
    }
  }

  // Filter by lesson type
  if (lesson_type) {
    if (Array.isArray(lesson_type)) {
      query = query.in("lesson_type", lesson_type);
    } else {
      query = query.eq("lesson_type", lesson_type);
    }
  }

  // Filter by subject (search in title, subject, or tags)
  if (subject) {
    query = query.or(`subject.ilike.%${subject}%,title.ilike.%${subject}%`);
  }

  // Pagination
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: passages, error } = await query;

  if (error) throw new Error(error.message);

  return passages;
};

export const getReadingPassage = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("reading_passages")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (passageId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("reading_sessions").insert({
    passage_id: passageId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("reading_sessions")
    .select(`reading_passages:passage_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ reading_passages }) => reading_passages);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("reading_sessions")
    .select(`reading_passages:passage_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ reading_passages }) => reading_passages);
};

export const getUserPassages = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("reading_passages")
    .select()
    .eq("created_by", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newPassagePermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  // Pro plan gets unlimited passages
  if (has({ plan: "pro_companion" })) {
    return true;
  } else if (has({ feature: "three_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "ten_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("reading_passages")
    .select("id", { count: "exact" })
    .eq("created_by", userId);

  if (error) throw new Error(error.message);

  const passageCount = data?.length || 0;

  return passageCount < limit;
};

// Bookmarks
export const addBookmark = async (passageId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("user_bookmarks").insert({
    passage_id: passageId,
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);
  return data;
};

export const removeBookmark = async (passageId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user_bookmarks")
    .delete()
    .eq("passage_id", passageId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);
  return data;
};

export const getBookmarkedPassages = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user_bookmarks")
    .select(`reading_passages:passage_id (*)`)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map(({ reading_passages }) => reading_passages);
};
