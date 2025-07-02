// UploadThing configuration
export const uploadConfig = {
  endpoint: process.env.NEXT_PUBLIC_UPLOADTHING_URL || "http://localhost:3001/upload",
  maxFileSize: "4MB",
  allowedFileTypes: ["image/jpeg", "image/png", "image/webp"],
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach((file, index) => {
    formData.append(`file-${index}`, file)
  })

  try {
    const response = await fetch(uploadConfig.endpoint, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const result = await response.json()
    return result.urls || []
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}
