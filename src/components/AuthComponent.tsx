import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/authentication";

const AuthComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  
  const navigate = useNavigate();
  const { theme } = useTheme();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Store auth data in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          name: user.displayName || "Google User"
        })
      );
      
      navigate("/");
      setIsLogin(isLogin);
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    //   setError(error.message);
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

          <button
            onClick={signInWithGoogle}
            className={`w-full mb-6 flex items-center justify-center gap-2 px-4 py-2 ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:bg-gray-50"
            } border border-gray-300 rounded-md transition-colors`}
          >
            <img
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className={theme === "dark" ? "text-white" : "text-gray-700"}>
              Continue with Google
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default AuthComponent;