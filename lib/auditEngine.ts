import { AuditInput, AuditResult, AuditSummary } from "@/types";
import { pricing } from "./pricingData";

export function runAudit(input: AuditInput): AuditSummary {
  const results: AuditResult[] = [];

  let totalSavings = 0;

  for (const tool of input.tools) {
    let currentCost = tool.monthlySpend;

    let recommendedCost = currentCost;
    let recommendation = "No changes recommended";
    let reason = "Your current setup looks reasonable.";

    // =========================
    // CHATGPT LOGIC
    // =========================
    if (tool.tool === "chatgpt") {
      // Team plan unnecessary for tiny teams
      if (tool.plan === "team" && tool.seats <= 2) {
        recommendedCost = tool.seats * pricing.chatgpt.plus;
        recommendation = "Downgrade to ChatGPT Plus";
        reason = "ChatGPT Team is typically unnecessary for teams with 2 or fewer users unless admin controls are required.";
      }

      // Too many Plus accounts
      if (tool.plan === "plus" && tool.seats >= 5) {
        recommendedCost = tool.seats * pricing.chatgpt.team;
        recommendation = "Consider ChatGPT Team";
        reason = "At larger team sizes, centralized billing and collaboration tools may justify Team plans.";
      }
    }

    // =========================
    // CLAUDE LOGIC
    // =========================
    if (tool.tool === "claude") {
      if (tool.plan === "team" && tool.seats <= 2) {
        recommendedCost = tool.seats * pricing.claude.pro;
        recommendation = "Switch to Claude Pro";
        reason = "Claude Team collaboration features are usually unnecessary for very small teams.";
      }
    }

    // =========================
    // COPILOT LOGIC
    // =========================

    if (tool.tool === "copilot") {
      if (tool.plan === "business" && tool.seats <= 3) {
        const copilotIndividualPrice = (pricing as any).copilot?.individual;
        if (typeof copilotIndividualPrice === "number") {
          recommendedCost = tool.seats * copilotIndividualPrice;
          recommendation = "Switch to GitHub Copilot Individual";
          reason = "Copilot Business administrative features may not justify the higher seat cost for small teams.";
        }
      }
    }

    // =========================
    // CURSOR LOGIC
    // =========================

    if (tool.tool === "cursor") {
      if (tool.plan === "business" && tool.seats <= 2) {
        recommendedCost = tool.seats * pricing.cursor.pro;
        recommendation = "Downgrade to Cursor Pro";
        reason = "Cursor Business features are typically unnecessary for very small engineering teams.";
      }
    }

    // =========================
    // SAVINGS CALCULATION
    // =========================
    const savings = Math.max(currentCost - recommendedCost, 0);

    totalSavings += savings;

    results.push({
      tool: tool.tool,
      currentCost,
      recommendedCost,
      savings,
      recommendation,
      reason,
    });
  }

  return {
    totalMonthlySavings: totalSavings,
    totalAnnualSavings: totalSavings * 12,
    results,
  };
}