"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

interface SubjectFilterProps {
  availableSubjects: string[];
}

const SubjectFilter = ({ availableSubjects }: SubjectFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";
  const [isPending, startTransition] = useTransition();

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    startTransition(() => {
      let newUrl = "";
      if (subject === "all" || !subject) {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });
      }
      router.push(newUrl, { scroll: false });
    });
  }, [subject, router, searchParams]);

  return (
    <div className="relative">
      <Select
        onValueChange={setSubject}
        value={subject || "all"}
        disabled={isPending}
      >
        <SelectTrigger className="w-48 h-10 border-2 border-black rounded-lg bg-white hover:bg-gray-50 cursor-pointer capitalize disabled:opacity-50 disabled:cursor-not-allowed">
          <SelectValue placeholder="All Subjects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer">
            All subjects
          </SelectItem>
          {availableSubjects.length > 0 ? (
            availableSubjects.map((subj) => (
              <SelectItem
                key={subj}
                value={subj}
                className="capitalize cursor-pointer"
              >
                {subj}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No subjects available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default SubjectFilter;
