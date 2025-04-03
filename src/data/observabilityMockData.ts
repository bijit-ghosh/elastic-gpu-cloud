
// Mock data for the Observability page
export const systemAlerts = [
  { severity: 'critical', message: 'GPU #4 temperature exceeds 85°C', time: '10 minutes ago', status: 'active' },
  { severity: 'warning', message: 'Storage usage above 85% threshold', time: '1 hour ago', status: 'active' },
  { severity: 'info', message: 'Training job "bert-finetune" completed', time: '2 hours ago', status: 'resolved' },
  { severity: 'warning', message: 'Network latency spike detected', time: '3 hours ago', status: 'resolved' }
];

export const jobMetrics = [
  { name: 'resnet50-training', type: 'Training', gpus: 4, runtime: '18h 45m', efficiency: '92%', cost: '$214.50' },
  { name: 'llama2-finetuning', type: 'Fine-tuning', gpus: 8, runtime: '24h 12m', efficiency: '88%', cost: '$520.80' },
  { name: 'stable-diffusion', type: 'Inference', gpus: 2, runtime: '72h 30m', efficiency: '78%', cost: '$350.40' },
  { name: 'whisper-transcription', type: 'Batch', gpus: 1, runtime: '6h 15m', efficiency: '95%', cost: '$28.20' }
];

export const systemMetrics = [
  { label: 'Total GPU Hours', value: '12,450', trend: '+8% vs. last week' },
  { label: 'Avg. Utilization', value: '76%', trend: '+2% vs. last week' },
  { label: 'Avg. Temperature', value: '68°C', trend: '+3°C vs. last week' },
  { label: 'Active Alerts', value: '3', trend: '-1 vs. last week' }
];

export const costOptimizations = [
  { 
    id: 1, 
    title: 'Underutilized GPUs', 
    description: 'Consider downgrading 3 A100 GPUs to V100s for batch processing tasks', 
    potentialSavings: '$450/month', 
    impact: 'low', 
    status: 'pending'
  },
  { 
    id: 2, 
    title: 'Right-size instances', 
    description: 'Switch development workloads to spot instances for 70% cost reduction', 
    potentialSavings: '$800/month', 
    impact: 'medium', 
    status: 'pending'
  },
  { 
    id: 3, 
    title: 'Scheduled shutdowns', 
    description: 'Implement auto-shutdown for non-production clusters during off-hours', 
    potentialSavings: '$1,200/month', 
    impact: 'high', 
    status: 'implemented'
  },
];

export const temperatureData = [
  { time: '00:00', temp: 66, threshold: 75 },
  { time: '02:00', temp: 65, threshold: 75 },
  { time: '04:00', temp: 63, threshold: 75 },
  { time: '06:00', temp: 64, threshold: 75 },
  { time: '08:00', temp: 68, threshold: 75 },
  { time: '10:00', temp: 72, threshold: 75 },
  { time: '12:00', temp: 74, threshold: 75 },
  { time: '14:00', temp: 76, threshold: 75 },
  { time: '16:00', temp: 73, threshold: 75 },
  { time: '18:00', temp: 71, threshold: 75 },
  { time: '20:00', temp: 70, threshold: 75 },
  { time: '22:00', temp: 67, threshold: 75 },
];

export const resourceWastageData = [
  { resource: 'GPU', allocated: 100, used: 76, wasted: 24 },
  { resource: 'CPU', allocated: 100, used: 68, wasted: 32 },
  { resource: 'Memory', allocated: 100, used: 82, wasted: 18 },
  { resource: 'Storage', allocated: 100, used: 91, wasted: 9 },
];

export const wastageMetrics = [
  { name: 'Idle GPU Instances', value: '$2,450', percentage: '18%', description: 'GPUs running with <15% utilization' },
  { name: 'Overprovisioned Memory', value: '$980', percentage: '12%', description: 'Memory allocated but rarely used' },
  { name: 'Orphaned Storage', value: '$345', percentage: '8%', description: 'Storage for completed or abandoned jobs' }
];

export const alertSettings = {
  temperature: 85,
  utilization: 20,
  storage: 85,
  cost: 5000
};
