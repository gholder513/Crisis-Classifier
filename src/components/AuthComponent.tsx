import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { AlertTriangle } from "lucide-react";
import { GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin } from "../services/authentication";

const AuthComponent: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const onSuccess = async (credentialResponse: any) => {
    try {
      await handleGoogleLogin(credentialResponse);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const onError = () => {
    console.error("Login Failed");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image and Text */}
      <div
        className={`hidden md:flex flex-col justify-center p-12 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 to-purple-900"
            : "bg-gradient-to-br from-purple-100 to-yellow-100"
        }`}
      >
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <AlertTriangle
              size={32}
              className={theme === "dark" ? "text-purple-300" : "text-purple-800"}
            />
            <h1
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Crisis Classifier
            </h1>
          </div>
          <h2
            className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Detect crisis events instantly
          </h2>
          <p
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Advanced machine learning to classify and monitor crisis events in real-time.
          </p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div
        className={`flex flex-col justify-center p-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="max-w-md mx-auto w-full">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <AlertTriangle
              size={32}
              className={theme === "dark" ? "text-purple-300" : "text-purple-800"}
            />
            <h1
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-purple-300" : "text-purple-900"
              }`}
            >
              Crisis Classifier
            </h1>
          </div>

          <h2
            className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome to Crisis Classifier
          </h2>
          <p
            className={`mb-8 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to access the crisis classification system
          </p>

          <div className="space-y-4">
            <div
              className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-md border ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                type="standard"
                theme={theme === "dark" ? "filled_black" : "outline"}
                size="large"
                width="100%"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              By signing in, you agree to our{" "}
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className={`${
                  theme === "dark"
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;