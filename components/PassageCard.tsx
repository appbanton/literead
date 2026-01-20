"use client";
import { removeBookmark, addBookmark } from "@/lib/actions/passage.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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
  isCompleted?: boolean; // NEW: Track if passage is completed
}

const PassageCard = ({
  id,
  title,
  subject,
  grade_level,
  estimated_duration_minutes,
  bookmarked = false,
  isCompleted = false, // NEW
}: PassageCardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  const handleStartReading = () => {
    startTransition(() => {
      router.push(`/passages/${id}`);
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full font-medium">
            {subject || "Fiction"}
          </span>
          {/* NEW: Completed Pill */}
          {isCompleted && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Completed
            </span>
          )}
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* Title - Single line with ellipsis */}
      <div className="h-7 mb-3">
        <h2 className="text-xl font-bold line-clamp-1">{title}</h2>
      </div>

      {/* Grade */}
      <p className="text-sm text-gray-600 mb-3">Grade: {grade_level}</p>

      {/* Duration */}
      <div className="flex items-center gap-2 mb-4">
        <Image src="/icons/clock.svg" alt="duration" width={16} height={16} />
        <p className="text-sm text-gray-600">
          {estimated_duration_minutes} minutes
        </p>
      </div>

      {/* CTA Button - Push to bottom */}
      <button
        onClick={handleStartReading}
        disabled={isPending}
        className={`w-full py-3 rounded-lg font-semibold transition-colors mt-auto ${
          isPending
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isCompleted
            ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
            : "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
        }`}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
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
    </article>
  );
};

export default PassageCard;
