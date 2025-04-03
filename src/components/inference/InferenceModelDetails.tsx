import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Server, 
  Cpu, 
  HardDrive, 
  Clock, 
  Gauge, 
  ArrowRight, 
  Settings, 
  Code,
  AlertTriangle,
  Thermometer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface Endpoint {
  id: string;
  name: string;
  status: string;
  modelSize: string;
  latency: string;
  throughput: string;
  lastDeployed: string;
  vendor: string;
  version: string;
  quantization: string;
}

interface InferenceModelDetailsProps {
  endpointId: string;
  endpoint: Endpoint;
}

export const InferenceModelDetails: React.FC<InferenceModelDetailsProps> = ({ endpointId, endpoint }) => {
  const handleRestart = () => {
    toast({
      title: "Restart initiated",
      description: `Endpoint ${endpoint.name} is being restarted`,
    });
  };

  const handleScaleUp = () => {
    toast({
      title: "Scaling up",
      description: `Endpoint ${endpoint.name} is being scaled up`,
    });
  };

  const handleStop = () => {
    toast({
      title: "Stopping endpoint",
      description: `Endpoint ${endpoint.name} is being stopped`,
    });
  };

  const metrics = {
    requestRate: '152 req/min',
    errorRate: '0.02%',
    p50Latency: '215ms',
    p95Latency: '350ms',
    p99Latency: '480ms',
  };

  const resources = {
    instances: 3,
    cpusPerInstance: 8,
    memoryPerInstance: '32GB',
    gpuType: 'NVIDIA A100',
    gpusPerInstance: 1,
  };

  const configuration = {
    maxBatchSize: 64,
    timeoutMs: 30000,
    maxConcurrentRequests: 512,
    autoscalingEnabled: true,
    autoscalingMin: 1,
    autoscalingMax: 5,
    cachingEnabled: true,
  };

  const temperatureData = [
    { name: 'GPU 0', value: 68 },
    { name: 'GPU 1', value: 72 },
    { name: 'GPU 2', value: 65 },
  ];

  const performanceHistoryData = [
    { time: '12:00', latency: 210, throughput: 120, temperature: 65 },
    { time: '12:10', latency: 215, throughput: 125, temperature: 67 },
    { time: '12:20', latency: 205, throughput: 130, temperature: 66 },
    { time: '12:30', latency: 220, throughput: 128, temperature: 68 },
    { time: '12:40', latency: 230, throughput: 135, temperature: 70 },
    { time: '12:50', latency: 225, throughput: 140, temperature: 71 },
    { time: '13:00', latency: 215, throughput: 145, temperature: 69 },
    { time: '13:10', latency: 210, throughput: 142, temperature: 67 },
    { time: '13:20', latency: 200, throughput: 150, temperature: 66 },
    { time: '13:30', latency: 190, throughput: 155, temperature: 65 },
    { time: '13:40', latency: 195, throughput: 158, temperature: 67 },
    { time: '13:50', latency: 205, throughput: 160, temperature: 68 },
    { time: '14:00', latency: 200, throughput: 165, temperature: 67 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{endpoint.name}</h2>
          <p className="text-muted-foreground">ID: {endpointId} • Vendor: {endpoint.vendor} • Version: {endpoint.version}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRestart}>
            Restart
          </Button>
          <Button variant="outline" size="sm" onClick={handleScaleUp}>
            Scale Up
          </Button>
          <Button variant="destructive" size="sm" onClick={handleStop}>
            Stop
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                <h3 className="font-medium">Status</h3>
              </div>
              <Badge variant={
                endpoint.status === 'active' ? 'outline' :
                endpoint.status === 'idle' ? 'secondary' : 'default'
              } className={
                endpoint.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''
              }>
                {endpoint.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Last deployed {endpoint.lastDeployed}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Gauge className="h-5 w-5 mr-2 text-purple-500" />
              <h3 className="font-medium">Performance</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Latency</p>
                <p className="font-medium">{endpoint.latency}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Throughput</p>
                <p className="font-medium">{endpoint.throughput}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <HardDrive className="h-5 w-5 mr-2 text-green-500" />
              <h3 className="font-medium">Model</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{endpoint.modelSize}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Quantization</p>
                <p className="font-medium">{endpoint.quantization}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics">
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="apiUsage">API Usage</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Real-time statistics for this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-4">
                  <h4 className="text-sm font-medium">Request Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Request Rate</p>
                      <p className="text-lg font-semibold">{metrics.requestRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Error Rate</p>
                      <p className="text-lg font-semibold">{metrics.errorRate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <h4 className="text-sm font-medium">Latency</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">P50</p>
                      <p className="text-lg font-semibold">{metrics.p50Latency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">P95</p>
                      <p className="text-lg font-semibold">{metrics.p95Latency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">P99</p>
                      <p className="text-lg font-semibold">{metrics.p99Latency}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <h4 className="text-sm font-medium">Usage Trends</h4>
                  <div className="h-20 flex items-center justify-center border-2 border-dashed border-muted rounded-md">
                    <p className="text-xs text-muted-foreground">Usage trend chart would appear here</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-64 border-2 border-dashed border-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Detailed metrics charts would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Compute resources assigned to this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Instances</h4>
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Count</span>
                      <span>{resources.instances}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">CPUs per instance</span>
                      <span>{resources.cpusPerInstance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory per instance</span>
                      <span>{resources.memoryPerInstance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">GPU Resources</h4>
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">GPU Type</span>
                      <span>{resources.gpuType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPUs per instance</span>
                      <span>{resources.gpusPerInstance}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-4">Resource Usage</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">CPU Utilization</p>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>0%</span>
                      <span className="font-medium">65%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Memory Usage</p>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>0%</span>
                      <span className="font-medium">52%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">GPU Utilization</p>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>0%</span>
                      <span className="font-medium">88%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline">Request More Resources</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Configuration</CardTitle>
              <CardDescription>Settings that control behavior and scaling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Request Handling</h4>
                  <div className="bg-muted/30 p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Batch Size</span>
                      <span>{configuration.maxBatchSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeout (ms)</span>
                      <span>{configuration.timeoutMs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Concurrent Requests</span>
                      <span>{configuration.maxConcurrentRequests}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Scaling</h4>
                  <div className="bg-muted/30 p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Autoscaling</span>
                      <Badge variant="outline" className={configuration.autoscalingEnabled ? "bg-green-100" : ""}>
                        {configuration.autoscalingEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Instances</span>
                      <span>{configuration.autoscalingMin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Instances</span>
                      <span>{configuration.autoscalingMax}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Advanced Options</h4>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <HardDrive className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-muted-foreground">Response Caching</span>
                    </div>
                    <Badge variant="outline" className={configuration.cachingEnabled ? "bg-green-100" : ""}>
                      {configuration.cachingEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Caching frequently requested responses can significantly reduce latency</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>Edit Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Logs</CardTitle>
              <CardDescription>Recent activity and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                <p className="text-gray-500">[2023-06-12 14:32:15] [INFO] Endpoint started successfully</p>
                <p className="text-gray-500">[2023-06-12 14:35:22] [INFO] Scaled to 2 instances</p>
                <p className="text-gray-500">[2023-06-12 14:40:18] [INFO] Processed 1000 requests</p>
                <p className="text-yellow-500">[2023-06-12 14:42:51] [WARN] High latency detected (570ms)</p>
                <p className="text-gray-500">[2023-06-12 14:45:30] [INFO] Scaled to 3 instances</p>
                <p className="text-red-500">[2023-06-12 14:48:12] [ERROR] Request timeout after 30s</p>
                <p className="text-gray-500">[2023-06-12 14:50:45] [INFO] Memory usage at 65%</p>
                <p className="text-yellow-500">[2023-06-12 14:55:10] [WARN] GPU utilization above 90%</p>
                <p className="text-gray-500">[2023-06-12 15:00:00] [INFO] System health check passed</p>
                <p className="text-gray-500">[2023-06-12 15:05:22] [INFO] Processed 5000 requests</p>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">Download Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apiUsage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Code examples to interact with this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">REST API</h4>
                  <div className="bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-sm overflow-auto">
                    <p className="text-blue-400">POST https://api.elasticgpu.com/v1/endpoints/{endpointId}</p>
                    <p className="mt-2">&#123;</p>
                    <p className="ml-4">"inputs": "Your input text or data here",</p>
                    <p className="ml-4">"parameters": &#123;</p>
                    <p className="ml-8">"temperature": 0.7,</p>
                    <p className="ml-8">"max_tokens": 256</p>
                    <p className="ml-4">&#125;</p>
                    <p>&#125;</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Python Client</h4>
                  <div className="bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-sm overflow-auto">
                    <p><span className="text-yellow-400">import</span> elasticgpu</p>
                    <p className="mt-2">client = elasticgpu.Client(api_key=<span className="text-green-400">"YOUR_API_KEY"</span>)</p>
                    <p className="mt-2">response = client.predict(</p>
                    <p className="ml-4">endpoint_id=<span className="text-green-400">"{endpointId}"</span>,</p>
                    <p className="ml-4">inputs=<span className="text-green-400">"Your input text or data here"</span>,</p>
                    <p className="ml-4">parameters=&#123;</p>
                    <p className="ml-8"><span className="text-blue-400">"temperature"</span>: 0.7,</p>
                    <p className="ml-8"><span className="text-blue-400">"max_tokens"</span>: 256</p>
                    <p className="ml-4">&#125;</p>
                    <p>)</p>
                    <p className="mt-2"><span className="text-yellow-400">print</span>(response.output)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Authentication</h4>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    <p className="font-medium">API Key Required</p>
                  </div>
                  <p className="text-sm text-muted-foreground">All requests to this endpoint must be authenticated with a valid API key.</p>
                  <Button className="mt-2" variant="outline" size="sm">Generate API Key</Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Documentation</h4>
                <div className="flex">
                  <Button variant="link" className="pl-0 flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    View full API documentation
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temperature" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-red-500" />
                Temperature Monitoring
              </CardTitle>
              <CardDescription>
                Real-time temperature data for GPU instances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceHistoryData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.1} />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '8px', border: 'none' }} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#ff5252" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                        name="Temperature (°C)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {temperatureData.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge 
                            className={
                              item.value >= 75 ? "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300" : 
                              item.value >= 70 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300" : 
                              "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300"
                            }
                          >
                            {item.value >= 75 ? "Critical" : item.value >= 70 ? "Warning" : "Normal"}
                          </Badge>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold">{item.value}°C</span>
                          <span className="text-xs text-muted-foreground mb-1">
                            {item.value < 70 ? "Within safe range" : "Approaching threshold"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className={
                                item.value >= 75 ? "bg-red-500 h-2 rounded-full" : 
                                item.value >= 70 ? "bg-yellow-500 h-2 rounded-full" : 
                                "bg-green-500 h-2 rounded-full"
                              } 
                              style={{ width: `${(item.value / 100) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>0°C</span>
                            <span>50°C</span>
                            <span>100°C</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex items-start mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Temperature Thresholds</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimal operating range is between 30°C - 70°C. Sustained operation above 80°C may impact performance and hardware longevity.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Normal: &lt;70°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Warning: 70°C - 75°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs">Critical: &gt;75°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
