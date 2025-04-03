
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Gauge, Monitor, Activity, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { costOptimizations } from '@/data/observabilityMockData';
import { toast } from '@/hooks/use-toast';

const OptimizationTab: React.FC = () => {
  const applyCostOptimization = (id: number) => {
    toast({
      title: "Optimization scheduled",
      description: "Changes will be applied during the next maintenance window"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Cost Optimization Recommendations
          </CardTitle>
          <CardDescription>
            AI-generated recommendations to reduce costs and improve efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {costOptimizations.map((recommendation) => (
              <div key={recommendation.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{recommendation.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                  </div>
                  <Badge 
                    className={
                      recommendation.status === 'implemented' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }
                  >
                    {recommendation.status === 'implemented' ? 'Implemented' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="flex items-center">
                      <Gauge className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">
                        Impact: 
                        <span className={
                          recommendation.impact === 'high' ? 'text-green-600 dark:text-green-400' :
                          recommendation.impact === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-blue-600 dark:text-blue-400'
                        }> {recommendation.impact}</span>
                      </span>
                    </div>
                    <div className="text-sm font-semibold mt-1">
                      Potential Savings: {recommendation.potentialSavings}
                    </div>
                  </div>
                  {recommendation.status !== 'implemented' && (
                    <Button 
                      size="sm" 
                      onClick={() => applyCostOptimization(recommendation.id)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <Monitor className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              Grafana Dashboards
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Interactive visualizations and custom metrics panels
            </p>
            <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/50">
              12 dashboards available
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
              System Health
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Real-time cluster and node monitoring
            </p>
            <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/50">
              98% uptime this month
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center">
              <Database className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
              Cost Explorer
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Resource usage cost analysis and optimization
            </p>
            <Badge variant="outline" className="bg-green-100/50 dark:bg-green-900/50">
              $12,450 tracked this month
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OptimizationTab;
