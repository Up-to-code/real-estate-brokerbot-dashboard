import { QRCodeSVG } from 'qrcode.react'
import { QrCode, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QRCodeDialogProps } from "@/types/property"

export const QRCodeDialog = ({ 
  property,
  isOpen,
  onOpenChange,
  onDownload,
  onShare
}: QRCodeDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code - {property.title || "Property"}
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg">
          <QRCodeSVG
            id={`qr-${property.id}`}
            value={`${typeof window !== 'undefined' ? window.location.origin : 'https://example.com'}/properties/${property.id}`}
            size={200}
            level="M"
            includeMargin={true}
          />
        </div>
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onDownload(property)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onShare(property)}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
) 