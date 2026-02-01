
import React from 'react';
import { Feature, Project, AuditLogEntry } from './types';

export const MOCK_IPS = ['192.168.1.1', '10.0.0.5', '172.16.0.12', '127.0.0.1', '203.0.113.42'];
export const MOCK_LOCATIONS = ['San Francisco, US', 'London, UK', 'Mumbai, IN', 'Tokyo, JP', 'Berlin, DE'];

export const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'devcli-core', status: 'active', language: 'Go', lastUpdated: '2h ago', path: '~/dev/core' },
  { id: '2', name: 'web-dashboard', status: 'development', language: 'TypeScript', lastUpdated: '5m ago', path: '~/dev/web' },
  { id: '3', name: 'api-gateway', status: 'active', language: 'Python', lastUpdated: '1d ago', path: '~/dev/api' },
  { id: '4', name: 'legacy-auth', status: 'archived', language: 'Java', lastUpdated: '2y ago', path: '~/archive/auth' },
  { id: '5', name: 'mobile-app', status: 'development', language: 'Dart/Flutter', lastUpdated: '30m ago', path: '~/dev/mobile' },
];

export const DEVCLI_LOGO = `
 ██████╗ ███████╗██╗   ██╗ ██████╗██╗     ██╗
 ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██║
 ██║  ██║█████╗  ██║   ██║██║     ██║     ██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝██║     ██║     ██║
 ██████╔╝███████╗ ╚████╔╝ ╚██████╗███████╗██║
 ╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝╚══════╝╚═╝
 Developer Command Line Interface
`;

export const FEATURES: Feature[] = [
  { name: 'Project Manager', description: 'Scaffolding, templates, and history tracking.', command: 'dev projects' },
  { name: 'Task Runner', description: 'One-click build, test, and lint for any language.', command: 'dev run' },
  { name: 'Venv Wizard', description: 'Centralized Python and Node environment management.', command: 'dev env' },
  { name: 'Dev Server', description: 'Auto-detecting live reload servers.', command: 'dev serve' },
  { name: 'Smart File Creator', description: 'Instant generation of Dockerfiles, .env, etc.', command: 'dev create' },
  { name: 'Boilerplate Gen', description: 'Instant code snippets and patterns.', command: 'dev gen' },
  { name: 'Snippet Library', description: 'Your personal vault for reusable code blocks.', command: 'dev snippets' },
  { name: 'AI Assistant', description: 'Built-in chat for coding help and debugging.', command: 'chat help' },
  { name: 'File Manager', description: 'Keyboard-driven navigation and editing.', command: 'dev fm' },
  { name: 'Auto-Update', description: 'Keeps your tools and languages current.', command: 'dev update' },
];

export const INITIAL_SYSTEM_LOGS = [
  "Booting DevCLI v1.0.4...",
  "Loading Go/BubbleTea kernel...",
  "Initializing unified interface...",
  "Checking virtual environments...",
  "System ready. Type 'help' to see available commands."
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'log_1', timestamp: new Date(Date.now() - 3600000), event: 'SSH handshake from 192.168.1.5 accepted', ip: '192.168.1.5', location: 'Local Network', status: 'success' },
  { id: 'log_2', timestamp: new Date(Date.now() - 7200000), event: 'Environment variables encrypted', ip: 'internal', location: 'System', status: 'success' },
  { id: 'log_3', timestamp: new Date(Date.now() - 14400000), event: 'Detected strict mode react re-render', ip: 'localhost', location: 'Browser', status: 'warning' },
];
