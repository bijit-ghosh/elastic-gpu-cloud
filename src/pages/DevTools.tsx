
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code, Database, Activity, FileText } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for development environment statistics
const devStats = [
  {
    category: 'Jupyter Notebooks',
    count: 28,
    storage: '45.2 GB',
    lastAccessed: '10 minutes ago'
  },
  {
    category: 'Code Repositories',
    count: 14,
    storage: '2.8 GB',
    lastAccessed: '2 hours ago'
  },
  {
    category: 'API Endpoints',
    count: 35,
    storage: 'N/A',
    lastAccessed: '30 minutes ago'
  },
  {
    category: 'Docker Images',
    count: 12,
    storage: '86.5 GB',
    lastAccessed: '1 day ago'
  }
];

// Mock data for API usage
const apiUsageData = [
  { endpoint: '/api/models/predict', calls: '452,387', avgLatency: '120ms', errorRate: '0.02%' },
  { endpoint: '/api/data/process', calls: '124,590', avgLatency: '85ms', errorRate: '0.05%' },
  { endpoint: '/api/jobs/status', calls: '985,432', avgLatency: '42ms', errorRate: '0.01%' },
  { endpoint: '/api/auth/validate', calls: '1,245,890', avgLatency: '28ms', errorRate: '<0.01%' }
];

const DevTools = () => {
  return (
    <DashboardLayout
      title="Developer Tools"
      description="Resources and tools for GPU workload development"
    >
      <div className="grid gap-6">
        {/* Development Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-primary" />
              Development Resources
            </CardTitle>
            <CardDescription>
              Available tools and environments for AI/ML development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Jupyter Labs</h3>
                  <Badge variant="outline" className="bg-blue-100 dark:bg-blue-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Interactive Python notebooks with GPU acceleration</p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Instances:</span>
                    <span>3 running</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPU Usage:</span>
                    <span>2x A100</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">VS Code Server</h3>
                  <Badge variant="outline" className="bg-purple-100 dark:bg-purple-800">Ready</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Remote code editing with full IDE capabilities</p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Instances:</span>
                    <span>1 ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span>16GB allocated</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Git Integration</h3>
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-800">Connected</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Repository management with CI/CD pipelines</p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Repos:</span>
                    <span>14 synced</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last commit:</span>
                    <span>10min ago</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">API Explorer</h3>
                  <Badge variant="outline" className="bg-orange-100 dark:bg-orange-800">4 APIs</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Interactive API documentation and testing</p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Endpoints:</span>
                    <span>35 active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Health:</span>
                    <span>100% uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Usage Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              API Usage Statistics
            </CardTitle>
            <CardDescription>
              Traffic and performance metrics for your APIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Calls (Last 24h)</TableHead>
                  <TableHead>Avg. Latency</TableHead>
                  <TableHead>Error Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiUsageData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{item.endpoint}</TableCell>
                    <TableCell>{item.calls}</TableCell>
                    <TableCell>{item.avgLatency}</TableCell>
                    <TableCell>{item.errorRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Development Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Last Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devStats.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.storage}</TableCell>
                      <TableCell>{item.lastAccessed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Documentation & Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">GPU Programming Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">Best practices for CUDA and PyTorch optimization</p>
                <div className="text-xs flex justify-between text-muted-foreground">
                  <span>Last updated: 3 days ago</span>
                  <span>12 min read</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">API Reference</h3>
                <p className="text-sm text-muted-foreground mb-2">Complete documentation for the platform API</p>
                <div className="text-xs flex justify-between text-muted-foreground">
                  <span>Last updated: 1 day ago</span>
                  <span>35 endpoints</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-1">Infrastructure Specs</h3>
                <p className="text-sm text-muted-foreground mb-2">Hardware details and network architecture</p>
                <div className="text-xs flex justify-between text-muted-foreground">
                  <span>Last updated: 2 weeks ago</span>
                  <span>Technical</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DevTools;
