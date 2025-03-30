
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, AlertTriangle, Activity } from 'lucide-react';

const clusterStatus = [
  {
    id: 'cluster-1',
    name: 'Production Training',
    status: 'healthy',
    nodeCount: 16,
    availabilityZones: ['us-east-1a', 'us-east-1b'],
    uptime: '99.98%'
  },
  {
    id: 'cluster-2',
    name: 'Inference API',
    status: 'healthy',
    nodeCount: 8,
    availabilityZones: ['us-east-1c', 'us-east-1d'],
    uptime: '100%'
  },
  {
    id: 'cluster-3',
    name: 'Development',
    status: 'warning',
    nodeCount: 4,
    availabilityZones: ['us-east-1a'],
    uptime: '99.45%',
    warning: 'High memory usage'
  },
  {
    id: 'cluster-4',
    name: 'Batch Processing',
    status: 'critical',
    nodeCount: 6,
    availabilityZones: ['us-east-1b'],
    uptime: '95.12%',
    warning: 'Service degradation'
  }
];

const SystemHealthSummary = () => {
  const healthyCount = clusterStatus.filter(c => c.status === 'healthy').length;
  const warningCount = clusterStatus.filter(c => c.status === 'warning').length;
  const criticalCount = clusterStatus.filter(c => c.status === 'critical').length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          System Health Status
        </CardTitle>
        <CardDescription>
          Current status of all clusters and environments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {healthyCount} Healthy
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            {warningCount} Warning
          </Badge>
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            {criticalCount} Critical
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clusterStatus.map((cluster) => (
            <div key={cluster.id} className="flex items-start space-x-3 p-3 border rounded-md">
              {cluster.status === 'healthy' && (
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-500" />
              )}
              {cluster.status === 'warning' && (
                <AlertTriangle className="h-5 w-5 mt-0.5 text-yellow-500" />
              )}
              {cluster.status === 'critical' && (
                <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
              )}
              
              <div>
                <h4 className="font-medium">{cluster.name}</h4>
                <div className="text-sm text-muted-foreground">
                  <div>{cluster.nodeCount} nodes across {cluster.availabilityZones.length} AZs</div>
                  <div>Uptime: {cluster.uptime}</div>
                  {cluster.warning && (
                    <div className={`font-medium ${
                      cluster.status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {cluster.warning}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthSummary;
