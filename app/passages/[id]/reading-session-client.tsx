"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import DiscussionCompleteModal from "@/components/DiscussionCompleteModal";
import PaywallModal from "@/components/PaywallModal";
import ReadingSessionComponent, {
  CallStatus,
  useVapiControls,
} from "@/components/ReadingSessionComponent";
import { decrementSession } from "@/lib/actions/subscription.actions";
import { markPassageComplete } from "@/lib/actions/completed.actions";

const SUBJECT_STYLES: Record<string, { bg: string; text: string }> = {
  science: { bg: "#A8D5B5", text: "#1a4a2e" },
  maths: { bg: "#A8C5DA", text: "#1a3d52" },
  language: { bg: "#B5D5C5", text: "#1a3d2b" },
  economics: { bg: "#D4B8E0", text: "#4a1d6b" },
  history: { bg: "#F2C4CE", text: "#7a1a2e" },
  literature: { bg: "#C5D8A4", text: "#2d4a1a" },
  "social studies": { bg: "#F2D7B6", text: "#7a4010" },
  coding: { bg: "#B8C9E8", text: "#1a2d5a" },
  fiction: { bg: "#E8C5A0", text: "#6b3a1f" },
  geography: { bg: "#B5D5C5", text: "#1a3d2b" },
  biology: { bg: "#A8D5B5", text: "#1a4a2e" },
  physics: { bg: "#A8C5DA", text: "#1a3d52" },
  chemistry: { bg: "#D4B8E0", text: "#4a1d6b" },
};
const FALLBACK_STYLE = { bg: "#e8e6e1", text: "#555" };
const getSubjectStyle = (subject: string | null) =>
  SUBJECT_STYLES[subject?.toLowerCase() ?? ""] ?? FALLBACK_STYLE;

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
  passageNumber: number | null;
  totalPassagesForGrade: number;
}

function CardHeader({
  gradeLevel,
  subject,
  estimatedMinutes,
  passageNumber,
  totalPassagesForGrade,
}: {
  gradeLevel: string;
  subject: string | null;
  estimatedMinutes: number;
  passageNumber: number | null;
  totalPassagesForGrade: number;
}) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4 max-sm:px-4"
      style={{ borderBottom: "1px solid #f0f0ee" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-bold uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            padding: "4px 10px",
            borderRadius: "999px",
            background: "#fe5933",
            color: "white",
          }}
        >
          Grade {gradeLevel}
        </span>
        <span style={{ fontSize: "12px", color: "#888" }}>
          {subject || "Reading"} · {estimatedMinutes} min read
        </span>
      </div>
      {passageNumber !== null && totalPassagesForGrade > 0 && (
        <div className="flex items-center gap-1.5 max-sm:hidden">
          <span style={{ fontSize: "12px", color: "#aaa" }}>
            Passage {passageNumber} of {totalPassagesForGrade}
          </span>
          <Tooltip
            text={`There are ${totalPassagesForGrade} passages available for Grade ${gradeLevel}. You are reading number ${passageNumber}.`}
            side="bottom"
          >
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#ccc",
                display: "flex",
                alignItems: "center",
                padding: "6px",
              }}
            >
              <Info size={13} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

function PassageContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <>
      <h2
        className="font-bold mb-6"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
          letterSpacing: "-0.02em",
          color: "#1a1a1a",
          lineHeight: "1.2",
        }}
      >
        {title}
      </h2>
      <div className="space-y-4">
        {content.split("\n\n").map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: "14px",
              color: "#3a3a3a",
              lineHeight: "1.8",
              letterSpacing: "0.01em",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </>
  );
}

export default function ReadingSessionClient({
  passage,
  sessionsRemaining,
  totalSessions,
  hasSubscription,
  passageNumber,
  totalPassagesForGrade,
}: ReadingSessionClientProps) {
  const router = useRouter();
  const { endCall } = useVapiControls();

  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const [isDiscussing, setIsDiscussing] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPassageOverlay, setShowPassageOverlay] = useState(false);

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const transcriptBottomRef = useRef<HTMLDivElement>(null);

  const wordCount = passage.content.split(" ").length;
  const minReadingTimeSeconds = Math.ceil((wordCount / 200) * 60);
  const [readingTimeElapsed, setReadingTimeElapsed] = useState(0);

  useEffect(() => {
    if (hasFinishedReading || isDiscussing) return;
    const timer = setInterval(() => setReadingTimeElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [hasFinishedReading, isDiscussing]);

  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCheckboxChange = () => {
    if (readingTimeElapsed >= minReadingTimeSeconds) {
      setHasFinishedReading(!hasFinishedReading);
    } else {
      alert(
        `Please take at least ${minReadingTimeSeconds} seconds to read the passage.`,
      );
    }
  };

  const handleStartDiscussion = async () => {
    if (!hasSubscription || sessionsRemaining <= 0) {
      setShowPaywall(true);
      return;
    }
    if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
      alert("Voice AI is not configured.");
      return;
    }
    setIsDiscussing(true);
  };

  const handleCancelSession = () => {
    endCall();
    setIsDiscussing(false);
    setMessages([]);
    setCallStatus(CallStatus.INACTIVE);
  };

  const handleDiscussionComplete = async (
    transcript: SavedMessage[],
    durationSeconds: number,
  ) => {
    try {
      await markPassageComplete(passage.id, "/passages");
    } catch (e) {
      console.error(e);
    }
    try {
      const { saveTranscript } =
        await import("@/lib/actions/transcript.actions");
      await saveTranscript(
        passage.id,
        transcript
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        durationSeconds,
        undefined,
      );
    } catch (e) {
      console.error("Error saving transcript:", e);
    }
    await decrementSession();
    setShowCompleteModal(true);
    setIsDiscussing(false);
  };

  const handleReturnToLibrary = () => router.push("/passages");
  const subjectStyle = getSubjectStyle(passage.subject);

  // ─── Shared top row ────────────────────────────────────────────────────────
  const TopRow = ({ onBack, label }: { onBack: () => void; label: string }) => (
    <div className="flex items-center justify-between mb-6 max-sm:mb-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2"
        style={{
          color: "#1a1a1a",
          fontSize: "14px",
          fontWeight: 500,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={15} />
        <span>{label}</span>
      </button>
      <div
        className="rounded-2xl"
        style={{
          padding: "7px 14px",
          background: "white",
          border: "1px solid #e8e8e4",
        }}
      >
        <p
          style={{
            fontSize: "9px",
            color: "#aaa",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "2px",
          }}
        >
          Sessions remaining
        </p>
        <p
          className="font-bold"
          style={{
            fontSize: "17px",
            color: "#fe5933",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {sessionsRemaining}
          <span style={{ fontSize: "11px", color: "#bbb", fontWeight: 400 }}>
            /{totalSessions}
          </span>
        </p>
      </div>
    </div>
  );

  // ─── Reading state ─────────────────────────────────────────────────────────
  if (!isDiscussing) {
    return (
      <main className="min-h-screen" style={{ background: "#F9F8F6" }}>
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          <TopRow
            onBack={() => router.push("/passages")}
            label="Back to Library"
          />
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", border: "1px solid #e8e8e4" }}
          >
            <CardHeader
              gradeLevel={passage.grade_level}
              subject={passage.subject}
              estimatedMinutes={passage.estimated_duration_minutes}
              passageNumber={passageNumber}
              totalPassagesForGrade={totalPassagesForGrade}
            />

            <div
              className="px-8 py-8 max-sm:px-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#e8e8e4 transparent",
              }}
            >
              <PassageContent title={passage.title} content={passage.content} />

              {/* Reading confirmation */}
              <div
                className="mt-10 pt-6"
                style={{ borderTop: "1px solid #f0f0ee" }}
              >
                <label
                  className="flex items-center gap-3 cursor-pointer"
                  style={{ userSelect: "none" }}
                >
                  <div
                    onClick={handleCheckboxChange}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px",
                      border: hasFinishedReading
                        ? "2px solid #fe5933"
                        : "2px solid #d4d2cc",
                      background: hasFinishedReading ? "#fe5933" : "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {hasFinishedReading && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: "14px", color: "#555" }}>
                    I have finished reading this passage
                  </span>
                </label>

                <button
                  onClick={handleStartDiscussion}
                  disabled={!hasFinishedReading || showCompleteModal}
                  className="mt-4 w-full font-semibold transition-all duration-200"
                  style={{
                    padding: "14px 0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    background:
                      hasFinishedReading && !showCompleteModal
                        ? "#fe5933"
                        : "#eeece9",
                    color:
                      hasFinishedReading && !showCompleteModal
                        ? "white"
                        : "#aaa",
                    border: "none",
                    cursor:
                      hasFinishedReading && !showCompleteModal
                        ? "pointer"
                        : "not-allowed",
                  }}
                  onMouseEnter={(e) => {
                    if (hasFinishedReading && !showCompleteModal)
                      e.currentTarget.style.background = "#e54e2a";
                  }}
                  onMouseLeave={(e) => {
                    if (hasFinishedReading && !showCompleteModal)
                      e.currentTarget.style.background = "#fe5933";
                  }}
                >
                  Start Discussion with AI Coach
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPaywall && (
          <PaywallModal
            onClose={() => setShowPaywall(false)}
            passageId={passage.id}
          />
        )}
        {showCompleteModal && (
          <DiscussionCompleteModal onReturnToLibrary={handleReturnToLibrary} />
        )}
      </main>
    );
  }

  // ─── Discussion state — split layout ───────────────────────────────────────
  return (
    <main className="min-h-screen" style={{ background: "#F9F8F6" }}>
      {/* Headless Vapi controller — dead props removed: topic, title, userName, userImage */}
      <ReadingSessionComponent
        passageId={passage.id}
        subject={passage.subject}
        voice="sarah"
        style="friendly"
        passageContent={passage.content}
        passageTitle={passage.title}
        gradeLevel={passage.grade_level}
        onSessionComplete={handleDiscussionComplete}
        onStatusChange={setCallStatus}
        onMessagesChange={setMessages}
        onSpeakingChange={setIsSpeaking}
      />

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <TopRow onBack={handleCancelSession} label="Cancel Session" />

        {/* Split card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1px solid #e8e8e4",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "calc(100vh - 160px)",
            minHeight: "500px",
          }}
        >
          {/* Left — passage (hidden on mobile, shown via overlay) */}
          <div
            className="max-sm:hidden flex flex-col"
            style={{ borderRight: "1px solid #f0f0ee", overflow: "hidden" }}
          >
            <CardHeader
              gradeLevel={passage.grade_level}
              subject={passage.subject}
              estimatedMinutes={passage.estimated_duration_minutes}
              passageNumber={passageNumber}
              totalPassagesForGrade={totalPassagesForGrade}
            />
            <div
              className="flex-1 overflow-y-auto px-6 py-6"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#e8e8e4 transparent",
              }}
            >
              <PassageContent title={passage.title} content={passage.content} />
            </div>
          </div>

          {/* Right — conversation */}
          <div className="flex flex-col" style={{ overflow: "hidden" }}>
            {/* Mobile header with passage toggle */}
            <div
              className="sm:hidden"
              style={{ borderBottom: "1px solid #f0f0ee" }}
            >
              <CardHeader
                gradeLevel={passage.grade_level}
                subject={passage.subject}
                estimatedMinutes={passage.estimated_duration_minutes}
                passageNumber={passageNumber}
                totalPassagesForGrade={totalPassagesForGrade}
              />
              <div className="px-4 py-2">
                <button
                  onClick={() => setShowPassageOverlay(true)}
                  className="flex items-center gap-2 rounded-full font-semibold"
                  style={{
                    fontSize: "11px",
                    padding: "5px 12px",
                    background: "#F9F8F6",
                    border: "1px solid #e0ded9",
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  <BookOpen size={12} />
                  Show Passage
                </button>
              </div>
            </div>

            {/* Desktop conversation header */}
            <div
              className="max-sm:hidden"
              style={{ borderBottom: "1px solid #f0f0ee" }}
            >
              <div className="px-6 py-4">
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ccc",
                  }}
                >
                  Conversation
                </p>
              </div>
            </div>

            {/* Connecting state */}
            {callStatus === CallStatus.CONNECTING && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "#fe5933",
                    boxShadow: "0 4px 16px rgba(254,89,51,0.3)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="2.5" fill="white" />
                    <path
                      d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.4 3.4l.7.7M9.9 9.9l.7.7M9.9 4.1l-.7.7M4.1 9.9l-.7.7"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  Connecting to AI Coach...
                </p>
                <p style={{ fontSize: "12px", color: "#aaa" }}>
                  Setting up voice connection
                </p>
              </div>
            )}

            {/* Active conversation */}
            {callStatus === CallStatus.ACTIVE && (
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#e8e8e4 transparent",
                }}
              >
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <p style={{ fontSize: "13px", color: "#ccc" }}>
                      AI coach is speaking...
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <p
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color:
                          msg.role === "assistant"
                            ? "#fe5933"
                            : "rgba(255,255,255,0.5)",
                        marginBottom: "3px",
                        paddingLeft: msg.role !== "user" ? "4px" : "0",
                        paddingRight: msg.role === "user" ? "4px" : "0",
                      }}
                    >
                      {msg.role === "assistant" ? "AI Coach" : "You"}
                    </p>
                    <div
                      style={{
                        borderRadius: "12px",
                        padding: "9px 12px",
                        fontSize: "13px",
                        lineHeight: "1.5",
                        maxWidth: "88%",
                        background:
                          msg.role === "assistant" ? "#F9F8F6" : "#1a1a1a",
                        color: msg.role === "assistant" ? "#1a1a1a" : "white",
                        border:
                          msg.role === "assistant"
                            ? "1px solid #e8e8e4"
                            : "none",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={transcriptBottomRef} />
              </div>
            )}

            {/* Mic row + end button — pinned to bottom */}
            <div
              style={{ padding: "12px 16px", borderTop: "1px solid #f0f0ee" }}
            >
              <div
                className="flex items-center gap-3 mb-2"
                style={{
                  padding: "10px 12px",
                  background: "#F9F8F6",
                  borderRadius: "10px",
                  border: "1px solid #e8e8e4",
                }}
              >
                {/* Mic button */}
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#fe5933",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 3px 10px rgba(254,89,51,0.35)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <rect
                      x="5"
                      y="1"
                      width="4"
                      height="8"
                      rx="2"
                      fill="white"
                    />
                    <path
                      d="M2.5 7.5A4.5 4.5 0 007 12a4.5 4.5 0 004.5-4.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7"
                      y1="12"
                      x2="7"
                      y2="13.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Waveform */}
                <div
                  className="flex items-center gap-[3px] flex-1"
                  style={{ height: "20px" }}
                >
                  {[8, 14, 20, 10, 18, 6, 16, 12, 20, 8, 14, 10].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "3px",
                        height: `${h}px`,
                        borderRadius: "3px",
                        background: isSpeaking
                          ? `rgba(254,89,51,${0.3 + (i % 3) * 0.15})`
                          : "rgba(0,0,0,0.08)",
                        transition: "height 0.15s ease",
                      }}
                    />
                  ))}
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#bbb",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isSpeaking ? "AI Speaking..." : "Listening..."}
                </span>
              </div>

              <button
                onClick={handleCancelSession}
                className="w-full font-semibold transition-all duration-200"
                style={{
                  padding: "9px 0",
                  borderRadius: "10px",
                  fontSize: "12px",
                  background: "#F9F8F6",
                  border: "1px solid #e0ded9",
                  color: "#888",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e8e4de";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9F8F6";
                }}
              >
                End Discussion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile passage overlay */}
      {showPassageOverlay && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "white" }}
        >
          <div
            className="flex items-center justify-between px-4 py-4"
            style={{ borderBottom: "1px solid #f0f0ee" }}
          >
            <span
              style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}
            >
              {passage.title}
            </span>
            <button
              onClick={() => setShowPassageOverlay(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
              }}
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <PassageContent title={passage.title} content={passage.content} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f0ee" }}>
            <button
              onClick={() => setShowPassageOverlay(false)}
              className="w-full font-semibold"
              style={{
                padding: "12px 0",
                borderRadius: "10px",
                fontSize: "14px",
                background: "#fe5933",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back to Conversation
            </button>
          </div>
        </div>
      )}

      {showCompleteModal && (
        <DiscussionCompleteModal onReturnToLibrary={handleReturnToLibrary} />
      )}
    </main>
  );
}
