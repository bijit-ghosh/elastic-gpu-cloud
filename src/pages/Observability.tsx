
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Observability = () => {
  return (
    <DashboardLayout
      title="Observability & Insights"
      description="Monitor, compare, and optimize resource usage"
    >
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Monitoring Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            This page is under construction. Soon you'll be able to access comprehensive monitoring and insights.
          </p>
          <div className="bg-muted/40 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">Coming soon: Multi-tenant overview, GPU utilization heatmap, job replay, and anomaly detection.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Observability;
