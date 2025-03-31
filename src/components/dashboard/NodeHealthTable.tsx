
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, AlertCircle, CircleAlert, Thermometer, Clock, Cloud, HardDrive } from 'lucide-react';

// Enhanced mock data for GPU nodes with multi-vendor support and infrastructure info
const gpuNodes = [
  {
    id: 'node-a1',
    name: 'NVIDIA A100',
    vendor: 'NVIDIA',
    status: 'online',
    temp: 72,
    utilization: 92,
    memory: '76.8/80GB',
    uptime: '67d 14h',
    job: 'llama-70b-finetune',
    infrastructure: 'cloud',
    provider: 'AWS',
    location: 'us-east-1'
  },
  {
    id: 'node-a2',
    name: 'NVIDIA A100',
    vendor: 'NVIDIA',
    status: 'online',
    temp: 68,
    utilization: 87,
    memory: '72.3/80GB',
    uptime: '67d 14h',
    job: 'llama-70b-finetune',
    infrastructure: 'cloud',
    provider: 'GCP',
    location: 'us-central1'
  },
  {
    id: 'node-h1',
    name: 'NVIDIA H100',
    vendor: 'NVIDIA',
    status: 'warning',
    temp: 82,
    utilization: 95,
    memory: '75.2/80GB',
    uptime: '31d 8h',
    job: 'mixtral-inference',
    infrastructure: 'cloud',
    provider: 'Azure',
    location: 'eastus2'
  },
  {
    id: 'node-a3',
    name: 'NVIDIA A100',
    vendor: 'NVIDIA',
    status: 'offline',
    temp: 0,
    utilization: 0,
    memory: '0/80GB',
    uptime: '0d 0h',
    job: 'none',
    infrastructure: 'cloud',
    provider: 'AWS',
    location: 'us-west-2'
  },
  {
    id: 'node-v1',
    name: 'NVIDIA V100',
    vendor: 'NVIDIA',
    status: 'online',
    temp: 65,
    utilization: 78,
    memory: '28.5/32GB',
    uptime: '127d 6h',
    job: 'stable-diffusion',
    infrastructure: 'on-prem',
    provider: 'Datacenter',
    location: 'NYC-DC1'
  },
  {
    id: 'node-amd1',
    name: 'AMD MI250',
    vendor: 'AMD',
    status: 'online',
    temp: 70,
    utilization: 82,
    memory: '110/128GB',
    uptime: '45d 12h',
    job: 'vision-transformer',
    infrastructure: 'on-prem',
    provider: 'Datacenter',
    location: 'ATL-DC2'
  },
  {
    id: 'node-intel1',
    name: 'Intel Max 1550',
    vendor: 'Intel',
    status: 'online',
    temp: 62,
    utilization: 75,
    memory: '88/128GB',
    uptime: '15d 8h',
    job: 'nlp-embeddings',
    infrastructure: 'cloud',
    provider: 'AWS',
    location: 'eu-west-1'
  }
];

const NodeHealthTable = () => {
  return (
    <Card className="glassmorphism">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">GPU Node Health</CardTitle>
        <CardDescription>
          Status and metrics for individual GPU nodes across vendors and infrastructure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Node</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Temp</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead>Memory</TableHead>
              <TableHead>Infra</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Current Job</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gpuNodes.map((node) => (
              <TableRow key={node.id}>
                <TableCell className="font-medium">
                  {node.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    node.vendor === 'NVIDIA' ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    node.vendor === 'AMD' ? 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300' :
                    'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  }>
                    {node.vendor}
                  </Badge>
                </TableCell>
                <TableCell>
                  {node.status === 'online' && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
                      <CircleCheck className="h-3 w-3" />
                      Online
                    </Badge>
                  )}
                  {node.status === 'warning' && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Warning
                    </Badge>
                  )}
                  {node.status === 'offline' && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 flex items-center gap-1">
                      <CircleAlert className="h-3 w-3" />
                      Offline
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    <span className={
                      node.temp > 80 ? 'text-red-600 dark:text-red-400' : 
                      node.temp > 70 ? 'text-yellow-600 dark:text-yellow-400' : 
                      'text-green-600 dark:text-green-400'
                    }>
                      {node.temp}°C
                    </span>
                  </div>
                </TableCell>
                <TableCell>{node.utilization}%</TableCell>
                <TableCell>{node.memory}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {node.infrastructure === 'cloud' ? (
                      <Cloud className="h-3 w-3" />
                    ) : (
                      <HardDrive className="h-3 w-3" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {node.provider}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  {node.location}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{node.uptime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {node.job !== 'none' ? (
                    <Badge variant="secondary" className="font-mono text-xs">
                      {node.job}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NodeHealthTable;
