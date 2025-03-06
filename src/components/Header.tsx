import { AlertTriangle, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, signOut } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  const goToDocumentationPage = () => {
    navigate("/documentation");
  };

  const goToContactPage = () => {
    navigate("/contact");
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
              onClick={goToLandingPage}
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
                  const offset =
                    section.getBoundingClientRect().top + window.scrollY - 50;
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
                  const offset =
                    section.getBoundingClientRect().top + window.scrollY - 50;
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
              onClick={goToDocumentationPage}
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              } cursor-pointer`}
            >
              Documentation
            </a>
            <a
              onClick={goToContactPage}
              className={`${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-800"
              } cursor-pointer`}
            >
              Contact
            </a>
            <div className="flex items-center gap-4">
              <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                {user?.name}
              </span>
              <button
                onClick={signOut}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-red-700 hover:bg-red-800"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                <LogOut size={18} />
                Sign Out
              </button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;