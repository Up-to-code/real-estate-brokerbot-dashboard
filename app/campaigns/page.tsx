import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  CampaignHeader,
  CampaignCard,
} from "@/components/pages/campaigns";
import { Campaign } from "@/types/campaign";
import { ClientSideCampaignList } from "@/components/pages/campaigns/client-side-campaign-list";

async function getCampaigns(): Promise<Campaign[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store' // This ensures fresh data on each request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }

  const data = await response.json();
  return data.data;
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <CampaignHeader />
        <ClientSideCampaignList initialCampaigns={campaigns} />
      </div>
    </DashboardLayout>
  );
}
