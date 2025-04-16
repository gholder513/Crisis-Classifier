import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Mail, User, Github } from "lucide-react";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToLandingPage = () => {
    navigate("/");
  };
  const goToDocumentationPage = () => {
    navigate("/documentation");
  };

  const goToAboutPage = () => {
    navigate("/about");
  };

  const teamMembers = [
    {
      name: "Gabriel Holder",
      email: "gholder513@vt.edu",
      github: "gholder513",
      role: "Full Stack Developer",
    },
    {
      name: "Anav Srinivas",
      email: "anavs08@vt.edu",
      github: "anavs08",
      role: "Machine Learning Engineer",
    },
    {
      name: "Nekunj Sanghi",
      email: "nekunjs@vt.edu",
      github: "Nekunj123",
      role: "Full Stack Developer",
    },
    {
      name: "Menase Yirdaw",
      email: "menasey@vt.edu",
      github: "menasey",
      role: "Backend Developer",
    },
    {
      name: "Prabhath Jonnavithula​",
      email: "prabhathj@vt.edu",
      github: "prabhath03",
      role: "Team Manager",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-purple-900 text-white"
          : "bg-gradient-to-br from-purple-100 to-yellow-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={goToLandingPage}
              className={`flex items-center gap-1 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-600 hover:text-purple-800"
              }`}
            >
              <ArrowLeft size={18} />
              <span>Home</span>
            </button>
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
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={goToDocumentationPage}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                Documentation
              </button>
              <button
                onClick={goToAboutPage}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                About
              </button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl md:text-6xl font-extrabold ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            } mb-6`}
          >
            Contact Us
          </h1>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            } max-w-3xl mx-auto`}
          >
            Crisis Classifier was developed by Virginia Tech Computer Science
            students as part of their coursework.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
              } p-6 rounded-lg shadow-md border border-gray-200 transition-transform hover:scale-105`}
            >
              <div
                className={`w-16 h-16 ${
                  theme === "dark" ? "bg-purple-900" : "bg-purple-100"
                } rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <User
                  size={32}
                  className={
                    theme === "dark" ? "text-purple-300" : "text-purple-800"
                  }
                />
              </div>
              <h3
                className={`text-xl font-bold text-center mb-2 ${
                  theme === "dark" ? "text-purple-300" : "text-purple-900"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-center mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {member.role}
              </p>
              <div className="flex flex-col space-y-3">
                <a
                  href={`mailto:${member.email}`}
                  className={`flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <Mail size={16} />
                  <span>{member.email}</span>
                </a>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  <Github size={16} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 p-8 ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
          } rounded-lg shadow-md border border-gray-200`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            }`}
          >
            About the Project
          </h2>
          <p
            className={`mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            The Crisis Classifier was developed as a capstone project by
            Virginia Tech Computer Science students. The project aims to
            leverage machine learning techniques to automatically identify
            crisis events from news articles and online content.
          </p>
          <p
            className={`mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Using a one-class classification approach, the system is trained on
            examples of crisis events and can then determine whether new
            articles describe similar crisis situations. This tool can be
            valuable for emergency responders, journalists, researchers, and
            anyone who needs to monitor crisis events efficiently.
          </p>
          <div className="mt-8 flex justify-center">
            <img
              src="https://brand.vt.edu/content/brand_vt_edu/en/licensing/university-trademarks/jcr:content/content/adaptiveimage.transform/xl-medium/image.jpg"
              alt="Virginia Tech Logo"
              className="h-16"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
