"use client";

import { useState } from "react";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-primary hover:underline text-sm font-medium"
      >
        View Transcript →
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Discussion Transcript: {passageTitle}
              </h2>
              <div className="text-sm text-gray-600 flex gap-4 mt-2">
                <span>Duration: {formatDuration(durationSeconds)}</span>
                <span>•</span>
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Transcript Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {transcript.length > 0 ? (
            <div className="space-y-4">
              {transcript.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-gray-100"
                      : message.role === "system"
                      ? "bg-blue-50"
                      : "bg-primary bg-opacity-10"
                  }`}
                >
                  <p className="font-semibold text-sm mb-2">
                    {message.role === "assistant"
                      ? "AI Coach"
                      : message.role === "system"
                      ? "System"
                      : "Student"}
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No transcript available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
