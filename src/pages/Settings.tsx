
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Settings"
      description="Configure your environment settings"
    >
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your Elastic GPU environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Organization Name</label>
                  <Input id="name" defaultValue="Elastic GPU Research Team" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="region" className="text-sm font-medium">Default Region</label>
                  <Input id="region" defaultValue="us-west-1" />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="autoScaling" className="text-sm font-medium">Auto-scaling</label>
                    <p className="text-sm text-muted-foreground">Enable automatic scaling of resources</p>
                  </div>
                  <Switch id="autoScaling" defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="costOptimization" className="text-sm font-medium">Cost Optimization</label>
                    <p className="text-sm text-muted-foreground">Automatically optimize for cost</p>
                  </div>
                  <Switch id="costOptimization" defaultChecked />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for accessing the Elastic GPU platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Your API Key</p>
                <div className="mt-2 flex items-center gap-2">
                  <Input type="password" value="sk-••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline" size="sm">Show</Button>
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Last used: 2 hours ago
                </p>
              </div>
              <Button variant="outline">Generate New API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Job Completion</label>
                  <p className="text-sm text-muted-foreground">Notify when a job completes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Job Failure</label>
                  <p className="text-sm text-muted-foreground">Notify when a job fails</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Resource Usage</label>
                  <p className="text-sm text-muted-foreground">Notify on high resource usage</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Two-Factor Authentication</label>
                  <p className="text-sm text-muted-foreground">Enable 2FA for your account</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Session Timeout</label>
                  <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2 pt-4">
                <label htmlFor="timeout" className="text-sm font-medium">Timeout Duration (minutes)</label>
                <Input id="timeout" type="number" defaultValue="30" className="w-28" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
