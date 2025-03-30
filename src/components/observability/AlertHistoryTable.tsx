
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, AlertTriangle, InfoIcon, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

// Mock data for alert history
const alertHistory = [
  { 
    id: 1, 
    severity: 'critical', 
    message: 'GPU #4 temperature exceeds 85°C', 
    timestamp: '2023-05-20 14:25:12',
    status: 'resolved',
    cluster: 'Production',
    duration: '18m 45s',
    resolution: 'Auto-scaling reduced load'
  },
  { 
    id: 2, 
    severity: 'warning', 
    message: 'Storage usage above 85% threshold', 
    timestamp: '2023-05-19 09:12:34',
    status: 'resolved',
    cluster: 'Development',
    duration: '2h 10m',
    resolution: 'Cleanup job freed space'
  },
  { 
    id: 3, 
    severity: 'critical', 
    message: 'Network connectivity issues in us-east-1', 
    timestamp: '2023-05-18 11:05:22',
    status: 'resolved',
    cluster: 'Inference API',
    duration: '45m 12s',
    resolution: 'Cloud provider resolved outage'
  },
  { 
    id: 4, 
    severity: 'info', 
    message: 'Maintenance completed successfully', 
    timestamp: '2023-05-15 01:15:00',
    status: 'resolved',
    cluster: 'All',
    duration: 'N/A',
    resolution: 'N/A'
  },
  { 
    id: 5, 
    severity: 'warning', 
    message: 'High latency detected on inference endpoint', 
    timestamp: '2023-05-12 16:42:18',
    status: 'resolved',
    cluster: 'Inference API',
    duration: '32m 05s',
    resolution: 'Scaled up instance count'
  },
  { 
    id: 6, 
    severity: 'critical', 
    message: 'Database replication lag exceeded 5 minutes', 
    timestamp: '2023-05-10 22:30:45',
    status: 'resolved',
    cluster: 'Production',
    duration: '15m 30s',
    resolution: 'Optimized queries reduced load'
  },
  { 
    id: 7, 
    severity: 'info', 
    message: 'System backup completed', 
    timestamp: '2023-05-08 03:00:00',
    status: 'resolved',
    cluster: 'All',
    duration: 'N/A',
    resolution: 'N/A'
  },
];

const AlertHistoryTable = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter alerts based on selected filter
  const filteredAlerts = alertHistory.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <CardTitle>Alert History</CardTitle>
          <CardDescription>Historical record of system alerts and resolutions</CardDescription>
        </div>
        <div className="mt-2 sm:mt-0">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Cluster</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Resolution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <div className="flex items-center">
                    {alert.severity === 'critical' && (
                      <AlertCircle className="h-4 w-4 mr-1.5 text-red-500" />
                    )}
                    {alert.severity === 'warning' && (
                      <AlertTriangle className="h-4 w-4 mr-1.5 text-yellow-500" />
                    )}
                    {alert.severity === 'info' && (
                      <InfoIcon className="h-4 w-4 mr-1.5 text-blue-500" />
                    )}
                    <Badge variant={
                      alert.severity === 'critical' ? 'destructive' :
                      alert.severity === 'warning' ? 'outline' : 'secondary'
                    } className={
                      alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{alert.message}</TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell>{alert.cluster}</TableCell>
                <TableCell>{alert.duration}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                    <span>{alert.resolution}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertHistoryTable;
