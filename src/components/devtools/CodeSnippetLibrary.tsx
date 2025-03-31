
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Copy, Search, Tag, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Mock data for code snippets
const codeSnippets = [
  {
    id: 1,
    title: "TensorFlow GPU Setup",
    language: "python",
    tags: ["tensorflow", "gpu", "setup"],
    code: `import tensorflow as tf

# Check if GPU is available
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))

# Set memory growth
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
  try:
    for gpu in gpus:
      tf.config.experimental.set_memory_growth(gpu, True)
  except RuntimeError as e:
    print(e)`,
    description: "Configure TensorFlow to use available GPUs with memory growth enabled"
  },
  {
    id: 2,
    title: "PyTorch CUDA Check",
    language: "python",
    tags: ["pytorch", "cuda", "setup"],
    code: `import torch

# Check if CUDA is available
if torch.cuda.is_available():
    device = torch.device("cuda")
    print(f"Using CUDA: {torch.cuda.get_device_name(0)}")
    print(f"CUDA Device Count: {torch.cuda.device_count()}")
else:
    device = torch.device("cpu")
    print("CUDA is not available. Using CPU.")`,
    description: "Check CUDA availability for PyTorch and print device information"
  },
  {
    id: 3,
    title: "Docker GPU Run Command",
    language: "bash",
    tags: ["docker", "gpu", "nvidia"],
    code: `# Run a container with GPU access
docker run --gpus all -it \\
  --name my-gpu-container \\
  -v $(pwd)/data:/app/data \\
  -p 8888:8888 \\
  tensorflow/tensorflow:latest-gpu \\
  jupyter lab --ip=0.0.0.0 --port=8888 --allow-root --no-browser`,
    description: "Docker command to run a container with GPU access and volume mapping"
  },
  {
    id: 4,
    title: "Model Training Loop",
    language: "python",
    tags: ["pytorch", "training", "loop"],
    code: `def train_model(model, train_loader, criterion, optimizer, num_epochs=5):
    for epoch in range(num_epochs):
        running_loss = 0.0
        
        for i, (inputs, labels) in enumerate(train_loader):
            # Move inputs and labels to device
            inputs = inputs.to(device)
            labels = labels.to(device)
            
            # Zero the parameter gradients
            optimizer.zero_grad()
            
            # Forward pass
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            
            # Backward pass and optimize
            loss.backward()
            optimizer.step()
            
            # Print statistics
            running_loss += loss.item()
            if i % 100 == 99:
                print(f'[Epoch {epoch + 1}, Batch {i + 1}] loss: {running_loss / 100:.3f}')
                running_loss = 0.0
                
    print('Training complete')`,
    description: "Standard PyTorch training loop with GPU compatibility"
  },
  {
    id: 5,
    title: "CUDA Memory Management",
    language: "python",
    tags: ["pytorch", "cuda", "memory"],
    code: `# Clear cache
torch.cuda.empty_cache()

# Check memory allocated
print(f"Memory allocated: {torch.cuda.memory_allocated() / 1e9} GB")
print(f"Memory cached: {torch.cuda.memory_reserved() / 1e9} GB")

# Check memory for specific GPU
device_id = 0
print(f"Memory on device {device_id}: {torch.cuda.memory_allocated(device_id) / 1e9} GB")

# Reset peak memory stats
torch.cuda.reset_peak_memory_stats()

# With context manager for memory efficiency
with torch.cuda.amp.autocast():
    # Mixed precision operations here
    model_output = model(inputs)`,
    description: "PyTorch CUDA memory management utilities"
  }
];

const CodeSnippetLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: 'python',
    code: '',
    description: '',
    tags: ''
  });

  // Get all unique tags from snippets
  const allTags = Array.from(
    new Set(codeSnippets.flatMap(snippet => snippet.tags))
  );

  // Filter snippets based on search query and active tag
  const filteredSnippets = codeSnippets.filter(snippet => {
    const matchesSearch = searchQuery === '' || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = activeTag === null || snippet.tags.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet has been copied to your clipboard",
    });
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  const handleCreateSnippet = () => {
    toast({
      title: "Snippet created",
      description: "Your code snippet has been added to the library",
    });
    
    // Reset form (in a real app, we'd add the snippet to the collection)
    setNewSnippet({
      title: '',
      language: 'python',
      code: '',
      description: '',
      tags: ''
    });
  };

  return (
    <div>
      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Snippets</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search snippets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {allTags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant={activeTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSnippets.map(snippet => (
                <Card key={snippet.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{snippet.title}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(snippet.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{snippet.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="bg-muted p-3 rounded-md overflow-auto max-h-[200px]">
                      <pre className="text-xs font-mono whitespace-pre">
                        {snippet.code}
                      </pre>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="secondary">{snippet.language}</Badge>
                      {snippet.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredSnippets.length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No matching snippets found. Try adjusting your search or create a new snippet.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={newSnippet.title} 
                  onChange={e => setNewSnippet({...newSnippet, title: e.target.value})}
                  placeholder="Snippet title"
                  className="mb-4"
                />
                
                <label className="text-sm font-medium">Language</label>
                <Tabs defaultValue="python" className="mb-4" onValueChange={(value) => 
                  setNewSnippet({...newSnippet, language: value})
                }>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="bash">Bash</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={newSnippet.description} 
                  onChange={e => setNewSnippet({...newSnippet, description: e.target.value})}
                  placeholder="Brief description of the snippet"
                  className="mb-4"
                />
                
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <div className="relative">
                  <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={newSnippet.tags} 
                    onChange={e => setNewSnippet({...newSnippet, tags: e.target.value})}
                    placeholder="pytorch, gpu, setup"
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Code</label>
                <Textarea 
                  value={newSnippet.code} 
                  onChange={e => setNewSnippet({...newSnippet, code: e.target.value})}
                  placeholder="# Enter your code here"
                  className="font-mono h-[300px]"
                />
              </div>
            </div>
            
            <Button onClick={handleCreateSnippet}>
              <Plus className="mr-2 h-4 w-4" />
              Create Snippet
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeSnippetLibrary;
