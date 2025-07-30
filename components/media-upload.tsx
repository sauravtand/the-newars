"use client"

import type React from "react"
import { useState } from "react"
import { X, Upload, ImageIcon, Video, File, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  fileToBase64,
  validateFileType,
  validateFileSize,
  formatFileSize,
  generateUniqueFilename,
  type MediaFile,
} from "@/lib/utils/media"

interface MediaUploadProps {
  media: MediaFile[]
  onMediaChange: (media: MediaFile[]) => void
  maxFiles?: number
  maxSizeMB?: number
}

export default function MediaUpload({ media, onMediaChange, maxFiles = 5, maxSizeMB = 10 }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setUploadError(null)

    // Validate file count
    if (media.length + files.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)

    try {
      const processedFiles: MediaFile[] = []

      for (const file of files) {
        // Validate file type
        if (!validateFileType(file)) {
          throw new Error(`File type ${file.type} not supported. Supported: images and videos`)
        }

        // Validate file size
        if (!validateFileSize(file, maxSizeMB)) {
          throw new Error(`File ${file.name} is too large. Maximum size is ${maxSizeMB}MB`)
        }

        // Convert to base64
        const base64Data = await fileToBase64(file)

        const mediaFile: MediaFile = {
          data: base64Data,
          filename: generateUniqueFilename(file.name),
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          uploadedAt: new Date(),
        }

        processedFiles.push(mediaFile)
      }

      // Update media array
      onMediaChange([...media, ...processedFiles])

      toast({
        title: "Success",
        description: `${processedFiles.length} file(s) uploaded successfully`,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload files"
      setUploadError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index)
    onMediaChange(newMedia)
    setUploadError(null)
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (mimeType.startsWith("video/")) return <Video className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="media">Media Files (Images & Videos)</Label>
        <div className="mt-2">
          <Input
            id="media"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            disabled={isUploading || media.length >= maxFiles}
            className="border-red-200 focus:border-red-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload images and videos. Max {maxFiles} files, {maxSizeMB}MB each. Supported: JPG, PNG, GIF, WebP, MP4,
            AVI, MOV, WebM
          </p>
        </div>
      </div>

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {isUploading && (
        <div className="flex items-center space-x-2 text-blue-600">
          <Upload className="h-4 w-4 animate-spin" />
          <span>Processing files...</span>
        </div>
      )}

      {media.length > 0 && (
        <div className="space-y-2">
          <Label>
            Uploaded Media ({media.length}/{maxFiles})
          </Label>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            {media.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.mimeType)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.mimeType.split("/")[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMedia(index)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
