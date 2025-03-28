
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { CloudLightning, Monitor, Activity } from 'lucide-react';

// Mock data for inference endpoints
const inferenceEndpoints = [
  {
    id: 'ep-1234',
    name: 'text-embedding-ada-002',
    status: 'active',
    modelSize: '1.5B',
    latency: '15ms',
    throughput: '120 req/s',
    lastDeployed: '2 hours ago'
  },
  {
    id: 'ep-2345',
    name: 'gpt-3.5-turbo',
    status: 'active',
    modelSize: '175B',
    latency: '245ms',
    throughput: '45 req/s',
    lastDeployed: '1 day ago'
  },
  {
    id: 'ep-3456',
    name: 'stable-diffusion-xl',
    status: 'idle',
    modelSize: '6.5B',
    latency: '1.2s',
    throughput: '8 req/s',
    lastDeployed: '5 days ago'
  },
  {
    id: 'ep-4567',
    name: 'whisper-large-v2',
    status: 'provisioning',
    modelSize: '1.5B',
    latency: '180ms',
    throughput: '60 req/s',
    lastDeployed: 'Just now'
  }
];

// Mock data for inference metrics
const performanceMetrics = [
  { label: 'Total Inference Requests', value: '14.5M', trend: '+12%' },
  { label: 'Average Latency', value: '210ms', trend: '-5%' },
  { label: 'Success Rate', value: '99.98%', trend: '+0.1%' },
  { label: 'GPU Utilization', value: '72%', trend: '+8%' }
];

const InferenceConfig = () => {
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
                  <Badge variant={metric.trend.startsWith('+') ? 'success' : 'default'} className="text-xs">
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
                  <TableHead>Status</TableHead>
                  <TableHead>Model Size</TableHead>
                  <TableHead>Avg. Latency</TableHead>
                  <TableHead>Throughput</TableHead>
                  <TableHead>Last Deployed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inferenceEndpoints.map((endpoint) => (
                  <TableRow key={endpoint.id}>
                    <TableCell className="font-medium">{endpoint.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        endpoint.status === 'active' ? 'success' :
                        endpoint.status === 'idle' ? 'secondary' : 'default'
                      }>
                        {endpoint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{endpoint.modelSize}</TableCell>
                    <TableCell>{endpoint.latency}</TableCell>
                    <TableCell>{endpoint.throughput}</TableCell>
                    <TableCell>{endpoint.lastDeployed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
