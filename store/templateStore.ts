import { create } from "zustand";

export interface Template {
  isActive?: boolean;
  id: string;
  name: string;
  language: string;
  content: string;
  variables: string[];
  status: "active" | "inactive";
  category?: string;
}

interface FormData {
  name: string;
  language: string;
  content: string;
  variables: string[];
  status?: "active" | "inactive";
  category?: string;
  isActive?: boolean;
}

interface TemplateStore {
  templates: Template[];
  loading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
  createTemplate: (data: FormData) => Promise<void>;
  updateTemplate: (id: string, data: FormData) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  toggleTemplateStatus: (template: Template) => Promise<void>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  loading: false,
  error: null,

  fetchTemplates: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseUrl}/templates`);
      const data = await res.json();

      // Ensure templates is always an array
      const templatesArray = Array.isArray(data.templates) ? data.templates :
                           Array.isArray(data) ? data : [];
      
      set({ templates: templatesArray, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch templates", loading: false });
      // Initialize with empty array on error
      set({ templates: [] });
    }
  },

  createTemplate: async (data) => {
    try {
      await fetch(`${baseUrl}/templates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await get().fetchTemplates();
    } catch (error: any) {
      set({ error: error.message || "Failed to create template" });
    }
  },

  updateTemplate: async (id, data) => {
    try {
      await fetch(`${baseUrl}/templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await get().fetchTemplates();
    } catch (error: any) {
      set({ error: error.message || "Failed to update template" });
    }
  },

  deleteTemplate: async (id) => {
    try {
      await fetch(`${baseUrl}/templates/${id}`, {
        method: "DELETE",
      });
      await get().fetchTemplates();
    } catch (error: any) {
      set({ error: error.message || "Failed to delete template" });
    }
  },

  toggleTemplateStatus: async (template) => {
    try {
      const { isActive, ...rest } = template;
      await get().updateTemplate(template.id, {
        ...rest,
        status: template.status === "active" ? "inactive" : "active",
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to toggle status" });
    }
  },
}));
