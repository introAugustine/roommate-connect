"use client";

type StatsCardsProps = {
  total: number;
  pending: number;
  approved: number;
  posted: number;
  rejected: number;
};

export default function StatsCards({
  total,
  pending,
  approved,
  posted,
  rejected,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Students",
      value: total,
      emoji: "👥",
      color: "bg-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      emoji: "⏳",
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: approved,
      emoji: "✅",
      color: "bg-green-600",
    },
    {
      title: "Posted",
      value: posted,
      emoji: "📸",
      color: "bg-purple-600",
    },
    {
      title: "Rejected",
      value: rejected,
      emoji: "❌",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div
            className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}
          >
            {card.emoji}
          </div>

          <h3 className="text-gray-500 font-semibold">
            {card.title}
          </h3>

          <p className="text-4xl font-black text-slate-900 mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}