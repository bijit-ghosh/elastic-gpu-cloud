
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Database } from 'lucide-react';
import ResourceUsageBarChart from '@/components/observability/ResourceUsageBarChart';
import { jobMetrics } from '@/data/observabilityMockData';

const PerformanceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <ResourceUsageBarChart />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-primary" />
            Job Performance Analysis
          </CardTitle>
          <CardDescription>
            Resource efficiency and performance metrics for recent jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>GPUs</TableHead>
                <TableHead>Runtime</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobMetrics.map((job, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.gpus}</TableCell>
                  <TableCell>{job.runtime}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: job.efficiency }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs">{job.efficiency}</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
