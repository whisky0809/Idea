"use client";

import { useState } from "react";
import { defaultProviders, defaultAgentConfig } from "@/lib/data";
import type { LLMProvider, AgentConfig } from "@/lib/types";

export default function BackendPage() {
  const [providers, setProviders] = useState<LLMProvider[]>(defaultProviders);
  const [agentConfig, setAgentConfig] = useState<AgentConfig>(defaultAgentConfig);
  const [saved, setSaved] = useState(false);

  function toggleProvider(id: string) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  }

  function updateProviderKey(id: string, apiKey: string) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, apiKey } : p))
    );
  }

  function updateProviderModel(id: string, selectedModel: string) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedModel } : p))
    );
  }

  async function handleSave() {
    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providers, agentConfig }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const frameworks = [
    { id: "openai-agents", name: "OpenAI Agents SDK" },
    { id: "langchain", name: "LangChain" },
    { id: "crewai", name: "CrewAI" },
    { id: "autogen", name: "AutoGen" },
    { id: "llamaindex", name: "LlamaIndex" },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Backend Configuration</h1>
          <p className="text-gray-500 mt-1">
            Configure your LLM providers and agent framework settings.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* LLM Providers */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">LLM Providers</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enable providers and configure API keys. Enabled providers will be
          available for your agents.
        </p>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${
                provider.enabled ? "border-violet-200" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.logo}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-500">{provider.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={provider.enabled}
                    onChange={() => toggleProvider(provider.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-violet-300 rounded-full peer peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
              {provider.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={provider.apiKey}
                      onChange={(e) =>
                        updateProviderKey(provider.id, e.target.value)
                      }
                      placeholder="sk-..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Model
                    </label>
                    <select
                      value={provider.selectedModel}
                      onChange={(e) =>
                        updateProviderModel(provider.id, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
                    >
                      {provider.models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Agent Configuration */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Agent Framework
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Configure the agent framework and runtime behavior.
        </p>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Framework
              </label>
              <select
                value={agentConfig.framework}
                onChange={(e) =>
                  setAgentConfig((c) => ({ ...c, framework: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
              >
                {frameworks.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Iterations
              </label>
              <input
                type="number"
                value={agentConfig.maxIterations}
                min={1}
                max={50}
                onChange={(e) =>
                  setAgentConfig((c) => ({
                    ...c,
                    maxIterations: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature: {agentConfig.temperature.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={agentConfig.temperature}
              onChange={(e) =>
                setAgentConfig((c) => ({
                  ...c,
                  temperature: Number(e.target.value),
                }))
              }
              className="w-full accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Precise (0)</span>
              <span>Balanced (1)</span>
              <span>Creative (2)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              System Prompt
            </label>
            <textarea
              value={agentConfig.systemPrompt}
              onChange={(e) =>
                setAgentConfig((c) => ({ ...c, systemPrompt: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
            />
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agentConfig.memoryEnabled}
                onChange={(e) =>
                  setAgentConfig((c) => ({
                    ...c,
                    memoryEnabled: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-violet-600"
              />
              <span className="text-sm text-gray-700">Enable Memory</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agentConfig.streamingEnabled}
                onChange={(e) =>
                  setAgentConfig((c) => ({
                    ...c,
                    streamingEnabled: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-violet-600"
              />
              <span className="text-sm text-gray-700">Enable Streaming</span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
