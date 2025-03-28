
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Clock, Cloud, Globe, Keyboard, Lock, Shield, UserCog, Webhook } from 'lucide-react';

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
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
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
                  <Select defaultValue="us-west-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                      <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                      <SelectItem value="ap-southeast-2">Asia Pacific (Sydney)</SelectItem>
                    </SelectContent>
                  </Select>
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

                <div className="grid gap-2">
                  <label htmlFor="budget" className="text-sm font-medium">Monthly Budget Alert ($)</label>
                  <Input id="budget" type="number" defaultValue="5000" />
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
              <CardTitle className="flex items-center">
                <Webhook className="mr-2 h-5 w-5" />
                API Keys
              </CardTitle>
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
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">API Access Control</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">IP Address Restrictions</p>
                      <p className="text-sm text-muted-foreground">Limit API access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Set a maximum number of requests per minute</p>
                    </div>
                    <Select defaultValue="200">
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="1000">1000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">Generate New API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
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
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium mb-3">Notification Channels</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <Input className="mt-1 w-64" placeholder="Enter email address" defaultValue="admin@elastic-gpu.com" />
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Slack Notifications</p>
                    <p className="text-xs text-muted-foreground">Connect your Slack workspace</p>
                  </div>
                  <Button variant="outline" size="sm">Connect Slack</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mobile Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive alerts on your mobile device</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
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
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Advanced Security</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">SAML Single Sign-On</label>
                    <p className="text-sm text-muted-foreground">Enable enterprise SSO authentication</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Login History</label>
                    <p className="text-sm text-muted-foreground">Track all login attempts</p>
                  </div>
                  <Button variant="outline" size="sm">View History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the interface appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Theme Mode</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start text-sm px-3">
                      Light
                    </Button>
                    <Button variant="outline" className="justify-start text-sm px-3">
                      Dark
                    </Button>
                    <Button variant="secondary" className="justify-start text-sm px-3">
                      System
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Density</label>
                    <span className="text-sm text-muted-foreground">Comfortable</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={25} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Compact</span>
                    <span>Comfortable</span>
                    <span>Spacious</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Animations</label>
                    <p className="text-sm text-muted-foreground">Enable UI animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fontSize" className="text-sm font-medium">Font Size</label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="mr-2 h-5 w-5" />
                External Integrations
              </CardTitle>
              <CardDescription>Connect with external platforms and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-muted-foreground">Integrate with your GitHub repositories</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.82 4.74c-.58-.94-1.35-1.77-2.22-2.42-2.17-1.6-5-1.92-7.51-.84-1.62.7-3.03 2.03-3.92 3.6-.91 1.61-1.29 3.59-1.03 5.43.05.39.13.76.22 1.12 0 .03.02.06.04.09-2.39.7-4.86 1.76-5.98 4.69-.32.84-.41 1.78-.24 2.67.33 1.72 1.64 3.32 3.36 3.82 1.84.53 5.21.03 6.88-2.16.23-.31.45-.66.62-1.02.59-1.25.59-2.99.58-3.87v-1.88c0-.28.06-.53.16-.77l-.03-.04c.36.12.72.22 1.1.29.34.06.67.1 1.01.1 1.07 0 2.12-.32 2.99-.89 1.09-.7 1.94-1.76 2.35-2.97.41-1.2.41-2.51-.01-3.71zm-1.95 3.1c-.28.82-.85 1.52-1.58 1.98-.61.4-1.33.57-2.05.52-.73-.06-1.43-.32-2.04-.74-.28-.19-.52-.43-.75-.69-.14-.16-.01-.4.2-.35.21.05.42.08.65.08 1.02 0 1.96-.51 2.51-1.37.25-.39.18-.88-.03-1.24-.93-1.6-3.29-1.64-4.24-.05-.47.79-.51 1.76-.13 2.58.06.15-.16.18-.19.05-.25-.93-.19-2.14.35-2.9.46-.64 1.18-1.06 1.97-1.18.79-.11 1.63.05 2.28.5.65.44 1.13 1.13 1.35 1.88.21.74.13 1.56-.15 2.27-.01.05-.01.1-.02.16-.01.2-.16.33-.33.33-.17 0-.32-.13-.33-.33 0-.02 0-.03 0-.05-.24-.79-.22-1.63-.06-2.4.11-.55-.39-1.03-.94-.92-.22.04-.41.16-.54.33-.34.46-.47 1.04-.41 1.58.05.51.28.96.64 1.28.36.31.82.5 1.31.53.61.04 1.22-.13 1.72-.47.5-.34.9-.83 1.12-1.39.22-.56.25-1.2.07-1.78-.18-.59-.54-1.11-1.02-1.5-.48-.4-1.07-.65-1.67-.7-.61-.06-1.24.07-1.77.35-.53.27-.99.7-1.3 1.22-.3.52-.46 1.13-.44 1.72.01.6.21 1.19.55 1.68.09.13.01.29-.13.35-.2.08-.32-.02-.44-.19-.33-.45-.53-.98-.6-1.52-.06-.56.01-1.14.2-1.67.19-.53.5-1.03.9-1.42.4-.39.88-.7 1.4-.9 1.06-.39 2.32-.35 3.36.13.51.24.96.59 1.32 1.01.19.23.36.46.5.72.28.51.44 1.1.46 1.69.02.59-.11 1.19-.37 1.73zm-5.92 9.12c.02.01.05.02.07.03.41-.35.79-.72 1.13-1.11.62-.73 1.14-1.54 1.52-2.4.44-1 .75-2.05.92-3.13.07-.42.12-.86.14-1.29.01-.31-.24-.44-.47-.22-.14.13-.28.26-.44.39-.38.32-.8.59-1.24.8-1.43.68-3.2.51-4.47-.44-.14-.1-.27-.21-.39-.33-.13-.12-.35-.06-.39.12-.06.31-.1.63-.11.94-.04 1.46.08 2.96.38 4.4.08.41.19.82.32 1.22.08.25.17.51.27.75.04.09.09.18.13.27.02.04.08.15.08.14-.01-.02-.02-.02-.04-.03.03.04.07.06.11.09z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className="text-sm text-muted-foreground">Get notified on Slack</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19h-1.782v-8h1.782v8zm-4.782-8h-1.782v8h1.782v-8zm2.782-2h-2.563v1.5h2.563v-1.5zm4.5 10h1.782v-8h-1.782v8zm2.782-10h-2.563v1.5h2.563v-1.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">AWS</h3>
                    <p className="text-sm text-muted-foreground">Connect your AWS account</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCog className="mr-2 h-5 w-5" />
                User Permissions
              </CardTitle>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Administrator</h3>
                      <p className="text-sm text-muted-foreground">Full access to all settings</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Users (3)</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Developer</h3>
                      <p className="text-sm text-muted-foreground">Can create and manage jobs</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Users (8)</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Viewer</h3>
                      <p className="text-sm text-muted-foreground">Read-only access</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Users (12)</Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Add New Role</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Keyboard className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Configure advanced options for your environment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Developer Mode</label>
                    <p className="text-sm text-muted-foreground">Enable advanced debugging tools</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Log Verbosity</label>
                    <p className="text-sm text-muted-foreground">Set the detail level for logs</p>
                  </div>
                  <Select defaultValue="info">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="trace">Trace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-2" />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Management</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Data Retention Period</label>
                      <p className="text-sm text-muted-foreground">How long to keep historical data</p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="customEndpoint" className="text-sm font-medium">Custom API Endpoint</label>
                  <Input id="customEndpoint" placeholder="https://api.yourdomain.com/v1" />
                  <p className="text-xs text-muted-foreground">Leave empty to use the default endpoint</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="destructive" className="w-full">Reset All Settings</Button>
              <p className="text-xs text-muted-foreground text-center">This action cannot be undone</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
