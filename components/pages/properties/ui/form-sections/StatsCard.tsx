import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { labels } from "../constants/labels";
import { PropertyFormData, PropertyStatus } from "../types/property-types";

interface StatsCardProps {
  properties: PropertyFormData[];
}

export const StatsCard = ({ properties }: StatsCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-3 bg-card rounded-lg shadow-sm border border-border"
          >
            <div className="text-3xl font-bold text-primary">{properties.length}</div>
            <div className="text-sm text-muted-foreground mt-1">{labels.totalProperties}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-3 bg-card rounded-lg shadow-sm border border-border"
          >
            <div className="text-3xl font-bold text-green-600">
              {properties.filter(p => p.status === PropertyStatus.AVAILABLE).length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{labels.available}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center p-3 bg-card rounded-lg shadow-sm border border-border"
          >
            <div className="text-3xl font-bold bg-primary">
              {properties.filter(p => p.isFeatured).length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{labels.featured}</div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}; 