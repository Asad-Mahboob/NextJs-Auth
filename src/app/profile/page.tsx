"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetail = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black py-6 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-semibold text-green-400 mb-4">Profile</h1>
        <h2 className="text-xl bg-green-700 text-green-200 py-2 px-4 rounded mb-6">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="underline hover:text-green-400"
            >
              {data}
            </Link>
          )}
        </h2>
        <hr className="border-gray-600 mb-6" />
        <div className="flex flex-col gap-4">
          <button
            className="w-full py-2 px-4 font-bold text-green-200 bg-green-700 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={getUserDetail}
          >
            Get User Detail
          </button>
          <button
            className="w-full py-2 px-4 font-bold text-blue-200 bg-blue-700 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
