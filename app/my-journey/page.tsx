import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCompletedPassages } from "@/lib/actions/completed.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import { getUserProgress } from "@/lib/actions/user.actions";
import Image from "next/image";
import TranscriptViewer from "@/components/TranscriptViewer";

const MyJourney = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch all data in parallel (transcripts now included in completedPassages)
  const [completedPassages, subscription, userProgress] = await Promise.all([
    getCompletedPassages(),
    getUserSubscription(),
    getUserProgress(),
  ]);

  // Get stats
  const lessonsCompleted = completedPassages.length;
  const readingStreak = userProgress?.reading_streak || 0;
  const totalReadingMinutes = userProgress?.total_reading_minutes || 0;

  // Get subscription info
  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;
  const planTier = subscription?.plan_tier || "free";
  const resetDate = subscription?.reset_date;

  return (
    <main className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Profile Header */}
      <section className="flex justify-between items-start mb-8 max-sm:flex-col max-sm:gap-6">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName || "User"}
            width={110}
            height={110}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-600">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-3 gap-4 mb-8 max-sm:grid-cols-1">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-4xl">📚</span>
            <p className="text-3xl font-bold">{lessonsCompleted}</p>
          </div>
          <p className="text-gray-600">Lessons Completed</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-4xl">🔥</span>
            <p className="text-3xl font-bold">{readingStreak}</p>
          </div>
          <p className="text-gray-600">Day Reading Streak</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-4xl">⏱️</span>
            <p className="text-3xl font-bold">{totalReadingMinutes}</p>
          </div>
          <p className="text-gray-600">Total Reading Minutes</p>
        </div>
      </section>

      {/* Subscription Card */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start max-sm:flex-col max-sm:gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {planTier.charAt(0).toUpperCase() + planTier.slice(1)} Plan
              </h2>
              <p className="text-white/90">
                {sessionsRemaining} of {totalSessions} sessions remaining
              </p>
              {resetDate && (
                <p className="text-sm text-white/75 mt-1">
                  Resets: {new Date(resetDate).toLocaleDateString()}
                </p>
              )}
              <p className="text-sm text-white/90 mt-3">
                To change your plan, email us at support@literead.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Passages & Transcripts */}
      <Accordion type="multiple" defaultValue={["completed"]}>
        <AccordionItem value="completed">
          <AccordionTrigger className="text-2xl font-bold">
            ✅ Completed Passages ({lessonsCompleted})
          </AccordionTrigger>
          <AccordionContent>
            {completedPassages.length > 0 ? (
              <div className="space-y-4">
                {completedPassages.map((passage) => (
                  <div
                    key={passage.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            ✓ Complete
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {passage.subject || "General"}
                          </span>
                          <span className="text-sm text-gray-600">
                            Grade: {passage.grade_level}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {passage.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Completed:{" "}
                          {new Date(passage.completed_at).toLocaleDateString()}
                        </p>

                        {/* TRANSCRIPT VIEWER */}
                        {(() => {
                          console.log(`🔍 Passage: ${passage.title}`);
                          console.log(
                            `   - has transcript?`,
                            !!passage.transcript
                          );
                          console.log(
                            `   - transcript data:`,
                            passage.transcript
                          );

                          if (
                            passage.transcript?.transcript &&
                            Array.isArray(passage.transcript.transcript) &&
                            passage.transcript.transcript.length > 0
                          ) {
                            return (
                              <TranscriptViewer
                                passageTitle={passage.title}
                                transcript={passage.transcript.transcript}
                                durationSeconds={
                                  passage.transcript.duration_seconds
                                }
                                createdAt={passage.transcript.created_at}
                              />
                            );
                          } else {
                            return (
                              <p className="text-sm text-gray-500 italic">
                                No discussion transcript available
                              </p>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl mb-2">No completed passages yet</p>
                <p className="text-sm">
                  Complete your first reading discussion to see it here!
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default MyJourney;
