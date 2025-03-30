
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Clock, Cloud, Globe, Keyboard, Lock, Shield, UserCog, Webhook,
  Bell, MoonStar, Eye, Database, Network, LineChart, Languages, 
  CalendarClock, Cpu, Monitor, FileJson, Wifi, Code, History, Plug,
  Cog, Timer, TimerReset, ShieldCheck, ShieldAlert, Key, KeyRound,
  Settings as SettingsIcon, MonitorDot, MonitorOff, WifiOff, Info
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    inApp: true,
    alertCritical: true,
    dailyReport: true,
    weeklyDigest: false,
    maintenanceAlerts: true,
    usageAlerts: true
  });
  const [quotaUsage, setQuotaUsage] = useState(68);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production', key: 'sk-prod-faketpkfakekey78fake', active: true, created: '2023-05-12' },
    { id: 2, name: 'Development', key: 'sk-dev-faketpkfakekey56fake', active: true, created: '2023-06-03' },
  ]);
  const [logs, setLogs] = useState([
    { id: 1, action: 'API Key Created', user: 'admin@example.com', timestamp: '2023-10-15 14:32:45' },
    { id: 2, action: 'Settings Updated', user: 'admin@example.com', timestamp: '2023-10-10 09:15:22' },
    { id: 3, action: 'User Added', user: 'admin@example.com', timestamp: '2023-09-28 11:47:03' },
  ]);
  
  // Form schema for general settings
  const formSchema = z.object({
    siteName: z.string().min(2, {
      message: "Site name must be at least 2 characters.",
    }),
    language: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
  });

  // Form for general settings
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "MLOps Platform",
      language: "en-US",
      timezone: "UTC",
      dateFormat: "MMM DD, YYYY",
    },
  });

  // Form schema for API settings
  const apiFormSchema = z.object({
    rateLimit: z.number().min(10).max(1000),
    timeout: z.number().min(1).max(60),
    retries: z.number().min(0).max(5),
  });

  // Form for API settings
  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      rateLimit: 100,
      timeout: 30,
      retries: 3,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  }

  // Function to toggle notification settings
  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };

  // Function to create a new API key
  const createNewApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `New Key ${apiKeys.length + 1}`,
      key: `sk-new-${Math.random().toString(36).substring(2, 15)}`,
      active: true,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
    toast({
      title: "API Key Created",
      description: "New API Key has been generated successfully.",
    });
  };

  // Function to revoke an API key
  const revokeApiKey = (id: number) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, active: false } : key
    ));
    toast({
      title: "API Key Revoked",
      description: "The API Key has been revoked successfully.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={advancedMode} 
              onCheckedChange={setAdvancedMode} 
              id="advanced-mode"
            />
            <Label htmlFor="advanced-mode">Advanced Mode</Label>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Cog size={16} />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Code size={16} />
              <span className="hidden md:inline">API Access</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Eye size={16} />
              <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug size={16} />
              <span className="hidden md:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <UserCog size={16} />
              <span className="hidden md:inline">Permissions</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Cpu size={16} />
              <span className="hidden md:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your basic platform configuration and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your platform name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the name displayed in the browser tab and emails.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en-US">English (US)</SelectItem>
                                <SelectItem value="en-GB">English (UK)</SelectItem>
                                <SelectItem value="fr-FR">French</SelectItem>
                                <SelectItem value="de-DE">German</SelectItem>
                                <SelectItem value="ja-JP">Japanese</SelectItem>
                                <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Your preferred language for the interface.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                                <SelectItem value="Europe/Paris">Central European (CET)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Japan (JST)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              All dates and times will be displayed in this timezone.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MMM DD, YYYY">MMM DD, YYYY (Jan 01, 2023)</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (01/01/2023)</SelectItem>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (01/01/2023)</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2023-01-01)</SelectItem>
                              <SelectItem value="DD.MM.YYYY">DD.MM.YYYY (01.01.2023)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How dates will be displayed throughout the platform.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Resource Management</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <Label>Storage Usage</Label>
                            <p className="text-sm text-muted-foreground">
                              {quotaUsage}% of 100GB used
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Manage Storage</Button>
                        </div>
                        <Progress value={quotaUsage} className="h-2" />
                      </div>
                    </div>

                    {advancedMode && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Advanced Settings</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="debug-mode" />
                            <Label htmlFor="debug-mode">Enable Debug Mode</Label>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">
                            Enables detailed logging for troubleshooting issues.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Access Settings */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys and configure API settings for external integrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Keys</h3>
                  <div className="rounded-md border">
                    <div className="p-4 bg-muted/50">
                      <div className="grid grid-cols-4 text-sm font-medium">
                        <div>Name</div>
                        <div>Key</div>
                        <div>Created</div>
                        <div className="text-right">Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="grid grid-cols-4 p-4 text-sm items-center">
                          <div className="flex items-center gap-2">
                            {apiKey.name}
                            {!apiKey.active && (
                              <Badge variant="outline" className="text-xs">Revoked</Badge>
                            )}
                          </div>
                          <div className="font-mono text-xs">
                            {apiKey.key.substring(0, 14)}...
                          </div>
                          <div className="text-muted-foreground">{apiKey.created}</div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" disabled={!apiKey.active}>
                              Copy
                            </Button>
                            {apiKey.active && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => revokeApiKey(apiKey.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={createNewApiKey}>Generate New API Key</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Settings</h3>
                  <Form {...apiForm}>
                    <form className="space-y-4">
                      <FormField
                        control={apiForm.control}
                        name="rateLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate Limit (requests per minute)</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <Slider
                                  min={10}
                                  max={1000}
                                  step={10}
                                  defaultValue={[field.value]}
                                  onValueChange={(values) => field.onChange(values[0])}
                                />
                                <div className="flex justify-between">
                                  <span className="text-sm">10</span>
                                  <span className="text-sm font-medium">{field.value}</span>
                                  <span className="text-sm">1000</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Maximum number of API requests allowed per minute.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={apiForm.control}
                          name="timeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Request Timeout (seconds)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={60}
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Maximum time in seconds before an API request times out.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={apiForm.control}
                          name="retries"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Retries</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={5}
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Number of times to retry failed API requests.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {advancedMode && (
                        <div className="space-y-4">
                          <h4 className="text-md font-medium">Advanced API Settings</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="cors-all" />
                              <Label htmlFor="cors-all">Allow all origins (CORS)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="cache-responses" />
                              <Label htmlFor="cache-responses">Cache API responses</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="rate-limit-ip" />
                              <Label htmlFor="rate-limit-ip">Enable per-IP rate limiting</Label>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button type="submit">Save API Settings</Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications about system events.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Methods</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell size={16} />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={notifications.email} 
                        onCheckedChange={() => toggleNotification('email')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell size={16} />
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                      </div>
                      <Switch 
                        id="push-notifications" 
                        checked={notifications.push} 
                        onCheckedChange={() => toggleNotification('push')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell size={16} />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <Switch 
                        id="sms-notifications" 
                        checked={notifications.sms} 
                        onCheckedChange={() => toggleNotification('sms')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell size={16} />
                        <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                      </div>
                      <Switch 
                        id="in-app-notifications" 
                        checked={notifications.inApp} 
                        onCheckedChange={() => toggleNotification('inApp')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert size={16} className="text-destructive" />
                        <Label htmlFor="critical-alerts">Critical System Alerts</Label>
                      </div>
                      <Switch 
                        id="critical-alerts" 
                        checked={notifications.alertCritical} 
                        onCheckedChange={() => toggleNotification('alertCritical')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarClock size={16} />
                        <Label htmlFor="daily-reports">Daily Reports</Label>
                      </div>
                      <Switch 
                        id="daily-reports" 
                        checked={notifications.dailyReport} 
                        onCheckedChange={() => toggleNotification('dailyReport')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CalendarClock size={16} />
                        <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      </div>
                      <Switch 
                        id="weekly-digest" 
                        checked={notifications.weeklyDigest} 
                        onCheckedChange={() => toggleNotification('weeklyDigest')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TimerReset size={16} />
                        <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                      </div>
                      <Switch 
                        id="maintenance-alerts" 
                        checked={notifications.maintenanceAlerts} 
                        onCheckedChange={() => toggleNotification('maintenanceAlerts')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LineChart size={16} />
                        <Label htmlFor="usage-alerts">Resource Usage Alerts</Label>
                      </div>
                      <Switch 
                        id="usage-alerts" 
                        checked={notifications.usageAlerts} 
                        onCheckedChange={() => toggleNotification('usageAlerts')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Quiet Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    During quiet hours, only critical notifications will be delivered.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start">Start Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="quiet-start">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end">End Time</Label>
                      <Select defaultValue="07:00">
                        <SelectTrigger id="quiet-end">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button type="button">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security features and authentication options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Security</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account.
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="session-timeout">Automatic Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after period of inactivity.
                        </p>
                      </div>
                      <Switch id="session-timeout" defaultChecked />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      <KeyRound size={16} className="mr-2" />
                      Change Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Access Control</h3>
                  <div className="space-y-2">
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <Textarea
                      id="ip-whitelist"
                      placeholder="Enter IP addresses (one per line)"
                      className="font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
                      Leave empty to allow access from any IP address.
                    </p>
                  </div>
                  
                  {advancedMode && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="enforce-mfa" />
                        <Label htmlFor="enforce-mfa">Enforce MFA for all users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="single-session" />
                        <Label htmlFor="single-session">Restrict to one active session per user</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="password-history" />
                        <Label htmlFor="password-history">Prevent reuse of previous passwords</Label>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Audit Log</h3>
                  <div className="rounded-md border overflow-hidden">
                    <div className="overflow-y-auto max-h-[200px]">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium">Action</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">User</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {logs.map(log => (
                            <tr key={log.id}>
                              <td className="py-2 px-4 text-sm">{log.action}</td>
                              <td className="py-2 px-4 text-sm">{log.user}</td>
                              <td className="py-2 px-4 text-sm">{log.timestamp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Button variant="outline">View Full Audit Log</Button>
                </div>

                <Button type="button">Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your interface.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <RadioGroup defaultValue="system">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system">System Default</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Layout Density</h3>
                  <RadioGroup defaultValue="comfortable">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="compact" id="density-compact" />
                        <Label htmlFor="density-compact">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="comfortable" id="density-comfortable" />
                        <Label htmlFor="density-comfortable">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="spacious" id="density-spacious" />
                        <Label htmlFor="density-spacious">Spacious</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dashboard Layout</h3>
                  <RadioGroup defaultValue="default">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="default" id="layout-default" />
                          <Label htmlFor="layout-default">Default</Label>
                        </div>
                        <div className="h-20 bg-muted rounded-md"></div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="compact" id="layout-compact" />
                          <Label htmlFor="layout-compact">Compact</Label>
                        </div>
                        <div className="h-20 bg-muted rounded-md"></div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {advancedMode && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Custom Theme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <Input id="primary-color" type="color" value="#9b87f5" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondary-color">Secondary Color</Label>
                          <Input id="secondary-color" type="color" value="#7E69AB" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accent-color">Accent Color</Label>
                          <Input id="accent-color" type="color" value="#6E59A5" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-theme" />
                        <Label htmlFor="save-theme">Save as custom theme</Label>
                      </div>
                    </div>
                  </>
                )}

                <Button type="button">Save Appearance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Integrations Settings */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with third-party services and tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Connected Services</h3>
                </div>

                <div className="space-y-4">
                  {/* GitHub Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Code size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect to your repositories
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>

                  {/* AWS Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Cloud size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">AWS</h4>
                          <p className="text-sm text-muted-foreground">
                            Infrastructure integration
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>

                  {/* Slack Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Bell size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">Slack</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications and alerts
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>

                  {/* Prometheus Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <LineChart size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">Prometheus</h4>
                          <p className="text-sm text-muted-foreground">
                            Metrics and monitoring
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>

                  {/* Docker Registry Integration */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Database size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">Docker Registry</h4>
                          <p className="text-sm text-muted-foreground">
                            Container repository integration
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Webhooks</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://api.example.com/webhook"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="webhook-events">Events</Label>
                        <div className="mt-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="event-job-complete" />
                            <Label htmlFor="event-job-complete">Job Completed</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="event-job-failed" />
                            <Label htmlFor="event-job-failed">Job Failed</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="event-resource-limit" />
                            <Label htmlFor="event-resource-limit">Resource Limit Reached</Label>
                          </div>
                        </div>
                      </div>
                      <Button>Add Webhook</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Permissions Settings */}
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
                <CardDescription>
                  Manage user roles and access controls.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Roles</h3>
                  <div className="rounded-md border">
                    <div className="p-4 bg-muted/50">
                      <div className="grid grid-cols-3 text-sm font-medium">
                        <div>Role</div>
                        <div>Description</div>
                        <div className="text-right">Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 p-4 text-sm items-center">
                        <div className="font-medium">Administrator</div>
                        <div className="text-muted-foreground">Full system access</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 p-4 text-sm items-center">
                        <div className="font-medium">Manager</div>
                        <div className="text-muted-foreground">Can manage jobs and resources</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 p-4 text-sm items-center">
                        <div className="font-medium">Developer</div>
                        <div className="text-muted-foreground">Can submit and view jobs</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 p-4 text-sm items-center">
                        <div className="font-medium">Viewer</div>
                        <div className="text-muted-foreground">Read-only access</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Create New Role</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Feature Access</h3>
                  <div className="rounded-md border">
                    <div className="p-4 bg-muted/50">
                      <div className="grid grid-cols-4 text-sm font-medium">
                        <div>Feature</div>
                        <div>Admin</div>
                        <div>Manager</div>
                        <div>Developer</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div>Training Job Submission</div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox checked disabled /></div>
                      </div>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div>Resource Management</div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox disabled /></div>
                      </div>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div>User Management</div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox disabled /></div>
                        <div><Checkbox disabled /></div>
                      </div>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div>System Settings</div>
                        <div><Checkbox checked disabled /></div>
                        <div><Checkbox disabled /></div>
                        <div><Checkbox disabled /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure technical settings for your platform.
                </CardDescription>
                <Badge variant="destructive" className="w-fit">Admin Only</Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-memory">Maximum Memory Allocation (GB)</Label>
                      <Input
                        id="max-memory"
                        type="number"
                        defaultValue="16"
                        min="1"
                        max="128"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-storage">Maximum Storage Allocation (GB)</Label>
                      <Input
                        id="max-storage"
                        type="number"
                        defaultValue="100"
                        min="1"
                        max="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-timeout">Default Job Timeout (minutes)</Label>
                      <Input
                        id="job-timeout"
                        type="number"
                        defaultValue="60"
                        min="1"
                        max="1440"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-concurrent-jobs">Maximum Concurrent Jobs</Label>
                      <Input
                        id="max-concurrent-jobs"
                        type="number"
                        defaultValue="10"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Network Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="network-proxy">HTTP Proxy</Label>
                      <Input
                        id="network-proxy"
                        placeholder="http://proxy.example.com:8080"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="no-proxy">No Proxy</Label>
                      <Input
                        id="no-proxy"
                        placeholder="localhost,127.0.0.1,.local"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="network-isolation" />
                      <Label htmlFor="network-isolation">Enable Network Isolation</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logging Configuration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger id="log-level">
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                    <Input
                      id="log-retention"
                      type="number"
                      defaultValue="30"
                      min="1"
                      max="365"
                    />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-audit-logs" checked />
                      <Label htmlFor="enable-audit-logs">Enable Audit Logs</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Maintenance</h3>
                  <div className="space-y-4">
                    <Button variant="outline">
                      <History size={16} className="mr-2" />
                      Backup System
                    </Button>
                    <Button variant="outline">
                      <FileJson size={16} className="mr-2" />
                      Export Configuration
                    </Button>
                    <Button variant="destructive">
                      <WifiOff size={16} className="mr-2" />
                      Maintenance Mode
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
