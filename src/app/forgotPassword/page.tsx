"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotPassword", { email });
      setSuccess(true);
      console.log("Password reset email sent successfully", response.data);
      setLoading(false);
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.error || "Unknown error");
        console.log("Error sending password reset email", error.response?.data);
      } else {
        // Fallback if it's not an Axios error
        setError("An unknown error occurred");
        console.log("Unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black py-6 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-green-400 mb-4">
          Forgot Password
        </h1>
        <h2 className="text-center text-lg text-green-300 mb-6">
          Enter your email address
        </h2>
        {success ? (
          <p className="text-green-500 text-center font-medium">
            Password reset email sent successfully!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-green-200 font-semibold rounded-lg focus:outline-none ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-green-400">
          Back to{" "}
          <Link href="/login" className="underline hover:text-green-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
