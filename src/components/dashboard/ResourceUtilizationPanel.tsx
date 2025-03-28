
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Cpu, CircleDollarSign, MemoryStick, Gauge } from 'lucide-react';

// Resource utilization metrics
const metrics = [
  { 
    name: 'GPU Utilization', 
    value: 78, 
    icon: Cpu, 
    color: 'bg-blue-600 dark:bg-blue-500',
    description: '78% across fleet'
  },
  { 
    name: 'Memory Usage', 
    value: 64, 
    icon: MemoryStick, 
    color: 'bg-purple-600 dark:bg-purple-500',
    description: '64% of total capacity'
  },
  { 
    name: 'Power Consumption', 
    value: 82, 
    icon: Zap, 
    color: 'bg-amber-600 dark:bg-amber-500',
    description: '82% of max TDP'
  },
  { 
    name: 'Cost Efficiency', 
    value: 91, 
    icon: CircleDollarSign, 
    color: 'bg-green-600 dark:bg-green-500',
    description: '91% resource optimization'
  },
  { 
    name: 'Bandwidth', 
    value: 54, 
    icon: Gauge, 
    color: 'bg-rose-600 dark:bg-rose-500',
    description: '54% of network capacity'
  }
];

const ResourceUtilizationPanel = () => {
  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="glassmorphism">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-md ${metric.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                  <metric.icon className="h-4 w-4 text-current" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{metric.name}</h4>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
              <span className="text-xl font-bold">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceUtilizationPanel;
