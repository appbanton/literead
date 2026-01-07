"use client";

import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import RoleToggle from "@/components/RoleToggle";
import ThreeStepDiagram from "@/components/ThreeStepDiagram";

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState<
    "parent" | "student" | "teacher"
  >("parent");

  const subheadings = {
    parent:
      "AI-powered comprehension practice that meets your child right where they are—personalized, patient, and always available.",
    student:
      "Your AI reading coach helps you understand every story—so you never feel lost.",
    teacher:
      "Let AI handle comprehension coaching while you focus on teaching.",
  };

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - Above Fold */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Role Toggle */}
          <RoleToggle onRoleChange={setActiveRole} />

          {/* Heading */}
          <h1 className="text-5xl font-bold mb-6 max-sm:text-4xl mt-4">
            Understand What You Read
          </h1>

          {/* Dynamic Subheading */}
          <p className="text-xl text-gray-700 mb-8 max-w-2xl max-sm:text-lg">
            {subheadings[activeRole]}
          </p>

          {/* CTA Button - Environment variables handle redirect */}
          <SignUpButton mode="modal">
            <button className="btn-primary px-12 py-4 text-lg font-semibold">
              Let's Get Started
            </button>
          </SignUpButton>

          {/* Trust Statement */}
          <p className="text-sm text-gray-600 mt-4">
            Expert validated. AI implemented.
          </p>

          {/* Three-Step Visual */}
          <ThreeStepDiagram />
        </div>
      </section>

      {/* HOW IT WORKS - 3 Steps */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl mb-4">1️⃣</div>
            <h3 className="font-bold text-xl mb-3">
              Pick a passage at your level
            </h3>
            <p className="text-gray-700">
              Browse our library of reading passages tailored to your grade—from
              Pre-K through 12th grade.
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4">2️⃣</div>
            <h3 className="font-bold text-xl mb-3">Read it on screen</h3>
            <p className="text-gray-700">
              Take your time reading the passage. When you're ready, check the
              box to start discussing.
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4">3️⃣</div>
            <h3 className="font-bold text-xl mb-3">
              Discuss with your AI coach
            </h3>
            <p className="text-gray-700">
              Talk with your AI reading coach through voice to explore ideas and
              deepen your understanding.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-bold text-xl mb-3">
                Limitless Reading Passages
              </h3>
              <p className="text-gray-700">
                Curated passages for grades Pre-K to 12, covering fiction,
                science, history, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-bold text-xl mb-3">AI Voice Coach</h3>
              <p className="text-gray-700">
                Patient, personalized comprehension coaching through natural
                voice conversations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="font-bold text-xl mb-3">Progress Tracking</h3>
              <p className="text-gray-700">
                See your growth over time with session history and comprehension
                insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Families & Educators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Testimonial Placeholder 1 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 italic mb-4">
              "My son went from struggling with comprehension to confidently
              discussing what he reads. The AI coach is like having a patient
              tutor available 24/7."
            </p>
            <p className="font-bold">— Parent of 3rd grader</p>
          </div>

          {/* Testimonial Placeholder 2 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 italic mb-4">
              "This frees me up to focus on lesson planning while my students
              get individualized comprehension practice. Game changer for my
              classroom."
            </p>
            <p className="font-bold">— 5th Grade Teacher</p>
          </div>
        </div>

        {/* Usage Stats Placeholder */}
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            500+ sessions completed
          </p>
          <p className="text-gray-600">
            Join families improving reading comprehension daily
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to understand what you read?
          </h2>
          <SignUpButton mode="modal">
            <button className="btn-primary px-12 py-4 text-lg font-semibold">
              Let's Get Started
            </button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
