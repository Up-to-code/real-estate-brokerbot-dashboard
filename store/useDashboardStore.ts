import { create } from "zustand";

interface DashboardState {
  totalClients: number;
  totalMessages: number;
  activeCampaigns: number;
  activeClients: number;
  recentMessages: any[];
  dailyMessages: Record<string, number>;
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalClients: 0,
  totalMessages: 0,
  activeCampaigns: 0,
  activeClients: 0,
  recentMessages: [],
  dailyMessages: {},
  loading: true,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/");
      if (!res.ok) throw new Error("فشل في جلب البيانات");

      const data = await res.json();

      set({
        totalClients: data.totalClients,
        totalMessages: data.totalMessages,
        activeCampaigns: data.activeCampaigns,
        activeClients: data.activeClients,
        recentMessages: data.RecentMessages,
        dailyMessages: data.DailyMessages,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({ error: err.message || "خطأ غير معروف", loading: false });
    }
  },
}));
