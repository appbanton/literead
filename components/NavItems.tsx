"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const NavItems = () => {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  const signedOutItems = [{ label: "Pricing", href: "/pricing" }];
  const signedInItems = [
    { label: "Reading Library", href: "/passages" },
    { label: "My Journey", href: "/my-journey" },
  ];

  const navItems = isSignedIn ? signedInItems : signedOutItems;

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            key={label}
            className="transition-all duration-200 rounded-lg"
            style={{
              fontSize: "13px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#1a1a1a" : "#777",
              padding: "6px 12px",
              background: isActive ? "rgba(0,0,0,0.05)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = "#777";
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
