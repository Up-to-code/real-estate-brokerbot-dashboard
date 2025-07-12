"use client"
import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NoPermissionPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: 48, color: '#e53e3e', marginBottom: 16 }}>403 - No Permission</h1>
      <p style={{ fontSize: 20 }}>You do not have access to this page.</p>
    </div>
  );
}