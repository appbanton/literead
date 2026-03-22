"use client";

import { useState, useEffect } from "react";

interface DiscussionCompleteModalProps {
  onReturnToLibrary: () => void;
}

export default function DiscussionCompleteModal({
  onReturnToLibrary,
}: DiscussionCompleteModalProps) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const preference = localStorage.getItem("hideDiscussionCompleteModal");
    if (preference === "true") {
      onReturnToLibrary();
    }
  }, [onReturnToLibrary]);

  const handleReturnClick = () => {
    if (doNotShowAgain) {
      localStorage.setItem("hideDiscussionCompleteModal", "true");
    }
    onReturnToLibrary();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid #e8e8e4" }}
      >
        <div style={{ padding: "28px 28px 24px" }}>
          {/* Title */}
          <h2
            className="font-bold text-center"
            style={{
              fontSize: "18px",
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
              marginBottom: "10px",
            }}
          >
            Discussion Complete
          </h2>

          {/* Body */}
          <p
            className="text-center"
            style={{
              fontSize: "14px",
              color: "#888",
              lineHeight: "1.6",
              marginBottom: "24px",
            }}
          >
            Great work! You've finished your reading comprehension discussion.
            Keep practicing to build your understanding.
          </p>

          {/* Do not show again */}
          <label
            className="flex items-center gap-3 cursor-pointer"
            style={{ marginBottom: "16px" }}
          >
            <input
              type="checkbox"
              checked={doNotShowAgain}
              onChange={(e) => setDoNotShowAgain(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
              style={{ accentColor: "#fe5933" }}
            />
            <span style={{ fontSize: "12px", color: "#aaa" }}>
              Do not show this message again
            </span>
          </label>

          {/* Button */}
          <button
            onClick={handleReturnClick}
            className="w-full font-semibold transition-all duration-200 active:scale-[0.98]"
            style={{
              padding: "12px 0",
              borderRadius: "10px",
              fontSize: "14px",
              background: "#fe5933",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e54e2a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fe5933")}
          >
            Return to Library
          </button>
        </div>
      </div>
    </div>
  );
}
