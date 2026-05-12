"use client";

import { useAuditStore } from "@/store/useAuditStore";
import { runAudit } from "@/lib/auditEngine";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const { data } = useAuditStore();
  const router = useRouter();
  const audit = runAudit(data);
  const isOptimized = audit.totalMonthlySavings < 100;

  useEffect(() => {
    if (data.tools.length > 0) {
      saveAudit();
    }
  }, []);

  const saveAudit = async () => {
    const { data: savedAudit, error } = await supabase
      .from("audits")
      .insert([
        {
          tools: data.tools,
          team_size: data.teamSize,
          use_case: data.useCase,

          total_monthly_savings:
            audit.totalMonthlySavings,

          total_annual_savings:
            audit.totalAnnualSavings,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    console.log(savedAudit);

    router.push(`/results/${savedAudit.id}`);
  };

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

      {isOptimized ? (
        <div className="border border-green-700 bg-green-950 p-4 rounded-xl mb-8">
          <p className="text-green-300 font-medium">
            Your stack already looks fairly optimized.
          </p>

          <p className="text-gray-400 mt-1">
            We’ll notify you when better pricing or optimization opportunities appear.
          </p>
        </div>
      ) : (
        <div className="border border-blue-700 bg-blue-950 p-4 rounded-xl mb-8">
          <p className="text-blue-300 font-medium">
            Significant savings opportunity detected.
          </p>

          <p className="text-gray-400 mt-1">
            Credex may help reduce your AI infrastructure costs further through discounted credits.
          </p>
        </div>
      )}

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

              <div className="text-right">
                <div className="text-green-400 font-bold text-xl">
                  ${result.savings}/mo
                </div>

                <div className="text-gray-500 text-sm">
                  ${result.savings * 12}/year
                </div>
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