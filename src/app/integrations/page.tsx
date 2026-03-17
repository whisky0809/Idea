"use client";

import { useState } from "react";
import { defaultIntegrations } from "@/lib/data";
import type { Integration } from "@/lib/types";

const categories = ["All", "Productivity", "Communication", "Development", "Storage", "Database", "CRM", "Finance"];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  function updateConfig(id: string, key: string, value: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, config: { ...i.config, [key]: value } } : i
      )
    );
  }

  async function handleConnect(id: string) {
    const integration = integrations.find((i) => i.id === id);
    await fetch("/api/integrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, config: integration?.config }),
    });
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
    setSaved(id);
    setTimeout(() => setSaved(null), 3000);
  }

  const filtered =
    activeCategory === "All"
      ? integrations
      : integrations.filter((i) => i.category === activeCategory);

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-500 mt-1">
          {connectedCount} connected · Connect your tools and services to extend
          your AI&apos;s reach.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-violet-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((integration) => {
          const isExpanded = expandedId === integration.id;
          return (
            <div
              key={integration.id}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
                integration.connected ? "border-green-200" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{integration.name}</p>
                    <span className="text-xs text-gray-400">{integration.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {integration.connected && (
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                      Connected
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 mb-4">
                {integration.description}
              </p>

              {/* Config fields */}
              {integration.config && isExpanded && (
                <div className="mb-4 space-y-2 p-3 bg-gray-50 rounded-lg">
                  {Object.entries(integration.config).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type={key.toLowerCase().includes("token") || key.toLowerCase().includes("secret") || key.toLowerCase().includes("key") ? "password" : "text"}
                        value={value}
                        onChange={(e) =>
                          updateConfig(integration.id, key, e.target.value)
                        }
                        placeholder={`Enter ${key}`}
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {integration.config && (
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : integration.id)
                    }
                    className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isExpanded ? "Hide Config" : "Configure"}
                  </button>
                )}
                <button
                  onClick={() => handleConnect(integration.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    integration.connected
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}
                >
                  {saved === integration.id
                    ? "✓ Done!"
                    : integration.connected
                    ? "Disconnect"
                    : "Connect"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
