
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GpuSelector } from './GpuSelector';
import { toast } from '@/hooks/use-toast';

export const CreateEndpointForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    modelType: 'language',
    modelSize: '',
    vendor: 'OpenAI',
    version: '',
    instances: '1',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock endpoint creation
    setTimeout(() => {
      toast({
        title: "Endpoint creation started",
        description: `Deploying ${formData.name} endpoint. This may take a few minutes.`
      });
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Inference Endpoint</CardTitle>
        <CardDescription>Deploy a new model for inference</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Endpoint Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="my-inference-endpoint"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelType">Model Type</Label>
              <Select 
                value={formData.modelType} 
                onValueChange={(value) => handleSelectChange('modelType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="language">Language Model</SelectItem>
                  <SelectItem value="vision">Vision Model</SelectItem>
                  <SelectItem value="audio">Audio Model</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select 
                value={formData.vendor} 
                onValueChange={(value) => handleSelectChange('vendor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OpenAI">OpenAI</SelectItem>
                  <SelectItem value="Meta">Meta</SelectItem>
                  <SelectItem value="Anthropic">Anthropic</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Stability AI">Stability AI</SelectItem>
                  <SelectItem value="Mistral">Mistral</SelectItem>
                  <SelectItem value="Hugging Face">Hugging Face</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input 
                id="version" 
                name="version" 
                value={formData.version} 
                onChange={handleInputChange} 
                placeholder="v1.0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modelSize">Model Size (parameters)</Label>
              <Input 
                id="modelSize" 
                name="modelSize" 
                value={formData.modelSize} 
                onChange={handleInputChange} 
                placeholder="7B, 13B, 70B, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instances">Initial Instances</Label>
              <Input 
                id="instances" 
                name="instances" 
                value={formData.instances} 
                onChange={handleInputChange} 
                type="number"
                min="1"
                max="10"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label>GPU Resources</Label>
            <GpuSelector />
          </div>

          <div className="space-y-2 mt-4">
            <Label>Infrastructure</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select defaultValue="cloud">
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud">Cloud</SelectItem>
                  <SelectItem value="on-premise">On-Premise</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="aws">
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit">Deploy Endpoint</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
