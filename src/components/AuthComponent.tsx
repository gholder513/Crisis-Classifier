// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../services/authentication';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
// import ThemeToggle from "./ThemeToggle";
// import firebase from "firebase/compat/app";

const AuthComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       console.log(user);
//       // Handle successful sign-in (e.g., redirect, update UI)
//     } catch (error: any) {
//       console.error("Error signing in with Google", error.message);
//       // Handle errors (e.g., display error message)
//     }
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Handle login
        // For demo purposes, using simple localStorage
        if (email === "demo@example.com" && password === "password") {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem(
            "user",
            JSON.stringify({ email, name: "Demo User" })
          );
          navigate("/");
        } else {
          setError("Invalid credentials");
        }
      } else {
        // Handle signup
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ email, name }));
        navigate("/");
      }
    } catch (err) {
      setError("Authentication failed");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-purple-900 text-white"
          : "bg-gradient-to-br from-purple-100 to-yellow-100 text-gray-900"
      }`}
    >
      <Header/>


      <div className="max-w-md mx-auto mt-16 px-4">
        <div
          className={`${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
          } p-8 rounded-lg shadow-md border border-gray-200`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-purple-300" : "text-purple-900"
            }`}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name
                </label>
                <div className="mt-1 relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={18}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 w-full px-4 py-2 rounded-md ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:ring-2 focus:ring-purple-500`}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <div className="mt-1 relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 w-full px-4 py-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 w-full px-4 py-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border focus:ring-2 focus:ring-purple-500`}
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md ${
                theme === "dark"
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={`text-sm ${
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              } hover:underline`}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthComponent;
