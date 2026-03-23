// ── User types ────────────────────────────────────────────────────────────────
interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

// ── Reading Passage types ─────────────────────────────────────────────────────
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
  bookmarked?: boolean;
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

// ── Client & utility types ────────────────────────────────────────────────────
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

// ── Reading Session Component props ───────────────────────────────────────────
// Removed dead props from Converso template: topic, title, userName, userImage.
// These were passed at the call site but never consumed inside ReadingSessionComponent.
interface ReadingSessionComponentProps {
  passageId: string;
  subject: string | null;
  voice: string;
  style: string;
  passageContent: string;
  passageTitle: string;
  gradeLevel: string;
  onSessionComplete: (
    transcript: SavedMessage[],
    durationSeconds: number,
  ) => void;
  onStatusChange?: (status: CallStatus) => void;
  onMessagesChange?: (messages: SavedMessage[]) => void;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}
