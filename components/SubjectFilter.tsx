"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SubjectFilterProps {
  availableSubjects: string[];
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectFilter = ({
  availableSubjects,
  selectedSubject,
  onSubjectChange,
}: SubjectFilterProps) => {
  return (
    <div className="relative">
      <Select onValueChange={onSubjectChange} value={selectedSubject}>
        <SelectTrigger className="w-48 h-10 border-2 border-black rounded-lg bg-white hover:bg-gray-50 cursor-pointer capitalize">
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
    </div>
  );
};

export default SubjectFilter;
