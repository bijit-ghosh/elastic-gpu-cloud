
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import AlertHistoryTable from '@/components/observability/AlertHistoryTable';

const AlertsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <AlertHistoryTable />
      
      <Card>
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
          <CardDescription>Customize your observability alert thresholds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>GPU Temperature Threshold</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="70"
                    max="95"
                    defaultValue="85"
                    className="w-full"
                  />
                  <span className="w-12 text-center">85°C</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>GPU Utilization Alert</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    defaultValue="20"
                    className="w-full"
                  />
                  <span className="w-16 text-center">&lt; 20%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Storage Warning</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="60"
                    max="95"
                    defaultValue="85"
                    className="w-full"
                  />
                  <span className="w-16 text-center">&gt; 85%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Cost Threshold</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    defaultValue="5000"
                    className="w-full"
                  />
                  <span className="w-16 text-center">$5000</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Switch id="slack-notifications" defaultChecked />
              <Label htmlFor="slack-notifications">Send critical alerts to Slack</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="email-digests" defaultChecked />
              <Label htmlFor="email-digests">Send daily alert digests via email</Label>
            </div>
            
            <Button className="mt-4">Save Alert Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsTab;
