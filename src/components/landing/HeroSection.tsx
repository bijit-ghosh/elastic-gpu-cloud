
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Server, Zap, Cpu, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-900/80"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gpu-grid"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="inline-block px-4 py-2 mb-6 rounded-full glassmorphism border border-blue-200/30 dark:border-blue-500/20">
              <span className="flex items-center text-sm font-semibold">
                <Zap className="h-4 w-4 mr-2 text-egs-purple" />
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
              <Button 
                className="bg-gradient-to-r from-egs-blue to-egs-purple text-white px-8 py-7 h-auto text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 px-8 py-7 h-auto text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                View Demo
              </Button>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900" 
                      style={{ 
                        backgroundImage: `url(https://randomuser.me/api/portraits/men/${i + 20}.jpg)`, 
                        backgroundSize: 'cover' 
                      }}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span className="font-bold">2,000+</span> AI teams
                </span>
              </div>
              
              <div className="flex items-center px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full glassmorphism">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-2">4.9/5 from 350+ reviews</span>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {['99.9% Uptime', 'NVIDIA Partner', 'Carbon Neutral'].map((item, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-egs-blue mr-2" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative animate-float">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-egs-blue to-egs-purple rounded-lg blur opacity-30"></div>
              <div className="glassmorphism relative rounded-lg p-6 shadow-xl border border-white/20 dark:border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Server className="h-6 w-6 text-egs-blue mr-2" />
                    <span className="font-semibold text-lg">GPU Cluster Status</span>
                  </div>
                  <span className="text-xs px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg glassmorphism">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active GPUs</div>
                    <div className="text-2xl font-bold flex items-center">
                      64 <Cpu className="ml-2 h-5 w-5 text-egs-purple" />
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-egs-blue to-egs-purple rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg glassmorphism">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jobs Running</div>
                    <div className="text-2xl font-bold flex items-center">
                      128 <Zap className="ml-2 h-5 w-5 text-egs-orange" />
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-egs-orange to-egs-purple rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden mb-4 bg-white/60 dark:bg-gray-800/60 glassmorphism">
                  <div className="flex justify-between p-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm font-medium">Model</span>
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  {[
                    { name: "LLaMA-3-70B", status: "Training", color: "blue" },
                    { name: "DeepSeek-v3", status: "Inference", color: "purple" },
                    { name: "MoE-900M", status: "Scaling", color: "teal" },
                    { name: "RAG Agent", status: "Active", color: "green" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-sm">{item.name}</span>
                      <span className={`text-sm font-medium text-egs-${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Last updated: Just now</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-3">Refresh</Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-500/20 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
