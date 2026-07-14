"use client";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900">
          {title}
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Super Admin 👑
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white rounded-xl shadow px-5 py-3">
          🔔 0 Notifications
        </div>

        <div className="bg-blue-700 text-white rounded-xl px-5 py-3 font-bold">
          Augustine
        </div>
      </div>
    </div>
  );
}