import { create } from "zustand";
import { QAPair } from "@/types";

interface FormData {
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

interface QAsStore {
  qaPairs: QAPair[];
  loading: boolean;
  error: string | null;

  fetchQAs: () => Promise<void>;
  createQA: (data: FormData) => Promise<void>;
  updateQA: (id: string, data: FormData) => Promise<void>;
  deleteQA: (id: string) => Promise<void>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const useQAsStore = create<QAsStore>((set, get) => ({
  qaPairs: [],
  loading: false,
  error: null,

  fetchQAs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseUrl}/qa`);
      const data = await res.json();
      set({ qaPairs: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "فشل جلب الأسئلة", loading: false });
    }
  },

  createQA: async (data) => {
    try {
      const res = await fetch(`${baseUrl}/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newQA = await res.json();
      set((state) => ({
        qaPairs: [newQA, ...state.qaPairs],
      }));
    } catch (err: any) {
      set({ error: err.message || "فشل في الإضافة" });
    }
  },

  updateQA: async (id, data) => {
    try {
      const res = await fetch(`${baseUrl}/qa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      set((state) => ({
        qaPairs: state.qaPairs.map((qa) => (qa.id === id ? updated : qa)),
      }));
    } catch (err: any) {
      set({ error: err.message || "فشل التحديث" });
    }
  },

  deleteQA: async (id) => {
    try {
      await fetch(`${baseUrl}/qa/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        qaPairs: state.qaPairs.filter((qa) => qa.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message || "فشل الحذف" });
    }
  },
}));

