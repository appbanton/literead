"use client";

import { useState, useEffect } from "react";
import { policies, type Policy } from "@/lib/policies";

function PolicyModal({
  policy,
  onClose,
}: {
  policy: Policy;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex flex-col w-full sm:max-w-lg sm:rounded-xl overflow-hidden"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.08)",
          maxHeight: "85vh",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-base font-semibold text-white">{policy.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className="overflow-y-auto flex-1 px-6 py-5"
          style={{ fontSize: "13px", lineHeight: "1.6", color: "#999" }}
        >
          {policy.body}
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  const [activePolicy, setActivePolicy] = useState<Policy | null>(null);

  return (
    <>
      <footer
        className="py-6 mt-0"
        style={{
          background: "#1a1a1a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm" style={{ color: "#555" }}>
                © {new Date().getFullYear()} Literead
              </p>
              <span
                style={{
                  fontSize: "18px",
                  color: "#333",
                  lineHeight: 1,
                  margin: "0 10px",
                }}
              >
                ·
              </span>
              {policies.map((policy, index) => (
                <span key={policy.key} className="flex items-center">
                  <button
                    onClick={() => setActivePolicy(policy)}
                    className="text-sm bg-transparent border-0 p-0 cursor-pointer transition-colors duration-200"
                    style={{ color: "#555" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#999")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                  >
                    {policy.title}
                  </button>
                  {index < policies.length - 1 && (
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#333",
                        lineHeight: 1,
                        margin: "0 10px",
                      }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm" style={{ color: "#555" }}>
              Powered by{" "}
              <a
                href="https://appbanton.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "#555" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#999")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                App Banton Studios
              </a>
            </p>
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden flex-col items-center gap-2">
            <p className="text-sm" style={{ color: "#555" }}>
              © {new Date().getFullYear()} Literead
            </p>
            <div className="flex items-center flex-wrap justify-center">
              {policies.map((policy, index) => (
                <span key={policy.key} className="flex items-center">
                  <button
                    onClick={() => setActivePolicy(policy)}
                    className="text-sm bg-transparent border-0 p-0 cursor-pointer"
                    style={{ color: "#555" }}
                  >
                    {policy.title}
                  </button>
                  {index < policies.length - 1 && (
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#333",
                        lineHeight: 1,
                        margin: "0 6px",
                      }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm" style={{ color: "#555" }}>
              Powered by{" "}
              <a
                href="https://appbanton.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#555" }}
              >
                App Banton Studios
              </a>
            </p>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <PolicyModal
          policy={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </>
  );
};

export default Footer;
