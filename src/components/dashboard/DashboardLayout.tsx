
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ActivitySquare, BarChart3, BrainCircuit, 
  CloudLightning, Code, Server, Settings, 
  Plugs 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
  description?: string;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: BarChart3,
    path: "/dashboard",
    description: "Overview of jobs, GPU usage, and metrics"
  },
  {
    name: "Training Jobs",
    icon: BrainCircuit,
    path: "/training",
    description: "Configure and monitor training jobs"
  },
  {
    name: "Inference",
    icon: CloudLightning,
    path: "/inference",
    description: "Deploy and monitor serving endpoints"
  },
  {
    name: "Developer Tools",
    icon: Code,
    path: "/devtools",
    description: "Jupyter, SDK, and developer resources"
  },
  {
    name: "Observability",
    icon: ActivitySquare,
    path: "/observability",
    description: "Deep insights and analytics"
  },
  {
    name: "Integrations",
    icon: Plugs,
    path: "/integrations",
    description: "Connect and manage external tools"
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
    description: "Configure your environment"
  }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title,
  description
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 glassmorphism bg-white/80 dark:bg-gray-800/80 border-r">
          <div className="flex items-center h-16 px-4 border-b">
            <div className="flex items-center">
              <Server className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Elastic GPU</span>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full transition-all ${
                  window.location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex items-center h-16">
            <Server className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">Elastic GPU</span>
          </div>
          <nav className="flex-1 mt-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${
                  window.location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex items-center px-4 py-3 border-b bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
