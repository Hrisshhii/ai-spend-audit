import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuditInput } from "@/types";

interface AuditState {
  data: AuditInput;

  setData: (data: AuditInput) => void;
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      data: {
        tools: [],
        teamSize: 1,
        useCase: "coding",
      },

      setData: (data) => set({ data }),
    }),

    {
      name: "audit-storage",
    }
  )
);