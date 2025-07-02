"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface QAPair {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QACardProps {
  qa: QAPair;
  onEdit: (qa: QAPair) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (qa: QAPair) => void;
}

export function QACard({ qa, onEdit, onDelete, onToggleStatus }: QACardProps) {
  const created = new Date(qa.createdAt).toLocaleDateString();
  const updated = new Date(qa.updatedAt).toLocaleDateString();

  return (
    <Card className={!qa.isActive ? "opacity-60" : ""}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Left: Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">{qa.category}</Badge>
              <Badge variant={qa.isActive ? "default" : "secondary"}>
                {qa.isActive ? "نشط" : "غير نشط"}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-medium">السؤال:</p>
              <p className="text-base text-gray-900">{qa.question}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-medium">الإجابة:</p>
              <p className="text-base text-gray-900">{qa.answer}</p>
            </div>

            <p className="text-xs text-gray-500">
              تم الإنشاء: {created}
              {qa.updatedAt !== qa.createdAt && ` • تم التحديث: ${updated}`}
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-start gap-2 shrink-0 self-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(qa)}
              aria-label="تبديل الحالة"
            >
              {qa.isActive ? (
                <XCircleIcon className="h-4 w-4" />
              ) : (
                <CheckCircleIcon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(qa)}
              aria-label="تعديل"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(qa.id)}
              aria-label="حذف"
              className="text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
