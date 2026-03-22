"use client";

import { SignUpButton, useAuth } from "@clerk/nextjs";
import ProductMockup from "@/components/ProductMockup";

const LandingSkeleton = () => (
  <main className="min-h-screen">
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-3">
          <div className="h-8 w-48 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="h-16 w-36 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-36 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-10 w-44 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      {/* Cards — match PassageCard: 20px outer radius, 16px inner, 210px height */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              borderRadius: "20px",
              padding: "5px",
              background: "rgba(0,0,0,0.025)",
              border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                background: "#f3f2f0",
                borderRadius: "16px",
                height: "210px",
                display: "flex",
                flexDirection: "column",
                padding: "16px 16px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    height: "22px",
                    width: "80px",
                    background: "#e8e6e1",
                    borderRadius: "999px",
                  }}
                />
                <div
                  style={{
                    height: "22px",
                    width: "22px",
                    background: "#e8e6e1",
                    borderRadius: "999px",
                  }}
                />
              </div>
              <div
                style={{
                  height: "15px",
                  width: "90%",
                  background: "#e8e6e1",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  height: "15px",
                  width: "60%",
                  background: "#e8e6e1",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "auto",
                  paddingBottom: "12px",
                }}
              >
                <div
                  style={{
                    height: "11px",
                    width: "55px",
                    background: "#e8e6e1",
                    borderRadius: "6px",
                  }}
                />
                <div
                  style={{
                    height: "11px",
                    width: "35px",
                    background: "#e8e6e1",
                    borderRadius: "6px",
                  }}
                />
              </div>
              <div
                style={{
                  height: "36px",
                  background: "#e0ded9",
                  borderRadius: "999px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();

  // Block render until Clerk confirms auth state — prevents flash of landing page
  if (!isLoaded) return null;
  // Signed in — show skeleton while redirecting to /passages
  if (isSignedIn) return <LandingSkeleton />;

  return (
    <>
      <div className="bg-[#F9F8F6] overflow-x-hidden">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <div className="mx-auto px-6 pt-8 pb-4 max-w-6xl">
          <div className="flex items-center gap-16 max-lg:flex-col max-lg:gap-12">
            {/* Left — copy */}
            <div className="flex-1 max-lg:w-full">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border"
                style={{
                  background: "rgba(254,89,51,0.08)",
                  borderColor: "rgba(254,89,51,0.18)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#fe5933" }}
                />
                <span
                  className="font-bold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#fe5933",
                  }}
                >
                  Built on proven reading instruction methods
                </span>
              </div>

              <h1
                className="font-bold mb-6"
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  lineHeight: "1.06",
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                AI reading coach
                <br />
                <span style={{ color: "#fe5933" }}>for kids.</span>
              </h1>

              <p
                className="mb-8 max-w-md"
                style={{ fontSize: "17px", color: "#555", lineHeight: "1.65" }}
              >
                Literead gives struggling readers a patient AI voice coach that
                asks the right questions after every passage, building real
                comprehension.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <SignUpButton mode="modal">
                  <button
                    className="group flex items-center gap-3 text-white font-bold rounded-full active:scale-[0.98]"
                    style={{
                      background: "#2c2c2c",
                      padding: "13px 22px",
                      fontSize: "14px",
                      transition:
                        "background 400ms cubic-bezier(0.32,0.72,0,1)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fe5933")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#2c2c2c")
                    }
                  >
                    Start for free
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 10L10 2M10 2H4M10 2V8"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </SignUpButton>
              </div>

              {/* Trust line */}
              <p
                style={{
                  fontSize: "12px",
                  color: "#999",
                  letterSpacing: "0.06em",
                }}
              >
                Expert-validated · AI-powered
              </p>
            </div>

            {/* Right — product mockup */}
            <ProductMockup />
          </div>
        </div>

        {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
        <div className="mx-auto px-6 py-24 max-w-6xl">
          <p
            className="font-bold mb-3"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fe5933",
            }}
          >
            How it works
          </p>
          <h2
            className="font-bold mb-12"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "-0.025em",
              color: "#1a1a1a",
            }}
          >
            Three steps. Real results.
          </h2>

          <div
            className="grid border rounded-2xl overflow-hidden max-md:grid-cols-1"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              borderColor: "#e8e8e4",
              gap: "1px",
              background: "#e8e8e4",
            }}
          >
            {[
              {
                n: "01",
                title: "Pick a passage",
                body: "Browse a library graded Pre-K through Grade 12, filtered by subject. Every passage is curriculum-aligned.",
              },
              {
                n: "02",
                title: "Read on screen",
                body: "Take your time. When you're ready, check the box. The AI coach wakes up and the voice session begins.",
              },
              {
                n: "03",
                title: "Discuss out loud",
                body: "Your AI coach asks questions, listens to your answers, and coaches you toward deeper understanding — by voice.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="p-8"
                style={{ background: "#F9F8F6" }}
              >
                <span
                  className="block font-bold mb-5"
                  style={{
                    fontSize: "44px",
                    letterSpacing: "-0.04em",
                    lineHeight: "1",
                    color: "#fe5933",
                    opacity: 0.18,
                  }}
                >
                  {step.n}
                </span>
                <h3
                  className="font-bold mb-3"
                  style={{
                    fontSize: "17px",
                    letterSpacing: "-0.01em",
                    color: "#1a1a1a",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#777",
                    lineHeight: "1.65",
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FEATURES BENTO ───────────────────────────────────── */}
        <div className="mx-auto px-6 pb-24 max-w-6xl">
          <p
            className="font-bold mb-3"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fe5933",
            }}
          >
            Why it works
          </p>
          <h2
            className="font-bold mb-12"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              letterSpacing: "-0.025em",
              color: "#1a1a1a",
            }}
          >
            Not a quiz. A conversation.
          </h2>

          <div
            className="grid max-md:grid-cols-1"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "auto auto",
              gap: "10px",
            }}
          >
            <div
              className="rounded-2xl p-8 flex flex-col justify-between max-md:col-span-full"
              style={{
                gridColumn: "1 / 8",
                gridRow: "1",
                background: "#1a1a1a",
                minHeight: "260px",
              }}
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "#fe5933",
                    boxShadow: "0 4px 14px rgba(254,89,51,0.45)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect
                      x="6.5"
                      y="1"
                      width="5"
                      height="10"
                      rx="2.5"
                      fill="white"
                    />
                    <path
                      d="M3 9.5A6 6 0 009 15.5a6 6 0 006-6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="9"
                      y1="15.5"
                      x2="9"
                      y2="17"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{
                    fontSize: "20px",
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  AI voice coaching — not fill-in-the-blank
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    lineHeight: "1.65",
                    maxWidth: "320px",
                  }}
                >
                  Most reading apps test with multiple choice. Literead has a
                  real voice conversation with your child after every passage.
                  The AI listens, follows up, and coaches — like a tutor would.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <span
                  className="font-bold rounded-full px-3 py-1"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#fe5933",
                    background: "rgba(254,89,51,0.12)",
                    border: "1px solid rgba(254,89,51,0.2)",
                  }}
                >
                  Voice AI
                </span>
                <span
                  className="font-bold rounded-full px-3 py-1"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#888",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Socratic method
                </span>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-7 flex flex-col max-md:col-span-full"
              style={{
                gridColumn: "8 / 13",
                gridRow: "1",
                border: "1px solid #e8e8e4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "#F9F8F6", border: "1px solid #e8e8e4" }}
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <rect
                    x="2"
                    y="3"
                    width="14"
                    height="12"
                    rx="2"
                    stroke="#1a1a1a"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M5 7h8M5 10h5"
                    stroke="#1a1a1a"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: "17px",
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                Pre-K to Grade 12 library
              </h3>
              <p
                style={{ fontSize: "13px", color: "#777", lineHeight: "1.65" }}
              >
                Passages across fiction, science, history, and social studies.
                Graded and filtered so every student works at their level.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-7 flex flex-col max-md:col-span-full"
              style={{
                gridColumn: "1 / 6",
                gridRow: "2",
                border: "1px solid #e8e8e4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "#F9F8F6", border: "1px solid #e8e8e4" }}
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <polyline
                    points="2,13 6,8 10,11 16,4"
                    stroke="#fe5933"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: "17px",
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                Progress you can see
              </h3>
              <p
                style={{ fontSize: "13px", color: "#777", lineHeight: "1.65" }}
              >
                Session history, completed passages, reading streaks. Parents
                and students always know where they stand.
              </p>
            </div>

            <div
              className="rounded-2xl p-7 flex flex-col max-md:col-span-full"
              style={{
                gridColumn: "6 / 13",
                gridRow: "2",
                background: "#fe5933",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7"
                    stroke="white"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M6.5 10.5c0-1.5 5-1.5 5 0"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle cx="6.5" cy="7.5" r="1" fill="white" />
                  <circle cx="11.5" cy="7.5" r="1" fill="white" />
                </svg>
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: "17px",
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                Infinitely patient. Never judgmental.
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: "1.65",
                }}
              >
                The AI waits as long as it takes. No rushing. Struggling readers
                practice without fear of embarrassment.
              </p>
            </div>
          </div>
        </div>

        {/* ─── CTA DARK BLOCK ───────────────────────────────────── */}
        <div
          className="-mx-14 max-sm:-mx-2 py-24 px-6 text-center"
          style={{ background: "#1a1a1a" }}
        >
          <p
            className="font-bold mb-5"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fe5933",
            }}
          >
            Get started today
          </p>
          <h2
            className="font-bold mx-auto mb-6"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
              maxWidth: "560px",
            }}
          >
            Reading confidence starts with one conversation.
          </h2>
          <p
            className="mx-auto mb-10"
            style={{
              fontSize: "16px",
              color: "#777",
              lineHeight: "1.65",
              maxWidth: "480px",
            }}
          >
            No teacher required. No special equipment. Just your child, a
            passage, and an AI that knows how to ask the right questions.
          </p>
          <SignUpButton mode="modal">
            <button
              className="inline-flex items-center gap-3 text-white font-bold rounded-full active:scale-[0.98]"
              style={{
                background: "#2c2c2c",
                padding: "15px 28px",
                fontSize: "15px",
                transition: "all 400ms cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fe5933";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2c2c2c";
              }}
            >
              Create a free account
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </SignUpButton>
          <p style={{ fontSize: "12px", color: "#555", marginTop: "16px" }}>
            Plans from $20/month. Cancel anytime.
          </p>
        </div>
      </div>
    </>
  );
}
