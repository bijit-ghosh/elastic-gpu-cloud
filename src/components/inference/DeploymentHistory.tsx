
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

// Mock data for deployment history
const deployments = [
  {
    id: 'dep-7890',
    endpointId: 'ep-1234',
    endpointName: 'text-embedding-ada-002',
    timestamp: '2023-06-12 14:32:15',
    status: 'successful',
    duration: '3m 42s',
    environment: 'cloud',
    provider: 'aws',
    region: 'us-west-2',
    deployedBy: 'sarah.thompson@example.com'
  },
  {
    id: 'dep-8901',
    endpointId: 'ep-4567',
    endpointName: 'whisper-large-v2',
    timestamp: '2023-06-12 10:15:22',
    status: 'successful',
    duration: '5m 18s',
    environment: 'cloud',
    provider: 'aws',
    region: 'us-east-1',
    deployedBy: 'alex.johnson@example.com'
  },
  {
    id: 'dep-9012',
    endpointId: 'ep-5678',
    endpointName: 'llama-2-70b',
    timestamp: '2023-06-10 16:45:51',
    status: 'failed',
    duration: '2m 23s',
    environment: 'cloud',
    provider: 'gcp',
    region: 'us-central1',
    deployedBy: 'michael.brown@example.com',
    error: 'Insufficient GPU resources'
  },
  {
    id: 'dep-0123',
    endpointId: 'ep-2345',
    endpointName: 'gpt-3.5-turbo',
    timestamp: '2023-06-09 09:23:05',
    status: 'successful',
    duration: '4m 52s',
    environment: 'on-premise',
    provider: 'custom',
    region: 'datacenter-east',
    deployedBy: 'emma.wilson@example.com'
  },
  {
    id: 'dep-1234',
    endpointId: 'ep-3456',
    endpointName: 'stable-diffusion-xl',
    timestamp: '2023-06-08 11:30:19',
    status: 'warning',
    duration: '6m 10s',
    environment: 'hybrid',
    provider: 'azure',
    region: 'eastus',
    deployedBy: 'david.garcia@example.com',
    warning: 'Performance degradation detected'
  },
];

export const DeploymentHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Deployment History
        </CardTitle>
        <CardDescription>
          Recent endpoint deployments and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Provider/Region</TableHead>
              <TableHead>Deployed By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell className="font-mono text-xs">{deployment.timestamp}</TableCell>
                <TableCell className="font-medium">{deployment.endpointName}</TableCell>
                <TableCell>
                  <Badge variant={
                    deployment.status === 'successful' ? 'outline' :
                    deployment.status === 'failed' ? 'destructive' : 'secondary'
                  } className={
                    deployment.status === 'successful' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''
                  }>
                    <span className="flex items-center gap-1">
                      {deployment.status === 'successful' && <CheckCircle2 className="h-3 w-3" />}
                      {deployment.status === 'failed' && <XCircle className="h-3 w-3" />}
                      {deployment.status === 'warning' && <AlertTriangle className="h-3 w-3" />}
                      {deployment.status}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>{deployment.duration}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {deployment.environment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{deployment.provider}</span>
                    <span className="text-xs text-muted-foreground">{deployment.region}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs truncate max-w-[150px]">
                  {deployment.deployedBy}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
