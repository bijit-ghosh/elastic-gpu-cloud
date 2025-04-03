
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Thermometer, AlertCircle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { temperatureData } from '@/data/observabilityMockData';

const TemperatureTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Thermometer className="mr-2 h-5 w-5 text-red-500" />
            GPU Temperature Monitoring
          </CardTitle>
          <CardDescription>
            24-hour temperature readings for all GPU instances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" opacity={0.1} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[50, 85]}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '8px', border: 'none' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ff5252"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Temperature"
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#ffab00"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Warning Threshold"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Current Status</h4>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Thermometer className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">72°C Average</div>
                  <div className="text-xs text-muted-foreground">Approaching warning threshold</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Peak Temperature</h4>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">76°C at 14:00</div>
                  <div className="text-xs text-muted-foreground">1°C above warning threshold</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Cooling Status</h4>
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Cooling at 85%</div>
                  <div className="text-xs text-muted-foreground">Auto-scaled in response to load</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900/50">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Temperature Alert</h4>
                <p className="text-sm text-yellow-800/80 dark:text-yellow-400/80 mt-1">
                  GPU temperatures exceeded the warning threshold (75°C) at 14:00. Automatic cooling measures were applied. 
                  Consider reducing workload or checking cooling systems if this persists.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Temperature Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div className="text-sm">Daily Average</div>
                <div className="font-medium">68.7°C</div>
              </li>
              <li className="flex justify-between items-center">
                <div className="text-sm">Weekly Trend</div>
                <div className="flex items-center text-amber-500">
                  <span className="font-medium">+2.3°C</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6-6 6 6"/><path d="M6 12h12"/><path d="m6 15 6 6 6-6"/></svg>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div className="text-sm">Thermal Throttling Events</div>
                <div className="font-medium">3 times</div>
              </li>
              <li className="flex justify-between items-center">
                <div className="text-sm">Most Affected GPU</div>
                <div className="font-medium">GPU #2</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cooling Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Primary Cooling</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Secondary Cooling</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Ambient Temperature</span>
                  <span className="text-sm font-medium">24°C</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-xs">1</span>
                </div>
                <span className="text-sm">Schedule intensive workloads during cooler periods (night time)</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-xs">2</span>
                </div>
                <span className="text-sm">Inspect server room cooling system for possible maintenance needs</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-xs">3</span>
                </div>
                <span className="text-sm">Consider distributing loads more evenly across available resources</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4">View Detailed Analysis</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Import Button component after using it
import { Button } from '@/components/ui/button';

export default TemperatureTab;
