import { getReadingPassage } from "@/lib/actions/passage.actions";
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

  // TODO: Get actual subscription data from Clerk metadata or Supabase
  // This will be implemented in Phase 2 (Paywall & Subscriptions)
  // For now using mock data - subscription system doesn't exist yet
  const sessionsRemaining = 12;
  const totalSessions = 20;

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
    />
  );
}
