
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Network, 
  Layers, 
  BarChart3, 
  Clock, 
  Activity,
  Scale, 
  Gauge, 
  Cpu, 
  LayoutGrid, 
  CloudCog
} from 'lucide-react';

const features = [
  {
    icon: <Network className="h-8 w-8 text-egs-blue" />,
    title: "Ray-based Distributed Data Framework",
    description: "Integrate with Ray for parallel, scalable data processing across ETL, vector search, and more."
  },
  {
    icon: <Layers className="h-8 w-8 text-egs-purple" />,
    title: "Network-Aware Provisioning",
    description: "Dynamically place jobs based on data locality to minimize I/O bottlenecks."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-egs-teal" />,
    title: "Dynamic GPU Packing",
    description: "Allocate the right mix of GPUs (A100, H100) based on model size and precision requirements."
  },
  {
    icon: <Clock className="h-8 w-8 text-egs-orange" />,
    title: "Latency-Aware Queuing",
    description: "Prioritize and place jobs based on SLA targets and model response latency requirements."
  },
  {
    icon: <Activity className="h-8 w-8 text-egs-green" />,
    title: "Real-Time Observability",
    description: "Track I/O wait time, throughput, and pipeline latency in real-time dashboards."
  },
  {
    icon: <Scale className="h-8 w-8 text-egs-purple" />,
    title: "Cost & Carbon Optimized Training",
    description: "Select spot or on-demand GPUs based on budget, job duration, and carbon footprint."
  },
  {
    icon: <Gauge className="h-8 w-8 text-egs-blue" />,
    title: "Multi-Model Inference Scaling",
    description: "Support multiple concurrent models per GPU with batching and memory isolation."
  },
  {
    icon: <Cpu className="h-8 w-8 text-egs-teal" />,
    title: "Precision-Aware Provisioning",
    description: "Choose GPUs that support specific precision levels required by your model."
  },
  {
    icon: <LayoutGrid className="h-8 w-8 text-egs-orange" />,
    title: "Expert-Level Scheduling for MoE",
    description: "Activate only required GPU resources for sparse expert training in Mixture-of-Experts models."
  },
  {
    icon: <CloudCog className="h-8 w-8 text-egs-green" />,
    title: "On-Demand GPU Activation",
    description: "Only spin up GPUs for active inference windows, saving costs during idle periods."
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced GPU Features for <span className="text-gradient">Every ML Workload</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our Elastic GPU Service provides specialized infrastructure capabilities for all machine learning stages, 
            from data processing to training and inference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-gradient p-8 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-egs-blue/5 to-egs-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 p-3 rounded-lg inline-block bg-gray-100 dark:bg-gray-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
