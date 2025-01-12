"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SetNewPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Extract the token from the URL on mount
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset any previous error
    setError(null);

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/setnewpassword", {
        token,
        password,
      });
      console.log(response.data);
      router.push("/login"); // Redirect to login page after successful password reset
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Safely access the error response when it's an AxiosError
        setError(error.response?.data?.message || "An error occurred.");
      } else if (error instanceof Error) {
        // Handle general errors
        setError(error.message || "An error occurred.");
      } else {
        // Handle unknown error types
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black py-6 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-green-400 mb-6">
          Set New Password
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full py-3 text-green-200 font-semibold rounded-lg focus:outline-none ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            }`}
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
