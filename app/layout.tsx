import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthRedirect from "@/components/AuthRedirect";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LITEREAD - Understand What You Read",
  description: "AI-powered reading comprehension practice for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${bricolage.variable} antialiased h-full flex flex-col`}
      >
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
          <AuthRedirect />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
