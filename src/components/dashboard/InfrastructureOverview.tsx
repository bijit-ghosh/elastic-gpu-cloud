
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cloud, HardDrive, CircleCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const infrastructureSummary = {
  providers: [
    { name: 'AWS', type: 'cloud', nodes: 3, regions: ['us-east-1', 'us-west-2', 'eu-west-1'], status: 'healthy' },
    { name: 'Azure', type: 'cloud', nodes: 1, regions: ['eastus2'], status: 'healthy' },
    { name: 'GCP', type: 'cloud', nodes: 1, regions: ['us-central1'], status: 'healthy' },
    { name: 'Datacenter', type: 'on-prem', nodes: 2, regions: ['NYC-DC1', 'ATL-DC2'], status: 'healthy' }
  ],
  gpuVendors: [
    { name: 'NVIDIA', count: 5, models: ['A100', 'H100', 'V100'] },
    { name: 'AMD', count: 1, models: ['MI250'] },
    { name: 'Intel', count: 1, models: ['Max 1550'] }
  ],
  availability: {
    overall: 99.95,
    byProvider: [
      { name: 'AWS', availability: 99.98 },
      { name: 'Azure', availability: 99.99 },
      { name: 'GCP', availability: 99.97 },
      { name: 'Datacenter', availability: 99.85 }
    ]
  }
};

const InfrastructureOverview = () => {
  return (
    <Card className="glassmorphism">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Infrastructure Overview</CardTitle>
        <CardDescription>
          Summary of compute resources across providers and vendors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Providers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {infrastructureSummary.providers.map((provider) => (
                <div key={provider.name} className="flex flex-col p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {provider.type === 'cloud' ? (
                        <Cloud className="h-4 w-4 text-blue-500" />
                      ) : (
                        <HardDrive className="h-4 w-4 text-purple-500" />
                      )}
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1 text-xs">
                      <CircleCheck className="h-3 w-3" />
                      {provider.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>{provider.nodes} nodes</div>
                    <div className="truncate">{provider.regions.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">GPU Vendors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {infrastructureSummary.gpuVendors.map((vendor) => (
                <div key={vendor.name} className="flex flex-col p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{vendor.name}</span>
                    <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                      {vendor.count} nodes
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.models.map((model) => (
                      <Badge key={model} variant="secondary" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Overall Availability</h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{infrastructureSummary.availability.overall}%</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Provider Distribution</h3>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs">Cloud: {infrastructureSummary.providers.filter(p => p.type === 'cloud').reduce((acc, p) => acc + p.nodes, 0)} nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs">On-Prem: {infrastructureSummary.providers.filter(p => p.type === 'on-prem').reduce((acc, p) => acc + p.nodes, 0)} nodes</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfrastructureOverview;
