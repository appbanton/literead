"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TranscriptMessage {
  role: "user" | "system" | "assistant";
  content: string;
  timestamp?: string;
}

interface TranscriptViewerProps {
  passageTitle: string;
  transcript: TranscriptMessage[];
  durationSeconds: number;
  createdAt: string;
}

export default function TranscriptViewer({
  passageTitle,
  transcript,
  durationSeconds,
  createdAt,
}: TranscriptViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-semibold flex-shrink-0 transition-all duration-200 active:scale-[0.98]"
        style={{
          fontSize: "11px",
          padding: "6px 12px",
          borderRadius: "8px",
          background: "#F9F8F6",
          border: "1px solid #e0ded9",
          color: "#555",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#e8e4de";
          e.currentTarget.style.borderColor = "#e8e4de";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#F9F8F6";
          e.currentTarget.style.borderColor = "#e0ded9";
        }}
      >
        View Transcript
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-col w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{
              background: "white",
              border: "1px solid #e8e8e4",
              maxHeight: "80vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex items-start justify-between flex-shrink-0"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #f0f0ee",
              }}
            >
              <div>
                <p
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "#aaa",
                    marginBottom: "4px",
                  }}
                >
                  Discussion Transcript
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "16px",
                    letterSpacing: "-0.01em",
                    color: "#1a1a1a",
                    marginBottom: "4px",
                  }}
                >
                  {passageTitle}
                </p>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "12px", color: "#aaa" }}>
                    {formatDuration(durationSeconds)}
                  </span>
                  <span style={{ fontSize: "12px", color: "#ddd" }}>·</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ccc",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Transcript messages */}
            <div
              className="flex-1 overflow-y-auto flex flex-col gap-3"
              style={{
                padding: "20px 24px",
                scrollbarWidth: "thin",
                scrollbarColor: "#e8e8e4 transparent",
              }}
            >
              {transcript
                .filter((m) => m.role !== "system")
                .map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <p
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color:
                          message.role === "assistant" ? "#fe5933" : "#aaa",
                        marginBottom: "3px",
                        paddingLeft: message.role !== "user" ? "4px" : "0",
                        paddingRight: message.role === "user" ? "4px" : "0",
                      }}
                    >
                      {message.role === "assistant" ? "AI Coach" : "Student"}
                    </p>
                    <div
                      style={{
                        borderRadius: "12px",
                        padding: "10px 14px",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        maxWidth: "85%",
                        background:
                          message.role === "assistant" ? "#F9F8F6" : "#1a1a1a",
                        color:
                          message.role === "assistant" ? "#1a1a1a" : "white",
                        border:
                          message.role === "assistant"
                            ? "1px solid #e8e8e4"
                            : "none",
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
