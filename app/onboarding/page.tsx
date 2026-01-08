"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserProgress } from "@/lib/actions/user.actions";

const GRADE_OPTIONS = [
  "Pre-K",
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGrade) {
      setError("Please select a grade level");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const success = await createUserProgress(selectedGrade);

      if (success) {
        router.push("/passages");
      } else {
        setError("Failed to save your grade. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Onboarding error:", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Welcome to LITEREAD! 🎉
          </h1>
          <p className="text-gray-600">
            Let's personalize your reading experience
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grade Selection */}
          <div>
            <label
              htmlFor="grade"
              className="block text-lg font-semibold text-gray-700 mb-3"
            >
              What grade are you in?
            </label>
            <select
              id="grade"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="">Select your grade...</option>
              {GRADE_OPTIONS.map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedGrade}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
              isSubmitting || !selectedGrade
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Setting up your profile..." : "Get Started"}
          </button>
        </form>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't worry, you can change this later!
        </p>
      </div>
    </div>
  );
}
