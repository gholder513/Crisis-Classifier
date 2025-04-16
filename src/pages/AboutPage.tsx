import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Globe, Cog, BadgeHelp, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const AboutPage: React.FC = () => {
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
  const goToContactPage = () => {
    navigate("/contact");
  };

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
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-purple-300" : "text-purple-900"
                }`}
              >
                Crisis Classifier
              </h1>
            </div>
            <div className="flex items-center space-x-4">
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
                onClick={goToContactPage}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-800"
                }`}
              >
                Contact
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1
            className={`text-5xl md:text-6xl font-extrabold ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            } mb-6`}
          >
            About The System
          </h1>
        </div>

        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <BadgeHelp
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              What It Does
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Our classifier is built using advanced one-class classification
              methods that focus exclusively on the patterns and features
              typical of crisis events. By inputting a website URL, our system
              examines its content and assesses whether it aligns with the
              crisis profile. This streamlined process helps emergency response
              teams, media outlets, researchers, and concerned citizens pinpoint
              critical situations in real time.
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <Cog
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              How It Works
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              <span className="font-semibold">Data-Driven Insights:</span> Our
              algorithm has been trained on a carefully curated dataset of
              verified crisis event information. It learns the unique
              characteristics of these events, enabling it to distinguish them
              from non-crisis content. Seamless URL Analysis: Simply submit any
              website URL, and our tool will analyze the content behind the
              scenes. Within moments, you receive a clear
              classification—indicating whether the site is associated with a
              crisis. Real-Time Monitoring: By automating the detection of
              crisis events, our tool aids in the rapid dissemination of
              important information during emergencies, helping stakeholders
              make informed decisions quickly.
            </p>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md border border-gray-200`}
          >
            <div
              className={`w-12 h-12 ${
                theme === "dark" ? "bg-purple-900" : "bg-purple-100"
              } rounded-full flex items-center justify-center mb-4`}
            >
              <Globe
                size={24}
                className={
                  theme === "dark" ? "text-purple-300" : "text-purple-800"
                }
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Real World Application
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              In today's fast-paced digital landscape, timely access to accurate
              information is crucial. Our mission is to empower users with a
              reliable, automated system that enhances situational awareness and
              supports swift action during critical events. Whether you are
              managing a crisis response, conducting research, or simply staying
              informed, our One Class Classifier is here to provide clarity in
              times of uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
