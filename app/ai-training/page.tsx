"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  AITrainingHeader,
  QAForm,
  QASearch,
  QACard,
  EmptyState,
} from "@/components/pages/ai-training";
import { QAPair } from "@/types";
import { useQAsStore } from "@/store/useQAsStore.ts";
import { Spinner } from "@/components/ui/Spinner"; // تأكد أن هذا موجود

const categories = [
  "General",
  "Properties",
  "Pricing",
  "Location",
  "Features",
  "Process",
  "Contact",
];

export default function AITrainingPage() {
  const {
    qaPairs,
    loading,
    error,
    fetchQAs,
    createQA,
    updateQA,
    deleteQA,
  } = useQAsStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQAId, setEditingQAId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    isActive: true,
  });

  useEffect(() => {
    fetchQAs();
  }, []);

  const filteredQAPairs = qaPairs.filter(
    (qa) =>
      qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qa.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qa.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingQAId) {
        await updateQA(editingQAId, formData);
      } else {
        await createQA(formData);
      }
      handleCancel();
    } catch (err) {
      console.error("Error saving QA:", err);
    }
  };

  const handleEdit = (qa: QAPair) => {
    setFormData({
      question: qa.question,
      answer: qa.answer,
      category: qa.category,
      isActive: qa.isActive,
    });
    setEditingQAId(qa.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      await deleteQA(id);
    }
  };

  const handleToggleStatus = async (qa: QAPair) => {
    try {
      await updateQA(qa.id, {
        question: qa.question,
        answer: qa.answer,
        category: qa.category,
        isActive: !qa.isActive,
      });
    } catch (err) {
      console.error("Error toggling QA status:", err);
    }
  };

  const handleCancel = () => {
    setFormData({
      question: "",
      answer: "",
      category: "General",
      isActive: true,
    });
    setEditingQAId(null);
    setShowAddForm(false);
  };

  const handleFormChange = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
        <AITrainingHeader onAddClick={() => setShowAddForm(true)} />

        {showAddForm && (
          <QAForm
            isEditing={!!editingQAId}
            formData={formData}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onFormChange={handleFormChange}
          />
        )}

        <QASearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center font-medium mt-4">
            حدث خطأ أثناء تحميل البيانات: {error}
          </div>
        ) : filteredQAPairs.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            onAddClick={() => setShowAddForm(true)}
          />
        ) : (
          <div className="grid gap-4">
            {filteredQAPairs.map((qa) => (
              <QACard
                key={qa.id}
                qa={qa}
                onEdit={() => handleEdit(qa)}
                onDelete={() => handleDelete(qa.id)}
                onToggleStatus={() => handleToggleStatus(qa)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
