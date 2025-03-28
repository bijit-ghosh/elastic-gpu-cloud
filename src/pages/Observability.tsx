
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Activity, Database, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GPUUtilizationChart from '@/components/dashboard/GPUUtilizationChart';

// Mock data for system alerts
const systemAlerts = [
  { severity: 'critical', message: 'GPU #4 temperature exceeds 85°C', time: '10 minutes ago', status: 'active' },
  { severity: 'warning', message: 'Storage usage above 85% threshold', time: '1 hour ago', status: 'active' },
  { severity: 'info', message: 'Training job "bert-finetune" completed', time: '2 hours ago', status: 'resolved' },
  { severity: 'warning', message: 'Network latency spike detected', time: '3 hours ago', status: 'resolved' }
];

// Mock data for job metrics
const jobMetrics = [
  { name: 'resnet50-training', type: 'Training', gpus: 4, runtime: '18h 45m', efficiency: '92%', cost: '$214.50' },
  { name: 'llama2-finetuning', type: 'Fine-tuning', gpus: 8, runtime: '24h 12m', efficiency: '88%', cost: '$520.80' },
  { name: 'stable-diffusion', type: 'Inference', gpus: 2, runtime: '72h 30m', efficiency: '78%', cost: '$350.40' },
  { name: 'whisper-transcription', type: 'Batch', gpus: 1, runtime: '6h 15m', efficiency: '95%', cost: '$28.20' }
];

// Mock data for system metrics
const systemMetrics = [
  { label: 'Total GPU Hours', value: '12,450', trend: '+8% vs. last week' },
  { label: 'Avg. Utilization', value: '76%', trend: '+2% vs. last week' },
  { label: 'Completed Jobs', value: '285', trend: '+15% vs. last week' },
  { label: 'Active Alerts', value: '3', trend: '-1 vs. last week' }
];

const Observability = () => {
  return (
    <DashboardLayout
      title="Observability & Insights"
      description="Monitor, compare, and optimize resource usage"
    >
      <div className="grid gap-6">
        {/* System Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="glassmorphism">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <span className="text-xs text-muted-foreground">{metric.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GPU Utilization Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              GPU Utilization
            </CardTitle>
            <CardDescription>
              Resource usage patterns over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GPUUtilizationChart />
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="mr-2 h-5 w-5 text-primary" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Active and recent system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemAlerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant={
                        alert.severity === 'critical' ? 'destructive' :
                        alert.severity === 'warning' ? 'warning' : 'secondary'
                      }>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell>{alert.time}</TableCell>
                    <TableCell>
                      <Badge variant={alert.status === 'active' ? 'outline' : 'secondary'}>
                        {alert.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Job Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Job Cost Analysis
            </CardTitle>
            <CardDescription>
              Resource efficiency and cost metrics for recent jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>GPUs</TableHead>
                  <TableHead>Runtime</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobMetrics.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{job.gpus}</TableCell>
                    <TableCell>{job.runtime}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: job.efficiency }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{job.efficiency}</span>
                      </div>
                    </TableCell>
                    <TableCell>{job.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <Monitor className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                Grafana Dashboards
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Interactive visualizations and custom metrics panels
              </p>
              <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/50">
                12 dashboards available
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                System Health
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Real-time cluster and node monitoring
              </p>
              <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
                98% uptime this month
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <Database className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                Cost Explorer
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Resource usage cost analysis and optimization
              </p>
              <Badge variant="outline" className="bg-green-100/50 dark:bg-green-900/50">
                $12,450 tracked this month
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Observability;
