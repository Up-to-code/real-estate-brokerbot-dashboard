"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { Template } from "@/store/templateStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: string;
  templateId?: string;
  clientCount: number;
  scheduledAt?: string;
  sentCount: number;
  message?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  template?: Template;
  onEdit?: (campaign: Campaign) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (status: string) => void;
}

export function CampaignCard({
  campaign,
  template,
  onEdit,
  onDelete,
  onStatusChange,
}: CampaignCardProps) {
  const getStatusStyle = (status: string) => {
    const base = "text-xs px-2 py-1 rounded-full font-medium";
    switch (status.toLowerCase()) {
      case "active":
        return `${base} bg-green-100 text-green-700`;
      case "completed":
        return `${base} bg-blue-100 text-blue-700`;
      case "paused":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "draft":
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const renderStatusButtons = () => {
    const status = campaign.status;
    const buttons = [];

    if (status === "draft") {
      buttons.push(
        <Button key="play" size="sm" variant="outline" onClick={() => onStatusChange?.("active")}>
          <PlayIcon className="w-4 h-4 text-green-600" />
        </Button>
      );
    }

    if (status === "active") {
      buttons.push(
        <Button key="pause" size="sm" variant="outline" onClick={() => onStatusChange?.("paused")}>
          <PauseIcon className="w-4 h-4 text-yellow-600" />
        </Button>
      );
    }

    if (status === "paused") {
      buttons.push(
        <Button key="resume" size="sm" variant="outline" onClick={() => onStatusChange?.("active")}>
          <PlayIcon className="w-4 h-4 text-green-600" />
        </Button>,
        <Button key="complete" size="sm" variant="outline" onClick={() => onStatusChange?.("completed")}>
          <StopIcon className="w-4 h-4 text-blue-600" />
        </Button>
      );
    }

    return <div className="flex flex-wrap gap-2">{buttons}</div>;
  };

  return (
    <Card className="shadow-sm border rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold truncate">{campaign.name}</CardTitle>
          <Badge className={getStatusStyle(campaign.status)}>{campaign.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          <strong>Template:</strong> {template?.name || "None"}
        </p>
        <p>
          <strong>Target Clients:</strong> {campaign.clientCount}
        </p>
        {campaign.scheduledAt && (
          <p>
            <strong>Scheduled:</strong> {new Date(campaign.scheduledAt).toLocaleString()}
          </p>
        )}
        {campaign.status !== "draft" && (
          <p>
            <strong>Sent Count:</strong> {campaign.sentCount}
          </p>
        )}

        <div className="flex flex-wrap justify-between items-center gap-2 pt-2 border-t mt-4">
          {renderStatusButtons()}
          <div className="flex gap-2">
            {onDelete && (
              <Button size="sm" variant="outline" onClick={() => onDelete(campaign.id)}>
                <TrashIcon className="w-4 h-4 text-red-600" />
              </Button>
            )}
            {onEdit && (
              <Button size="sm" variant="outline" onClick={() => onEdit(campaign)}>
                <PencilIcon className="w-4 h-4 text-gray-600" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">{campaign.status}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onStatusChange?.("active")}>Activate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("paused")}>Pause</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("completed")}>Complete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
