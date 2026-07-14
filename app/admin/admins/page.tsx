"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");

  async function getAdmins() {
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setAdmins(data || []);
    setLoading(false);
  }

  async function createAdmin() {
    alert("Button clicked");

    if (!name || !email) {
      alert("Please fill in name and email");
      return;
    }

    try {
      const response = await fetch("/api/admins/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Something went wrong");
        return;
      }

      alert("Admin created successfully");

      setName("");
      setEmail("");
      setRole("ADMIN");

      getAdmins();

    } catch (error: any) {
      alert(error.message);
    }
  }

  async function deleteAdmin(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to remove this admin?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("admins")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getAdmins();
  }

  useEffect(() => {
    getAdmins();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading admins...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black text-blue-700 mb-8">
          Admin Management
        </h1>

        <div className="bg-white rounded-3xl shadow p-8 mb-8">

          <h2 className="text-2xl font-black text-gray-900 mb-5">
            Create New Admin
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Admin name"
              className="border-2 border-gray-300 rounded-xl p-3 text-gray-900"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              className="border-2 border-gray-300 rounded-xl p-3 text-gray-900"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-2 border-gray-300 rounded-xl p-3 text-gray-900"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>

          </div>

          <button
            onClick={createAdmin}
            className="mt-5 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            Create Admin
          </button>

        </div>


        <div className="bg-white rounded-3xl shadow p-8">

          {admins.length === 0 ? (
            <p className="text-gray-600">
              No admins found.
            </p>
          ) : (

            <div className="space-y-5">

              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="border rounded-2xl p-6 flex justify-between items-center"
                >

                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      {admin.name}
                    </h2>

                    <p className="text-gray-700">
                      {admin.email}
                    </p>

                    <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold">
                      {admin.role}
                    </span>

                    <p className="text-sm text-gray-500 mt-2">
                      Created:{" "}
                      {new Date(admin.created_at).toLocaleString()}
                    </p>
                  </div>

                  {admin.role !== "SUPER_ADMIN" && (
                    <button
                      onClick={() => deleteAdmin(admin.id)}
                      className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold"
                    >
                      Remove
                    </button>
                  )}

                </div>
              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}