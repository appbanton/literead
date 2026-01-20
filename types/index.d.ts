// User types (keep as is)
interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

// Reading Passage Types (NEW - replaces Companion)
type ReadingPassage = {
  id: string;
  title: string;
  content: string;
  grade_level: string;
  lexile_score: number | null;
  lesson_type: "Phonics" | "Comprehension" | "Sight Words" | "Story" | "Mixed";
  tags: string[];
  subject: string | null;
  word_count: number | null;
  estimated_duration_minutes: number;
  created_by: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  bookmarked?: boolean; // For UI state
};

interface CreateReadingPassage {
  title: string;
  content: string;
  grade_level: string;
  lexile_score?: number;
  lesson_type: "Phonics" | "Comprehension" | "Sight Words" | "Story" | "Mixed";
  tags?: string[];
  subject?: string;
}

interface GetAllReadingPassages {
  limit?: number;
  page?: number;
  grade_level?: string | string[];
  lesson_type?: string | string[];
  subject?: string | string[];
}

// Client & Utility Types (keep as is)
interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// Reading Session Component Props (UPDATED for Vapi integration)
interface ReadingSessionComponentProps {
  passageId: string;
  subject: string | null;
  topic: string;
  title: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
  passageContent: string; // NEW: Full passage text for AI
  passageTitle: string; // NEW: Passage title for AI context
  gradeLevel: string; // NEW: Grade level for AI difficulty
  onSessionComplete: (
    transcript: SavedMessage[],
    durationSeconds: number
  ) => void; // UPDATED: Now passes transcript and duration
}
