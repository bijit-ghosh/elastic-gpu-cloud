
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ObservabilityHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  realtimeMonitoring: boolean;
  setRealtimeMonitoring: (value: boolean) => void;
  exportFormat: string;
  setExportFormat: (value: string) => void;
  handleExportData: () => void;
}

const ObservabilityHeader: React.FC<ObservabilityHeaderProps> = ({
  timeRange,
  setTimeRange,
  realtimeMonitoring,
  setRealtimeMonitoring,
  exportFormat,
  setExportFormat,
  handleExportData
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="6h">Last 6 hours</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="realtime" 
            checked={realtimeMonitoring}
            onCheckedChange={setRealtimeMonitoring}
          />
          <Label htmlFor="realtime">Real-time</Label>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Select value={exportFormat} onValueChange={setExportFormat}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Export as" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="csv">CSV</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="xlsx">Excel</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default ObservabilityHeader;
