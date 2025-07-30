// Utility functions for handling media files

export interface MediaFile {
  data: string // Base64 encoded data
  filename: string
  originalName: string
  mimeType: string
  size: number
  uploadedAt?: Date
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(",")[1]
        resolve(base64)
      } else {
        reject(new Error("Failed to convert file to base64"))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export function base64ToDataURL(base64: string, mimeType: string): string {
  return `data:${mimeType};base64,${base64}`
}

export function validateFileType(file: File): boolean {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    // Videos
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/webm",
    "video/quicktime",
  ]

  return allowedTypes.includes(file.type)
}

export function validateFileSize(file: File, maxSizeMB = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function isVideoFile(mimeType: string): boolean {
  return mimeType.startsWith("video/")
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith("image/")
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split(".").pop()
  return `${timestamp}-${randomString}.${extension}`
}
