import {
  getReadingPassage,
  getAllReadingPassages,
} from "@/lib/actions/passage.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ReadingSessionClient from "./reading-session-client";

interface PassageSessionPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadingSessionPage({
  params,
}: PassageSessionPageProps) {
  const { id } = await params;
  const passage = await getReadingPassage(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!passage) redirect("/passages");

  const subscription = await getUserSubscription();

  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;
  const hasSubscription = !!subscription;

  // Fetch total passages for this grade so passage number is meaningful
  const allPassagesForGrade = await getAllReadingPassages({
    grade_level: passage.grade_level,
    limit: 1000,
  });
  const totalPassagesForGrade = allPassagesForGrade?.length || 0;

  // Find this passage's position in the grade
  const passageIndex = allPassagesForGrade?.findIndex((p) => p.id === id) ?? -1;
  const passageNumber = passageIndex >= 0 ? passageIndex + 1 : null;

  return (
    <ReadingSessionClient
      passage={{
        id: passage.id,
        title: passage.title,
        content: passage.content,
        subject: passage.subject,
        grade_level: passage.grade_level,
        estimated_duration_minutes: passage.estimated_duration_minutes,
      }}
      sessionsRemaining={sessionsRemaining}
      totalSessions={totalSessions}
      hasSubscription={hasSubscription}
      passageNumber={passageNumber}
      totalPassagesForGrade={totalPassagesForGrade}
    />
  );
}
