
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { date: "May 1", training: 1240, inference: 850, storage: 320, network: 150 },
  { date: "May 8", training: 1420, inference: 920, storage: 350, network: 180 },
  { date: "May 15", training: 1650, inference: 890, storage: 370, network: 190 },
  { date: "May 22", training: 1890, inference: 1100, storage: 390, network: 210 },
  { date: "May 29", training: 2100, inference: 1250, storage: 410, network: 220 },
  { date: "Jun 5", training: 1950, inference: 1400, storage: 430, network: 240 },
  { date: "Jun 12", training: 2200, inference: 1300, storage: 450, network: 260 },
];

const chartConfig = {
  training: {
    label: "Training",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  inference: {
    label: "Inference",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  storage: {
    label: "Storage",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  network: {
    label: "Network",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
};

const CostBreakdownChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown Over Time</CardTitle>
        <CardDescription>
          Cost trends across different service categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Cost (USD)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => ['$' + value, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="training" 
                  name="training" 
                  stroke="var(--color-training)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="inference" 
                  name="inference" 
                  stroke="var(--color-inference)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="storage" 
                  name="storage" 
                  stroke="var(--color-storage)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  name="network" 
                  stroke="var(--color-network)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;
