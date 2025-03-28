
import React from 'react';
import { Card } from '@/components/ui/card';
import { Database, Code, Sparkles, CheckCircle2 } from 'lucide-react';

const workloadTypes = [
  {
    icon: <Database className="h-12 w-12 text-egs-blue" />,
    title: "Data-Intensive Workloads",
    description: "Process and transform massive datasets with distributed compute power.",
    features: [
      "Ray-based Distributed Data Framework",
      "Network-Aware Provisioning",
      "Burstable NAS & Caching",
      "CRD for Data Pipelines",
      "Real-Time Observability"
    ]
  },
  {
    icon: <Code className="h-12 w-12 text-egs-purple" />,
    title: "Fine-Tuning & Training",
    description: "Scale your model training with intelligent GPU allocation and management.",
    features: [
      "Dynamic GPU Packing",
      "Expert-Level Scheduling for MoE",
      "Precision-Aware Provisioning",
      "Lifecycle-Aware Scaling",
      "Cost & Carbon Optimized Training"
    ]
  },
  {
    icon: <Sparkles className="h-12 w-12 text-egs-teal" />,
    title: "Inference",
    description: "Deploy models with low-latency and cost-efficient infrastructure.",
    features: [
      "Latency-Aware Queuing",
      "Multi-Model Inference Scaling",
      "Model-to-Node Affinity",
      "On-Demand GPU Activation",
      "Observability Dashboard"
    ]
  }
];

const WorkloadSection = () => {
  return (
    <section id="workloads" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Specialized for <span className="text-gradient">Every ML Workload</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our platform provides tailored infrastructure for each stage of the machine learning lifecycle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workloadTypes.map((workload, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 
                        overflow-hidden relative card-hover glassmorphism"
            >
              <div className="mb-6">
                {workload.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{workload.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{workload.description}</p>
              
              <ul className="space-y-3">
                {workload.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-egs-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-egs-blue/10 to-egs-teal/5 rounded-full blur-3xl"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkloadSection;
