"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Download, Share2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

export function QrCodeModal({ isOpen, onClose, qrCode }) {
  const { toast } = useToast()
  const [qrSize, setQrSize] = useState(300)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBackground, setQrBackground] = useState("#FFFFFF")
  const [qrFormat, setQrFormat] = useState("png")
  const [qrErrorCorrection, setQrErrorCorrection] = useState("M")

  const handleDownload = () => {
    // In a real app, this would generate and download the QR code
    toast({
      title: "QR Code Downloaded",
      description: `QR code for "${qrCode?.name}" has been downloaded as ${qrFormat.toUpperCase()}.`,
    })
  }

  const handleShare = () => {
    // In a real app, this would share the QR code
    toast({
      title: "QR Code Shared",
      description: `A shareable link for "${qrCode?.name}" QR code has been copied to clipboard.`,
    })
  }

  if (!qrCode) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>QR Code for {qrCode.name}</DialogTitle>
          <DialogDescription>Customize and download the QR code for this exhibit.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="flex flex-col items-center justify-center py-4">
            <div
              className="border rounded-lg p-4 flex items-center justify-center"
              style={{ width: `${qrSize}px`, height: `${qrSize}px`, backgroundColor: qrBackground }}
            >
              <QrCode size={qrSize * 0.8} color={qrColor} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">QR ID: {qrCode.id}</p>
              <p className="text-sm text-muted-foreground">Scans: {qrCode.scans || 0}</p>
            </div>
          </TabsContent>
          <TabsContent value="customize" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[qrSize]}
                  min={100}
                  max={500}
                  step={10}
                  onValueChange={(value) => setQrSize(value[0])}
                  className="flex-1"
                />
                <span className="text-sm w-12 text-right">{qrSize}px</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">QR Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrBackground}
                    onChange={(e) => setQrBackground(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={qrBackground}
                    onChange={(e) => setQrBackground(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select value={qrFormat} onValueChange={setQrFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Error Correction</label>
                <Select value={qrErrorCorrection} onValueChange={setQrErrorCorrection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select error correction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download {qrFormat.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
