"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SharedAuditPage({
  params,
}: {
  params: { id: string };
}) {
  const [audit, setAudit] = useState<any>(null);

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setAudit(data);
  };

  if (!audit) {
    return (
      <div className="p-6 text-white">
        Loading audit...
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-4">
        Shared AI Spend Audit
      </h1>

      <div className="border rounded-xl p-6 bg-zinc-900 mb-8">
        <div className="text-5xl font-bold text-green-400">
          ${audit.total_monthly_savings}/mo
        </div>

        <div className="text-gray-400 mt-2">
          ${audit.total_annual_savings}/year
        </div>
      </div>

      <div className="space-y-4">
        {audit.tools.map((tool: any, index: number) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-zinc-900"
          >
            <h2 className="text-xl font-semibold capitalize">
              {tool.tool}
            </h2>

            <p className="text-gray-400 mt-2">
              Plan: {tool.plan}
            </p>

            <p className="text-gray-400">
              Spend: ${tool.monthlySpend}
            </p>

            <p className="text-gray-400">
              Seats: {tool.seats}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}