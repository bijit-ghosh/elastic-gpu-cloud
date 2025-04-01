
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// GPU options by vendor
const gpuOptions = {
  nvidia: [
    { value: 'a100', name: 'NVIDIA A100', memory: '40GB/80GB', perf: 'Highest' },
    { value: 'a10', name: 'NVIDIA A10', memory: '24GB', perf: 'High' },
    { value: 'v100', name: 'NVIDIA V100', memory: '16GB/32GB', perf: 'High' },
    { value: 't4', name: 'NVIDIA T4', memory: '16GB', perf: 'Medium' },
  ],
  amd: [
    { value: 'mi250', name: 'AMD MI250', memory: '128GB', perf: 'Highest' },
    { value: 'mi210', name: 'AMD MI210', memory: '64GB', perf: 'High' },
    { value: 'mi100', name: 'AMD MI100', memory: '32GB', perf: 'Medium' },
  ],
  intel: [
    { value: 'max1550', name: 'Intel Max 1550', memory: '128GB', perf: 'High' },
    { value: 'max1100', name: 'Intel Max 1100', memory: '48GB', perf: 'Medium' },
    { value: 'arc770', name: 'Intel Arc Pro A770', memory: '16GB', perf: 'Standard' },
  ],
};

export const GpuSelector = () => {
  const [vendor, setVendor] = useState<'nvidia' | 'amd' | 'intel'>('nvidia');
  const [selectedGpu, setSelectedGpu] = useState(gpuOptions.nvidia[0].value);
  const [gpuCount, setGpuCount] = useState('1');

  return (
    <div className="space-y-4">
      <Tabs value={vendor} onValueChange={(v) => setVendor(v as any)}>
        <TabsList className="grid grid-cols-3 w-full mb-2">
          <TabsTrigger value="nvidia">NVIDIA</TabsTrigger>
          <TabsTrigger value="amd">AMD</TabsTrigger>
          <TabsTrigger value="intel">Intel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nvidia" className="mt-0">
          <GpuOptions
            options={gpuOptions.nvidia}
            selectedGpu={selectedGpu}
            setSelectedGpu={setSelectedGpu}
            gpuCount={gpuCount}
            setGpuCount={setGpuCount}
          />
        </TabsContent>
        
        <TabsContent value="amd" className="mt-0">
          <GpuOptions
            options={gpuOptions.amd}
            selectedGpu={selectedGpu}
            setSelectedGpu={setSelectedGpu}
            gpuCount={gpuCount}
            setGpuCount={setGpuCount}
          />
        </TabsContent>
        
        <TabsContent value="intel" className="mt-0">
          <GpuOptions
            options={gpuOptions.intel}
            selectedGpu={selectedGpu}
            setSelectedGpu={setSelectedGpu}
            gpuCount={gpuCount}
            setGpuCount={setGpuCount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface GpuOptionsProps {
  options: { value: string; name: string; memory: string; perf: string }[];
  selectedGpu: string;
  setSelectedGpu: (value: string) => void;
  gpuCount: string;
  setGpuCount: (value: string) => void;
}

const GpuOptions = ({ options, selectedGpu, setSelectedGpu, gpuCount, setGpuCount }: GpuOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Select value={selectedGpu} onValueChange={setSelectedGpu}>
          <SelectTrigger>
            <SelectValue placeholder="Select GPU type" />
          </SelectTrigger>
          <SelectContent>
            {options.map((gpu) => (
              <SelectItem key={gpu.value} value={gpu.value}>
                <div className="flex items-center justify-between w-full">
                  <span>{gpu.name}</span>
                  <Badge variant="outline" className="ml-2">{gpu.memory}</Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="mt-2">
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              {options.find(gpu => gpu.value === selectedGpu) && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">GPU Memory</p>
                    <p>{options.find(gpu => gpu.value === selectedGpu)?.memory}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Performance</p>
                    <p>{options.find(gpu => gpu.value === selectedGpu)?.perf}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="space-y-2">
          <Label htmlFor="gpuCount">GPU Count</Label>
          <Input 
            id="gpuCount" 
            value={gpuCount} 
            onChange={(e) => setGpuCount(e.target.value)} 
            type="number"
            min="1"
            max="8"
          />
        </div>
      </div>
    </div>
  );
};
