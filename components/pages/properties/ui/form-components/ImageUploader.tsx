"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { ImageUploaderProps } from "../types/property-types";
import { labels } from "../constants/labels";

export const ImageUploader = ({ images, onImagesChange, maxFiles = 10 }: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentImagesCount = images.length;
    const filesToAddCount = Math.min(acceptedFiles.length, maxFiles - currentImagesCount);

    if (filesToAddCount > 0) {
      const newImageUrls = acceptedFiles.slice(0, filesToAddCount).map(file => URL.createObjectURL(file));
      onImagesChange([...images, ...newImageUrls]);
    }
  }, [images, onImagesChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    maxFiles: maxFiles - images.length, // Only allow dropping up to remaining max files
    noClick: images.length >= maxFiles, // Disable click if max files reached
    noKeyboard: images.length >= maxFiles, // Disable keyboard if max files reached
  });

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    onImagesChange(newImages);
  };

  const canAddMoreImages = images.length < maxFiles;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors duration-200",
          "border-muted-foreground/25 text-muted-foreground",
          canAddMoreImages ? "cursor-pointer hover:border-primary hover:text-primary" : "cursor-not-allowed opacity-70",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5 text-destructive"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 mb-3" />
        <p className="text-sm font-medium text-center">
          {isDragActive ? labels.dropImagesHere : labels.dragDropImages}
        </p>
        <p className="text-xs text-center mt-1">
          {labels.maxFilesInfo.replace('%s', maxFiles.toString())}
        </p>
        {!canAddMoreImages && (
          <p className="text-xs text-red-500 mt-1">تم الوصول للحد الأقصى من الصور.</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            {labels.imagePreview}
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image} // Use image URL as key for better animation
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-border shadow-sm"
                >
                  <img
                    src={image}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => removeImage(index)}
                    aria-label={labels.removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      {images.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">{labels.noImagesSelected}</p>
      )}
    </div>
  );
}; 