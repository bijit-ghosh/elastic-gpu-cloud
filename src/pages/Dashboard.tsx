
import React from 'react';
import { 
  ArrowRight, AlertCircle, Cpu, BarChart, 
  Terminal, ExternalLink, Code, Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GPUUtilizationChart from '@/components/dashboard/GPUUtilizationChart';
import JobOverviewPanel from '@/components/dashboard/JobOverviewPanel';
import CostChart from '@/components/dashboard/CostChart';
import AlertPanel from '@/components/dashboard/AlertPanel';

const Dashboard = () => {
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Monitor your GPU workloads and resource utilization"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <JobOverviewPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 glassmorphism">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">GPU Health & Utilization</CardTitle>
              <CardDescription>Real-time performance metrics across clusters</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Detailed View
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <GPUUtilizationChart />
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-lg">Quick Launch</CardTitle>
            <CardDescription>Start your environment or job</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="flex items-center justify-center py-6" variant="outline">
                <div className="flex flex-col items-center">
                  <Terminal className="h-6 w-6 mb-2" />
                  <span>Terminal</span>
                </div>
              </Button>
              <Button className="flex items-center justify-center py-6" variant="outline">
                <div className="flex flex-col items-center">
                  <Code className="h-6 w-6 mb-2" />
                  <span>VS Code</span>
                </div>
              </Button>
              <Button className="flex items-center justify-center py-6" variant="outline">
                <div className="flex flex-col items-center">
                  <ExternalLink className="h-6 w-6 mb-2" />
                  <span>Jupyter</span>
                </div>
              </Button>
              <Button className="flex items-center justify-center py-6" variant="outline">
                <div className="flex flex-col items-center">
                  <Database className="h-6 w-6 mb-2" />
                  <span>YAML Job</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glassmorphism">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Cost & Carbon Stats</CardTitle>
              <CardDescription>Daily and per-job resource consumption</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">Week</Button>
              <Button variant="outline" size="sm">Month</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <CostChart />
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Active Alerts</CardTitle>
              <CardDescription>Bottlenecks and anomalies</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <AlertPanel />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
