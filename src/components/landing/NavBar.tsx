
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GanttChart, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm' : 
      'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center space-x-2">
          <GanttChart className="h-8 w-8 text-egs-blue" />
          <span className="font-bold text-xl text-gradient">Elastic GPU Service</span>
        </div>
        
        {/* Desktop Navigation */}
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
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-800">Login</Button>
          <Button className="bg-gradient-to-r from-egs-blue to-egs-purple text-white hover:opacity-90">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism py-4 px-4">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-800 dark:text-gray-200 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#workloads" 
              className="text-gray-800 dark:text-gray-200 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              ML Workloads
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-800 dark:text-gray-200 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-gray-800 dark:text-gray-200 py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="ghost" className="w-full justify-center">Login</Button>
              <Button className="w-full justify-center bg-gradient-to-r from-egs-blue to-egs-purple text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
