import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DeleteConfirmationDialogProps } from "@/types/property"

export const DeleteConfirmationDialog = ({
  property,
  isOpen,
  onOpenChange,
  onConfirm
}: DeleteConfirmationDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-red-500" />
          Confirm Deletion
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete "{property?.title || "this property"}"? 
          This action cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Property
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
) 