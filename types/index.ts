// types/index.ts أو types/qa.ts
export interface QAPair {
    id: string;
    question: string;
    answer: string;
    category: string;
    isActive: boolean;
    createdAt: string; // أو Date إذا كنت تتعامل مع كائنات Date مباشرة
    updatedAt: string;
    language?: string;
    tags?: string[];
    priority?: number;
  
  }

  