
import React from 'react';
import { Button } from '@/components/ui/button';
import { GanttChart } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <GanttChart className="h-8 w-8 text-egs-blue" />
          <span className="font-bold text-xl text-gradient">Elastic GPU Service</span>
        </div>
        
        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#features" className="text-gray-700 hover:text-egs-blue dark:text-gray-300 dark:hover:text-egs-purple transition-colors">
            Features
          </a>
          <a href="#workloads" className="text-gray-700 hover:text-egs-blue dark:text-gray-300 dark:hover:text-egs-purple transition-colors">
            ML Workloads
          </a>
          <a href="#testimonials" className="text-gray-700 hover:text-egs-blue dark:text-gray-300 dark:hover:text-egs-purple transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-egs-blue dark:text-gray-300 dark:hover:text-egs-purple transition-colors">
            Pricing
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Login</Button>
          <Button className="bg-gradient-to-r from-egs-blue to-egs-purple text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
