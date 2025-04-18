import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { CloudLightning, Monitor, Activity, BarChart2, Cpu, RefreshCw, Plus, Clock, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InferenceModelDetails } from '@/components/inference/InferenceModelDetails';
import { CreateEndpointForm } from '@/components/inference/CreateEndpointForm';
import { DeploymentHistory } from '@/components/inference/DeploymentHistory';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for inference endpoints
const inferenceEndpoints = [
  {
    id: 'ep-1234',
    name: 'text-embedding-ada-002',
    status: 'active',
    modelSize: '1.5B',
    latency: '15ms',
    throughput: '120 req/s',
    lastDeployed: '2 hours ago',
    vendor: 'OpenAI',
    version: 'v2.1',
    quantization: 'FP16'
  },
  {
    id: 'ep-2345',
    name: 'gpt-3.5-turbo',
    status: 'active',
    modelSize: '175B',
    latency: '245ms',
    throughput: '45 req/s',
    lastDeployed: '1 day ago',
    vendor: 'OpenAI',
    version: 'v1.0',
    quantization: 'FP16'
  },
  {
    id: 'ep-3456',
    name: 'stable-diffusion-xl',
    status: 'idle',
    modelSize: '6.5B',
    latency: '1.2s',
    throughput: '8 req/s',
    lastDeployed: '5 days ago',
    vendor: 'Stability AI',
    version: 'v1.0',
    quantization: 'INT8'
  },
  {
    id: 'ep-4567',
    name: 'whisper-large-v2',
    status: 'provisioning',
    modelSize: '1.5B',
    latency: '180ms',
    throughput: '60 req/s',
    lastDeployed: 'Just now',
    vendor: 'OpenAI',
    version: 'v2.0',
    quantization: 'FP16'
  },
  {
    id: 'ep-5678',
    name: 'llama-2-70b',
    status: 'active',
    modelSize: '70B',
    latency: '320ms',
    throughput: '35 req/s',
    lastDeployed: '3 days ago',
    vendor: 'Meta',
    version: 'v1.0',
    quantization: 'INT4'
  }
];

// Mock data for inference metrics
const performanceMetrics = [
  { label: 'Total Inference Requests', value: '14.5M', trend: '+12%' },
  { label: 'Average Latency', value: '210ms', trend: '-5%' },
  { label: 'Success Rate', value: '99.98%', trend: '+0.1%' },
  { label: 'GPU Utilization', value: '72%', trend: '+8%' }
];

// Mock data for model categories
const modelCategories = {
  language: [
    { name: 'GPT-3.5-Turbo', size: '175B', latency: '245ms' },
    { name: 'LLaMA-2-70B', size: '70B', latency: '320ms' },
    { name: 'Mistral-7B', size: '7B', latency: '85ms' }
  ],
  vision: [
    { name: 'Stable Diffusion XL', size: '6.5B', latency: '1.2s' },
    { name: 'Midjourney-v5', size: '4.8B', latency: '950ms' },
    { name: 'CLIP-ViT-L-14', size: '300M', latency: '45ms' }
  ],
  audio: [
    { name: 'Whisper-Large-V2', size: '1.5B', latency: '180ms' },
    { name: 'Wav2Vec 2.0', size: '315M', latency: '75ms' },
    { name: 'MusicGen', size: '1.2B', latency: '420ms' }
  ]
};

// Mock data for endpoint performance history
const endpointPerformanceData = {
  'ep-1234': [
    { time: '00:00', latency: 15, throughput: 120, errorRate: 0.01 },
    { time: '01:00', latency: 14, throughput: 118, errorRate: 0.01 },
    { time: '02:00', latency: 16, throughput: 122, errorRate: 0.02 },
    { time: '03:00', latency: 15, throughput: 119, errorRate: 0.01 },
    { time: '04:00', latency: 17, throughput: 115, errorRate: 0.03 },
    { time: '05:00', latency: 14, throughput: 125, errorRate: 0.01 },
    { time: '06:00', latency: 13, throughput: 130, errorRate: 0.00 },
  ],
  'ep-2345': [
    { time: '00:00', latency: 248, throughput: 45, errorRate: 0.05 },
    { time: '01:00', latency: 252, throughput: 43, errorRate: 0.04 },
    { time: '02:00', latency: 245, throughput: 46, errorRate: 0.03 },
    { time: '03:00', latency: 240, throughput: 48, errorRate: 0.05 },
    { time: '04:00', latency: 242, throughput: 47, errorRate: 0.04 },
    { time: '05:00', latency: 238, throughput: 49, errorRate: 0.03 },
    { time: '06:00', latency: 235, throughput: 50, errorRate: 0.02 },
  ],
  'ep-3456': [
    { time: '00:00', latency: 1200, throughput: 8, errorRate: 0.10 },
    { time: '01:00', latency: 1180, throughput: 9, errorRate: 0.08 },
    { time: '02:00', latency: 1220, throughput: 7, errorRate: 0.12 },
    { time: '03:00', latency: 1190, throughput: 8, errorRate: 0.09 },
    { time: '04:00', latency: 1210, throughput: 8, errorRate: 0.11 },
    { time: '05:00', latency: 1180, throughput: 9, errorRate: 0.08 },
    { time: '06:00', latency: 1170, throughput: 9, errorRate: 0.07 },
  ],
  'ep-4567': [
    { time: '00:00', latency: 180, throughput: 60, errorRate: 0.02 },
    { time: '01:00', latency: 185, throughput: 58, errorRate: 0.03 },
    { time: '02:00', latency: 178, throughput: 61, errorRate: 0.02 },
    { time: '03:00', latency: 182, throughput: 59, errorRate: 0.03 },
    { time: '04:00', latency: 175, throughput: 62, errorRate: 0.01 },
    { time: '05:00', latency: 180, throughput: 60, errorRate: 0.02 },
    { time: '06:00', latency: 178, throughput: 61, errorRate: 0.02 },
  ],
  'ep-5678': [
    { time: '00:00', latency: 320, throughput: 35, errorRate: 0.04 },
    { time: '01:00', latency: 325, throughput: 34, errorRate: 0.05 },
    { time: '02:00', latency: 318, throughput: 36, errorRate: 0.03 },
    { time: '03:00', latency: 322, throughput: 35, errorRate: 0.04 },
    { time: '04:00', latency: 315, throughput: 37, errorRate: 0.02 },
    { time: '05:00', latency: 320, throughput: 35, errorRate: 0.04 },
    { time: '06:00', latency: 317, throughput: 36, errorRate: 0.03 },
  ]
};

const EndpointQuickView = ({ endpointId, onClose }) => {
  const endpoint = inferenceEndpoints.find(ep => ep.id === endpointId);
  const data = endpointPerformanceData[endpointId] || [];
  
  if (!endpoint) return null;
  
  const chartConfig = {
    latency: { theme: { light: '#7E69AB', dark: '#9b87f5' } },
    throughput: { theme: { light: '#0EA5E9', dark: '#38BDF8' } },
  };
  
  return (
    <div className="w-[380px]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">{endpoint.name}</h3>
        <Badge variant={
          endpoint.status === 'active' ? 'outline' :
          endpoint.status === 'idle' ? 'secondary' : 'default'
        } className={
          endpoint.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''
        }>
          {endpoint.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Latency</p>
          <p className="font-semibold">{endpoint.latency}</p>
        </div>
        <div className="bg-muted/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Throughput</p>
          <p className="font-semibold">{endpoint.throughput}</p>
        </div>
        <div className="bg-muted/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Model Size</p>
          <p className="font-semibold">{endpoint.modelSize}</p>
        </div>
        <div className="bg-muted/30 p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Quantization</p>
          <p className="font-semibold">{endpoint.quantization}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Performance Trend (Last 6 Hours)</p>
        <div className="h-32">
          <ChartContainer config={chartConfig} className="h-full">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="latency" 
                stroke="var(--color-latency)"
                name="Latency (ms)" 
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      <Button 
        onClick={() => onClose(endpoint.id)}
        className="w-full"
        variant="outline"
      >
        View Full Details <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

const InferenceConfig = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [hoverEndpoint, setHoverEndpoint] = useState<string | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Inference metrics have been updated"
      });
    }, 1500);
  };

  const handleEndpointSelect = (id: string) => {
    setSelectedEndpoint(id);
    setActiveTab('details');
  };

  return (
    <DashboardLayout
      title="Inference Configuration"
      description="Deploy and monitor inference endpoints"
    >
      <div className="grid gap-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="glassmorphism card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                  <Badge variant={metric.trend.startsWith('+') ? 'outline' : 'default'} className={`text-xs ${metric.trend.startsWith('+') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}`}>
                    {metric.trend}
                  </Badge>
                </div>
                <div className="mt-2">
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Inference Management</h2>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="flex gap-2 items-center">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="endpoints" className="flex items-center gap-2">
              <CloudLightning className="h-4 w-4" />
              Endpoints
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Model Hub
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2" disabled={!selectedEndpoint}>
              <Activity className="h-4 w-4" />
              Endpoint Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints">
            {/* Inference Endpoints Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CloudLightning className="mr-2 h-5 w-5 text-primary" />
                  Inference Endpoints
                </CardTitle>
                <CardDescription>
                  Currently deployed model endpoints and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Model Size</TableHead>
                      <TableHead>Avg. Latency</TableHead>
                      <TableHead>Throughput</TableHead>
                      <TableHead>Quantization</TableHead>
                      <TableHead>Last Deployed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inferenceEndpoints.map((endpoint) => (
                      <TableRow key={endpoint.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleEndpointSelect(endpoint.id)}>
                        <TableCell className="font-medium">{endpoint.name}</TableCell>
                        <TableCell>{endpoint.vendor}</TableCell>
                        <TableCell>
                          <Badge variant={
                            endpoint.status === 'active' ? 'outline' :
                            endpoint.status === 'idle' ? 'secondary' : 'default'
                          } className={
                            endpoint.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''
                          }>
                            {endpoint.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{endpoint.modelSize}</TableCell>
                        <TableCell>{endpoint.latency}</TableCell>
                        <TableCell>{endpoint.throughput}</TableCell>
                        <TableCell>{endpoint.quantization}</TableCell>
                        <TableCell>{endpoint.lastDeployed}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHoverEndpoint(endpoint.id);
                                  }}
                                >
                                  <Info className="h-4 w-4" />
                                  Endpoint Details
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent side="right" align="start" className="p-0">
                                <EndpointQuickView 
                                  endpointId={endpoint.id} 
                                  onClose={handleEndpointSelect}
                                />
                              </PopoverContent>
                            </Popover>
                            
                            <Button 
                              variant="default" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEndpointSelect(endpoint.id);
                              }}
                            >
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Latency Distribution</CardTitle>
                  <CardDescription>P50, P90, and P99 latency across endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={{
                      p50: { theme: { light: '#7E69AB', dark: '#9b87f5' } },
                      p90: { theme: { light: '#F97316', dark: '#FB923C' } },
                      p99: { theme: { light: '#EA384C', dark: '#F87171' } },
                    }}>
                      <AreaChart
                        data={[
                          { time: '00:00', p50: 150, p90: 320, p99: 520 },
                          { time: '01:00', p50: 145, p90: 310, p99: 500 },
                          { time: '02:00', p50: 160, p90: 340, p99: 550 },
                          { time: '03:00', p50: 170, p90: 350, p99: 580 },
                          { time: '04:00', p50: 155, p90: 330, p99: 540 },
                          { time: '05:00', p50: 140, p90: 300, p99: 490 },
                          { time: '06:00', p50: 135, p90: 290, p99: 470 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="p50" stackId="1" stroke="var(--color-p50)" fill="var(--color-p50)" fillOpacity={0.2} name="P50" />
                        <Area type="monotone" dataKey="p90" stackId="1" stroke="var(--color-p90)" fill="var(--color-p90)" fillOpacity={0.2} name="P90" />
                        <Area type="monotone" dataKey="p99" stackId="1" stroke="var(--color-p99)" fill="var(--color-p99)" fillOpacity={0.2} name="P99" />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Request Volume</CardTitle>
                  <CardDescription>Requests per minute across all endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={{
                      volume: { theme: { light: '#0EA5E9', dark: '#38BDF8' } },
                    }}>
                      <AreaChart
                        data={[
                          { time: '00:00', volume: 2450 },
                          { time: '01:00', volume: 2100 },
                          { time: '02:00', volume: 2300 },
                          { time: '03:00', volume: 2800 },
                          { time: '04:00', volume: 3200 },
                          { time: '05:00', volume: 3500 },
                          { time: '06:00', volume: 3800 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="volume" stroke="var(--color-volume)" fill="var(--color-volume)" fillOpacity={0.2} name="Requests/min" />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models">
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(modelCategories).map(([category, models]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category} Models</CardTitle>
                    <CardDescription>
                      Pre-trained models available for deployment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {models.map((model, index) => (
                        <Card key={index} className="bg-muted/30">
                          <CardContent className="p-4">
                            <h4 className="font-semibold">{model.name}</h4>
                            <div className="mt-2 space-y-1 text-sm">
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">Size:</span>
                                <span>{model.size}</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">Latency:</span>
                                <span>{model.latency}</span>
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="w-full mt-4">
                              Deploy
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            {selectedEndpoint && (
              <InferenceModelDetails 
                endpointId={selectedEndpoint}
                endpoint={inferenceEndpoints.find(ep => ep.id === selectedEndpoint)!}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Resources Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Monitor className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Quick Deploy</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Configure new endpoints with our one-click deployment system. Select from popular model architectures
              or bring your own custom models.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-medium">Foundation Models</p>
                <p className="text-xs text-muted-foreground">GPT, BERT, LLaMA</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-medium">Vision Models</p>
                <p className="text-xs text-muted-foreground">ResNet, ViT, YOLO</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-medium">Audio Models</p>
                <p className="text-xs text-muted-foreground">Whisper, Wav2Vec</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InferenceConfig;
