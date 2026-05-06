import { create } from "zustand";
import { AuditInput } from "@/types";

interface AuditState {
  data: AuditInput;
  setData: (data: AuditInput) => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  data: {
    tools: [],
    teamSize: 1,
    useCase: "coding",
  },
  setData: (data) => set({ data }),
}));