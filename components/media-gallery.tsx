"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { base64ToDataURL, isVideoFile, type MediaFile } from "@/lib/utils/media"

interface MediaGalleryProps {
  media: MediaFile[]
  className?: string
}

export default function MediaGallery({ media, className = "" }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!media || media.length === 0) return null

  const openModal = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : media.length - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < media.length - 1 ? selectedIndex + 1 : 0)
    }
  }

  const getMediaDataURL = (mediaFile: MediaFile) => {
    return base64ToDataURL(mediaFile.data, mediaFile.mimeType)
  }

  return (
    <>
      <div className={`grid gap-4 ${className}`}>
        {media.length === 1 ? (
          // Single media item - full width
          <div className="relative aspect-video w-full cursor-pointer" onClick={() => openModal(0)}>
            {isVideoFile(media[0].mimeType) ? (
              <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" poster="/placeholder.svg?height=400&width=600&text=Video">
                  <source src={getMediaDataURL(media[0])} type={media[0].mimeType} />
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-16 w-16 text-white" />
                </div>
              </div>
            ) : (
              <Image
                src={getMediaDataURL(media[0]) || "/placeholder.svg"}
                alt={media[0].originalName}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            )}
          </div>
        ) : media.length === 2 ? (
          // Two items - side by side
          <div className="grid grid-cols-2 gap-4">
            {media.map((item, index) => (
              <div key={index} className="relative aspect-video cursor-pointer" onClick={() => openModal(index)}>
                {isVideoFile(item.mimeType) ? (
                  <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=300&width=400&text=Video"
                    >
                      <source src={getMediaDataURL(item)} type={item.mimeType} />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getMediaDataURL(item) || "/placeholder.svg"}
                    alt={item.originalName}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Three or more items - grid layout
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {media.slice(0, 5).map((item, index) => (
              <div key={index} className="relative aspect-square cursor-pointer" onClick={() => openModal(index)}>
                {isVideoFile(item.mimeType) ? (
                  <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=200&width=200&text=Video"
                    >
                      <source src={getMediaDataURL(item)} type={item.mimeType} />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getMediaDataURL(item) || "/placeholder.svg"}
                    alt={item.originalName}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                )}
                {index === 4 && media.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-semibold">+{media.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing media */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl w-full p-0">
          {selectedIndex !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>

              {media.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              <div className="aspect-video w-full">
                {isVideoFile(media[selectedIndex].mimeType) ? (
                  <video className="w-full h-full object-contain bg-black" controls autoPlay>
                    <source src={getMediaDataURL(media[selectedIndex])} type={media[selectedIndex].mimeType} />
                  </video>
                ) : (
                  <Image
                    src={getMediaDataURL(media[selectedIndex]) || "/placeholder.svg"}
                    alt={media[selectedIndex].originalName}
                    fill
                    className="object-contain bg-black"
                    unoptimized
                  />
                )}
              </div>

              {media.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedIndex + 1} / {media.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
