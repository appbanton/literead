const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-6 mt-16">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center max-sm:flex-col max-sm:gap-2">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Literead
        </p>
        <p className="text-sm text-gray-600">
          Powered by{" "}
          <a
            href="https://appbanton.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Banton Studios
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
