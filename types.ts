
import React from 'react';

export type CommandType = 'command' | 'system' | 'error' | 'ai' | 'header';

export interface TerminalLine {
  type: CommandType;
  // Use React.ReactNode which is the standard type for renderable content in React
  content: React.ReactNode;
  timestamp: Date;
}

export interface Feature {
  name: string;
  description: string;
  command: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived' | 'development';
  language: string;
  lastUpdated: string;
  path: string;
}