import {
  getAllReadingPassages,
  getAvailableSubjectsForGrade,
} from "@/lib/actions/passage.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import { getUserProgress } from "@/lib/actions/user.actions";
import { getCompletedPassageIds } from "@/lib/actions/completed.actions";
import { requireOnboarding } from "@/lib/onboarding-check";
import ErrorPage from "@/components/ErrorPage";
import PassagesClient from "./PassagesClient";

const PassagesLibrary = async ({ searchParams }: SearchParams) => {
  // Check if user has completed onboarding
  await requireOnboarding();

  const filters = await searchParams;
  const subject = filters.subject ? (filters.subject as string) : "";

  // Get user's grade level from user_progress
  const userProgress = await getUserProgress();

  // If no user progress, show error page
  if (!userProgress) {
    return (
      <ErrorPage
        title="Profile Setup Required"
        message="We couldn't load your profile. Please complete your setup."
        action={{ label: "Complete Setup", href: "/onboarding" }}
      />
    );
  }

  const userGrade = userProgress.current_grade_level || "K";

  // Get available subjects, passages, subscription, and completed passages in parallel
  const [availableSubjects, passages, subscription, completedPassageIds] =
    await Promise.all([
      getAvailableSubjectsForGrade(userGrade),
      getAllReadingPassages({
        subject,
        grade_level: userGrade,
        limit: 100,
      }),
      getUserSubscription(),
      getCompletedPassageIds(),
    ]);

  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 max-sm:flex-col max-sm:gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Grade {userGrade} Passages</h1>
            <p className="text-gray-600">
              Pick a passage that interests you and practice your comprehension
            </p>
          </div>

          {/* Session Counter */}
          <div className="max-sm:w-full">
            {subscription ? (
              <div className="px-6 py-3 bg-white border-2 border-primary rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Sessions Remaining</p>
                <p className="text-2xl font-bold text-primary">
                  {sessionsRemaining}/{totalSessions}
                </p>
              </div>
            ) : (
              <div className="px-6 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">No Active Plan</p>
                <p className="text-lg font-semibold text-gray-700">
                  Subscribe to start
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Passages Client Component - handles filtering and display */}
        <PassagesClient
          allPassages={passages}
          availableSubjects={availableSubjects}
          userGrade={userGrade}
          completedPassageIds={completedPassageIds}
        />
      </div>
    </main>
  );
};

export default PassagesLibrary;
