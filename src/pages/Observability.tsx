
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

// Import our new components
import ObservabilityHeader from '@/components/observability/ObservabilityHeader';
import OverviewTab from '@/components/observability/OverviewTab';
import PerformanceTab from '@/components/observability/PerformanceTab';
import TemperatureTab from '@/components/observability/TemperatureTab';
import WastageTab from '@/components/observability/WastageTab';
import CostsTab from '@/components/observability/CostsTab';
import AlertsTab from '@/components/observability/AlertsTab';
import OptimizationTab from '@/components/observability/OptimizationTab';

const Observability = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [realtimeMonitoring, setRealtimeMonitoring] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (realtimeMonitoring) {
      interval = setInterval(() => {
        console.log('Fetching real-time monitoring data...');
      }, 10000);
      
      toast({
        title: "Real-time monitoring enabled",
        description: "Data will refresh every 10 seconds"
      });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [realtimeMonitoring]);

  const handleExportData = () => {
    toast({
      title: "Exporting data",
      description: `Preparing ${exportFormat.toUpperCase()} export of current view`
    });
  };

  return (
    <DashboardLayout
      title="Observability & Insights"
      description="Monitor, compare, and optimize resource usage"
    >
      <div className="space-y-6">
        <ObservabilityHeader 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          realtimeMonitoring={realtimeMonitoring}
          setRealtimeMonitoring={setRealtimeMonitoring}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          handleExportData={handleExportData}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="wastage">Resource Wastage</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceTab />
          </TabsContent>
          
          <TabsContent value="temperature">
            <TemperatureTab />
          </TabsContent>
          
          <TabsContent value="wastage">
            <WastageTab />
          </TabsContent>
          
          <TabsContent value="costs">
            <CostsTab />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AlertsTab />
          </TabsContent>
          
          <TabsContent value="optimization">
            <OptimizationTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Observability;
