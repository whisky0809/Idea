import type { UsageStat } from "@/lib/types";

interface UsageBarProps {
  stat: UsageStat;
}

export function UsageBar({ stat }: UsageBarProps) {
  const percent = Math.min((stat.used / stat.limit) * 100, 100);
  const isHigh = percent >= 80;
  const isMedium = percent >= 50;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{stat.label}</span>
        <span className="text-gray-500">
          {stat.used.toLocaleString()} / {stat.limit.toLocaleString()} {stat.unit}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isHigh ? "bg-red-500" : isMedium ? "bg-amber-500" : "bg-violet-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{percent.toFixed(0)}% used</p>
    </div>
  );
}
