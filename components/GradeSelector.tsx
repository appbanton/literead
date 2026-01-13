"use client";

import { useState, useTransition } from "react";
import { updateUserGrade } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GRADES = [
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

interface GradeSelectorProps {
  currentGrade: string;
}

export default function GradeSelector({ currentGrade }: GradeSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGradeChange = async (newGrade: string) => {
    startTransition(async () => {
      const success = await updateUserGrade(newGrade);
      if (success) {
        router.refresh();
      } else {
        alert("Failed to update grade. Please try again.");
      }
    });
  };

  return (
    <div className="relative">
      <Select
        value={currentGrade}
        onValueChange={handleGradeChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-40 h-10 border-2 border-black rounded-lg bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          <SelectValue placeholder="Select grade" />
        </SelectTrigger>
        <SelectContent>
          {GRADES.map((grade) => (
            <SelectItem key={grade} value={grade} className="cursor-pointer">
              Grade {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
