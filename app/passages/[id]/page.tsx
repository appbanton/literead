import { getReadingPassage } from "@/lib/actions/passage.actions";
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
    />
  );
}
