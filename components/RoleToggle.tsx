"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoleToggleProps {
  onRoleChange: (role: "parent" | "student" | "teacher") => void;
}

const RoleToggle = ({ onRoleChange }: RoleToggleProps) => {
  const [activeRole, setActiveRole] = useState<
    "parent" | "student" | "teacher"
  >("parent");

  const handleRoleClick = (role: "parent" | "student" | "teacher") => {
    setActiveRole(role);
    onRoleChange(role);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => handleRoleClick("parent")}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-colors",
          activeRole === "parent"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
      >
        Parent
      </button>
      <button
        onClick={() => handleRoleClick("student")}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-colors",
          activeRole === "student"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
      >
        Student
      </button>
      <button
        onClick={() => handleRoleClick("teacher")}
        className={cn(
          "px-4 py-2 rounded-lg font-medium transition-colors",
          activeRole === "teacher"
            ? "bg-primary text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
      >
        Teacher
      </button>
    </div>
  );
};

export default RoleToggle;
