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
  color,
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
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject || "Reading"}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm">Grade: {grade_level}</p>

      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{estimated_duration_minutes} minutes</p>
      </div>

      <Link href={`/passages/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Start Reading
        </button>
      </Link>
    </article>
  );
};

export default PassageCard;
