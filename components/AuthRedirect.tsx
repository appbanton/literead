"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

export default function AuthRedirect() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run after auth is loaded
    if (!isLoaded) return;

    // If user just signed in and is on landing page or pricing, redirect to passages
    if (userId && (pathname === "/" || pathname === "/pricing")) {
      router.push("/passages");
    }
  }, [userId, isLoaded, pathname, router]);

  return null; // This component doesn't render anything
}
