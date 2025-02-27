import { AlertTriangle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={scrollToTop}
          >
            <AlertTriangle
              size={24}
              className={
                theme === "dark" ? "text-purple-300" : "text-purple-800"
              }
            />
            <h1
              className={`text-xl font-bold ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Crisis Classifier
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("features");
                if (section) {
                  const offset = section.getBoundingClientRect().top + window.scrollY - 50; // add offset if needed
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              }`}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("how-it-works");
                if (section) {
                  const offset = section.getBoundingClientRect().top + window.scrollY - 50; // add offset if needed
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              }`}
            >
              How It Works
            </a>
            <a
              href="/Documentation"
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              }`}
            >
              Documentation
            </a>
            <a
              href="/Contact"
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              }`}
            >
              Contact
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
