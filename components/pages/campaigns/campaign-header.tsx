import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CampaignHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900"> أنشئ حملاتك الآن</h1>
        <p className="text-gray-600">أنشئ حملاتك الآن وأدارها بسهولة</p>
      </div>
      <Link href="/campaigns/create">
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          أنشئ حملة
        </Button>
      </Link>
    </div>
  );
}
