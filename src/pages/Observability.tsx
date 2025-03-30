
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Activity, Database, Monitor, Calendar, Clock, Gauge, Download, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import GPUUtilizationChart from '@/components/dashboard/GPUUtilizationChart';
import ResourceUsageBarChart from '@/components/observability/ResourceUsageBarChart';
import CostBreakdownChart from '@/components/observability/CostBreakdownChart';
import AlertHistoryTable from '@/components/observability/AlertHistoryTable';
import SystemHealthSummary from '@/components/observability/SystemHealthSummary';

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

// Mock data for cost optimization recommendations
const costOptimizations = [
  { 
    id: 1, 
    title: 'Underutilized GPUs', 
    description: 'Consider downgrading 3 A100 GPUs to V100s for batch processing tasks', 
    potentialSavings: '$450/month', 
    impact: 'low', 
    status: 'pending'
  },
  { 
    id: 2, 
    title: 'Right-size instances', 
    description: 'Switch development workloads to spot instances for 70% cost reduction', 
    potentialSavings: '$800/month', 
    impact: 'medium', 
    status: 'pending'
  },
  { 
    id: 3, 
    title: 'Scheduled shutdowns', 
    description: 'Implement auto-shutdown for non-production clusters during off-hours', 
    potentialSavings: '$1,200/month', 
    impact: 'high', 
    status: 'implemented'
  },
];

const Observability = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [realtimeMonitoring, setRealtimeMonitoring] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');

  // Simulate real-time data updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (realtimeMonitoring) {
      interval = setInterval(() => {
        // In a real application, this would fetch updated data
        console.log('Fetching real-time monitoring data...');
      }, 10000); // Update every 10 seconds
      
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
    // In a real app, this would trigger a data export
  };
  
  const applyCostOptimization = (id: number) => {
    toast({
      title: "Optimization scheduled",
      description: "Changes will be applied during the next maintenance window"
    });
    // In a real app, this would schedule the optimization
  };

  return (
    <DashboardLayout
      title="Observability & Insights"
      description="Monitor, compare, and optimize resource usage"
    >
      <div className="space-y-6">
        {/* Control Panel */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2 items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="realtime" 
                checked={realtimeMonitoring}
                onCheckedChange={setRealtimeMonitoring}
              />
              <Label htmlFor="realtime">Real-time</Label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Export as" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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

            {/* System Health Summary */}
            <SystemHealthSummary />

            {/* GPU Utilization Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  GPU Utilization
                </CardTitle>
                <CardDescription>
                  Resource usage patterns over the {timeRange === '24h' ? 'last 24 hours' : timeRange}
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
                            alert.severity === 'warning' ? 'outline' : 'secondary'
                          } className={
                            alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''
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
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <ResourceUsageBarChart />
            
            {/* Job Cost Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Job Performance Analysis
                </CardTitle>
                <CardDescription>
                  Resource efficiency and performance metrics for recent jobs
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
          </TabsContent>
          
          {/* Cost Analysis Tab */}
          <TabsContent value="costs" className="space-y-6">
            <CostBreakdownChart />
            
            {/* Cost Distribution */}
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
          </TabsContent>
          
          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <AlertHistoryTable />
            
            {/* Alert Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Customize your observability alert thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>GPU Temperature Threshold</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="70"
                          max="95"
                          defaultValue="85"
                          className="w-full"
                        />
                        <span className="w-12 text-center">85°C</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GPU Utilization Alert</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="5"
                          max="30"
                          defaultValue="20"
                          className="w-full"
                        />
                        <span className="w-16 text-center">&lt; 20%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Storage Warning</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="60"
                          max="95"
                          defaultValue="85"
                          className="w-full"
                        />
                        <span className="w-16 text-center">&gt; 85%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cost Threshold</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1000"
                          max="10000"
                          step="500"
                          defaultValue="5000"
                          className="w-full"
                        />
                        <span className="w-16 text-center">$5000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="slack-notifications" defaultChecked />
                    <Label htmlFor="slack-notifications">Send critical alerts to Slack</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="email-digests" defaultChecked />
                    <Label htmlFor="email-digests">Send daily alert digests via email</Label>
                  </div>
                  
                  <Button className="mt-4">Save Alert Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            {/* Cost Optimization Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Cost Optimization Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated recommendations to reduce costs and improve efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {costOptimizations.map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{recommendation.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                        </div>
                        <Badge 
                          className={
                            recommendation.status === 'implemented' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }
                        >
                          {recommendation.status === 'implemented' ? 'Implemented' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <div className="flex items-center">
                            <Gauge className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              Impact: 
                              <span className={
                                recommendation.impact === 'high' ? 'text-green-600 dark:text-green-400' :
                                recommendation.impact === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-blue-600 dark:text-blue-400'
                              }> {recommendation.impact}</span>
                            </span>
                          </div>
                          <div className="text-sm font-semibold mt-1">
                            Potential Savings: {recommendation.potentialSavings}
                          </div>
                        </div>
                        {recommendation.status !== 'implemented' && (
                          <Button 
                            size="sm" 
                            onClick={() => applyCostOptimization(recommendation.id)}
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Observability;
