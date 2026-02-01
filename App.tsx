
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TerminalLine, AuditLogEntry } from './types';
import { DEVCLI_LOGO, FEATURES, INITIAL_SYSTEM_LOGS, MOCK_PROJECTS, INITIAL_AUDIT_LOGS, MOCK_IPS, MOCK_LOCATIONS } from './constants';
import TerminalOutput from './components/TerminalOutput';
import ProjectDashboard from './components/ProjectDashboard';
import AuthDashboard from './components/AuthDashboard';
import CommandInput from './components/CommandInput';
import { getAIResponse } from './services/phravinsService';
import { Terminal, Shield, Cpu, Github, ExternalLink, Package, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [currentSession, setCurrentSession] = useState<{ ip: string; location: string } | null>(null);
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
      // Simulate new session login
      const randomIp = MOCK_IPS[Math.floor(Math.random() * MOCK_IPS.length)];
      const randomLoc = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      setCurrentSession({ ip: randomIp, location: randomLoc });

      const newLog: AuditLogEntry = {
        id: `log_${Date.now()}`,
        timestamp: new Date(),
        event: 'Session Start (Web)',
        ip: randomIp,
        location: randomLoc,
        status: 'success'
      };
      setAuditLogs(prev => [newLog, ...prev]);

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
    } else if (cmd === 'whoami') {
      addLine('system', 'guest@devcli-web-terminal');
    } else if (cmd === 'date') {
      addLine('system', new Date().toString());
    } else if (cmd.startsWith('echo ')) {
      addLine('system', command.substring(5));
    } else if (cmd === 'contact') {
      addLine('header', 'Contact Information:');
      addLine('system', 'Email:  hello@devcli.sh');
      addLine('system', 'GitHub: https://github.com/phravins');
      addLine('system', 'Twitter: @devcli_sh');
    } else if (cmd === 'projects' || cmd === 'dev projects') {
      addLine('header', 'Active Projects:');
      const projectList = (
        <div className="flex flex-col gap-2 my-2">
          <div className="grid grid-cols-12 text-zinc-500 border-b border-zinc-800 pb-1 mb-1 text-[10px] uppercase tracking-wider">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3">Language</div>
            <div className="col-span-3 text-right">Updated</div>
          </div>
          {MOCK_PROJECTS.map((p) => (
            <div key={p.id} className="grid grid-cols-12 text-xs font-mono hover:bg-zinc-900/50 p-1 rounded transition-colors group">
              <div className="col-span-1 text-zinc-600 group-hover:text-zinc-400">{p.id}</div>
              <div className="col-span-3 text-emerald-400 font-bold">{p.name}</div>
              <div className="col-span-2">
                <span className={`text-[10px] px-1 rounded ${p.status === 'active' ? 'bg-emerald-900/30 text-emerald-500' : p.status === 'development' ? 'bg-blue-900/30 text-blue-500' : 'bg-zinc-800 text-zinc-500'}`}>
                  {p.status}
                </span>
              </div>
              <div className="col-span-3 text-zinc-400">{p.language}</div>
              <div className="col-span-3 text-right text-zinc-500">{p.lastUpdated}</div>
            </div>
          ))}
        </div>
      );
      addLine('system', projectList);
    } else if (cmd.startsWith('dev ')) {
      // Handle other dev commands generically or specifically
      const subCmd = cmd.split(' ')[1];
      const feature = FEATURES.find(f => f.command === cmd);

      if (feature) {
        addLine('header', `Executing ${feature.name}...`);
        await new Promise(r => setTimeout(r, 600)); // Fake processing delay

        switch (subCmd) {
          case 'run':
            addLine('system', 'Running build pipeline...');
            addLine('system', '✓ Linting passed');
            addLine('system', '✓ Unit tests passed (45/45)');
            addLine('system', 'Build success! Output: ./dist/main');
            break;
          case 'env':
            addLine('system', 'Scanning for requirements.txt / package.json...');
            addLine('system', 'Found package.json');
            addLine('system', 'Node.js v18.16.0 environment active.');
            break;
          case 'serve':
            addLine('system', 'Starting development server on port 3000...');
            addLine('system', 'Ready on http://localhost:3000');
            break;
          case 'create':
            addLine('system', 'Select file type to create:');
            addLine('system', '1. Dockerfile');
            addLine('system', '2. .gitignore');
            addLine('system', '3. CI/CD Pipeline');
            addLine('system', '(Simulation: File created)');
            break;
          case 'gen':
            addLine('system', 'Generating boilerplate for Go REST API...');
            addLine('system', '✓ Created cmd/main.go');
            addLine('system', '✓ Created internal/server/routes.go');
            break;
          case 'snippets':
            addLine('system', 'Listing saved snippets:');
            addLine('system', '- auth_middleware (Go)');
            addLine('system', '- react_component (TSX)');
            addLine('system', '- db_connection (Python)');
            break;
          case 'fm':
            addLine('system', 'Opening File Manager TUI...');
            addLine('system', '[Error: Cannot open TUI in web mode. Use desktop app.]');
            break;
          case 'update':
            addLine('system', 'Checking for updates...');
            addLine('system', 'You are on the latest version v1.0.4');
            break;
          default:
            addLine('system', `Command '${cmd}' executed successfully.`);
        }
      } else {
        addLine('error', `Unknown dev command: ${subCmd}. Type 'features' to see available tools.`);
      }
    } else if (cmd.startsWith('security')) {
      const subCmd = command.split(' ')[1];
      if (subCmd === 'audit') {
        addLine('header', 'Security Audit Logs:');
        const logTable = (
          <div className="flex flex-col gap-1 my-2 border border-zinc-800 rounded p-2 bg-zinc-900/30">
            <div className="grid grid-cols-12 text-[10px] text-zinc-500 uppercase tracking-wider mb-2 pb-2 border-b border-zinc-800">
              <div className="col-span-3">Timestamp</div>
              <div className="col-span-3">Event</div>
              <div className="col-span-2">IP Addr</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            {auditLogs.map((log) => (
              <div key={log.id} className="grid grid-cols-12 text-xs font-mono text-zinc-400 hover:bg-zinc-800/50 p-1 rounded">
                <div className="col-span-3 text-zinc-500">{log.timestamp.toLocaleTimeString()} <span className="text-[10px] opacity-50">{log.timestamp.toLocaleDateString()}</span></div>
                <div className="col-span-3 text-zinc-300">{log.event}</div>
                <div className="col-span-2 text-blue-400/80">{log.ip}</div>
                <div className="col-span-2 text-zinc-500">{log.location}</div>
                <div className="col-span-2 text-right">
                  <span className={`text-[10px] px-1 rounded ${log.status === 'success' ? 'text-emerald-500' :
                    log.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] text-zinc-600 text-center">
              Total Events: {auditLogs.length} | Protected by DevCLI Sentinel
            </div>
          </div>
        );
        addLine('system', logTable);
      } else if (subCmd === 'status') {
        if (currentSession) {
          addLine('header', 'Current Session Security Status:');
          addLine('system', `IP Address:   ${currentSession.ip}`);
          addLine('system', `Location:     ${currentSession.location}`);
          addLine('system', `Encryption:   AES-256 (Simulated)`);
          addLine('system', `VPN Tunnel:   Inactive`);
        } else {
          addLine('error', 'Session info unavailable.');
        }
      } else {
        addLine('system', 'Usage: security [audit|status]');
      }
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
          <AuthDashboard logs={auditLogs} />
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
