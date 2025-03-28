
import React from 'react';
import { ArrowUpRight, Layers, Cpu, BrainCircuit, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for job statistics
const jobStats = [
  {
    title: "Total Jobs",
    value: "145",
    change: "+12%",
    icon: Layers,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Running Jobs",
    value: "28",
    change: "+3",
    icon: Cpu,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Training Jobs",
    value: "57",
    change: "+8",
    icon: BrainCircuit,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Data Processing",
    value: "32",
    change: "+5",
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
];

const JobOverviewPanel = () => {
  return (
    <>
      {jobStats.map((stat, index) => (
        <Card key={index} className="glassmorphism card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-500">
                {stat.change}
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default JobOverviewPanel;
