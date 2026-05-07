"use client";

import { useAuditStore } from "@/store/useAuditStore";
import { runAudit } from "@/lib/auditEngine";

export default function ResultsPage() {
  const { data } = useAuditStore();
  const audit = runAudit(data);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">
        Your AI Spend Audit
      </h1>

      <p className="text-gray-400 mb-8">
        Here's where you're overspending and how much you could save.
      </p>

      {/* HERO */}
      <div className="border rounded-xl p-6 mb-8 bg-zinc-900">
        <h2 className="text-2xl font-semibold mb-2">
          Potential Savings
        </h2>

        <div className="text-5xl font-bold text-green-400">
          ${audit.totalMonthlySavings}/mo
        </div>

        <div className="text-gray-400 mt-2">
          ${audit.totalAnnualSavings}/year
        </div>
      </div>

      {/* TOOL RESULTS */}
      <div className="space-y-4">
        {audit.results.map((result, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 bg-zinc-900"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold capitalize">
                {result.tool}
              </h3>

              <div className="text-green-400 font-bold">
                Save ${result.savings}/mo
              </div>
            </div>

            <div className="mt-4 space-y-2 text-gray-300">
              <p>
                Current Spend: ${result.currentCost}
              </p>

              <p>
                Recommended Spend: ${result.recommendedCost}
              </p>

              <p className="text-white font-medium">
                {result.recommendation}
              </p>

              <p className="text-gray-400">
                {result.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}