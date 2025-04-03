
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BarChart3, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { resourceWastageData, wastageMetrics } from '@/data/observabilityMockData';
import { Button } from '@/components/ui/button';

const WastageTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
            Resource Allocation vs. Utilization
          </CardTitle>
          <CardDescription>
            Analyzing resource efficiency and identifying wastage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={resourceWastageData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.1} />
                <XAxis dataKey="resource" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '8px', border: 'none' }} />
                <Legend />
                <Bar dataKey="used" name="Used" stackId="a" fill="#4ade80" />
                <Bar dataKey="wasted" name="Unused/Wasted" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {wastageMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 text-xs px-2 py-1 rounded">
                      {metric.percentage}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{metric.name}</h3>
                  <p className="text-2xl font-bold mb-2">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-4">Wastage Reduction Opportunities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource Type</TableHead>
                  <TableHead>Current Utilization</TableHead>
                  <TableHead>Recommended Action</TableHead>
                  <TableHead>Potential Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>GPU Instances</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                        <div className="h-2 bg-red-500 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                      <span>38%</span>
                    </div>
                  </TableCell>
                  <TableCell>Reduce GPU count by 4 units</TableCell>
                  <TableCell className="font-medium text-green-600 dark:text-green-400">$1,240/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Memory Allocation</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <span>62%</span>
                    </div>
                  </TableCell>
                  <TableCell>Rightsize memory allocation by 30%</TableCell>
                  <TableCell className="font-medium text-green-600 dark:text-green-400">$680/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Storage Volumes</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                      <span>58%</span>
                    </div>
                  </TableCell>
                  <TableCell>Clean up 1.2TB of abandoned data</TableCell>
                  <TableCell className="font-medium text-green-600 dark:text-green-400">$320/month</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 border rounded-md bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
              </div>
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-400">Potential Annual Savings</h4>
                <p className="text-2xl font-bold mt-1 text-green-700 dark:text-green-300">$26,880</p>
                <p className="text-sm text-green-800/80 dark:text-green-400/80 mt-1">
                  Implementing all recommendations could result in significant cost savings.
                  <Button variant="link" className="h-auto p-0 ml-1 text-green-700 dark:text-green-300">
                    Create optimization plan
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WastageTab;
