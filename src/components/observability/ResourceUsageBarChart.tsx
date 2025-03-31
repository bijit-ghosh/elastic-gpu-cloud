
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Download, BarChart as BarChartIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const initialData = [
  { name: "A100", compute: 87, memory: 76, power: 85 },
  { name: "V100", compute: 65, memory: 58, power: 72 },
  { name: "T4", compute: 55, memory: 66, power: 48 },
  { name: "CPU", compute: 35, memory: 45, power: 22 },
];

// Extended data for simulating real-time changes
const extendedData = [
  { name: "A100", compute: 92, memory: 81, power: 89 },
  { name: "V100", compute: 72, memory: 64, power: 77 },
  { name: "T4", compute: 48, memory: 59, power: 43 },
  { name: "CPU", compute: 29, memory: 39, power: 19 },
];

// Data for different cluster views
const clusterData = {
  'cluster-1': [
    { name: "A100", compute: 87, memory: 76, power: 85 },
    { name: "V100", compute: 65, memory: 58, power: 72 },
    { name: "T4", compute: 55, memory: 66, power: 48 },
    { name: "CPU", compute: 35, memory: 45, power: 22 },
  ],
  'cluster-2': [
    { name: "A100", compute: 61, memory: 55, power: 68 },
    { name: "V100", compute: 78, memory: 85, power: 80 },
    { name: "T4", compute: 42, memory: 38, power: 41 },
    { name: "CPU", compute: 22, memory: 28, power: 16 },
  ],
  'cluster-3': [
    { name: "A100", compute: 93, memory: 89, power: 91 },
    { name: "V100", compute: 45, memory: 40, power: 51 },
    { name: "T4", compute: 72, memory: 77, power: 68 },
    { name: "CPU", compute: 48, memory: 52, power: 33 },
  ]
};

const chartConfig = {
  compute: {
    label: "Compute (%)",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  memory: {
    label: "Memory (%)",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  power: {
    label: "Power (%)",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
};

interface ResourceUsageBarChartProps {
  className?: string;
}

const ResourceUsageBarChart: React.FC<ResourceUsageBarChartProps> = ({ className }) => {
  const [data, setData] = useState(initialData);
  const [selectedCluster, setSelectedCluster] = useState<string>('cluster-1');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'bar' | 'stacked'>('bar');
  const [highlightedBar, setHighlightedBar] = useState<number | null>(null);

  // Simulate refreshing the data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Use extended data with some randomization to simulate real-time changes
      const newData = clusterData[selectedCluster as keyof typeof clusterData].map((item) => ({
        ...item,
        compute: Math.min(100, item.compute + Math.floor(Math.random() * 10) - 5),
        memory: Math.min(100, item.memory + Math.floor(Math.random() * 10) - 5),
        power: Math.min(100, item.power + Math.floor(Math.random() * 10) - 5),
      }));
      setData(newData);
      setIsLoading(false);
      
      toast({
        title: "Data refreshed",
        description: "Resource usage data has been updated",
      });
    }, 1000);
  };

  // Handle cluster change
  const handleClusterChange = (value: string) => {
    setSelectedCluster(value);
    setData(clusterData[value as keyof typeof clusterData]);
  };

  // Export data as CSV
  const exportData = () => {
    const headers = ['name', 'compute', 'memory', 'power'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header as keyof typeof row]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resource-usage-${selectedCluster}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Data exported",
      description: "Resource usage data has been exported as CSV",
    });
  };

  // Toggle between bar and stacked view
  const toggleView = () => {
    setView(prev => prev === 'bar' ? 'stacked' : 'bar');
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 text-sm">
              <span style={{ color: entry.fill }}>{entry.name}:</span>
              <span className="font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Resource Usage by GPU Type</CardTitle>
            <CardDescription>
              Comparative analysis of resource utilization across different GPU types
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Select value={selectedCluster} onValueChange={handleClusterChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select cluster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cluster-1">Cluster 1</SelectItem>
                <SelectItem value="cluster-2">Cluster 2</SelectItem>
                <SelectItem value="cluster-3">Cluster 3</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={toggleView}>
              <BarChartIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={exportData}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              {view === 'bar' ? (
                <BarChart 
                  data={data} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  onMouseMove={(data) => {
                    if (data && data.activeTooltipIndex !== undefined) {
                      setHighlightedBar(data.activeTooltipIndex);
                    } else {
                      setHighlightedBar(null);
                    }
                  }}
                  onMouseLeave={() => setHighlightedBar(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="compute" name="Compute" fill="var(--color-compute)" animationDuration={300}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`compute-${index}`} 
                        fill={highlightedBar === index ? 'var(--color-compute-highlight, #a78bfa)' : 'var(--color-compute)'}
                        opacity={highlightedBar === null || highlightedBar === index ? 1 : 0.7}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="memory" name="Memory" fill="var(--color-memory)" animationDuration={300}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`memory-${index}`} 
                        fill={highlightedBar === index ? 'var(--color-memory-highlight, #60a5fa)' : 'var(--color-memory)'}
                        opacity={highlightedBar === null || highlightedBar === index ? 1 : 0.7}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="power" name="Power" fill="var(--color-power)" animationDuration={300}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`power-${index}`} 
                        fill={highlightedBar === index ? 'var(--color-power-highlight, #34d399)' : 'var(--color-power)'}
                        opacity={highlightedBar === null || highlightedBar === index ? 1 : 0.7}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <BarChart 
                  data={data} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  stackOffset="expand"
                  onMouseMove={(data) => {
                    if (data && data.activeTooltipIndex !== undefined) {
                      setHighlightedBar(data.activeTooltipIndex);
                    } else {
                      setHighlightedBar(null);
                    }
                  }}
                  onMouseLeave={() => setHighlightedBar(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Percentage %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="compute" name="Compute" stackId="a" fill="var(--color-compute)" animationDuration={300} />
                  <Bar dataKey="memory" name="Memory" stackId="a" fill="var(--color-memory)" animationDuration={300} />
                  <Bar dataKey="power" name="Power" stackId="a" fill="var(--color-power)" animationDuration={300} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          {view === 'bar' ? 'Showing direct comparison of resource metrics' : 'Showing proportional usage by resource type'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageBarChart;
