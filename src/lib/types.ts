export type LLMProvider = {
  id: string;
  name: string;
  logo: string;
  enabled: boolean;
  apiKey: string;
  models: string[];
  selectedModel: string;
  description: string;
};

export type AgentConfig = {
  framework: string;
  maxIterations: number;
  temperature: number;
  systemPrompt: string;
  memoryEnabled: boolean;
  streamingEnabled: boolean;
};

export type Plugin = {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  icon: string;
  version: string;
  config?: Record<string, string>;
};

export type Integration = {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  category: string;
  config?: Record<string, string>;
};

export type BillingPlan = {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  current: boolean;
};

export type UsageStat = {
  label: string;
  used: number;
  limit: number;
  unit: string;
};

export type BackendConfig = {
  providers: LLMProvider[];
  agentConfig: AgentConfig;
};
