import { DashboardLayout } from '@/components/layout/dashboard-layout';
import PropertyForm from '@/components/pages/properties/ui/PropertyForm'
import React from 'react'

export default function page() {
  return (
    <DashboardLayout> 
      <PropertyForm />
    </DashboardLayout>
  );
}
