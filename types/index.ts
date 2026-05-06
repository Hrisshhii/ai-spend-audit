export type ToolName =
  | "cursor"
  | "copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export interface ToolInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: "coding" | "writing" | "data" | "research" | "mixed";
}

export interface AuditResult {
  tool: ToolName;
  currentCost: number;
  recommendedCost: number;
  savings: number;
  recommendation: string;
  reason: string;
}

export interface AuditSummary {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  results: AuditResult[];
}