"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const logoHref = isLoaded && isSignedIn ? "/passages" : "/";

  return (
    <div className="w-full px-4 pt-5 pb-2">
      <div
        className="mx-auto flex items-center justify-between px-5 py-3"
        style={{ maxWidth: "1100px" }}
      >
        {/* Logo */}
        <Link href={logoHref}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/icons/lightbulb.svg"
              alt="LITEREAD logo"
              width={28}
              height={28}
            />
            <span
              className="font-bold max-sm:hidden"
              style={{
                fontSize: "16px",
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
              }}
            >
              LITEREAD
            </span>
          </div>
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
