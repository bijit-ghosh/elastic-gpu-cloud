
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const DevTools = () => {
  return (
    <DashboardLayout
      title="Developer Tools"
      description="Resources and tools for GPU workload development"
    >
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Developer Environment</h2>
          <p className="text-muted-foreground mb-6">
            This page is under construction. Soon you'll have access to development tools and workflow integrations.
          </p>
          <div className="bg-muted/40 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">Coming soon: Jupyter/VSCode integration, Ray cluster visualizer, custom CRD editor, and SDK playground.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DevTools;
