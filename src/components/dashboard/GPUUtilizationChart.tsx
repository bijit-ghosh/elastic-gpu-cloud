
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for GPU utilization
const data = [
  { time: "00:00", compute: 65, memory: 40, power: 52, bandwidth: 72 },
  { time: "02:00", compute: 70, memory: 45, power: 55, bandwidth: 70 },
  { time: "04:00", compute: 45, memory: 30, power: 40, bandwidth: 55 },
  { time: "06:00", compute: 35, memory: 25, power: 30, bandwidth: 45 },
  { time: "08:00", compute: 55, memory: 35, power: 45, bandwidth: 60 },
  { time: "10:00", compute: 75, memory: 55, power: 65, bandwidth: 85 },
  { time: "12:00", compute: 85, memory: 65, power: 75, bandwidth: 90 },
  { time: "14:00", compute: 90, memory: 70, power: 80, bandwidth: 95 },
  { time: "16:00", compute: 80, memory: 60, power: 70, bandwidth: 85 },
  { time: "18:00", compute: 75, memory: 50, power: 65, bandwidth: 80 },
  { time: "20:00", compute: 70, memory: 45, power: 60, bandwidth: 75 },
  { time: "22:00", compute: 60, memory: 40, power: 50, bandwidth: 65 },
];

const chartConfig = {
  compute: {
    label: "Compute",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  memory: {
    label: "Memory",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  power: {
    label: "Power",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  bandwidth: {
    label: "Bandwidth",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
};

const GPUUtilizationChart = () => {
  return (
    <div className="w-full h-80">
      <ChartContainer
        config={chartConfig}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="compute"
              name="compute"
              stackId="1"
              strokeWidth={2}
              stroke="var(--color-compute)"
              fill="var(--color-compute)"
              fillOpacity={0.2}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="memory"
              name="memory"
              stackId="2"
              strokeWidth={2}
              stroke="var(--color-memory)"
              fill="var(--color-memory)"
              fillOpacity={0.2}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="power"
              name="power"
              stackId="3"
              strokeWidth={2}
              stroke="var(--color-power)"
              fill="var(--color-power)"
              fillOpacity={0.2}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="bandwidth"
              name="bandwidth"
              stackId="4"
              strokeWidth={2}
              stroke="var(--color-bandwidth)"
              fill="var(--color-bandwidth)"
              fillOpacity={0.2}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default GPUUtilizationChart;
