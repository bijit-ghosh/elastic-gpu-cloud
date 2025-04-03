import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Activity, Database, Monitor, Calendar, Clock, Gauge, Download, BarChart3, Thermometer, AlertCircle } from 'lucide-react';
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from 'recharts';

const systemAlerts = [
  { severity: 'critical', message: 'GPU #4 temperature exceeds 85°C', time: '10 minutes ago', status: 'active' },
  { severity: 'warning', message: 'Storage usage above 85% threshold', time: '1 hour ago', status: 'active' },
  { severity: 'info', message: 'Training job "bert-finetune" completed', time: '2 hours ago', status: 'resolved' },
  { severity: 'warning', message: 'Network latency spike detected', time: '3 hours ago', status: 'resolved' }
];

const jobMetrics = [
  { name: 'resnet50-training', type: 'Training', gpus: 4, runtime: '18h 45m', efficiency: '92%', cost: '$214.50' },
  { name: 'llama2-finetuning', type: 'Fine-tuning', gpus: 8, runtime: '24h 12m', efficiency: '88%', cost: '$520.80' },
  { name: 'stable-diffusion', type: 'Inference', gpus: 2, runtime: '72h 30m', efficiency: '78%', cost: '$350.40' },
  { name: 'whisper-transcription', type: 'Batch', gpus: 1, runtime: '6h 15m', efficiency: '95%', cost: '$28.20' }
];

const systemMetrics = [
  { label: 'Total GPU Hours', value: '12,450', trend: '+8% vs. last week' },
  { label: 'Avg. Utilization', value: '76%', trend: '+2% vs. last week' },
  { label: 'Avg. Temperature', value: '68°C', trend: '+3°C vs. last week' },
  { label: 'Active Alerts', value: '3', trend: '-1 vs. last week' }
];

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

const temperatureData = [
  { time: '00:00', temp: 66, threshold: 75 },
  { time: '02:00', temp: 65, threshold: 75 },
  { time: '04:00', temp: 63, threshold: 75 },
  { time: '06:00', temp: 64, threshold: 75 },
  { time: '08:00', temp: 68, threshold: 75 },
  { time: '10:00', temp: 72, threshold: 75 },
  { time: '12:00', temp: 74, threshold: 75 },
  { time: '14:00', temp: 76, threshold: 75 },
  { time: '16:00', temp: 73, threshold: 75 },
  { time: '18:00', temp: 71, threshold: 75 },
  { time: '20:00', temp: 70, threshold: 75 },
  { time: '22:00', temp: 67, threshold: 75 },
];

const resourceWastageData = [
  { resource: 'GPU', allocated: 100, used: 76, wasted: 24 },
  { resource: 'CPU', allocated: 100, used: 68, wasted: 32 },
  { resource: 'Memory', allocated: 100, used: 82, wasted: 18 },
  { resource: 'Storage', allocated: 100, used: 91, wasted: 9 },
];

const wastageMetrics = [
  { name: 'Idle GPU Instances', value: '$2,450', percentage: '18%', description: 'GPUs running with <15% utilization' },
  { name: 'Overprovisioned Memory', value: '$980', percentage: '12%', description: 'Memory allocated but rarely used' },
  { name: 'Orphaned Storage', value: '$345', percentage: '8%', description: 'Storage for completed or abandoned jobs' }
];

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
  
  const applyCostOptimization = (id: number) => {
    toast({
      title: "Optimization scheduled",
      description: "Changes will be applied during the next maintenance window"
    });
  };

  return (
    <DashboardLayout
      title="Observability & Insights"
      description="Monitor, compare, and optimize resource usage"
    >
      <div className="space-y-6">
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
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="wastage">Resource Wastage</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
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

            <SystemHealthSummary />

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
          
          <TabsContent value="performance" className="space-y-6">
            <ResourceUsageBarChart />
            
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
          
          <TabsContent value="temperature" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-red-500" />
                  GPU Temperature Monitoring
                </CardTitle>
                <CardDescription>
                  24-hour temperature readings for all GPU instances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={temperatureData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.1} />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        domain={[50, 85]}
                        label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                      />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '8px', border: 'none' }} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#ff5252"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Temperature"
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="threshold"
                        stroke="#ffab00"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Warning Threshold"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Current Status</h4>
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Thermometer className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">72°C Average</div>
                        <div className="text-xs text-muted-foreground">Approaching warning threshold</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Peak Temperature</h4>
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">76°C at 14:00</div>
                        <div className="text-xs text-muted-foreground">1°C above warning threshold</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Cooling Status</h4>
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Cooling at 85%</div>
                        <div className="text-xs text-muted-foreground">Auto-scaled in response to load</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/50">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Temperature Alert</h4>
                      <p className="text-sm text-yellow-800/80 dark:text-yellow-400/80 mt-1">
                        GPU temperatures exceeded the warning threshold (75°C) at 14:00. Automatic cooling measures were applied. 
                        Consider reducing workload or checking cooling systems if this persists.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Temperature Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <div className="text-sm">Daily Average</div>
                      <div className="font-medium">68.7°C</div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="text-sm">Weekly Trend</div>
                      <div className="flex items-center text-amber-500">
                        <span className="font-medium">+2.3°C</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6-6 6 6"/><path d="M6 12h12"/><path d="m6 15 6 6 6-6"/></svg>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="text-sm">Thermal Throttling Events</div>
                      <div className="font-medium">3 times</div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div className="text-sm">Most Affected GPU</div>
                      <div className="font-medium">GPU #2</div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cooling Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Primary Cooling</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Secondary Cooling</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Ambient Temperature</span>
                        <span className="text-sm font-medium">24°C</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs">1</span>
                      </div>
                      <span className="text-sm">Schedule intensive workloads during cooler periods (night time)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs">2</span>
                      </div>
                      <span className="text-sm">Inspect server room cooling system for possible maintenance needs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs">3</span>
                      </div>
                      <span className="text-sm">Consider distributing loads more evenly across available resources</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">View Detailed Analysis</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="wastage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                  Resource Allocation vs. Utilization
                </CardTitle>
                <CardDescription>
                  Analyzing resource efficiency and identifying wastage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={resourceWastageData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.1} />
                      <XAxis dataKey="resource" tick={{ fontSize: 12 }} />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                      />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '8px', border: 'none' }} />
                      <Legend />
                      <Bar dataKey="used" name="Used" stackId="a" fill="#4ade80" />
                      <Bar dataKey="wasted" name="Unused/Wasted" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {wastageMetrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs px-2 py-1 rounded">
                            {metric.percentage}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{metric.name}</h3>
                        <p className="text-2xl font-bold mb-2">{metric.value}</p>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Wastage Reduction Opportunities</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resource Type</TableHead>
                        <TableHead>Current Utilization</TableHead>
                        <TableHead>Recommended Action</TableHead>
                        <TableHead>Potential Savings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>GPU Instances</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                              <div className="h-2 bg-red-500 rounded-full" style={{ width: '38%' }}></div>
                            </div>
                            <span>38%</span>
                          </div>
                        </TableCell>
                        <TableCell>Reduce GPU count by 4 units</TableCell>
                        <TableCell className="font-medium text-green-600 dark:text-green-400">$1,240/month</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Memory Allocation</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                              <div className="h-2 bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                            <span>62%</span>
                          </div>
                        </TableCell>
                        <TableCell>Rightsize memory allocation by 30%</TableCell>
                        <TableCell className="font-medium text-green-600 dark:text-green-400">$680/month</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Storage Volumes</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                              <div className="h-2 bg-amber-500 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                            <span>58%</span>
                          </div>
                        </TableCell>
                        <TableCell>Clean up 1.2TB of abandoned data</TableCell>
                        <TableCell className="font-medium text-green-600 dark:text-green-400">$320/month</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 p-4 border rounded-md bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-400">Potential Annual Savings</h4>
                      <p className="text-2xl font-bold mt-1 text-green-700 dark:text-green-300">$26,880</p>
                      <p className="text-sm text-green-800/80 dark:text-green-400/80 mt-1">
                        Implementing all recommendations could result in significant cost savings.
                        <Button variant="link" className="h-auto p-0 ml-1 text-green-700 dark:text-green-300">
                          Create optimization plan
                        </Button>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="costs" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <AlertHistoryTable />
            
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
          
          <TabsContent value="optimization" className="space-y-6">
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
