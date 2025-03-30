
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: "A100", compute: 87, memory: 76, power: 85 },
  { name: "V100", compute: 65, memory: 58, power: 72 },
  { name: "T4", compute: 55, memory: 66, power: 48 },
  { name: "CPU", compute: 35, memory: 45, power: 22 },
];

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

const ResourceUsageBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Usage by GPU Type</CardTitle>
        <CardDescription>
          Comparative analysis of resource utilization across different GPU types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="compute" name="compute" fill="var(--color-compute)" />
                <Bar dataKey="memory" name="memory" fill="var(--color-memory)" />
                <Bar dataKey="power" name="power" fill="var(--color-power)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageBarChart;
