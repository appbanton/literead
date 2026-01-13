import {
  getAllReadingPassages,
  getAvailableSubjectsForGrade,
} from "@/lib/actions/passage.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import { getUserProgress } from "@/lib/actions/user.actions";
import { requireOnboarding } from "@/lib/onboarding-check";
import PassageCard from "@/components/PassageCard";
import { getSubjectColor } from "@/lib/utils";
import SubjectFilter from "@/components/SubjectFilter";
import ErrorPage from "@/components/ErrorPage";
import GradeSelector from "@/components/GradeSelector";

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

  // Get available subjects and passages in parallel
  const [availableSubjects, passages, subscription] = await Promise.all([
    getAvailableSubjectsForGrade(userGrade),
    getAllReadingPassages({
      subject,
      grade_level: userGrade,
      limit: 100,
    }),
    getUserSubscription(),
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
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">Sessions: </span>
                <span className="font-bold text-primary">
                  {sessionsRemaining}/{totalSessions}
                </span>
              </div>
            ) : (
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">
                  No active subscription
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filters Row - Left-aligned with normal spacing */}
        <div className="flex gap-4 mb-6 max-sm:flex-col">
          <GradeSelector currentGrade={userGrade} />
          <SubjectFilter availableSubjects={availableSubjects} />
        </div>

        {/* Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map((passage) => (
            <PassageCard
              key={passage.id}
              {...passage}
              color={getSubjectColor(passage.subject || "Fiction")}
            />
          ))}
        </div>

        {/* Empty State */}
        {passages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No passages found for Grade {userGrade}
            </p>
            <p className="text-gray-400">
              {subject
                ? "Try removing the subject filter"
                : "Check back soon for new passages!"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PassagesLibrary;
