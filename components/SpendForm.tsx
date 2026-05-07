"use client";

import { useState } from "react";
import { useAuditStore } from "@/store/useAuditStore";
import { AuditInput,ToolInput } from "@/types";
import { useRouter } from "next/navigation";

export default function SpendForm() {
  const { setData } = useAuditStore();
  const router = useRouter();

  const [tools, setTools] = useState<ToolInput[]>([
    {
      tool: "chatgpt",
      plan: "plus",
      monthlySpend: 20,
      seats: 1,
    },
  ]);

  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState<AuditInput["useCase"]>("coding");

  const handleChange = (
    index: number,
    field: keyof ToolInput,
    value: string | number
  ) => {
    const updated = [...tools];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      { tool: "claude", plan: "pro", monthlySpend: 20, seats: 1 },
    ]);
  };

  const handleSubmit = () => {
    const data: AuditInput = {
      tools,
      teamSize,
      useCase,
    };

    setData(data);
    router.push("/results");
  };

  return (
    <div className="space-y-4">
      {tools.map((tool, index) => (
        <div key={index} className="border p-4 rounded">
          <select
            value={tool.tool}
            onChange={(e) =>
              handleChange(index, "tool", e.target.value)
            }
            className="mr-2"
          >
            <option value="chatgpt">ChatGPT</option>
            <option value="claude">Claude</option>
            <option value="copilot">GitHub Copilot</option>
            <option value="gemini">Gemini</option>
            <option value="cursor">Cursor</option>
          </select>

          <select value={tool.plan} className="mr-2"
            onChange={(e) => handleChange(index, "plan", e.target.value)}
          >
            <option value="plus">Plus</option>
            <option value="team">Team</option>
            <option value="pro">Pro</option>
          </select>

          <input type="number" value={tool.monthlySpend} className="mr-2 w-24"
            onChange={(e) => handleChange(index, "monthlySpend", Number(e.target.value))}
          />

          <input type="number" value={tool.seats} className="w-16"
            onChange={(e) => handleChange(index, "seats", Number(e.target.value))}
          />
        </div>
      ))}

      <button onClick={addTool} className="bg-gray-800 px-4 py-2">
        + Add Tool
      </button>

      <div>
        <label>Team Size:</label>
        <input type="number" value={teamSize} className="ml-2 w-20"
          onChange={(e) => setTeamSize(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Use Case:</label>
        <select value={useCase} className="ml-2"
          onChange={(e) => setUseCase(e.target.value as AuditInput["useCase"])}
        >
          <option value="coding">Coding</option>
          <option value="writing">Writing</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <button onClick={handleSubmit} className="bg-blue-600 px-6 py-2 rounded" >
        Run Audit
      </button>
    </div>
  );
}