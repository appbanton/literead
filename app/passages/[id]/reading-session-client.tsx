"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DiscussionCompleteModal from "@/components/DiscussionCompleteModal";
import PaywallModal from "@/components/PaywallModal";
import ReadingSessionComponent from "@/components/ReadingSessionComponent";
import { decrementSession } from "@/lib/actions/subscription.actions";
import { markPassageComplete } from "@/lib/actions/completed.actions";
import { useUser } from "@clerk/nextjs";

interface ReadingSessionClientProps {
  passage: {
    id: string;
    title: string;
    content: string;
    subject: string | null;
    grade_level: string;
    estimated_duration_minutes: number;
  };
  sessionsRemaining: number;
  totalSessions: number;
  hasSubscription: boolean;
}

export default function ReadingSessionClient({
  passage,
  sessionsRemaining,
  totalSessions,
  hasSubscription,
}: ReadingSessionClientProps) {
  const router = useRouter();
  const { user } = useUser();
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const [isDiscussing, setIsDiscussing] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Calculate minimum reading time based on word count (average 200 words/min)
  const wordCount = passage.content.split(" ").length;
  const minReadingTimeSeconds = Math.ceil((wordCount / 200) * 60);
  const [readingTimeElapsed, setReadingTimeElapsed] = useState(0);

  useEffect(() => {
    if (hasFinishedReading || isDiscussing) return;

    const timer = setInterval(() => {
      setReadingTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasFinishedReading, isDiscussing]);

  const handleCheckboxChange = () => {
    if (readingTimeElapsed >= minReadingTimeSeconds) {
      setHasFinishedReading(!hasFinishedReading);
    } else {
      alert(
        `Please take at least ${minReadingTimeSeconds} seconds to read the passage.`
      );
    }
  };

  const handleStartDiscussion = async () => {
    // Check if user has sessions remaining
    if (!hasSubscription || sessionsRemaining <= 0) {
      setShowPaywall(true);
      return;
    }

    // Check if Vapi token exists
    if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
      alert(
        "Voice AI is not configured. Please add VAPI token to environment variables."
      );
      return;
    }

    // Show voice UI and it will auto-start
    setIsDiscussing(true);
  };

  const handleCancelSession = () => {
    // User canceled before completing - no session consumed
    setIsDiscussing(false);
  };

  const handleDiscussionComplete = async (
    transcript: SavedMessage[],
    durationSeconds: number
  ) => {
    // Mark passage as completed first
    let completedPassageId: string | undefined;
    try {
      await markPassageComplete(passage.id, "/passages");
      console.log("✅ Passage marked as completed");
    } catch (error) {
      console.error("Failed to mark passage as complete:", error);
    }

    // Save the transcript (filter out system messages if any)
    try {
      const { saveTranscript } = await import(
        "@/lib/actions/transcript.actions"
      );

      // Map to only user and assistant messages with explicit type
      const transcriptToSave: Array<{
        role: "user" | "assistant";
        content: string;
        timestamp?: string;
      }> = transcript
        .filter((msg) => msg.role === "user" || msg.role === "assistant")
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));

      const result = await saveTranscript(
        passage.id,
        transcriptToSave,
        durationSeconds,
        completedPassageId
      );

      if (result.success) {
        console.log("✅ Transcript saved successfully");
      } else {
        console.error("Failed to save transcript:", result.error);
      }
    } catch (error) {
      console.error("Error saving transcript:", error);
    }

    // Decrement session (only after successful completion)
    const success = await decrementSession();
    if (!success) {
      console.error("Failed to decrement session");
    }

    // Show completion modal
    setShowCompleteModal(true);
    setIsDiscussing(false);
  };

  const handleReturnToLibrary = () => {
    router.push("/passages");
  };

  // Show Vapi session if discussing
  if (isDiscussing) {
    return (
      <main className="min-h-screen bg-gray-50 m-0 p-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full px-14 py-4 bg-white border-b border-gray-200 max-sm:px-4">
          <button
            onClick={handleCancelSession}
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Cancel Session</span>
          </button>
          <div className="text-sm text-gray-600">
            Sessions Remaining:{" "}
            <span className="font-bold text-primary">
              {sessionsRemaining}/{totalSessions}
            </span>
          </div>
        </div>

        {/* Vapi Voice Session */}
        <div className="container mx-auto px-6 py-8">
          <ReadingSessionComponent
            passageId={passage.id}
            subject={passage.subject}
            topic={passage.title}
            title="Reading Coach"
            userName={user?.firstName || "Student"}
            userImage={user?.imageUrl || "/icons/avatar.svg"}
            voice="sarah"
            style="friendly"
            passageContent={passage.content}
            passageTitle={passage.title}
            gradeLevel={passage.grade_level}
            onSessionComplete={handleDiscussionComplete}
          />
        </div>

        {/* Discussion Complete Modal */}
        {showCompleteModal && (
          <DiscussionCompleteModal onReturnToLibrary={handleReturnToLibrary} />
        )}
      </main>
    );
  }

  // Show reading interface
  return (
    <main className="min-h-screen bg-gray-50 m-0 p-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full px-14 py-4 bg-white border-b border-gray-200 max-sm:px-4">
        <button
          onClick={() => router.push("/passages")}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Library</span>
        </button>
        <div className="text-sm text-gray-600">
          Sessions Remaining:{" "}
          <span className="font-bold text-primary">
            {sessionsRemaining}/{totalSessions}
          </span>
        </div>
      </div>

      {/* Passage Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full font-medium">
                {passage.subject || "Fiction"}
              </span>
              <span className="text-sm text-gray-600">
                Grade: {passage.grade_level}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              ~{passage.estimated_duration_minutes} min read
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6">{passage.title}</h1>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Passage Text */}
          <div className="prose prose-lg max-w-none mb-8">
            {passage.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Reading Confirmation */}
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasFinishedReading}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <span className="text-gray-700">
                I've finished reading this passage
              </span>
            </label>

            {/* Start Discussion Button */}
            <button
              onClick={handleStartDiscussion}
              disabled={!hasFinishedReading || showCompleteModal}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                hasFinishedReading && !showCompleteModal
                  ? "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Discussion with AI Coach
            </button>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          passageId={passage.id}
        />
      )}
    </main>
  );
}
