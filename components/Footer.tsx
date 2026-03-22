"use client";

const Footer = () => {
  return (
    <footer
      className="py-6 mt-0"
      style={{
        background: "#1a1a1a",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center max-sm:flex-col max-sm:gap-2">
        <p className="text-sm" style={{ color: "#555" }}>
          © {new Date().getFullYear()} Literead
        </p>
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
    </footer>
  );
};

export default Footer;
