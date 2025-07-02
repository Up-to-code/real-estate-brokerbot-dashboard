"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/hooks/use-upload-thing";
import { labels } from "../constants/labels";
import { X } from "lucide-react";

interface FileUploadDirectUploadDemoProps {
  onUploadComplete?: (urls: string[]) => void;
  existingImages?: string[];
  onRemoveImage?: (index: number) => void;
}

export function FileUploadDirectUploadDemo({ 
  onUploadComplete, 
  existingImages = [], 
  onRemoveImage 
}: FileUploadDirectUploadDemoProps) {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const urls = res?.map((r) => r.url) || [];
      onUploadComplete?.(urls);
    },
    onUploadError: (error) => {
      console.error("Error uploading:", error);
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await startUpload(acceptedFiles);
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/jpeg", "image/png", "image/gif"]),
    maxFiles: 10,
  });

  return (
    <div className="space-y-4">
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"}
        ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-primary">{labels.dropImagesHere}</p>
      ) : (
        <p>{labels.dragDropImages}</p>
      )}
      <p className="text-sm text-gray-500 mt-2">
        {labels.maxFilesInfo.replace("%s", "10")}
      </p>
      </div>

      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {existingImages.map((url, index) => (
            <div key={url} className="relative aspect-video rounded-lg overflow-hidden group">
              <img 
                src={url} 
                alt={`Property ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}