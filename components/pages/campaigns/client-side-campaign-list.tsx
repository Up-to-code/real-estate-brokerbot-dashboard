"use client";

import { useState } from "react";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { CampaignSearch } from "./campaign-search";
import { CampaignCard } from "./campaign-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you're using sonner for toasts

interface ClientSideCampaignListProps {
  initialCampaigns: Campaign[];
}

export function ClientSideCampaignList({
  initialCampaigns,
}: ClientSideCampaignListProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    campaign: Campaign | null;
  }>({ open: false, campaign: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter campaigns by search term
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle status change
  const handleStatusChange = async (campaignId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${campaignId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update campaign status");
      }
      // Update local state
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === campaignId
            ? { ...campaign, status: newStatus as CampaignStatus }
            : campaign
        )
      );

      toast.success(`Campaign ${newStatus.toLowerCase()} successfully`);
    } catch (error) {
      console.error("Error updating campaign status:", error);
      toast.error("Failed to update campaign status");
    }
  };

  // Handle delete - just open dialog
  const handleDelete = (campaign: Campaign) => {
    setDeleteDialog({ open: true, campaign });
  };

  // Confirm delete - actual deletion happens here
  const confirmDelete = async () => {
    if (!deleteDialog.campaign) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${deleteDialog.campaign.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }

      // Update campaigns state - remove deleted campaign
      setCampaigns((prev) =>
        prev.filter((c) => c.id !== deleteDialog.campaign!.id)
      );

      toast.success("Campaign deleted successfully");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign");
    } finally {
      setIsDeleting(false);
      setDeleteDialog({ open: false, campaign: null });
    }
  };

  const handleEdit = (campaign: Campaign) => {
    router.push(`/campaigns/${campaign.id}/edit`);
  };

  return (
    <div className="space-y-6">
      <CampaignSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? "No campaigns found matching your search."
              : "No campaigns found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDelete={() => handleDelete(campaign)}
              onStatusChange={(status) =>
                handleStatusChange(campaign.id, status)
              }
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, campaign: deleteDialog.campaign })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.campaign?.name}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
