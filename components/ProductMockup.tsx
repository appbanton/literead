const ProductMockup = () => {
  return (
    <div className="flex-1 max-lg:w-full flex justify-center items-end">
      {/* Double-bezel outer shell */}
      <div
        className="relative w-full max-w-[480px] p-2 rounded-[2rem] border"
        style={{
          background: "rgba(0,0,0,0.04)",
          borderColor: "rgba(0,0,0,0.07)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.08)",
        }}
      >
        {/* Inner core — faux browser window */}
        <div
          className="bg-white overflow-hidden"
          style={{
            borderRadius: "calc(2rem - 0.5rem)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "#f4f4f2", borderColor: "rgba(0,0,0,0.06)" }}
          >
            <div className="flex gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#ff5f57" }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#febc2e" }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#28c840" }}
              />
            </div>
            <div
              className="flex-1 mx-3 bg-white rounded-md px-3 py-1 border font-mono"
              style={{
                fontSize: "11px",
                color: "#bbb",
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              literead.com/passages/the-red-planet
            </div>
          </div>

          {/* App content */}
          <div className="p-5 bg-white select-none pointer-events-none">
            {/* Passage header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-white font-bold rounded-full px-2.5 py-1"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "#fe5933",
                  }}
                >
                  Grade 4
                </span>
                <span style={{ fontSize: "10px", color: "#bbb" }}>
                  Science · 3 min read
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#ccc" }}>
                Passage 12 of 47
              </span>
            </div>

            {/* Passage title */}
            <h3
              className="font-bold mb-3"
              style={{
                color: "#1a1a1a",
                fontSize: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              The Red Planet
            </h3>

            {/* Passage text */}
            <div className="space-y-1 mb-5">
              {[
                "Mars is the fourth planet from the Sun. It is called",
                "the Red Planet because iron oxide on its surface gives",
                "it a reddish appearance. Mars has two small moons,",
                "Phobos and Deimos. Scientists believe Mars once had",
                "liquid water flowing across its rocky surface.",
              ].map((line, i) => (
                <p
                  key={i}
                  style={{ fontSize: "11px", color: "#555", lineHeight: "1.6" }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t mb-4" style={{ borderColor: "#f0f0ee" }} />

            {/* AI coach panel */}
            <div
              className="rounded-xl p-4 border"
              style={{ background: "#F9F8F6", borderColor: "#e8e8e4" }}
            >
              <div className="flex items-start gap-3 mb-3">
                {/* AI avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#fe5933",
                    boxShadow: "0 2px 8px rgba(254,89,51,0.3)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="2.5" fill="white" />
                    <path
                      d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.4 3.4l.7.7M9.9 9.9l.7.7M9.9 4.1l-.7.7M4.1 9.9l-.7.7"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p
                    className="font-bold mb-1"
                    style={{ fontSize: "10px", color: "#fe5933" }}
                  >
                    AI Reading Coach
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#555",
                      lineHeight: "1.5",
                    }}
                  >
                    Why do you think scientists care so much about whether Mars
                    had water?
                  </p>
                </div>
              </div>

              {/* Mic + waveform */}
              <div
                className="flex items-center gap-3 pt-3 border-t"
                style={{ borderColor: "#e8e8e4" }}
              >
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "#fe5933",
                    boxShadow: "0 4px 14px rgba(254,89,51,0.4)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <rect
                      x="5"
                      y="1"
                      width="4"
                      height="8"
                      rx="2"
                      fill="white"
                    />
                    <path
                      d="M2.5 7.5A4.5 4.5 0 007 12a4.5 4.5 0 004.5-4.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7"
                      y1="12"
                      x2="7"
                      y2="13.5"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Waveform bars */}
                <div className="flex items-center gap-[3px] h-6 flex-1">
                  {[3, 5, 8, 6, 10, 7, 4, 9, 6, 5, 8, 4, 7, 5, 3].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="w-[2px] rounded-full"
                        style={{
                          height: `${h * 2}px`,
                          background: "rgba(254,89,51,0.28)",
                        }}
                      />
                    ),
                  )}
                </div>

                <span style={{ fontSize: "10px", color: "#bbb" }}>
                  Tap to answer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMockup;
