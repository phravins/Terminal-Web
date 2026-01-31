
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TerminalLine } from './types';
import { DEVCLI_LOGO, FEATURES, INITIAL_SYSTEM_LOGS } from './constants';
import TerminalOutput from './components/TerminalOutput';
import ProjectDashboard from './components/ProjectDashboard';
import AuthDashboard from './components/AuthDashboard';
import CommandInput from './components/CommandInput';
import { getAIResponse } from './services/phravinsService';
import { Terminal, Shield, Cpu, Github, ExternalLink, Package, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('main.go');
  const initialized = useRef(false);

  // Use React.ReactNode for content to fix JSX namespace error and provide broader type support
  const addLine = useCallback((type: TerminalLine['type'], content: React.ReactNode) => {
    setLines(prev => [...prev, { type, content, timestamp: new Date() }]);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Initial boot sequence
    const boot = async () => {
      addLine('header', <pre className="text-emerald-500 text-[10px] sm:text-xs leading-none mb-4">{DEVCLI_LOGO}</pre>);
      for (const log of INITIAL_SYSTEM_LOGS) {
        await new Promise(r => setTimeout(r, 150));
        addLine('system', log);
      }
    };
    boot();
  }, [addLine]);

  const handleCommand = async (command: string) => {
    const cmd = command.toLowerCase().trim();
    addLine('command', command);
    setIsProcessing(true);

    if (cmd === 'help') {
      addLine('header', 'Available Commands:');
      addLine('system', 'about     - Learn what DevCLI is');
      addLine('system', 'features  - List internal workspace tools');
      addLine('system', 'install   - Get installation instructions');
      addLine('system', 'chat [msg]- Ask the AI Assistant for help');
      addLine('system', 'clear     - Clear the terminal');
      addLine('system', 'ls        - List virtual files');
    } else if (cmd === 'clear') {
      setLines([{ type: 'header', content: <pre className="text-emerald-500 text-[10px] sm:text-xs leading-none mb-4">{DEVCLI_LOGO}</pre>, timestamp: new Date() }]);
    } else if (cmd === 'about') {
      addLine('header', 'DevCLI: The Unified Developer Workspace');
      addLine('system', 'DevCLI is a terminal-based interface built using Go and the Bubble Tea framework.');
      addLine('system', 'It consolidates essential developer tools into a single keyboard-driven workspace.');
      addLine('system', 'No more jumping between tabs or remembering 20 different tool CLIs.');
    } else if (cmd === 'features') {
      addLine('header', 'Core Features:');
      const featureList = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {FEATURES.map((f, i) => (
            <div key={i} className="border border-zinc-800 p-3 rounded bg-zinc-900/40 hover:border-emerald-500/50 transition-colors">
              <div className="text-emerald-400 font-bold mb-1">{f.name}</div>
              <div className="text-zinc-400 text-xs mb-2">{f.description}</div>
              <div className="text-zinc-600 font-mono text-[10px]">Usage: {f.command}</div>
            </div>
          ))}
        </div>
      );
      addLine('system', featureList);
    } else if (cmd === 'install') {
      addLine('header', 'Quick Installation:');
      addLine('system', 'MacOS/Linux: curl -sL https://devcli.sh/install | bash');
      addLine('system', 'Windows:     powershell -c "irm https://devcli.sh/install.ps1 | iex"');
      addLine('system', 'Go:          go install github.com/devcli/devcli@latest');
    } else if (cmd === 'ls') {
      addLine('system', 'drwxr-xr-x  devcli/projects');
      addLine('system', 'drwxr-xr-x  devcli/templates');
      addLine('system', '-rw-r--r--  devcli.config.yaml');
      addLine('system', '-rw-r--r--  README.md');
    } else if (cmd.startsWith('chat ')) {
      const query = command.substring(5);
      addLine('system', 'Connecting to DevCLI Neural Link...');
      const response = await getAIResponse(query);
      addLine('ai', response);
    } else {
      addLine('error', `Command not found: '${cmd}'. Type 'help' for assistance.`);
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col text-zinc-300 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

      {/* Top Navigation Bar (Terminal Tab Style) */}
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 h-12 flex items-center px-4 shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-2 mr-6">
          <Terminal size={18} className="text-emerald-500" />
          <span className="font-bold text-sm tracking-tight hidden sm:inline">DEVCLI_WORKSPACE</span>
        </div>

        <div className="flex gap-1 h-full overflow-x-auto no-scrollbar">
          <div
            onClick={() => setActiveTab('main.go')}
            className={`border-x border-t border-zinc-800 px-4 flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${activeTab === 'main.go' ? 'bg-zinc-950 text-emerald-400' : 'bg-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layout size={14} /> main.go
          </div>
          <div
            onClick={() => {
              setActiveTab('project_manager.go');
            }}
            className={`border-x border-t border-zinc-800 px-4 flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${activeTab === 'project_manager.go' ? 'bg-zinc-950 text-emerald-400' : 'bg-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            <Package size={14} /> project_manager.go
          </div>
          <div
            onClick={() => {
              setActiveTab('auth.go');
            }}
            className={`border-x border-t border-zinc-800 px-4 flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${activeTab === 'auth.go' ? 'bg-zinc-950 text-emerald-400' : 'bg-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            <Shield size={14} /> auth.go
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 text-zinc-500">
          <a href="https://github.com/phravins/devcli" target="_blank" className="hover:text-emerald-500 transition-colors">
            <Github size={18} />
          </a>
          <button onClick={() => handleCommand('install')} className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-3 py-1 rounded transition-all hidden sm:flex items-center gap-2">
            Install <ExternalLink size={12} />
          </button>
        </div>
      </header>

      {/* Main Terminal Window */}
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto px-4 sm:px-6 relative">
        {activeTab === 'project_manager.go' ? (
          <ProjectDashboard />
        ) : activeTab === 'auth.go' ? (
          <AuthDashboard />
        ) : (
          <>
            <TerminalOutput lines={lines} />
            {isProcessing && (
              <div className="flex gap-3 items-center py-2 text-zinc-500 italic text-sm font-mono animate-pulse">
                <Cpu size={16} className="animate-spin" />
                Thinking...
              </div>
            )}
            <CommandInput onExecute={handleCommand} />
          </>
        )}
      </main>

      {/* Sidebar / Bottom Info Bar (Optional Terminal Elements) */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-1 px-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Connected</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">Ln 1, Col 1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v1.0.4-stable</span>
          <span className="text-emerald-500/60">BubbleTea Framework v0.24</span>
        </div>
      </footer>
    </div>
  );
};

export default App;