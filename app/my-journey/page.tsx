import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCompletedPassages } from "@/lib/actions/completed.actions";
import { getUserSubscription } from "@/lib/actions/subscription.actions";
import { getUserProgress } from "@/lib/actions/user.actions";
import Image from "next/image";
import TranscriptViewer from "@/components/TranscriptViewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SUBJECT_STYLES: Record<string, { bg: string; text: string }> = {
  science: { bg: "#A8D5B5", text: "#1a4a2e" },
  maths: { bg: "#A8C5DA", text: "#1a3d52" },
  language: { bg: "#B5D5C5", text: "#1a3d2b" },
  economics: { bg: "#D4B8E0", text: "#4a1d6b" },
  history: { bg: "#F2C4CE", text: "#7a1a2e" },
  literature: { bg: "#C5D8A4", text: "#2d4a1a" },
  "social studies": { bg: "#F2D7B6", text: "#7a4010" },
  coding: { bg: "#B8C9E8", text: "#1a2d5a" },
  fiction: { bg: "#E8C5A0", text: "#6b3a1f" },
  geography: { bg: "#B5D5C5", text: "#1a3d2b" },
  biology: { bg: "#A8D5B5", text: "#1a4a2e" },
  physics: { bg: "#A8C5DA", text: "#1a3d52" },
  chemistry: { bg: "#D4B8E0", text: "#4a1d6b" },
};
const FALLBACK_STYLE = { bg: "#e8e6e1", text: "#555" };
const getSubjectStyle = (subject: string | null) =>
  SUBJECT_STYLES[subject?.toLowerCase() ?? ""] ?? FALLBACK_STYLE;

const MyJourney = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const [completedPassages, subscription, userProgress] = await Promise.all([
    getCompletedPassages(),
    getUserSubscription(),
    getUserProgress(),
  ]);

  const lessonsCompleted = completedPassages.length;
  const readingStreak = userProgress?.reading_streak || 0;
  const totalReadingMinutes = userProgress?.total_reading_minutes || 0;
  const sessionsRemaining = subscription?.sessions_remaining || 0;
  const totalSessions = subscription?.total_sessions || 0;
  const planTier = subscription?.plan_tier || "free";
  const resetDate = subscription?.reset_date;

  return (
    <main>
      <div className="min-h-screen" style={{ background: "#F9F8F6" }}>
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Profile header */}
          <section className="flex items-center gap-4 mb-8">
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{
                width: "60px",
                height: "60px",
                border: "1px solid #e8e8e4",
              }}
            >
              <Image
                src={user.imageUrl}
                alt={user.firstName || "User"}
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>
              <h1
                className="font-bold"
                style={{
                  fontSize: "20px",
                  letterSpacing: "-0.02em",
                  color: "#1a1a1a",
                  marginBottom: "2px",
                }}
              >
                {user.firstName} {user.lastName}
              </h1>
              <p style={{ fontSize: "12px", color: "#aaa" }}>
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-3 gap-3 mb-5 max-sm:grid-cols-1">
            <div
              className="rounded-2xl"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "18px 20px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-3"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#F9F8F6",
                  border: "1px solid #e8e8e4",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <p
                className="font-bold"
                style={{
                  fontSize: "28px",
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                  marginBottom: "4px",
                }}
              >
                {lessonsCompleted}
              </p>
              <p
                className="font-semibold uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "#aaa",
                }}
              >
                Passages completed
              </p>
            </div>

            <div
              className="rounded-2xl"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "18px 20px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-3"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#F9F8F6",
                  border: "1px solid #e8e8e4",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fe5933"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <p
                className="font-bold"
                style={{
                  fontSize: "28px",
                  letterSpacing: "-0.03em",
                  color: "#fe5933",
                  marginBottom: "4px",
                }}
              >
                {readingStreak}
              </p>
              <p
                className="font-semibold uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "#aaa",
                }}
              >
                Day streak
              </p>
            </div>

            <div
              className="rounded-2xl"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "18px 20px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-3"
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#F9F8F6",
                  border: "1px solid #e8e8e4",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p
                className="font-bold"
                style={{
                  fontSize: "28px",
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                  marginBottom: "4px",
                }}
              >
                {totalReadingMinutes}
              </p>
              <p
                className="font-semibold uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  color: "#aaa",
                }}
              >
                Minutes read
              </p>
            </div>
          </section>

          {/* Plan card */}
          <section className="mb-5">
            <div
              className="rounded-2xl flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4"
              style={{
                background: "white",
                border: "1px solid #e8e8e4",
                padding: "20px 24px",
              }}
            >
              <div>
                <p
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "#aaa",
                    marginBottom: "4px",
                  }}
                >
                  Current plan
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "18px",
                    letterSpacing: "-0.02em",
                    color: "#1a1a1a",
                    marginBottom: "4px",
                  }}
                >
                  {planTier.charAt(0).toUpperCase() + planTier.slice(1)}
                </p>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  {resetDate &&
                    `Resets ${new Date(resetDate).toLocaleDateString()} · `}
                  Email support@literead.com to upgrade
                </p>
              </div>
              <div className="text-right max-sm:text-left">
                <p
                  className="font-bold"
                  style={{
                    fontSize: "32px",
                    letterSpacing: "-0.03em",
                    color: "#fe5933",
                    lineHeight: 1,
                    marginBottom: "2px",
                  }}
                >
                  {sessionsRemaining}
                  <span
                    style={{ fontSize: "14px", color: "#bbb", fontWeight: 400 }}
                  >
                    /{totalSessions}
                  </span>
                </p>
                <p
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "#aaa",
                  }}
                >
                  Sessions remaining
                </p>
              </div>
            </div>
          </section>

          {/* Completed passages */}
          <section>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "white", border: "1px solid #e8e8e4" }}
            >
              <Accordion type="single" collapsible defaultValue="completed">
                <AccordionItem value="completed" style={{ border: "none" }}>
                  <AccordionTrigger
                    className="px-6 hover:no-underline"
                    style={{ paddingTop: "18px", paddingBottom: "18px" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-bold"
                        style={{
                          fontSize: "14px",
                          color: "#1a1a1a",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Completed Passages
                      </span>
                      <span
                        className="font-bold rounded-full"
                        style={{
                          fontSize: "10px",
                          padding: "2px 8px",
                          color: "#fe5933",
                          background: "rgba(254,89,51,0.08)",
                          border: "1px solid rgba(254,89,51,0.15)",
                        }}
                      >
                        {lessonsCompleted}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="flex flex-col gap-3"
                      style={{ padding: "0 16px 16px" }}
                    >
                      {completedPassages.length === 0 ? (
                        <div className="text-center py-12">
                          <p style={{ fontSize: "14px", color: "#aaa" }}>
                            No completed passages yet
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#ccc",
                              marginTop: "4px",
                            }}
                          >
                            Complete your first reading discussion to see it
                            here
                          </p>
                        </div>
                      ) : (
                        completedPassages.map((passage) => {
                          const style = getSubjectStyle(passage.subject);
                          const hasTranscript =
                            passage.transcript?.transcript &&
                            Array.isArray(passage.transcript.transcript) &&
                            passage.transcript.transcript.length > 0;

                          return (
                            <div
                              key={passage.id}
                              className="rounded-xl"
                              style={{
                                border: "1px solid #e8e8e4",
                                padding: "14px 16px",
                              }}
                            >
                              <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
                                <div className="flex flex-col gap-2 flex-1 min-w-0">
                                  <p
                                    className="font-bold truncate"
                                    style={{
                                      fontSize: "13px",
                                      color: "#1a1a1a",
                                    }}
                                  >
                                    {passage.title}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                      className="rounded-full font-bold uppercase"
                                      style={{
                                        fontSize: "10px",
                                        letterSpacing: "0.06em",
                                        padding: "3px 8px",
                                        background: style.bg,
                                        color: style.text,
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {passage.subject || "Reading"}
                                    </span>
                                    <span
                                      className="rounded-full font-bold"
                                      style={{
                                        fontSize: "10px",
                                        padding: "3px 8px",
                                        background: "rgba(45,74,26,0.08)",
                                        color: "#2d4a1a",
                                        border: "1px solid rgba(45,74,26,0.15)",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      ✓ Done
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        color: "#aaa",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {new Date(
                                        passage.completed_at,
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                </div>

                                {hasTranscript ? (
                                  <TranscriptViewer
                                    passageTitle={passage.title}
                                    transcript={passage.transcript!.transcript}
                                    durationSeconds={
                                      passage.transcript!.duration_seconds
                                    }
                                    createdAt={passage.transcript!.created_at}
                                  />
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      color: "#ccc",
                                      whiteSpace: "nowrap",
                                      flexShrink: 0,
                                    }}
                                  >
                                    No transcript
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MyJourney;
