
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, AlertCircle, CircleAlert, Thermometer, Clock } from 'lucide-react';

// Mock data for GPU nodes
const gpuNodes = [
  {
    id: 'node-a1',
    name: 'NVIDIA A100',
    status: 'online',
    temp: 72,
    utilization: 92,
    memory: '76.8/80GB',
    uptime: '67d 14h',
    job: 'llama-70b-finetune'
  },
  {
    id: 'node-a2',
    name: 'NVIDIA A100',
    status: 'online',
    temp: 68,
    utilization: 87,
    memory: '72.3/80GB',
    uptime: '67d 14h',
    job: 'llama-70b-finetune'
  },
  {
    id: 'node-h1',
    name: 'NVIDIA H100',
    status: 'warning',
    temp: 82,
    utilization: 95,
    memory: '75.2/80GB',
    uptime: '31d 8h',
    job: 'mixtral-inference'
  },
  {
    id: 'node-a3',
    name: 'NVIDIA A100',
    status: 'offline',
    temp: 0,
    utilization: 0,
    memory: '0/80GB',
    uptime: '0d 0h',
    job: 'none'
  },
  {
    id: 'node-v1',
    name: 'NVIDIA V100',
    status: 'online',
    temp: 65,
    utilization: 78,
    memory: '28.5/32GB',
    uptime: '127d 6h',
    job: 'stable-diffusion'
  }
];

const NodeHealthTable = () => {
  return (
    <Card className="glassmorphism">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">GPU Node Health</CardTitle>
        <CardDescription>
          Status and metrics for individual GPU nodes in the cluster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Node</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Temp</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead>Memory</TableHead>
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
