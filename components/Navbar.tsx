"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const logoHref = isLoaded && isSignedIn ? "/passages" : "/";

  return (
    <div className="w-full px-14 max-sm:px-2 pt-5 pb-2">
      <div
        className="mx-auto flex items-center justify-between px-5 py-3"
        style={{ maxWidth: "1400px" }}
      >
        {/* Logo */}
        <Link href={logoHref}>
          <span
            className="font-bold cursor-pointer"
            style={{
              fontSize: "18px",
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
            }}
          >
            Literead
          </span>
        </Link>

        {/* Nav + auth */}
        <div className="flex items-center gap-6">
          <NavItems />
          {isLoaded && (
            <>
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button
                    className="font-semibold rounded-full transition-all duration-300 active:scale-[0.98]"
                    style={{
                      fontSize: "13px",
                      padding: "8px 18px",
                      background: "#2c2c2c",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fe5933")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#2c2c2c")
                    }
                  >
                    Sign In
                  </button>
                </SignInButton>
              )}
              {isSignedIn && <UserButton />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
