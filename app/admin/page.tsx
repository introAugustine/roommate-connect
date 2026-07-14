"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StatsCards from "./components/StatsCards";

export default function AdminPage() {
  const router = useRouter();

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    posted: 0,
    rejected: 0,
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  async function getSubmissions() {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {  
      alert(error.message);  
      return;  
    }  

    const submissionsData = data || [];  

    setSubmissions(submissionsData);  
    setFilteredSubmissions(submissionsData);  

    setStats({  
      total: submissionsData.length,  
      pending: submissionsData.filter((s) => s.status === "Pending").length,  
      approved: submissionsData.filter((s) => s.status === "Approved").length,  
      posted: submissionsData.filter((s) => s.status === "Posted").length,  
      rejected: submissionsData.filter((s) => s.status === "Rejected").length,  
    });  

    setLoading(false);
  }

  async function updateStatus(id: number, status: string) {
    const { error } = await supabase
      .from("submissions")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {  
      alert(error.message);  
      return;  
    }  

    getSubmissions();
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem("roommateAdminSession");

    if (!loggedIn) {  
      router.push("/admin/login");  
      return;  
    }  

    getSubmissions();
  }, []);

  useEffect(() => {
    let results = submissions;

    if (filter !== "All") {  
      results = results.filter((student) => student.status === filter);  
    }  

    if (search.trim() !== "") {  
      results = results.filter(  
        (student) =>  
          student.university?.toLowerCase().includes(search.toLowerCase()) ||  
          student.email?.toLowerCase().includes(search.toLowerCase()) ||  
          student.instagram?.toLowerCase().includes(search.toLowerCase())  
      );  
    }  

    setFilteredSubmissions(results);
  }, [search, filter, submissions]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold text-gray-900">Loading dashboard...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title and Logout Bar */}  
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-black text-blue-700">
            Roommate Connect Admin
          </h1>

          <div className="flex gap-3">

            <Link
              href="/admin/admins"
              className="bg-blue-700 text-white px-5 py-3 rounded-xl font-bold"
            >
              Manage Admins
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("roommateAdminSession");
                router.push("/admin/login");
              }}
              className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Stats Section with Spacing */}  
        <div className="mb-8">  
          <StatsCards  
            total={stats.total}  
            pending={stats.pending}  
            approved={stats.approved}  
            posted={stats.posted}  
            rejected={stats.rejected}  
          />  
        </div>  

        {/* Search and Filters */}  
        <div className="bg-white rounded-3xl shadow p-6 mb-8">  
          <input  
            value={search}  
            onChange={(e) => setSearch(e.target.value)}  
            placeholder="Search university, email or Instagram..."  
            className="w-full border-2 border-gray-300 rounded-xl p-4 text-gray-900"  
          />  

          <div className="flex flex-wrap gap-3 mt-5">  
            {["All", "Pending", "Approved", "Posted", "Rejected"].map((status) => (  
              <button  
                key={status}  
                onClick={() => setFilter(status)}  
                className={`px-5 py-3 rounded-xl font-bold ${  
                  filter === status  
                    ? "bg-blue-700 text-white"  
                    : "bg-gray-200 text-gray-900"  
                }`}  
              >  
                {status}  
              </button>  
            ))}  
          </div>  
        </div>  

        {/* Submissions List / Empty Dashboard */}  
        <div className="space-y-8">  
          {filteredSubmissions.length === 0 ? (  
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">  
              <h2 className="text-2xl font-black text-gray-900">  
                No submissions found  
              </h2>  
              <p className="text-gray-600 mt-3">  
                Student submissions will appear here once they complete the form.  
              </p>  
            </div>  
          ) : (  
            filteredSubmissions.map((student) => (  
              <div key={student.id} className="bg-white rounded-3xl shadow-lg p-8">  
                <div className="grid md:grid-cols-2 gap-10">  
                  <div>  
                    <h2 className="text-3xl font-black text-gray-900">  
                      {student.university}  
                    </h2>  

                    <div className="mt-5 space-y-3 text-gray-900">  
                      <p>  
                        📧 Email:  
                        <span className="font-bold ml-2">{student.email}</span>  
                      </p>  

                      <p>  
                        📱 Instagram:  
                        <span className="font-bold ml-2">{student.instagram}</span>  
                      </p>  
                    </div>  

                    <div className="mt-6">  
                      <h3 className="font-bold text-gray-900 text-lg">Student Bio</h3>  
                      <p className="mt-2 text-gray-800 leading-relaxed">  
                        {student.bio}  
                      </p>  
                    </div>  

                    <div className="mt-6">  
                      <span  
                        className={`px-4 py-2 rounded-full font-bold ${  
                          student.status === "Approved"  
                            ? "bg-green-100 text-green-800"  
                            : student.status === "Rejected"  
                            ? "bg-red-100 text-red-800"  
                            : student.status === "Posted"  
                            ? "bg-purple-100 text-purple-800"  
                            : "bg-yellow-100 text-yellow-800"  
                        }`}  
                      >  
                        {student.status}  
                      </span>  

                      <p className="mt-4 text-gray-900 font-medium">  
                        🕒 Submitted:{" "}  
                        {new Date(student.created_at).toLocaleString()}  
                      </p>  
                    </div>  
                  </div>  

                  {/* Student Photos Section */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
                      Student Photos
                    </h3>

                    {(() => {
                      console.log("Photos:", student.photos);
                      return null;
                    })()}

                    <div className="grid grid-cols-3 gap-3">
                      {student.photos ? (
                        student.photos.split(",").map((photo: string, index: number) => (
                          <img
                            key={index}
                            src={photo.trim()}
                            alt={`Student ${index + 1}`}
                            className="h-28 w-full object-cover rounded-xl border"
                          />
                        ))
                      ) : (
                        <p className="text-gray-500">No photos uploaded.</p>
                      )}
                    </div>
                  </div>
                </div>  

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">  
                  <h3 className="font-black text-gray-900 text-xl mb-3">  
                    Payment Information  
                  </h3>  

                  <p className="text-gray-900 font-medium">  
                    Amount: {student.payment_amount}  
                  </p>  

                  <p className="text-gray-900 font-medium">  
                    Method: {student.payment_method || "Not submitted"}  
                  </p>  

                  {student.payment_screenshot && (  
                    <a  
                      href={student.payment_screenshot}  
                      target="_blank"  
                      rel="noopener noreferrer"  
                      className="inline-block mt-3 text-blue-700 underline font-bold"  
                    >  
                      View Payment Screenshot  
                    </a>  
                  )}  
                </div>  

                <div className="flex flex-wrap gap-4 mt-6">  
                  <button  
                    onClick={() => updateStatus(student.id, "Approved")}  
                    className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-bold"  
                  >  
                    ✓ Approve  
                  </button>  

                  <button  
                    onClick={() => updateStatus(student.id, "Posted")}  
                    className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-xl font-bold"  
                  >  
                    📸 Mark as Posted  
                  </button>  

                  <button  
                    onClick={() => updateStatus(student.id, "Rejected")}  
                    className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-bold"  
                  >  
                    ✕ Reject  
                  </button>  
                </div>  
              </div>  
            ))  
          )}  
        </div>  
      </div>  
    </main>
  );
}