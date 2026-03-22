"use client";

import * as React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, text, side = "top" }: TooltipProps) {
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const tipRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const wrap = wrapperRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip) return;

    const show = () => {
      const r = wrap.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      let top = 0,
        left = 0;
      if (side === "bottom") {
        top = r.bottom + 6;
        left = r.left + r.width / 2 - tw / 2;
      } else if (side === "left") {
        top = r.top + r.height / 2 - th / 2;
        left = r.left - tw - 6;
      } else if (side === "right") {
        top = r.top + r.height / 2 - th / 2;
        left = r.right + 6;
      } else {
        top = r.top - th - 6;
        left = r.left + r.width / 2 - tw / 2;
      }
      left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - th - 8));
      tip.style.top = top + "px";
      tip.style.left = left + "px";
      tip.style.visibility = "visible";
    };

    const hide = () => {
      tip.style.visibility = "hidden";
    };

    wrap.addEventListener("mouseenter", show);
    wrap.addEventListener("mouseleave", hide);

    return () => {
      wrap.removeEventListener("mouseenter", show);
      wrap.removeEventListener("mouseleave", hide);
    };
  }, [side]);

  return (
    <>
      <span
        ref={wrapperRef}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {children}
      </span>
      <span
        ref={tipRef}
        role="tooltip"
        style={{
          position: "fixed",
          visibility: "hidden",
          pointerEvents: "none",
          top: 0,
          left: 0,
          zIndex: 9999,
          background: "#1a1a1a",
          color: "#f0f0ee",
          fontSize: "12px",
          fontFamily: "var(--font-bricolage), sans-serif",
          lineHeight: "1.6",
          padding: "8px 12px",
          borderRadius: "8px",
          maxWidth: "240px",
          width: "max-content",
          whiteSpace: "normal",
          textAlign: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          animation: "none",
          transition: "none",
        }}
      >
        {text}
      </span>
    </>
  );
}
