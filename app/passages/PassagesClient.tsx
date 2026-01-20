"use client";

import { useState } from "react";
import PassageCard from "@/components/PassageCard";
import SubjectFilter from "@/components/SubjectFilter";
import GradeSelector from "@/components/GradeSelector";
import { getSubjectColor } from "@/lib/utils";

interface PassagesClientProps {
  allPassages: ReadingPassage[];
  availableSubjects: string[];
  userGrade: string;
  completedPassageIds: string[]; // NEW
}

export default function PassagesClient({
  allPassages,
  availableSubjects,
  userGrade,
  completedPassageIds, // NEW
}: PassagesClientProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Convert completed IDs to Set for O(1) lookup
  const completedSet = new Set(completedPassageIds);

  // CLIENT-SIDE FILTERING - INSTANT <100ms
  const filteredPassages =
    selectedSubject === "all"
      ? allPassages
      : allPassages.filter((passage) => passage.subject === selectedSubject);

  return (
    <>
      {/* Filters Row - EXACT SAME UI */}
      <div className="flex gap-4 mb-6 max-sm:flex-col">
        <GradeSelector currentGrade={userGrade} />
        <SubjectFilter
          availableSubjects={availableSubjects}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
      </div>

      {/* Passages Grid - EXACT SAME UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPassages.map((passage) => (
          <PassageCard
            key={passage.id}
            {...passage}
            color={getSubjectColor(passage.subject || "Fiction")}
            isCompleted={completedSet.has(passage.id)}
          />
        ))}
      </div>

      {/* Empty State - EXACT SAME UI */}
      {filteredPassages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            No passages found for Grade {userGrade}
          </p>
          <p className="text-gray-400">
            {selectedSubject !== "all"
              ? "Try removing the subject filter"
              : "Check back soon for new passages!"}
          </p>
        </div>
      )}
    </>
  );
}
