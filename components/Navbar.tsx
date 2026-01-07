"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Determine where logo should link based on auth state
  const logoHref = isLoaded && isSignedIn ? "/passages" : "/";

  return (
    <nav className="navbar">
      <Link href={logoHref}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/icons/lightbulb.svg"
            alt="LITEREAD logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-2xl max-sm:hidden">LITEREAD</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        {isLoaded && (
          <>
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="btn-signin hover:bg-primary hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
            {isSignedIn && <UserButton />}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
