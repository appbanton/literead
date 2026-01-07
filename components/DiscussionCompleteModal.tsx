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
    // Check if user has previously selected "do not show again"
    const preference = localStorage.getItem("hideDiscussionCompleteModal");
    if (preference === "true") {
      // If they don't want to see it, auto-redirect
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Discussion Complete
        </h2>

        {/* Body Text */}
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          Great job! You've completed your reading comprehension discussion.
          Keep practicing to improve your understanding.
        </p>

        {/* Do Not Show Again Checkbox */}
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={doNotShowAgain}
            onChange={(e) => setDoNotShowAgain(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            Do not show this message again
          </span>
        </label>

        {/* Return Button */}
        <button
          onClick={handleReturnClick}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors cursor-pointer"
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}
