"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  // Use useCallback to memoize verifyEmail function
  const verifyEmail = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyToken", { token });
      setVerified(true);
      window.location.href = "/login";
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
  }, [token]); // Dependency on token since it is used in the function

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []); // This effect runs only once on mount

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token, verifyEmail]); // Dependencies updated to use the memoized function

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-white">
        {token ? token : "No token found"}
      </h2>
      {verified && <div className="p-2 bg-green-500 text-white">Verified</div>}

      <button
        className="p-2 bg-blue-500 text-white"
        onClick={verifyEmail}
        disabled={loading}
      >
        {loading ? "Loading..." : "Verify Email"}
      </button>
      <div className="text-sm">
        Go to{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
