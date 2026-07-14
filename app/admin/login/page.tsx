"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      alert("Invalid email or password");
      return;
    }

    const { data: admin, error: adminError } =
      await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .single();

    if (adminError || !admin) {
      alert("You are not an authorized admin");
      await supabase.auth.signOut();
      return;
    }

    if (!admin.active) {
      alert("Your admin account is disabled");
      await supabase.auth.signOut();
      return;
    }

    localStorage.setItem(
      "roommateAdminSession",
      JSON.stringify({
        id: admin.id,
        email: admin.email,
        role: admin.role,
      })
    );

    router.push("/admin");
  }

  function clearSession() {
    localStorage.removeItem("roommateAdminSession");
    alert("Session cleared. Please login again.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🔐
          </div>

          <h1 className="text-3xl font-black text-blue-700">
            Admin Portal
          </h1>

          <p className="text-gray-700 mt-3 font-medium">
            Roommate Connect Management
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="block text-gray-900 font-bold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
            />
          </div>


          <div>
            <label className="block text-gray-900 font-bold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-black text-lg"
          >
            Login
          </button>


          <button
            type="button"
            onClick={clearSession}
            className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold"
          >
            Clear Old Session
          </button>

        </form>

      </div>

    </main>
  );
}