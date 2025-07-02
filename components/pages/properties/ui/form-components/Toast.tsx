"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { ToastProps } from "../types/property-types";

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[type];

  const colorClass = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -50, x: "-50%" }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white flex items-center gap-3 z-50",
        colorClass
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{message}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 text-white hover:bg-white/20"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}; 