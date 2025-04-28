"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface FileUploaderProps {
  onUpload: (files: File[]) => void
  accept: string
  multiple?: boolean
  label: string
}

export function FileUploader({ onUpload, accept, multiple = false, label }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      onUpload(files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      onUpload(files)
      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <Card className={`border-2 border-dashed ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300"}`}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
          id="file-upload"
        />

        <div
          className="w-full h-32 flex flex-col items-center justify-center cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-xs text-gray-400">Drag and drop or click to browse</p>
          {accept && <p className="text-xs text-gray-400 mt-1">Accepted formats: {accept.replace("*", "all")}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
