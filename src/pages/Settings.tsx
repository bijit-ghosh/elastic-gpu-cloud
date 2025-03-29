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
import { 
  Clock, Cloud, Globe, Keyboard, Lock, Shield, UserCog, Webhook,
  Bell, MoonStar, Eye, Database, Network, LineChart, Languages, 
  CalendarClock, Cpu, Monitor, FileJson, Wifi, Code, History
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [showDeprecated, setShowDeprecated] = useState(false);

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
      <div className="flex justify-between mb-6">
        <div>
          
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="advanced-mode"
            checked={advancedMode}
            onCheckedChange={setAdvancedMode}
          />
          <Label htmlFor="advanced-mode">Advanced Mode</Label>
          
          <Button variant="outline" onClick={() => {
            toast({
              title: "Settings exported",
              description: "Your settings have been exported as JSON.",
            });
          }}>
            <FileJson className="mr-2 h-4 w-4" /> Export Settings
          </Button>
          
          <Button variant="outline" onClick={() => {
            toast({
              title: "Settings imported",
              description: "Your settings have been imported successfully.",
            });
          }}>
            <FileJson className="mr-2 h-4 w-4" /> Import Settings
          </Button>
        </div>
      </div>
      
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
                
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="language" className="text-sm font-medium">Display Language</label>
                    <Select defaultValue="en-US">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="timezone" className="text-sm font-medium">Time Zone</label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="et">Eastern Time (ET)</SelectItem>
                        <SelectItem value="ct">Central Time (CT)</SelectItem>
                        <SelectItem value="mt">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-md font-medium mb-2">Resource Management</h3>
                
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
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="resourceReservation" className="text-sm font-medium">Resource Reservation</label>
                    <p className="text-sm text-muted-foreground">Pre-allocate resources for critical workloads</p>
                  </div>
                  <Switch id="resourceReservation" />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="idleTimeout" className="text-sm font-medium">Idle Resource Timeout</label>
                    <p className="text-sm text-muted-foreground">Automatically release idle resources</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger id="idleTimeout" className="w-32">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="budget" className="text-sm font-medium">Monthly Budget Alert ($)</label>
                  <Input id="budget" type="number" defaultValue="5000" />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-md font-medium mb-2">User Interface</h3>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="welcomeScreen" className="text-sm font-medium">Show Welcome Screen</label>
                    <p className="text-sm text-muted-foreground">Display welcome guide on startup</p>
                  </div>
                  <Switch id="welcomeScreen" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="tutorialTips" className="text-sm font-medium">Show Tutorial Tips</label>
                    <p className="text-sm text-muted-foreground">Display helpful tips for new users</p>
                  </div>
                  <Switch id="tutorialTips" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="showDeprecated" className="text-sm font-medium">Show Deprecated Features</label>
                    <p className="text-sm text-muted-foreground">Display features that will be removed in future versions</p>
                  </div>
                  <Switch 
                    id="showDeprecated" 
                    checked={showDeprecated}
                    onCheckedChange={setShowDeprecated}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {advancedMode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Configure data handling settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="dataCompression" className="text-sm font-medium">Data Compression</label>
                    <p className="text-sm text-muted-foreground">Compress data for storage</p>
                  </div>
                  <Switch id="dataCompression" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label htmlFor="autoBackup" className="text-sm font-medium">Automatic Backups</label>
                    <p className="text-sm text-muted-foreground">Regularly backup your data</p>
                  </div>
                  <Switch id="autoBackup" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="backupFrequency" className="text-sm font-medium">Backup Frequency</label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="dataRetentionPeriod" className="text-sm font-medium">Data Retention Period</label>
                  <Select defaultValue="90">
                    <SelectTrigger id="dataRetentionPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="w-full">
                  Schedule Data Cleanup
                </Button>
              </CardContent>
            </Card>
          )}
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
              
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">API Key Permissions</h3>
                <div className="grid gap-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="read-access" defaultChecked />
                    <div>
                      <label htmlFor="read-access" className="text-sm font-medium">Read Access</label>
                      <p className="text-xs text-muted-foreground">Allows reading data from the API</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="write-access" defaultChecked />
                    <div>
                      <label htmlFor="write-access" className="text-sm font-medium">Write Access</label>
                      <p className="text-xs text-muted-foreground">Allows creating and updating data via the API</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="delete-access" />
                    <div>
                      <label htmlFor="delete-access" className="text-sm font-medium">Delete Access</label>
                      <p className="text-xs text-muted-foreground">Allows deleting data via the API</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox id="admin-access" />
                    <div>
                      <label htmlFor="admin-access" className="text-sm font-medium">Admin Access</label>
                      <p className="text-xs text-muted-foreground">Full administrative access to all API endpoints</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-2">API Usage Limits</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label htmlFor="rate-limit" className="text-sm font-medium">Rate Limit (requests per minute)</label>
                      <span className="text-sm text-muted-foreground">200 rpm</span>
                    </div>
                    <Slider defaultValue={[200]} min={10} max={1000} step={10} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label htmlFor="concurrent-requests" className="text-sm font-medium">Max Concurrent Requests</label>
                      <span className="text-sm text-muted-foreground">50</span>
                    </div>
                    <Slider defaultValue={[50]} min={5} max={200} step={5} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <h3 className="text-sm font-medium">API Webhooks</h3>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Job Completion Webhook</h4>
                    <Switch id="job-webhook" defaultChecked />
                  </div>
                  <Input placeholder="https://your-server.com/webhooks/job-completed" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-logs" />
                    <label htmlFor="include-logs" className="text-sm">Include logs in payload</label>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Error Alert Webhook</h4>
                    <Switch id="error-webhook" defaultChecked />
                  </div>
                  <Input placeholder="https://your-server.com/webhooks/error-alert" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-stacktrace" />
                    <label htmlFor="include-stacktrace" className="text-sm">Include stack trace in payload</label>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="mt-2">
                  <Webhook className="h-4 w-4 mr-2" /> Add New Webhook
                </Button>
              </div>
              
              <Button variant="outline">Generate New API Key</Button>
              
              {advancedMode && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Advanced API Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <label htmlFor="timeout" className="text-sm font-medium">Request Timeout (seconds)</label>
                      <Input id="timeout" type="number" defaultValue="30" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="retry-attempts" className="text-sm font-medium">Max Retry Attempts</label>
                      <Input id="retry-attempts" type="number" defaultValue="3" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">JSON Pretty Print</p>
                        <p className="text-xs text-muted-foreground">Format JSON responses for readability</p>
                      </div>
                      <Switch id="json-pretty" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
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
              
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium mb-3">Notification Types</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Job Completion</label>
                    <p className="text-sm text-muted-foreground">Notify when a job completes</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        All channels <Bell className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="job-email" defaultChecked className="mr-2" />
                        <label htmlFor="job-email">Email</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="job-slack" defaultChecked className="mr-2" />
                        <label htmlFor="job-slack">Slack</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="job-push" className="mr-2" />
                        <label htmlFor="job-push">Push</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Job Failure</label>
                    <p className="text-sm text-muted-foreground">Notify when a job fails</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        All channels <Bell className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="failure-email" defaultChecked className="mr-2" />
                        <label htmlFor="failure-email">Email</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="failure-slack" defaultChecked className="mr-2" />
                        <label htmlFor="failure-slack">Slack</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="failure-push" defaultChecked className="mr-2" />
                        <label htmlFor="failure-push">Push</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Resource Usage</label>
                    <p className="text-sm text-muted-foreground">Notify on high resource usage</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        All channels <Bell className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="resource-email" defaultChecked className="mr-2" />
                        <label htmlFor="resource-email">Email</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="resource-slack" defaultChecked className="mr-2" />
                        <label htmlFor="resource-slack">Slack</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="resource-push" className="mr-2" />
                        <label htmlFor="resource-push">Push</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Security Alerts</label>
                    <p className="text-sm text-muted-foreground">Notify about security-related events</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        All channels <Bell className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="security-email" defaultChecked className="mr-2" />
                        <label htmlFor="security-email">Email</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="security-slack" defaultChecked className="mr-2" />
                        <label htmlFor="security-slack">Slack</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Checkbox id="security-push" defaultChecked className="mr-2" />
                        <label htmlFor="security-push">Push</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium mb-3">Notification Schedule</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Quiet Hours</label>
                    <p className="text-sm text-muted-foreground">Silence non-critical notifications</p>
                  </div>
                  <Switch id="quiet-hours" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="quiet-start" className="text-sm font-medium">Start Time</label>
                    <Select defaultValue="22:00">
                      <SelectTrigger id="quiet-start">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="quiet-end" className="text-sm font-medium">End Time</label>
                    <Select defaultValue="07:00">
                      <SelectTrigger id="quiet-end">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="05:00">5:00 AM</SelectItem>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="07:00">7:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Active Days</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Mon</Button>
                    <Button variant="outline" size="sm" className="flex-1">Tue</Button>
                    <Button variant="outline" size="sm" className="flex-1">Wed</Button>
                    <Button variant="outline" size="sm" className="flex-1">Thu</Button>
                    <Button variant="outline" size="sm" className="flex-1">Fri</Button>
                    <Button variant="secondary" size="sm" className="flex-1">Sat</Button>
                    <Button variant="secondary" size="sm" className="flex-1">Sun</Button>
                  </div>
                </div>
              </div>
              
              {advancedMode && (
                <>
                  <Separator className="my-4" />
                  
                  <h3 className="text-sm font-medium mb-3">Summary Reports</h3>
                  
                  <div className="space-y-3">
