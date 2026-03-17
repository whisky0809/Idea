"use client";

import { useState } from "react";
import { defaultPlugins } from "@/lib/data";
import type { Plugin } from "@/lib/types";

const categories = ["All", "Tools", "Vision", "Memory", "Communication", "Productivity"];

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>(defaultPlugins);
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState(false);

  function togglePlugin(id: string) {
    setPlugins((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  }

  function updateConfig(id: string, key: string, value: string) {
    setPlugins((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, config: { ...p.config, [key]: value } } : p
      )
    );
  }

  async function handleSave() {
    await fetch("/api/plugins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plugins }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const filtered =
    activeCategory === "All"
      ? plugins
      : plugins.filter((p) => p.category === activeCategory);

  const enabledCount = plugins.filter((p) => p.enabled).length;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plugin Management</h1>
          <p className="text-gray-500 mt-1">
            {enabledCount} of {plugins.length} plugins enabled. Toggle plugins to
            extend your agent&apos;s capabilities.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-violet-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((plugin) => (
          <div
            key={plugin.id}
            className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
              plugin.enabled ? "border-violet-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{plugin.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{plugin.name}</p>
                  <span className="text-xs text-gray-400">
                    v{plugin.version} · {plugin.category}
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={plugin.enabled}
                  onChange={() => togglePlugin(plugin.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-violet-300 rounded-full peer peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
            <p className="text-sm text-gray-500 mb-3">{plugin.description}</p>
            {plugin.enabled && plugin.config && (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="text-xs font-medium text-gray-600 mb-2">Configuration</p>
                {Object.entries(plugin.config).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <label className="text-xs text-gray-500 w-28 shrink-0 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        updateConfig(plugin.id, key, e.target.value)
                      }
                      className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
