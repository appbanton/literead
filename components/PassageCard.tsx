"use client";
import { removeBookmark, addBookmark } from "@/lib/actions/passage.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface PassageCardProps {
  id: string;
  title: string;
  content: string;
  subject: string | null;
  grade_level: string;
  lexile_score: number | null;
  estimated_duration_minutes: number;
  color: string;
  bookmarked?: boolean;
  isCompleted?: boolean;
}

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

const FALLBACK = { bg: "#e8e6e1", text: "#555" };

const getStyle = (subject: string | null) =>
  SUBJECT_STYLES[subject?.toLowerCase() ?? ""] ?? FALLBACK;

const PassageCard = ({
  id,
  title,
  subject,
  grade_level,
  estimated_duration_minutes,
  bookmarked = false,
  isCompleted = false,
}: PassageCardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const s = getStyle(subject);

  const handleBookmark = async () => {
    if (bookmarked) await removeBookmark(id, pathname);
    else await addBookmark(id, pathname);
  };

  const handleStartReading = () => {
    startTransition(() => router.push(`/passages/${id}`));
  };

  return (
    <div
      className="rounded-[20px] transition-all duration-300"
      style={{
        padding: "5px",
        background: "rgba(0,0,0,0.025)",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <article
        className="bg-white flex flex-col"
        style={{
          borderRadius: "16px",
          height: "180px",
          overflow: "hidden",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Top — subject pill + done check + bookmark */}
        <div
          className="flex flex-col flex-1"
          style={{ padding: "14px 14px 0" }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "10px" }}
          >
            {/* Subject pill — no dot */}
            <span
              className="rounded-full font-bold uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.06em",
                padding: "4px 10px",
                background: s.bg,
                color: s.text,
                whiteSpace: "nowrap",
              }}
            >
              {subject || "Reading"}
            </span>

            <div className="flex items-center gap-2">
              {/* Done checkmark — colour matched to subject */}
              {isCompleted && (
                <div
                  className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: "22px",
                    height: "22px",
                    background: `${s.bg}99`,
                    border: `1px solid ${s.text}33`,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 20 20" fill={s.text}>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Bookmark */}
              <button
                className="rounded-full transition-all duration-200 flex-shrink-0"
                style={{ padding: "3px", color: "#ccc" }}
                onClick={handleBookmark}
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
              >
                <Image
                  src={
                    bookmarked
                      ? "/icons/bookmark-filled.svg"
                      : "/icons/bookmark.svg"
                  }
                  alt="bookmark"
                  width={14}
                  height={14}
                />
              </button>
            </div>
          </div>

          {/* Title — padding-bottom creates gap before bottom group */}
          <h2
            className="font-bold"
            style={{
              fontSize: "13px",
              letterSpacing: "-0.01em",
              color: "#1a1a1a",
              lineHeight: "1.35",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              paddingBottom: "12px",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Bottom group — grade/time + button tight together */}
        <div
          style={{
            padding: "0 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="rounded-full"
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                background: "rgba(0,0,0,0.04)",
                color: "#999",
              }}
            >
              Grade {grade_level}
            </span>
            <span
              className="rounded-full"
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                background: "rgba(0,0,0,0.04)",
                color: "#999",
              }}
            >
              {estimated_duration_minutes} min
            </span>
          </div>

          {/* CTA — rounded-lg, L2 hover #e8e4de */}
          <button
            onClick={handleStartReading}
            disabled={isPending}
            className="w-full font-semibold active:scale-[0.98] transition-all duration-200"
            style={{
              borderRadius: "10px",
              padding: "9px 0",
              fontSize: "12px",
              background: isPending ? "#f0efed" : "#F9F8F6",
              color: isPending ? "#aaa" : "#1a1a1a",
              border: isPending ? "1px solid #e8e6e1" : "1px solid #e0ded9",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = "#fe5933";
                e.currentTarget.style.borderColor = "#fe5933";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = "#F9F8F6";
                e.currentTarget.style.borderColor = "#e0ded9";
                e.currentTarget.style.color = "#1a1a1a";
              }
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : isCompleted ? (
              "Read Again"
            ) : (
              "Start Reading"
            )}
          </button>
        </div>
      </article>
    </div>
  );
};

export default PassageCard;
