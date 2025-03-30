
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
  CalendarClock, Cpu, Monitor, FileJson, Wifi, Code, History, Plug
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
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Daily Summary</label>
                        <p className="text-sm text-muted-foreground">Receive a daily summary of all activities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Weekly Report</label>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary with analytics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </>
              )}
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
                Configure security options for your environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">IP Restrictions</label>
                    <p className="text-sm text-muted-foreground">Limit access to specific IP ranges</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Access Logs</label>
                    <p className="text-sm text-muted-foreground">Record all access attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Password Policy</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Minimum Password Length</label>
                    </div>
                    <Select defaultValue="12">
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="14">14</SelectItem>
                        <SelectItem value="16">16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Require Special Characters</label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Password Expiration</label>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Session Management</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Session Timeout</label>
                      <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Max Concurrent Sessions</label>
                      <p className="text-sm text-muted-foreground">Maximum number of active sessions per user</p>
                    </div>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {advancedMode && (
                  <>
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium mb-2">Advanced Security</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Data Encryption</label>
                          <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">VPC Isolation</label>
                          <p className="text-sm text-muted-foreground">Run resources in isolated VPC</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Audit Logs</label>
                          <p className="text-sm text-muted-foreground">Record all system changes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" /> Run Security Audit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MoonStar className="mr-2 h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Sun className="mr-2 h-4 w-4" /> Light
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Moon className="mr-2 h-4 w-4" /> Dark
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Laptop className="mr-2 h-4 w-4" /> System
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Color Scheme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div> Blue
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-purple-500"></div> Purple
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div> Green
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Layout</h3>
                
                <RadioGroup defaultValue="default">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="default" id="layout-default" />
                    <div>
                      <Label htmlFor="layout-default">Default Layout</Label>
                      <p className="text-sm text-muted-foreground">Standard layout with sidebar navigation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="compact" id="layout-compact" />
                    <div>
                      <Label htmlFor="layout-compact">Compact Layout</Label>
                      <p className="text-sm text-muted-foreground">Condensed layout with icon-only sidebar</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="expanded" id="layout-expanded" />
                    <div>
                      <Label htmlFor="layout-expanded">Expanded Layout</Label>
                      <p className="text-sm text-muted-foreground">Wider layout with detailed navigation</p>
                    </div>
                  </div>
                </RadioGroup>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Font Settings</h3>
                
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Font Size</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Font Family</label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {advancedMode && (
                  <>
                    <Separator className="my-4" />
                    
                    <h3 className="text-sm font-medium mb-2">Advanced Appearance</h3>
                    
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Animation Speed</label>
                        <Select defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue placeholder="Select animation speed" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                            <SelectItem value="off">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Reduced Motion</label>
                          <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">High Contrast Mode</label>
                          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="pt-4">
                  <Button className="w-full">
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plug className="mr-2 h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect with external tools and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5-2.6067-1.4997v-2.9997z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Slack</h4>
                      <p className="text-sm text-muted-foreground">Connect your Slack workspace</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm2.5 16.5h-5v-2h5v2zm0-3.5h-5v-2h5v2zm0-3.5h-5v-2h5v2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Jira</h4>
                      <p className="text-sm text-muted-foreground">Connect your Jira account</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 bg-green-50">Connected</Badge>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.917.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">GitHub</h4>
                      <p className="text-sm text-muted-foreground">Connect your GitHub repositories</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Discord</h4>
                      <p className="text-sm text-muted-foreground">Connect your Discord server</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.259 15.553h2.733L17.386 18h2.149L15.656 6.7h-2.282L9.507 18h2.136l.414-2.448h4.202zm-3.577-2.057L12.259 8.6l1.285 4.896h-1.862zM16.5 3h5.29L20.5 5h-4v.026L9.5 5v12.974L8.706 21H3.713L5 19h12.5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Datadog</h4>
                      <p className="text-sm text-muted-foreground">Connect your Datadog account for monitoring</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
              
              {advancedMode && (
                <div className="pt-4 mt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Custom Integrations</h3>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Webhook URL</label>
                      <Input placeholder="https://your-service.com/webhook" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Authentication Token</label>
                      <Input type="password" placeholder="Enter authentication token" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Events</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="job_started" />
                          <label htmlFor="job_started" className="text-sm">Job Started</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="job_completed" defaultChecked />
                          <label htmlFor="job_completed" className="text-sm">Job Completed</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="job_failed" defaultChecked />
                          <label htmlFor="job_failed" className="text-sm">Job Failed</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="resource_limit" defaultChecked />
                          <label htmlFor="resource_limit" className="text-sm">Resource Limit</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Webhook className="mr-2 h-4 w-4" /> Add Custom Integration
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCog className="mr-2 h-5 w-5" />
                Permission Settings
              </CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="text-sm font-medium">Administrator</h4>
                    <p className="text-sm text-muted-foreground">Full access to all features</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="text-sm font-medium">Developer</h4>
                    <p className="text-sm text-muted-foreground">Can create and manage jobs</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="text-sm font-medium">Analyst</h4>
                    <p className="text-sm text-muted-foreground">View-only access to results and analytics</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-4">
                  <div>
                    <h4 className="text-sm font-medium">Viewer</h4>
                    <p className="text-sm text-muted-foreground">Limited view-only access</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium mb-3">Resource Access</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Resource</label>
                  </div>
                  <div className="text-center">
                    <label className="text-sm font-medium">View</label>
                  </div>
                  <div className="text-center">
                    <label className="text-sm font-medium">Modify</label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm">Training Jobs</p>
                  </div>
                  <div className="text-center">
                    <Checkbox defaultChecked />
                  </div>
                  <div className="text-center">
                    <Checkbox defaultChecked />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm">Inference Endpoints</p>
                  </div>
                  <div className="text-center">
                    <Checkbox defaultChecked />
                  </div>
                  <div className="text-center">
                    <Checkbox defaultChecked />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm">GPU Resources</p>
                  </div>
                  <div className="text-center">
                    <Checkbox defaultChecked />
                  </div>
                  <div className="text-center">
                    <Checkbox />
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm">Billing Information</p>
                  </div>
                  <div className="text-center">
                    <Checkbox />
                  </div>
                  <div className="text-center">
                    <Checkbox />
                  </div>
                </div>
              </div>
              
              {advancedMode && (
                <>
                  <Separator className="my-4" />
                  
                  <h3 className="text-sm font-medium mb-3">Custom Role Creation</h3>
                  
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Role Name</label>
                      <Input placeholder="Enter role name" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Role Description</label>
                      <Textarea placeholder="Describe the role's purpose and permissions" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Base Role</label>
                      <Select defaultValue="developer">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a base role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrator">Administrator</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="custom">Custom (No Base)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <UserCog className="mr-2 h-4 w-4" /> Create Custom Role
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure advanced system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-2">Compute Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Default GPU Architecture</label>
                    <p className="text-sm text-muted-foreground">Select the default GPU architecture for new jobs</p>
                  </div>
                  <Select defaultValue="ampere">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Architecture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volta">Volta</SelectItem>
                      <SelectItem value="turing">Turing</SelectItem>
                      <SelectItem value="ampere">Ampere</SelectItem>
                      <SelectItem value="hopper">Hopper</SelectItem>
                      <SelectItem value="ada">Ada Lovelace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">CUDA Version</label>
                    <p className="text-sm text-muted-foreground">Select the default CUDA version</p>
                  </div>
                  <Select defaultValue="11.8">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10.2">CUDA 10.2</SelectItem>
                      <SelectItem value="11.4">CUDA 11.4</SelectItem>
                      <SelectItem value="11.8">CUDA 11.8</SelectItem>
                      <SelectItem value="12.0">CUDA 12.0</SelectItem>
                      <SelectItem value="12.1">CUDA 12.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Memory Allocation</label>
                    <p className="text-sm text-muted-foreground">Configure GPU memory allocation strategy</p>
                  </div>
                  <Select defaultValue="dynamic">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Allocation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dynamic">Dynamic</SelectItem>
                      <SelectItem value="static">Static</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Network Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">HTTP Proxy</label>
                    <p className="text-sm text-muted-foreground">Configure HTTP proxy settings</p>
                  </div>
                  <div className="w-40">
                    <Input placeholder="proxy:port" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Network Interface</label>
                    <p className="text-sm text-muted-foreground">Select the primary network interface</p>
                  </div>
                  <Select defaultValue="auto">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Interface" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="eth0">eth0</SelectItem>
                      <SelectItem value="eth1">eth1</SelectItem>
                      <SelectItem value="wlan0">wlan0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Network Bandwidth Limit</label>
                    <p className="text-sm text-muted-foreground">Limit bandwidth usage per job</p>
                  </div>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Limit</SelectItem>
                      <SelectItem value="100m">100 Mbps</SelectItem>
                      <SelectItem value="1g">1 Gbps</SelectItem>
                      <SelectItem value="10g">10 Gbps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">System Management</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Log Level</label>
                    <p className="text-sm text-muted-foreground">Configure system logging verbosity</p>
                  </div>
                  <Select defaultValue="info">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Log Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Log Retention</label>
                    <p className="text-sm text-muted-foreground">How long to keep system logs</p>
                  </div>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Retention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="90d">90 days</SelectItem>
                      <SelectItem value="365d">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">System Metrics</label>
                    <p className="text-sm text-muted-foreground">Collect detailed system metrics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-sm font-medium mb-2">Maintenance</h3>
                
                <div className="flex justify-between space-x-4">
                  <Button variant="outline" className="flex-1">
                    <History className="mr-2 h-4 w-4" /> System Cleanup
                  </Button>
                  
                  <Button variant="outline" className="flex-1">
                    <Database className="mr-2 h-4 w-4" /> Reset Cache
                  </Button>
                  
                  <Button variant="outline" className="flex-1">
                    <Cpu className="mr-2 h-4 w-4" /> Reset Configs
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-2 w-full">
                <Button variant="destructive" className="w-full">
                  Reset All Settings to Default
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  This action cannot be undone. Please backup your settings first.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;

function Sun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function Laptop({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function Badge({ className, variant, children }: { className?: string; variant?: "outline" | "destructive"; children?: React.ReactNode }) {
  const baseClasses = "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium";
  
  const variants = {
    outline: "border border-gray-300 text-gray-700",
    destructive: "bg-red-100 text-red-800",
  };
  
  const variantClass = variant && variants[variant] ? variants[variant] : "";
  
  return (
    <span className={`${baseClasses} ${variantClass} ${className || ""}`}>
      {children}
    </span>
  );
}

