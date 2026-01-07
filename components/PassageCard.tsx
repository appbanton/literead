"use client";
import { removeBookmark, addBookmark } from "@/lib/actions/passage.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
}

const PassageCard = ({
  id,
  title,
  subject,
  grade_level,
  estimated_duration_minutes,
  bookmarked = false,
}: PassageCardProps) => {
  const pathname = usePathname();

  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full font-medium">
          {subject || "Fiction"}
        </span>
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

      {/* Title */}
      <h2 className="text-xl font-bold mb-3 line-clamp-2">{title}</h2>

      {/* Grade */}
      <p className="text-sm text-gray-600 mb-3">Grade: {grade_level}</p>

      {/* Duration */}
      <div className="flex items-center gap-2 mb-4">
        <Image src="/icons/clock.svg" alt="duration" width={16} height={16} />
        <p className="text-sm text-gray-600">
          {estimated_duration_minutes} minutes
        </p>
      </div>

      {/* CTA Button */}
      <Link href={`/passages/${id}`} className="block w-full">
        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors cursor-pointer">
          Start Reading
        </button>
      </Link>
    </article>
  );
};

export default PassageCard;
