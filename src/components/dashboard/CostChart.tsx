
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for cost metrics
const data = [
  {
    name: "Jan 1",
    training: 420,
    inference: 320,
    dataProcessing: 180,
    carbon: 35,
  },
  {
    name: "Jan 2",
    training: 380,
    inference: 280,
    dataProcessing: 190,
    carbon: 32,
  },
  {
    name: "Jan 3",
    training: 450,
    inference: 350,
    dataProcessing: 210,
    carbon: 38,
  },
  {
    name: "Jan 4",
    training: 500,
    inference: 400,
    dataProcessing: 250,
    carbon: 42,
  },
  {
    name: "Jan 5",
    training: 470,
    inference: 380,
    dataProcessing: 220,
    carbon: 40,
  },
  {
    name: "Jan 6",
    training: 450,
    inference: 340,
    dataProcessing: 200,
    carbon: 38,
  },
  {
    name: "Jan 7",
    training: 480,
    inference: 360,
    dataProcessing: 230,
    carbon: 41,
  },
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
  dataProcessing: {
    label: "Data Processing",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  carbon: {
    label: "Carbon (kg CO₂)",
    theme: {
      light: "#6b7280",
      dark: "#9ca3af",
    },
  }
};

const CostChart = () => {
  const [showCarbon, setShowCarbon] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-carbon"
            checked={showCarbon}
            onChange={() => setShowCarbon(!showCarbon)}
            className="mr-2"
          />
          <label htmlFor="show-carbon" className="text-sm text-gray-500">Show Carbon Impact</label>
        </div>
      </div>
      <div className="h-80">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                tickMargin={8}
                fontSize={12}
              />
              {showCarbon && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} kg`}
                  tickMargin={8}
                  fontSize={12}
                  domain={[0, 'dataMax + 10']}
                />
              )}
              <Tooltip
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="training"
                name="training"
                yAxisId="left"
                fill="var(--color-training)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                opacity={0.9}
              />
              <Bar
                dataKey="inference"
                name="inference"
                yAxisId="left"
                fill="var(--color-inference)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                opacity={0.9}
              />
              <Bar
                dataKey="dataProcessing"
                name="dataProcessing"
                yAxisId="left"
                fill="var(--color-dataProcessing)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
                opacity={0.9}
              />
              {showCarbon && (
                <Bar
                  dataKey="carbon"
                  name="carbon"
                  yAxisId="right"
                  fill="var(--color-carbon)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={20}
                  opacity={0.7}
                />
              )}
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default CostChart;
