"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const NavItem = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative transition-colors duration-200"
      style={{
        fontSize: "13px",
        fontWeight: isActive ? 600 : 400,
        color: hovered || isActive ? "#1a1a1a" : "#777",
        padding: "6px 12px",
        background: isActive ? "rgba(0,0,0,0.05)" : "transparent",
        borderRadius: "8px",
        textDecoration: "none",
        display: "inline-block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Orange underline — only on hover, not when active (active uses the bg pill) */}
      {!isActive && (
        <span
          className="absolute left-3 right-3 rounded-full transition-all duration-200"
          style={{
            height: "2px",
            background: "#fe5933",
            bottom: "2px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
            transformOrigin: "left",
          }}
        />
      )}
    </Link>
  );
};

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
      {navItems.map(({ label, href }) => (
        <NavItem
          key={label}
          label={label}
          href={href}
          isActive={pathname === href}
        />
      ))}
    </nav>
  );
};

export default NavItems;
