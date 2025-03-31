
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Download, RefreshCw, UploadCloud, X } from 'lucide-react';

const TerminalEmulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<{type: 'input' | 'output', content: string}[]>([
    { type: 'output', content: 'MLOps Platform Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '$ ' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);
  
  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add command to output
    setOutput(prev => [
      ...prev,
      { type: 'input', content: input }
    ]);
    
    // Process command
    processCommand(input);
    
    // Add to command history
    setCommandHistory(prev => [input, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    
    // Clear input
    setInput('');
  };
  
  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const parts = command.split(' ');
    const mainCommand = parts[0];
    
    switch (mainCommand) {
      case 'help':
        return showHelp();
      case 'clear':
        return clearTerminal();
      case 'ls':
        return listFiles();
      case 'pwd':
        return showCurrentDirectory();
      case 'echo':
        return echoText(parts.slice(1).join(' '));
      case 'date':
        return showDate();
      case 'whoami':
        return showUser();
      case 'gpu':
        return showGpuInfo();
      case 'exit':
        return exitTerminal();
      default:
        return unknownCommand(command);
    }
  };
  
  // Command implementations
  const showHelp = () => {
    const helpText = [
      'Available commands:',
      '  help     - Show this help message',
      '  clear    - Clear terminal output',
      '  ls       - List files in the current directory',
      '  pwd      - Show current directory',
      '  echo     - Display a message',
      '  date     - Show current date and time',
      '  whoami   - Show current user',
      '  gpu      - Show GPU information',
      '  exit     - Exit terminal session'
    ];
    
    setOutput(prev => [
      ...prev,
      { type: 'output', content: helpText.join('\n') },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const clearTerminal = () => {
    setOutput([
      { type: 'output', content: 'MLOps Platform Terminal v1.0.0' },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const listFiles = () => {
    const files = [
      'data/',
      'models/',
      'notebooks/',
      'config.yaml',
      'requirements.txt',
      'train.py',
      'inference.py',
      'Dockerfile'
    ];
    
    setOutput(prev => [
      ...prev,
      { type: 'output', content: files.join('\n') },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const showCurrentDirectory = () => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: '/home/user/mlops-project' },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const echoText = (text: string) => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: text || '' },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const showDate = () => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: new Date().toString() },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const showUser = () => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: 'developer@mlops-platform' },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const showGpuInfo = () => {
    const gpuInfo = [
      'GPU 0: NVIDIA A100 80GB',
      '  Memory:      80GB Total, 12.4GB Used, 67.6GB Free',
      '  Utilization: 24%',
      '  Temperature: 62°C',
      '  Processes:   2 (jupyter, training_job_42)',
      '',
      'GPU 1: NVIDIA A100 80GB',
      '  Memory:      80GB Total, 8.1GB Used, 71.9GB Free',
      '  Utilization: 15%',
      '  Temperature: 58°C',
      '  Processes:   1 (inference_service)'
    ];
    
    setOutput(prev => [
      ...prev,
      { type: 'output', content: gpuInfo.join('\n') },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const exitTerminal = () => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: 'Session closed.' },
    ]);
    
    // Notify user
    toast({
      title: "Terminal session closed",
      description: "You can start a new session by refreshing.",
    });
  };
  
  const unknownCommand = (command: string) => {
    setOutput(prev => [
      ...prev,
      { type: 'output', content: `Command not found: ${command}` },
      { type: 'output', content: 'Type "help" for available commands.' },
      { type: 'output', content: '$ ' }
    ]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };
  
  const handleDownloadLogs = () => {
    const logContent = output
      .map(line => line.type === 'input' ? `$ ${line.content}` : line.content)
      .join('\n');
      
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terminal-logs-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Logs downloaded",
      description: "Terminal logs have been downloaded as a text file",
    });
  };
  
  const handleClearTerminal = () => {
    clearTerminal();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">Terminal Session</div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleDownloadLogs}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClearTerminal}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        className="flex-1 font-mono text-sm p-4 bg-black text-green-400 rounded-md overflow-auto"
        ref={terminalRef}
        onClick={handleTerminalClick}
      >
        {output.map((line, index) => (
          <div key={index}>
            {line.type === 'input' ? (
              <div>$ {line.content}</div>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>{line.content}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex">
          <span>$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalEmulator;
