
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CostBreakdownChart from '@/components/observability/CostBreakdownChart';

const CostsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <CostBreakdownChart />
      
      <Card>
        <CardHeader>
          <CardTitle>Cost Distribution by Resource Type</CardTitle>
          <CardDescription>Breakdown of costs across different resource types</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">GPU Instances</span>
              <span className="text-2xl font-bold">$8,245.60</span>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">75% of total</span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Storage</span>
              <span className="text-2xl font-bold">$1,650.20</span>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">15% of total</span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Network & Others</span>
              <span className="text-2xl font-bold">$1,100.15</span>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">10% of total</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Monthly Total</span>
              <span className="text-2xl font-bold">$10,995.95</span>
            </div>
            <div className="mt-2 flex justify-between items-center text-sm text-muted-foreground">
              <span>Previous Month: $9,876.50</span>
              <span className="text-red-500">+11.3% MoM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostsTab;
