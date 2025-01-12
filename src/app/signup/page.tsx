"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AxiosError } from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Safely access the error response when it's an AxiosError
        console.log(
          "Signup failed",
          error.response?.data?.message || error.message
        );
      } else if (error instanceof Error) {
        // Handle general errors
        console.log("Signup failed", error.message);
      } else {
        // Handle unknown error types
        console.log("Signup failed", "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black py-6 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-green-400 mb-4">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <hr className="mb-4 border-green-700" />
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-green-300"
          >
            Username
          </label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-300"
          >
            Email
          </label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-green-300"
          >
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full py-3 text-green-200 font-semibold rounded-lg focus:outline-none ${
            buttonDisabled
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
          }`}
        >
          Signup
        </button>
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-green-400 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
