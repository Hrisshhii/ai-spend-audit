"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { runAudit } from "@/lib/auditEngine";

export default function SharedAuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [audit, setAudit] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const calculatedAudit = audit
  ? runAudit({
      tools: audit.tools,
      teamSize: audit.team_size,
      useCase: audit.use_case,
    }) : null;

  useEffect(() => {
    fetchAudit();
  }, []);

  const fetchAudit = async () => {
    const { data, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setAudit(data);
  };

  const submitLead = async () => {
    const { error } = await supabase
      .from("audits")
      .update({
        email,
        company_name: company,
        role,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setSubmitted(true);
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
          ${calculatedAudit?.totalMonthlySavings}/mo
        </div>

        <div className="text-gray-400 mt-2">
          ${calculatedAudit?.totalAnnualSavings}/year
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-zinc-900 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Get Full Report
        </h2>

        <div className="space-y-3">
          <input placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-3 rounded"
          />

          <input placeholder="Company Name" value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-3 rounded"
          />

          <input placeholder="Role" value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-3 rounded"
          />

          <button className="bg-blue-600 px-5 py-3 rounded" onClick={submitLead}>
            Unlock Full Report
          </button>
          {submitted && (
            <p className="text-green-400 mt-3">
              Report captured successfully.
            </p>
          )}
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