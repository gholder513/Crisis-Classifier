import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Globe, Cog, BadgeHelp, ArrowLeft } from "lucide-react";

const DocumentationPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={goToLandingPage}
              className="flex items-center gap-1 text-gray-600 hover:text-purple-800"
            >
              <ArrowLeft size={18} />
              <span>Home</span>
            </button>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={scrollToTop}
            >
              <AlertTriangle size={24} className="text-purple-800" />
              <h1 className="text-xl font-bold text-purple-900">
                Crisis Classifier
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-purple-800"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-purple-800"
              >
                How It Works
              </a>
              <a
                href="/Documentation"
                className="text-gray-700 hover:text-purple-800"
              >
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-900 mb-6">
            Documentation
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <a
            href="https://github.com/gholder513/Crisis_Classifier"
            className="text-gray-400 hover:text-white"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-32 w-6"
              fill="currentColor"
              // viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BadgeHelp size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">What It Does</h3>
            <p className="text-gray-600">
              Our classifier is built using advanced one-class classification
              methods that focus exclusively on the patterns and features
              typical of crisis events. By inputting a website URL, our system
              examines its content and assesses whether it aligns with the
              crisis profile. This streamlined process helps emergency response
              teams, media outlets, researchers, and concerned citizens pinpoint
              critical situations in real time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Cog size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">How It Works</h3>
            <p className="text-gray-600">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Globe size={24} className="text-purple-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real World Application</h3>
            <p className="text-gray-600">
              In today’s fast-paced digital landscape, timely access to accurate
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={24} className="text-yellow-500" />
                <h3 className="text-xl font-bold">Crisis Classifier</h3>
              </div>
              <p className="text-gray-400">
                Advanced crisis event detection and classification using machine
                learning.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="About" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Crisis Classifier. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DocumentationPage;
