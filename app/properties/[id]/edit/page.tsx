"use client";

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import PropertyEditForm from '@/components/pages/properties/ui/PropertyEditForm';
import { useParams } from 'next/navigation';

export default function EditPropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;

  return (
    <DashboardLayout>
      <PropertyEditForm propertyId={propertyId} />
    </DashboardLayout>
  );
} 