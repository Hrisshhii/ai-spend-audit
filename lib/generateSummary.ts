export function generateSummary(
  monthlySavings: number,
  toolCount: number
) {
  if (monthlySavings > 500) {
    return `Your organization may be significantly overspending on AI tooling. Based on ${toolCount} analyzed tools, the audit identified more than $${monthlySavings}/month in potential savings through plan optimization, seat alignment, and infrastructure credit opportunities.`;
  }

  if (monthlySavings > 100) {
    return `Your AI stack shows moderate optimization opportunities. Several tools may be downgraded or consolidated to reduce recurring costs while maintaining similar functionality.`;
  }

  return `Your current AI tooling setup appears reasonably optimized for your current team size and usage profile.`;
}