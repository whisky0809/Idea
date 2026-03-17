interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: string;
  trend?: { value: number; label: string };
  color?: "violet" | "green" | "blue" | "amber";
}

const colorMap = {
  violet: "from-violet-500 to-violet-700",
  green: "from-green-500 to-green-700",
  blue: "from-blue-500 to-blue-700",
  amber: "from-amber-500 to-amber-700",
};

export default function StatsCard({
  label,
  value,
  subtext,
  icon,
  trend,
  color = "violet",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
          {trend && (
            <p
              className={`text-xs mt-1 font-medium ${
                trend.value >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              {trend.label}
            </p>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
