
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Copy, Play, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApiTesterProps {
  expanded?: boolean;
}

const ApiTester: React.FC<ApiTesterProps> = ({ expanded = false }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/endpoint');
  const [body, setBody] = useState('{\n  "key": "value"\n}');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [response, setResponse] = useState('// Response will appear here');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [savedRequests, setSavedRequests] = useState([
    { name: 'Get Users', method: 'GET', url: 'https://api.example.com/users' },
    { name: 'Create User', method: 'POST', url: 'https://api.example.com/users' }
  ]);

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse('Sending request...');
    
    try {
      const startTime = performance.now();
      
      // Mock request - would be a real fetch in production
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      
      // Mock response
      const mockResponse = {
        data: {
          id: 123,
          name: "Test Object",
          created_at: new Date().toISOString()
        },
        meta: {
          request_id: "req_" + Math.random().toString(36).substr(2, 9)
        }
      };
      
      setStatus(200);
      setResponse(JSON.stringify(mockResponse, null, 2));
      
      toast({
        title: "Request completed",
        description: `Received 200 OK in ${Math.round(endTime - startTime)}ms`,
      });
    } catch (error) {
      setStatus(500);
      setResponse('Error: Failed to send request');
      
      toast({
        title: "Request failed",
        description: "Could not complete the API request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentRequest = () => {
    const newRequest = {
      name: `Request ${savedRequests.length + 1}`,
      method,
      url
    };
    setSavedRequests([...savedRequests, newRequest]);
    
    toast({
      title: "Request saved",
      description: "Your API request has been saved to the collection",
    });
  };

  const loadRequest = (request: typeof savedRequests[0]) => {
    setMethod(request.method);
    setUrl(request.url);
    
    toast({
      title: "Request loaded",
      description: `Loaded '${request.name}' request`,
    });
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Copied to clipboard",
      description: "Response has been copied to your clipboard",
    });
  };

  return (
    <div>
      {expanded && (
        <div className="flex gap-4 mb-4 items-center">
          <h2 className="text-lg font-semibold">API Tester</h2>
          <Badge variant="outline">{savedRequests.length} saved requests</Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={expanded ? "lg:col-span-2" : "lg:col-span-3"}>
          <div className="flex gap-2 mb-4">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter request URL"
              className="flex-1"
            />
            
            <Button onClick={handleSendRequest} disabled={loading}>
              <Play className="h-4 w-4 mr-1" />
              {loading ? "Sending..." : "Send"}
            </Button>
            
            <Button variant="outline" onClick={saveCurrentRequest}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="body">
            <TabsList className="mb-4">
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>
            
            <TabsContent value="body">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Request body (JSON)"
                className="font-mono h-32"
              />
            </TabsContent>
            
            <TabsContent value="headers">
              <Textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                placeholder="Request headers (JSON)"
                className="font-mono h-32"
              />
            </TabsContent>
            
            <TabsContent value="auth">
              <div className="space-y-4">
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Auth Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Auth</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="apikey">API Key</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input placeholder="Token or API Key" />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Response</h3>
                {status && (
                  <Badge 
                    variant={status >= 200 && status < 300 ? "default" : "destructive"}
                  >
                    {status} {status >= 200 && status < 300 ? "OK" : "Error"}
                  </Badge>
                )}
                {responseTime && <span className="text-xs text-muted-foreground">{responseTime}ms</span>}
              </div>
              <Button variant="ghost" size="sm" onClick={copyResponse}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={response}
              readOnly
              className="font-mono h-64"
            />
          </div>
        </div>
        
        {expanded && (
          <div className="lg:col-span-1">
            <h3 className="font-medium mb-2">Saved Requests</h3>
            <div className="space-y-2">
              {savedRequests.map((request, idx) => (
                <Card key={idx} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => loadRequest(request)}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{request.name}</span>
                      <Badge variant="outline">{request.method}</Badge>
                    </div>
                    <p className="text-sm truncate text-muted-foreground">{request.url}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTester;
