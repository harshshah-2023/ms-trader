import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import the auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Firebase signInWithEmailAndPassword
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in with:", userCredential.user.email);
      // Navigate to the table page (or dashboard) after login
      navigate("/table");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Invalid credentials or error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8}}
      >
        <div className="w-96 p-6 shadow-lg bg-gray-800 text-white rounded-2xl">
          <div className="text-center text-2xl font-bold mb-4">MS Traders Login</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="pl-10 bg-gray-700 border-none text-white w-full p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="pl-10 bg-gray-700 border-none text-white w-full p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Login</button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
