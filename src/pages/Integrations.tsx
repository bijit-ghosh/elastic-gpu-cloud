
import React, { useState } from 'react';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
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
  },
  {
    id: 's3',
    name: 'S3 / GCS / Azure Blob / NFS',
    category: 'Data Lake / FS',
    description: 'Mount and access datasets efficiently.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
  },
  {
    id: 'prometheus',
    name: 'Prometheus + Grafana',
    category: 'Monitoring & Logging',
    description: 'Visualize GPU metrics, system health, job stats.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://prometheus.io/docs/introduction/overview/',
  },
  {
    id: 'wandb',
    name: 'Weights & Biases (W&B)',
    category: 'Experiment Tracking',
    description: 'Log training runs, hyperparams, visualizations.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.wandb.ai/',
  },
  {
    id: 'jupyterhub',
    name: 'JupyterHub',
    category: 'Notebook Collaboration',
    description: 'Spin up notebooks for team-based R&D work.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://jupyterhub.readthedocs.io/',
  },
  {
    id: 'kubeflow',
    name: 'Kubeflow / Prefect / Airflow',
    category: 'Pipeline Orchestration',
    description: 'Automate full ML workflows end-to-end.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://www.kubeflow.org/docs/',
  },
  {
    id: 'vector-db',
    name: 'Weaviate / Pinecone / FAISS / Chroma',
    category: 'Vector DB & RAG',
    description: 'Serve and index embeddings for LLM/RAG apps.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://weaviate.io/developers/weaviate',
  },
  {
    id: 'triton',
    name: 'Triton Inference Server / Ray Serve / BentoML',
    category: 'Inference Gateway',
    description: 'Model deployment and low-latency inference.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://github.com/triton-inference-server/server',
  },
  {
    id: 'vault',
    name: 'HashiCorp Vault / AWS Secrets Manager',
    category: 'Secrets & IAM',
    description: 'Secure credential and token storage.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://www.vaultproject.io/docs',
  },
  {
    id: 'github',
    name: 'GitHub / GitLab / Bitbucket',
    category: 'Version Control',
    description: 'Sync code repos and enable reproducible workflows.',
    status: 'disabled',
    lastConnected: null,
    docsUrl: 'https://docs.github.com/en',
  },
];

const Integrations = () => {
  const [activeIntegrations, setActiveIntegrations] = useState<Integration[]>(integrations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
                  <Button variant="outline" size="sm">Configure</Button>
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
                      <Button variant="outline" size="sm">Configure</Button>
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
    </DashboardLayout>
  );
};

export default Integrations;
