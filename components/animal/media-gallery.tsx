"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface MediaFile {
  id: string
  name: string
  url: string
  type: string
}

interface MediaGalleryProps {
  media: MediaFile[]
  type: "images" | "videos" | "arModels"
}

export function MediaGallery({ media, type }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null)

  if (media.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-40">
          <p className="text-gray-500">No {type} available for this animal.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item.id} className="cursor-pointer group" onClick={() => setSelectedMedia(item)}>
            <div className="aspect-square relative overflow-hidden rounded-md border">
              <Image
                src={item.url || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {type === "videos" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge>Video</Badge>
                </div>
              )}
              {type === "arModels" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge>3D Model</Badge>
                </div>
              )}
            </div>
            <p className="text-sm mt-1 truncate">{item.name}</p>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMedia?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedMedia && type === "images" && (
              <div className="relative h-[60vh]">
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {selectedMedia && type === "videos" && (
              <div className="relative aspect-video">
                {/* In a real app, this would be a video player */}
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge className="text-lg px-4 py-2">Video Player</Badge>
                </div>
              </div>
            )}
            {selectedMedia && type === "arModels" && (
              <div className="relative aspect-square">
                {/* In a real app, this would be a 3D model viewer */}
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge className="text-lg px-4 py-2">3D Model Viewer</Badge>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
