
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Activity, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SystemHealthSummary from '@/components/observability/SystemHealthSummary';
import GPUUtilizationChart from '@/components/dashboard/GPUUtilizationChart';
import { systemAlerts, systemMetrics } from '@/data/observabilityMockData';

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
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
            Resource usage patterns
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
    </div>
  );
};

export default OverviewTab;
