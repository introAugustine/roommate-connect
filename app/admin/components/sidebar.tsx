"use client";

type SidebarProps = {
  active: string;
};

export default function Sidebar({ active }: SidebarProps) {
  const menu = [
    "Dashboard",
    "Students",
    "Payments",
    "Universities",
    "Admins",
    "Analytics",
    "Settings",
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-black text-blue-400 mb-10">
        👑 Roommate Connect
      </h1>

      <p className="text-sm text-gray-400 mb-6">
        SUPER ADMIN
      </p>

      <div className="space-y-3">
        {menu.map((item) => (
          <button
            key={item}
            className={`w-full text-left px-5 py-4 rounded-xl font-bold transition ${
              active === item
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}