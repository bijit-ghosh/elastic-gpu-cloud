
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Server, Zap, Cpu } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden hero-gradient">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gpu-grid"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-egs-purple/10 text-egs-purple border border-egs-purple/20">
              <span className="flex items-center text-sm font-semibold">
                <Zap className="h-4 w-4 mr-1" />
                Next-Gen ML Infrastructure
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-gradient">Elastic GPU</span> Service <br />
              <span className="text-gray-700 dark:text-gray-300">for Modern AI Workloads</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              Scale your ML infrastructure elastically across data processing, training, 
              and inference workloads with our intelligent GPU allocation system.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-egs-blue to-egs-purple text-white px-6 py-6 h-auto text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" className="border-2 px-6 py-6 h-auto text-lg">
                View Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold">2,000+</span> AI teams
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative animation-delay-200 animate-float">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-egs-blue to-egs-purple rounded-lg blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Server className="h-6 w-6 text-egs-blue mr-2" />
                    <span className="font-semibold text-lg">GPU Cluster Status</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Active GPUs</div>
                    <div className="text-2xl font-bold flex items-center">
                      64 <Cpu className="ml-2 h-5 w-5 text-egs-purple" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Jobs Running</div>
                    <div className="text-2xl font-bold flex items-center">
                      128 <Zap className="ml-2 h-5 w-5 text-egs-orange" />
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden mb-4">
                  <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium">Model</span>
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  {[
                    { name: "LLaMA-3-70B", status: "Training", color: "egs-blue" },
                    { name: "DeepSeek-v3", status: "Inference", color: "egs-purple" },
                    { name: "MoE-900M", status: "Scaling", color: "egs-teal" },
                    { name: "RAG Agent", status: "Active", color: "egs-green" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between p-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm">{item.name}</span>
                      <span className={`text-sm font-medium text-egs-${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated: Just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
