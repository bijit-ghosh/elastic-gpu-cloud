
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const integrations = [
  {
    name: 'MLflow',
    category: 'Model Registry',
    description: 'Track experiments, model versions, metrics, artifacts.',
    docsUrl: 'https://mlflow.org/docs/latest/index.html',
  },
  {
    name: 'S3 / Cloud Storage',
    category: 'Data Lake / FS',
    description: 'Mount and access datasets efficiently.',
    docsUrl: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
  },
  {
    name: 'Prometheus + Grafana',
    category: 'Monitoring & Logging',
    description: 'Visualize GPU metrics, system health, job stats.',
    docsUrl: 'https://prometheus.io/docs/introduction/overview/',
  },
  {
    name: 'Weights & Biases (W&B)',
    category: 'Experiment Tracking',
    description: 'Log training runs, hyperparams, visualizations.',
    docsUrl: 'https://docs.wandb.ai/',
  },
  {
    name: 'JupyterHub',
    category: 'Notebook Collaboration',
    description: 'Spin up notebooks for team-based R&D work.',
    docsUrl: 'https://jupyterhub.readthedocs.io/',
  },
  {
    name: 'Kubeflow / Prefect / Airflow',
    category: 'Pipeline Orchestration',
    description: 'Automate full ML workflows end-to-end.',
    docsUrl: 'https://www.kubeflow.org/docs/',
  },
];

const IntegrationsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-900/60 dark:to-gray-800/60">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Integration Hub</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect your ML infrastructure and tools to enhance your GPU workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {integrations.map((integration, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-egs-blue to-egs-purple" />
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{integration.category}</p>
                    <h3 className="font-semibold">{integration.name}</h3>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CheckCircle size={14} className="mr-1 text-egs-purple" />
                      Ready to connect
                    </div>
                    <a 
                      href={integration.docsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      Docs <ExternalLink size={12} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-gradient-to-r from-egs-blue to-egs-purple text-white" asChild>
              <Link to="/integrations">
                View All Integrations <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
