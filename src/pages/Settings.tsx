
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
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

  const formSchema = z.object({
    siteName: z.string().min(2, {
      message: "Site name must be at least 2 characters.",
    }),
    language: z.string(),
    timezone: z.string(),
    dateFormat: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "MLOps Platform",
      language: "en-US",
      timezone: "UTC",
      dateFormat: "MMM DD, YYYY",
    },
  });

  const apiFormSchema = z.object({
    rateLimit: z.number().min(10).max(1000),
    timeout: z.number().min(1).max(60),
    retries: z.number().min(0).max(5),
  });

  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      rateLimit: 100,
      timeout: 30,
      retries: 3,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  }

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };

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
    <DashboardLayout title="Settings" description="Configure your platform settings">
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
                        <div className="h-20 bg-muted"></div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="compact" id="layout-compact" />
                          <Label htmlFor="layout-compact">Compact</Label>
                        </div>
                        <div className="h-20 bg-muted"></div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="button">Save Appearance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect external tools and services to enhance your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Cloud size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">AWS</p>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Database size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">PostgreSQL</p>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Cpu size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Google Cloud</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Network size={20} />
                        </div>
                        <div>
                          <p className="font-medium">Slack</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Integration Marketplace</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Webhook size={18} />
                          <span className="font-medium">Webhooks</span>
                        </div>
                        <Badge>Popular</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Send automated notifications to external services.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Add Integration</Button>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wifi size={18} />
                          <span className="font-medium">API Client</span>
                        </div>
                        <Badge>New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Connect to third-party APIs and services.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Add Integration</Button>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileJson size={18} />
                          <span className="font-medium">Data Export</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Export data in various formats (CSV, JSON).
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Add Integration</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>
                  Manage access control and user roles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Role Management</h3>
                    <Button variant="outline" size="sm">
                      <UserCog size={16} className="mr-2" />
                      Add Role
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="p-4 bg-muted/50">
                      <div className="grid grid-cols-4 text-sm font-medium">
                        <div>Role</div>
                        <div>Description</div>
                        <div>Users</div>
                        <div className="text-right">Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div className="font-medium">Administrator</div>
                        <div className="text-muted-foreground">Full system access</div>
                        <div>2</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div className="font-medium">Editor</div>
                        <div className="text-muted-foreground">Can edit but not delete</div>
                        <div>5</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 p-4 text-sm items-center">
                        <div className="font-medium">Viewer</div>
                        <div className="text-muted-foreground">Read-only access</div>
                        <div>10</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Permission Controls</h3>
                    <Button variant="outline" size="sm">
                      Save Changes
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Dashboard Access</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-view-dashboard" defaultChecked />
                          <Label htmlFor="perm-view-dashboard">View Dashboard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-edit-dashboard" />
                          <Label htmlFor="perm-edit-dashboard">Modify Dashboard</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-share-dashboard" />
                          <Label htmlFor="perm-share-dashboard">Share Dashboard</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">User Management</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-view-users" defaultChecked />
                          <Label htmlFor="perm-view-users">View Users</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-add-users" />
                          <Label htmlFor="perm-add-users">Add Users</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="perm-remove-users" />
                          <Label htmlFor="perm-remove-users">Remove Users</Label>
                        </div>
                      </div>
                    </div>
                    
                    {advancedMode && (
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Advanced Controls</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-system-config" />
                            <Label htmlFor="perm-system-config">System Configuration</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-api-access" />
                            <Label htmlFor="perm-api-access">API Management</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="perm-audit-logs" />
                            <Label htmlFor="perm-audit-logs">Access Audit Logs</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced system settings and developer options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cache-ttl">Cache TTL (minutes)</Label>
                      <Input id="cache-ttl" type="number" defaultValue="60" />
                      <p className="text-sm text-muted-foreground">
                        How long to cache responses before refreshing.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-batch-size">Max Batch Size</Label>
                      <Input id="max-batch-size" type="number" defaultValue="1000" />
                      <p className="text-sm text-muted-foreground">
                        Maximum number of items to process in a single batch.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-beta-features" />
                    <div>
                      <Label htmlFor="enable-beta-features">Enable Beta Features</Label>
                      <p className="text-sm text-muted-foreground">
                        Access experimental features that are still in development.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Developer Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <Select defaultValue="off">
                        <SelectTrigger id="debug-mode">
                          <SelectValue placeholder="Select debug mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="console">Console Only</SelectItem>
                          <SelectItem value="verbose">Verbose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-dev-tools" />
                    <div>
                      <Label htmlFor="enable-dev-tools">Enable Developer Tools</Label>
                      <p className="text-sm text-muted-foreground">
                        Show additional developer tools in the interface.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <div className="border border-destructive/20 rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Reset Configuration</h4>
                        <p className="text-sm text-muted-foreground">
                          Reset all settings to their default values.
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">Reset</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Purge Cache</h4>
                        <p className="text-sm text-muted-foreground">
                          Clear all cached data from the system.
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">Purge</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Export All Data</h4>
                        <p className="text-sm text-muted-foreground">
                          Export all system data for backup purposes.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>
                </div>
                
                <Button type="button">Save Advanced Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
