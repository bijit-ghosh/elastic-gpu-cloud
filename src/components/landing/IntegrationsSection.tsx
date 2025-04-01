
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  {
    name: 'Weaviate / Pinecone / FAISS',
    category: 'Vector DB & RAG',
    description: 'Serve and index embeddings for LLM/RAG apps.',
    docsUrl: 'https://weaviate.io/developers/weaviate',
  },
  {
    name: 'Triton Inference Server',
    category: 'Inference Gateway',
    description: 'Model deployment and low-latency inference.',
    docsUrl: 'https://github.com/triton-inference-server/server',
  },
  {
    name: 'HashiCorp Vault',
    category: 'Secrets & IAM',
    description: 'Secure credential and token storage.',
    docsUrl: 'https://www.vaultproject.io/docs',
  },
  {
    name: 'GitHub / GitLab',
    category: 'Version Control',
    description: 'Sync code repos and enable reproducible workflows.',
    docsUrl: 'https://docs.github.com/en',
  },
  {
    name: 'PyTorch Lightning',
    category: 'Training Frameworks',
    description: 'Lightweight PyTorch wrapper for high-performance ML.',
    docsUrl: 'https://lightning.ai/docs/pytorch/stable/',
  },
  {
    name: 'Ray',
    category: 'Distributed Computing',
    description: 'Scale ML & Python workloads across clusters.',
    docsUrl: 'https://docs.ray.io/',
  },
  {
    name: 'Hugging Face Hub',
    category: 'Model Hub',
    description: 'Access thousands of pre-trained models.',
    docsUrl: 'https://huggingface.co/docs',
  },
  {
    name: 'TensorBoard',
    category: 'Visualization',
    description: 'Visualize ML experiments at scale.',
    docsUrl: 'https://www.tensorflow.org/tensorboard',
  },
  {
    name: 'DVC',
    category: 'Data Version Control',
    description: 'Version datasets and ML models.',
    docsUrl: 'https://dvc.org/doc',
  },
  {
    name: 'NVIDIA DALI',
    category: 'Data Loading',
    description: 'Accelerated data loading pipeline for GPU training.',
    docsUrl: 'https://docs.nvidia.com/deeplearning/dali/user-guide/docs/',
  },
  {
    name: 'DuckDB',
    category: 'Analytics',
    description: 'Fast in-memory SQL analytics on datasets.',
    docsUrl: 'https://duckdb.org/docs/',
  },
  {
    name: 'FastAPI',
    category: 'API Development',
    description: 'Modern, fast API framework for Python.',
    docsUrl: 'https://fastapi.tiangolo.com/',
  },
  {
    name: 'LangChain',
    category: 'LLM Framework',
    description: 'Build applications with LLMs through composability.',
    docsUrl: 'https://python.langchain.com/docs/get_started/',
  },
  {
    name: 'TF Serving',
    category: 'Model Serving',
    description: 'Serve TensorFlow models via REST/gRPC.',
    docsUrl: 'https://www.tensorflow.org/tfx/serving/serving_basic',
  },
  {
    name: 'Seldon Core',
    category: 'Model Deployment',
    description: 'Deploy models on Kubernetes with monitoring.',
    docsUrl: 'https://docs.seldon.io/projects/seldon-core/en/latest/',
  },
  {
    name: 'MLflow Registry',
    category: 'Model Registry',
    description: 'Central registry for model tracking and deployment.',
    docsUrl: 'https://mlflow.org/docs/latest/model-registry.html',
  },
  {
    name: 'Neptune.ai',
    category: 'Experiment Tracking',
    description: 'Log, store, and compare ML experiments.',
    docsUrl: 'https://docs.neptune.ai/',
  },
  {
    name: 'Comet ML',
    category: 'Experiment Tracking',
    description: 'Track code, experiments, and results.',
    docsUrl: 'https://www.comet.ml/docs/',
  },
  {
    name: 'MinIO',
    category: 'Object Storage',
    description: 'High performance object storage for ML datasets.',
    docsUrl: 'https://docs.min.io/',
  },
  {
    name: 'SageMaker',
    category: 'ML Platform',
    description: 'Build, train, and deploy ML models on AWS.',
    docsUrl: 'https://docs.aws.amazon.com/sagemaker/',
  },
  {
    name: 'Databricks',
    category: 'Unified Analytics',
    description: 'Unified data analytics platform for ML.',
    docsUrl: 'https://docs.databricks.com/',
  },
  {
    name: 'Vertex AI',
    category: 'ML Platform',
    description: "Google Cloud's unified ML platform.",
    docsUrl: 'https://cloud.google.com/vertex-ai/docs',
  },
  {
    name: 'Argo Workflows',
    category: 'Workflow Engine',
    description: 'Kubernetes-native workflow engine for ML pipelines.',
    docsUrl: 'https://argoproj.github.io/argo-workflows/',
  },
  {
    name: 'Flyte',
    category: 'Workflow Orchestration',
    description: 'Container-native workflow orchestration platform.',
    docsUrl: 'https://docs.flyte.org/',
  },
  {
    name: 'BentoML',
    category: 'Model Serving',
    description: 'Unified model serving framework.',
    docsUrl: 'https://docs.bentoml.org/',
  },
  {
    name: 'TorchServe',
    category: 'Model Serving',
    description: 'Serve PyTorch models for production.',
    docsUrl: 'https://pytorch.org/serve/',
  },
  {
    name: 'Ray Tune',
    category: 'Hyperparameter Tuning',
    description: 'Scalable hyperparameter tuning.',
    docsUrl: 'https://docs.ray.io/en/latest/tune/index.html',
  },
  {
    name: 'Optuna',
    category: 'Hyperparameter Tuning',
    description: 'Automatic hyperparameter optimization software.',
    docsUrl: 'https://optuna.org/',
  },
  {
    name: 'Label Studio',
    category: 'Data Labeling',
    description: 'Multi-type data labeling and annotation tool.',
    docsUrl: 'https://labelstud.io/guide/',
  },
  {
    name: 'ONNX Runtime',
    category: 'Model Optimizations',
    description: 'Cross-platform, high performance ML inferencing.',
    docsUrl: 'https://onnxruntime.ai/',
  },
  {
    name: 'OpenVINO',
    category: 'Edge Inference',
    description: 'Deploy inference on Intel hardware.',
    docsUrl: 'https://docs.openvino.ai/',
  },
  {
    name: 'TensorRT',
    category: 'GPU Inference',
    description: 'High-performance inference optimizer for NVIDIA GPUs.',
    docsUrl: 'https://developer.nvidia.com/tensorrt',
  },
  {
    name: 'Streamlit',
    category: 'App Building',
    description: 'Create data apps for ML models.',
    docsUrl: 'https://docs.streamlit.io/',
  },
  {
    name: 'Gradio',
    category: 'Demo Building',
    description: 'Create UIs for ML models.',
    docsUrl: 'https://www.gradio.app/docs/',
  },
  {
    name: 'HuggingFace Datasets',
    category: 'Datasets',
    description: 'Public datasets for ML model training.',
    docsUrl: 'https://huggingface.co/docs/datasets/',
  },
  {
    name: 'Great Expectations',
    category: 'Data Validation',
    description: 'Data quality and validation for ML pipelines.',
    docsUrl: 'https://docs.greatexpectations.io/',
  },
  {
    name: 'MLstacks',
    category: 'Infrastructure',
    description: 'Infrastructure templates for ML workflows.',
    docsUrl: 'https://github.com/jina-ai/mlstacks',
  },
  {
    name: 'Milvus',
    category: 'Vector Database',
    description: 'Vector database for similarity search.',
    docsUrl: 'https://milvus.io/docs',
  },
  {
    name: 'Spark NLP',
    category: 'NLP Processing',
    description: 'Natural language processing at scale.',
    docsUrl: 'https://nlp.johnsnowlabs.com/docs/',
  },
  {
    name: 'Metaflow',
    category: 'ML Workflow',
    description: 'Human-friendly Python framework for data science.',
    docsUrl: 'https://docs.metaflow.org/',
  },
  {
    name: 'DeterminedAI',
    category: 'Training Platform',
    description: 'Deep learning training platform.',
    docsUrl: 'https://docs.determined.ai/',
  },
  {
    name: 'Sagemaker Pipelines',
    category: 'ML Workflow',
    description: 'ML workflow orchestration on AWS.',
    docsUrl: 'https://docs.aws.amazon.com/sagemaker/latest/dg/pipelines.html',
  },
  {
    name: 'Feast',
    category: 'Feature Store',
    description: 'Open source feature store for ML.',
    docsUrl: 'https://docs.feast.dev/',
  }
];

const IntegrationsSection = () => {
  const [selectedTab, setSelectedTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter integrations by search query
  const filteredIntegrations = searchQuery
    ? integrations.filter(integration => 
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        integration.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : integrations;

  // Get the first 6 integrations for display on landing page
  const displayedIntegrations = filteredIntegrations.slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-900/60 dark:to-gray-800/60">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Integration Hub</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect your ML infrastructure and tools to enhance your GPU workflow
            </p>
          </div>
          
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs 
              defaultValue="popular" 
              className="w-full"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="model-registry">Model Registry</TabsTrigger>
                <TabsTrigger value="ml-platforms">ML Platforms</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="w-full sm:w-auto relative">
              {isSearchActive ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchActive(false);
                    }}
                    className="absolute right-2 p-1"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsSearchActive(true)} 
                  className="w-full sm:w-auto"
                >
                  <Search size={16} className="mr-2" />
                  Search
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {displayedIntegrations.map((integration, index) => (
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
            {filteredIntegrations.length > 6 && (
              <p className="text-sm text-muted-foreground mb-4">
                Showing 6 of {filteredIntegrations.length} available integrations
              </p>
            )}
            <Button className="bg-gradient-to-r from-egs-blue to-egs-purple text-white" asChild>
              <Link to="/integrations">
                View All {integrations.length} Integrations <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
