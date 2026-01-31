
import React, { useEffect, useRef } from 'react';
import { TerminalLine } from '../types';

interface TerminalOutputProps {
  lines: TerminalLine[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="flex flex-col gap-1.5 py-4 min-h-0 overflow-y-auto font-mono text-sm sm:text-base">
      {lines.map((line, index) => {
        const timestamp = line.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        let colorClass = 'text-zinc-400';
        let prefix = '';

        switch (line.type) {
          case 'command':
            colorClass = 'text-emerald-400 font-bold';
            prefix = '❯ ';
            break;
          case 'system':
            colorClass = 'text-zinc-500 italic';
            prefix = '[SYS] ';
            break;
          case 'error':
            colorClass = 'text-red-400';
            prefix = '[ERR] ';
            break;
          case 'ai':
            colorClass = 'text-blue-300';
            prefix = '[AI] ';
            break;
          case 'header':
            colorClass = 'text-white font-bold terminal-glow';
            prefix = '';
            break;
        }

        return (
          <div key={index} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-zinc-700 shrink-0 select-none">[{timestamp}]</span>
            <div className={`${colorClass} whitespace-pre-wrap break-words flex-1`}>
              {prefix}{line.content}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalOutput;
