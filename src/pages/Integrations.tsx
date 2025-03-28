import React, { useState } from 'react';
import { ExternalLink, CheckCircle, XCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Toggle } from '@/components/ui/toggle';

type Integration = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'enabled' | 'disabled';
  lastConnected: string | null;
  docsUrl: string;
  configFields?: {
    name: string;
    type: 'text' | 'password' | 'textarea' | 'select';
    label: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
  }[];
};

const integrations: Integration[] = [
  {
    id: 'mlflow',
    name: 'MLflow',
    category: 'Model Registry',
    description: 'Track experiments, model versions, metrics, artifacts.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://mlflow.org/docs/latest/index.html',
    configFields: [
      { name: 'tracking_uri', type: 'text', label: 'Tracking URI', placeholder: 'http://localhost:5000', required: true },
      { name: 'artifact_location', type: 'text', label: 'Artifact Location', placeholder: './mlruns' },
    ],
  },
  {
    id: 's3',
    name: 'S3 / GCS / Azure Blob / NFS',
    category: 'Data Lake / FS',
    description: 'Mount and access datasets efficiently.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
    configFields: [
      { name: 'bucket_name', type: 'text', label: 'Bucket Name', required: true },
      { name: 'access_key', type: 'text', label: 'Access Key', required: true },
      { name: 'secret_key', type: 'password', label: 'Secret Key', required: true },
      { name: 'region', type: 'text', label: 'Region', placeholder: 'us-east-1' },
    ],
  },
  {
    id: 'prometheus',
    name: 'Prometheus + Grafana',
    category: 'Monitoring & Logging',
    description: 'Visualize GPU metrics, system health, job stats.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://prometheus.io/docs/introduction/overview/',
    configFields: [
      { name: 'prometheus_url', type: 'text', label: 'Prometheus URL', placeholder: 'http://localhost:9090', required: true },
      { name: 'grafana_url', type: 'text', label: 'Grafana URL', placeholder: 'http://localhost:3000' },
    ],
  },
  {
    id: 'wandb',
    name: 'Weights & Biases (W&B)',
    category: 'Experiment Tracking',
    description: 'Log training runs, hyperparams, visualizations.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.wandb.ai/',
    configFields: [
      { name: 'api_key', type: 'password', label: 'API Key', required: true },
      { name: 'project', type: 'text', label: 'Project Name', required: true },
    ],
  },
  {
    id: 'jupyterhub',
    name: 'JupyterHub',
    category: 'Notebook Collaboration',
    description: 'Spin up notebooks for team-based R&D work.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://jupyterhub.readthedocs.io/',
    configFields: [
      { name: 'hub_url', type: 'text', label: 'Hub URL', required: true },
      { name: 'admin_user', type: 'text', label: 'Admin Username' },
      { name: 'admin_password', type: 'password', label: 'Admin Password' },
    ],
  },
  {
    id: 'kubeflow',
    name: 'Kubeflow / Prefect / Airflow',
    category: 'Pipeline Orchestration',
    description: 'Automate full ML workflows end-to-end.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://www.kubeflow.org/docs/',
    configFields: [
      { name: 'orchestration_type', type: 'select', label: 'Orchestration Tool', options: [
        { value: 'kubeflow', label: 'Kubeflow' },
        { value: 'prefect', label: 'Prefect' },
        { value: 'airflow', label: 'Airflow' },
      ]},
      { name: 'api_endpoint', type: 'text', label: 'API Endpoint', required: true },
      { name: 'auth_token', type: 'password', label: 'Authentication Token', required: true },
    ],
  },
  {
    id: 'vector-db',
    name: 'Weaviate / Pinecone / FAISS / Chroma',
    category: 'Vector DB & RAG',
    description: 'Serve and index embeddings for LLM/RAG apps.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://weaviate.io/developers/weaviate',
    configFields: [
      { name: 'vector_db_type', type: 'select', label: 'Vector DB Type', options: [
        { value: 'weaviate', label: 'Weaviate' },
        { value: 'pinecone', label: 'Pinecone' },
        { value: 'faiss', label: 'FAISS' },
        { value: 'chroma', label: 'Chroma' },
      ]},
      { name: 'connection_string', type: 'text', label: 'Connection String', required: true },
      { name: 'api_key', type: 'password', label: 'API Key' },
    ],
  },
  {
    id: 'triton',
    name: 'Triton Inference Server / Ray Serve / BentoML',
    category: 'Inference Gateway',
    description: 'Model deployment and low-latency inference.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://github.com/triton-inference-server/server',
    configFields: [
      { name: 'inference_type', type: 'select', label: 'Inference Server', options: [
        { value: 'triton', label: 'Triton Inference Server' },
        { value: 'ray', label: 'Ray Serve' },
        { value: 'bentoml', label: 'BentoML' },
      ]},
      { name: 'server_url', type: 'text', label: 'Server URL', required: true },
      { name: 'model_repository', type: 'text', label: 'Model Repository Path' },
    ],
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault / AWS Secrets Manager',
    category: 'Secrets & IAM',
    description: 'Secure credential and token storage.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://www.vaultproject.io/docs',
    configFields: [
      { name: 'secrets_manager_type', type: 'select', label: 'Secrets Manager', options: [
        { value: 'vault', label: 'HashiCorp Vault' },
        { value: 'aws', label: 'AWS Secrets Manager' },
      ]},
      { name: 'endpoint', type: 'text', label: 'Endpoint URL', required: true },
      { name: 'auth_token', type: 'password', label: 'Authentication Token', required: true },
    ],
  },
  {
    id: 'github',
    name: 'GitHub / GitLab / Bitbucket',
    category: 'Version Control',
    description: 'Sync code repos and enable reproducible workflows.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.github.com/en',
    configFields: [
      { name: 'git_provider', type: 'select', label: 'Git Provider', options: [
        { value: 'github', label: 'GitHub' },
        { value: 'gitlab', label: 'GitLab' },
        { value: 'bitbucket', label: 'Bitbucket' },
      ]},
      { name: 'username', type: 'text', label: 'Username', required: true },
      { name: 'access_token', type: 'password', label: 'Access Token', required: true },
      { name: 'repository', type: 'text', label: 'Repository Name (optional)' },
    ],
  },
];

const Integrations = () => {
  const [activeIntegrations, setActiveIntegrations] = useState<Integration[]>(integrations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [configOpen, setConfigOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleStatusToggle = (id: string) => {
    setActiveIntegrations(
      activeIntegrations.map(integration => {
        if (integration.id === id) {
          const newStatus = integration.status === 'enabled' ? 'disabled' : 'enabled';
          return {
            ...integration,
            status: newStatus,
            lastConnected: newStatus === 'enabled' ? new Date().toISOString() : integration.lastConnected,
          };
        }
        return integration;
      })
    );

    const integration = activeIntegrations.find(i => i.id === id);
    const newStatus = integration?.status === 'enabled' ? 'disabled' : 'enabled';
    
    toast({
      title: `${integration?.name} ${newStatus}`,
      description: newStatus === 'enabled' 
        ? 'Integration has been successfully enabled' 
        : 'Integration has been disabled',
    });
  };

  const openConfigModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    const initialValues: Record<string, string> = {};
    integration.configFields?.forEach(field => {
      initialValues[field.name] = '';
    });
    setFormValues(initialValues);
    setConfigOpen(true);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveConfig = () => {
    const missingRequiredFields = selectedIntegration?.configFields
      ?.filter(field => field.required && !formValues[field.name])
      .map(field => field.label);

    if (missingRequiredFields && missingRequiredFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingRequiredFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configuration saved",
      description: `${selectedIntegration?.name} configuration has been updated successfully.`,
    });

    if (selectedIntegration && selectedIntegration.status === 'disabled') {
      handleStatusToggle(selectedIntegration.id);
    }

    setConfigOpen(false);
  };

  return (
    <DashboardLayout title="Integration Hub" description="Connect and manage all your ML tools and services">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Top 10 Integrations</h2>
          <p className="text-sm text-muted-foreground">
            Connect your ML infrastructure and tools to enhance your GPU workflow
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-1 rounded-md border">
            <Toggle 
              pressed={viewMode === 'grid'} 
              onPressedChange={() => setViewMode('grid')}
              className="px-3" 
              aria-label="Toggle grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </Toggle>
            <Toggle 
              pressed={viewMode === 'list'} 
              onPressedChange={() => setViewMode('list')}
              className="px-3" 
              aria-label="Toggle list view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </Toggle>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeIntegrations.map((integration) => (
            <Card key={integration.id} className="overflow-hidden">
              <div className={`h-2 w-full ${integration.status === 'enabled' ? 'bg-primary' : 'bg-gray-200'}`} />
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{integration.category}</p>
                    <h3 className="font-semibold">{integration.name}</h3>
                  </div>
                  <Switch 
                    checked={integration.status === 'enabled'}
                    onCheckedChange={() => handleStatusToggle(integration.id)}
                  />
                </div>
                <p className="mb-6 text-sm text-muted-foreground">{integration.description}</p>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => openConfigModal(integration)}>Configure</Button>
                  <a 
                    href={integration.docsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    Docs <ExternalLink size={12} />
                  </a>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  {integration.status === 'enabled' ? (
                    <>
                      <CheckCircle size={14} className="mr-1 text-primary" />
                      {integration.lastConnected ? `Connected ${new Date(integration.lastConnected).toLocaleDateString()}` : 'Connected just now'}
                    </>
                  ) : (
                    <>
                      <XCircle size={14} className="mr-1 text-muted-foreground" />
                      Not connected
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 pl-4 text-left text-sm font-medium">Integration</th>
                <th className="py-3 text-left text-sm font-medium">Category</th>
                <th className="py-3 text-left text-sm font-medium">Description</th>
                <th className="py-3 text-left text-sm font-medium">Status</th>
                <th className="py-3 text-left text-sm font-medium">Last Connected</th>
                <th className="py-3 pr-4 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeIntegrations.map((integration, index) => (
                <tr key={integration.id} className={index !== activeIntegrations.length - 1 ? "border-b" : ""}>
                  <td className="py-3 pl-4 text-sm font-medium">{integration.name}</td>
                  <td className="py-3 text-sm text-muted-foreground">{integration.category}</td>
                  <td className="max-w-md py-3 text-sm text-muted-foreground">{integration.description}</td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center">
                      <Switch 
                        checked={integration.status === 'enabled'}
                        onCheckedChange={() => handleStatusToggle(integration.id)}
                        className="mr-2"
                      />
                      <span className={integration.status === 'enabled' ? 'text-primary' : 'text-muted-foreground'}>
                        {integration.status === 'enabled' ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">
                    {integration.lastConnected ? new Date(integration.lastConnected).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openConfigModal(integration)}>Configure</Button>
                      <a
                        href={integration.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={configOpen} onOpenChange={setConfigOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Set up connection details for {selectedIntegration?.category}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {selectedIntegration?.configFields?.map((field) => (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={field.name}>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === 'select' ? (
                  <select 
                    id={field.name}
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formValues[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <Textarea 
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                ) : (
                  <Input 
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveConfig}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Integrations;
