
import React from 'react';
import { AlertCircle, AlertTriangle, Clock, DollarSign } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Job stuck in queue',
    description: 'Training job "gpt-finetune-1" has been stuck for 15 minutes',
    icon: AlertCircle,
    iconClass: 'text-red-500',
    time: '5m ago'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Underutilized GPUs',
    description: '3 A100 GPUs are at <20% utilization in training cluster',
    icon: AlertTriangle,
    iconClass: 'text-amber-500',
    time: '12m ago'
  },
  {
    id: 3,
    type: 'warning',
    title: 'High cost alert',
    description: 'Inference job "prod-llm-api" exceeding daily budget',
    icon: DollarSign,
    iconClass: 'text-amber-500',
    time: '28m ago'
  },
  {
    id: 4,
    type: 'info',
    title: 'SLA approaching breach',
    description: 'P95 latency at 240ms (target 250ms) for inference endpoint',
    icon: Clock,
    iconClass: 'text-blue-500',
    time: '34m ago'
  }
];

const AlertPanel = () => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className={`flex items-start p-3 rounded-lg ${
            alert.type === 'critical' 
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
              : alert.type === 'warning'
              ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          }`}
        >
          <div className={`p-1.5 rounded-md ${
            alert.type === 'critical'
              ? 'bg-red-100 dark:bg-red-800/30' 
              : alert.type === 'warning' 
              ? 'bg-amber-100 dark:bg-amber-800/30'
              : 'bg-blue-100 dark:bg-blue-800/30'
          }`}>
            <alert.icon className={`h-4 w-4 ${alert.iconClass}`} />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{alert.title}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{alert.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertPanel;
