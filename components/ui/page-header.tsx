import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    {subtitle && <p className="text-gray-500">{subtitle}</p>}
  </div>
); 