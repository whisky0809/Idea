import StatsCard from "@/components/StatsCard";
import { UsageBar } from "@/components/UsageBar";
import { usageStats } from "@/lib/data";
import Link from "next/link";

const recentActivity = [
  { id: 1, action: "GPT-4o request completed", time: "2 min ago", icon: "🤖" },
  { id: 2, action: "Web Search plugin used", time: "5 min ago", icon: "🔍" },
  { id: 3, action: "Notion integration synced", time: "12 min ago", icon: "📝" },
  { id: 4, action: "New API key generated", time: "1 hour ago", icon: "🔑" },
  { id: 5, action: "Billing plan renewed", time: "3 hours ago", icon: "💳" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back. Here&apos;s an overview of your AI Hub.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Requests"
          value="4,821"
          subtext="This month"
          icon="📊"
          trend={{ value: 12, label: "vs last month" }}
          color="violet"
        />
        <StatsCard
          label="Active Providers"
          value="2"
          subtext="OpenAI · Google"
          icon="🤖"
          color="blue"
        />
        <StatsCard
          label="Plugins Enabled"
          value="4"
          subtext="of 8 available"
          icon="🔌"
          color="green"
        />
        <StatsCard
          label="Integrations"
          value="2"
          subtext="Connected services"
          icon="🔗"
          trend={{ value: 1, label: "new this week" }}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Usage */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Usage This Month</h2>
            <Link
              href="/billing"
              className="text-sm text-violet-600 hover:underline"
            >
              View billing →
            </Link>
          </div>
          <div className="space-y-5">
            {usageStats.map((stat) => (
              <UsageBar key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm text-gray-700">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/backend"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 text-sm font-medium transition-colors"
          >
            🤖 Configure AI Provider
          </Link>
          <Link
            href="/plugins"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors"
          >
            🔌 Manage Plugins
          </Link>
          <Link
            href="/integrations"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium transition-colors"
          >
            🔗 Add Integration
          </Link>
          <Link
            href="/billing"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-sm font-medium transition-colors"
          >
            💳 View Billing
          </Link>
        </div>
      </div>
    </div>
  );
}
