
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const InferenceConfig = () => {
  return (
    <DashboardLayout
      title="Inference Configuration"
      description="Deploy and monitor inference endpoints"
    >
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Inference Endpoint Setup</h2>
          <p className="text-muted-foreground mb-6">
            This page is under construction. Soon you'll be able to deploy models with low latency and full observability.
          </p>
          <div className="bg-muted/40 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">Coming soon: Model registry, endpoint builder, latency SLA settings, and token streaming visualization.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InferenceConfig;
