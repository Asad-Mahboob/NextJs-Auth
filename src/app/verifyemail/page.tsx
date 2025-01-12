"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyToken", { token });
      setVerified(true);
      window.location.href = "/login";
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }

    useEffect(() => {
      if (token.length > 0) {
        verifyEmail();
      }
    }, [token]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-white">
        {token ? token : "No token found"}
      </h2>
      {verified && <div className="p-2 bg-green-500 text-white">Verified</div>}
      {error && <div className="p-2 bg-red-500 text-white">{error}</div>}
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
