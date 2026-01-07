"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const NavItems = () => {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();

  // Don't render until auth is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  // Signed out users see: Pricing
  const signedOutItems = [{ label: "Pricing", href: "/pricing" }];

  // Signed in users see: Reading Library, My Journey
  const signedInItems = [
    { label: "Reading Library", href: "/passages" },
    { label: "My Journey", href: "/my-journey" },
  ];

  const navItems = isSignedIn ? signedInItems : signedOutItems;

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            key={label}
            className={cn(
              !isActive && "hover:underline transition-all", // Only underline if NOT active
              isActive && "text-primary font-semibold"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
