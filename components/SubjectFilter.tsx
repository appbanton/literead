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
        <SelectTrigger
          className="w-48 h-10 bg-white rounded-xl cursor-pointer capitalize"
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}
        >
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
