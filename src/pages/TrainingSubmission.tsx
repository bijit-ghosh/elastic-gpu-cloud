
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { BrainCircuit, Play, FileText, BarChart, Upload } from 'lucide-react';

const TrainingSubmission = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Training job submitted",
        description: "Your training job has been queued and will start shortly.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout
      title="Training Job Submission"
      description="Configure and submit training and fine-tuning jobs"
    >
      <Tabs defaultValue="new-job" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-job">New Job</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Job History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new-job" className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5" />
                    Model Configuration
                  </CardTitle>
                  <CardDescription>
                    Select your model and configuration settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Base Model</Label>
                    <Select defaultValue="llama3">
                      <SelectTrigger id="model">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llama3">Llama 3 (70B)</SelectItem>
                        <SelectItem value="llama3-8b">Llama 3 (8B)</SelectItem>
                        <SelectItem value="mistral">Mistral (7B)</SelectItem>
                        <SelectItem value="mixtral">Mixtral (8x7B)</SelectItem>
                        <SelectItem value="stable-diffusion">Stable Diffusion XL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="precision">Training Precision</Label>
                    <Select defaultValue="bf16">
                      <SelectTrigger id="precision">
                        <SelectValue placeholder="Select precision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bf16">BF16</SelectItem>
                        <SelectItem value="fp16">FP16</SelectItem>
                        <SelectItem value="fp32">FP32</SelectItem>
                        <SelectItem value="int8">INT8 (Quantized)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Number of GPUs</Label>
                    <Slider 
                      defaultValue={[4]} 
                      max={16} 
                      min={1}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>4 (selected)</span>
                      <span>8</span>
                      <span>16</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="lora">LoRA Fine-tuning</Label>
                      <p className="text-xs text-muted-foreground">Enable parameter-efficient fine-tuning</p>
                    </div>
                    <Switch id="lora" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Data Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your training data and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataPath">Data Path</Label>
                    <div className="flex gap-2">
                      <Input id="dataPath" placeholder="s3://mybucket/training-data/" />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="epochs">Epochs</Label>
                    <Input id="epochs" type="number" defaultValue="3" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input id="batchSize" type="number" defaultValue="8" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="learningRate">Learning Rate</Label>
                    <Input id="learningRate" type="number" step="0.0001" defaultValue="0.0002" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Job Settings
                  </CardTitle>
                  <CardDescription>
                    Configure job behavior and resource allocation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="jobName">Job Name</Label>
                      <Input id="jobName" placeholder="llama3-finetune-v1" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoResume">Auto-resume on failure</Label>
                      <p className="text-xs text-muted-foreground">Automatically restart job if it fails</p>
                    </div>
                    <Switch id="autoResume" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="wandb">Enable W&B Logging</Label>
                      <p className="text-xs text-muted-foreground">Log metrics to Weights & Biases</p>
                    </div>
                    <Switch id="wandb" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Template</Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    <Play className="h-4 w-4" />
                    {loading ? "Submitting..." : "Submit Job"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Job Templates</CardTitle>
              <CardDescription>
                Load from previously saved job templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground pb-4">
                You don't have any saved job templates yet. Submit a job and save it as a template to see it here.
              </p>
              <Button variant="outline">Create Template</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Job History</CardTitle>
              <CardDescription>
                View your previously submitted training jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>Job Name</div>
                  <div>Model</div>
                  <div>Submitted</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="grid grid-cols-5 p-4 items-center border-b">
                  <div>llama3-finetune-v2</div>
                  <div>Llama 3 (8B)</div>
                  <div>3 days ago</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Completed
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 p-4 items-center">
                  <div>mixtral-finetune-test</div>
                  <div>Mixtral (8x7B)</div>
                  <div>5 days ago</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Failed
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TrainingSubmission;
