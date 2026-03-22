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
  await requireOnboarding();

  const filters = await searchParams;
  const subject = filters.subject ? (filters.subject as string) : "";

  const userProgress = await getUserProgress();

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

  const [availableSubjects, passages, subscription, completedPassageIds] =
    await Promise.all([
      getAvailableSubjectsForGrade(userGrade),
      getAllReadingPassages({ subject, grade_level: userGrade, limit: 100 }),
      getUserSubscription(),
      getCompletedPassageIds(),
    ]);

  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;

  return (
    <main>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 max-sm:flex-col max-sm:gap-4">
          <div className="flex flex-col gap-2">
            <h1
              className="font-bold"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2rem)",
                letterSpacing: "-0.025em",
                color: "#1a1a1a",
              }}
            >
              Grade {userGrade} Passages
            </h1>
            <p style={{ fontSize: "14px", color: "#888" }}>
              Pick a passage that interests you and practice your comprehension
            </p>
          </div>

          {/* Session counter */}
          <div className="max-sm:w-full flex-shrink-0">
            {subscription ? (
              <div
                className="rounded-2xl"
                style={{
                  padding: "12px 20px",
                  background: "white",
                  border: "1px solid #e8e8e4",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#aaa",
                    marginBottom: "2px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Sessions remaining
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "22px",
                    color: "#fe5933",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {sessionsRemaining}
                  <span
                    style={{ fontSize: "14px", color: "#bbb", fontWeight: 400 }}
                  >
                    /{totalSessions}
                  </span>
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl"
                style={{
                  padding: "12px 20px",
                  background: "white",
                  border: "1px solid #e8e8e4",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#aaa",
                    marginBottom: "2px",
                  }}
                >
                  No active plan
                </p>
                <p
                  className="font-semibold"
                  style={{ fontSize: "14px", color: "#1a1a1a" }}
                >
                  Subscribe to start
                </p>
              </div>
            )}
          </div>
        </div>

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
