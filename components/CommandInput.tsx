
import React, { useState } from 'react';

interface CommandInputProps {
  onExecute: (command: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onExecute }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecute(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 py-4 border-t border-zinc-900 mt-auto shrink-0 bg-zinc-950/80 backdrop-blur-sm sticky bottom-0">
      <span className="text-emerald-500 font-bold select-none">❯</span>
      <input
        autoFocus
        type="text"
        className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-800 focus:ring-0 selection:bg-emerald-500 selection:text-zinc-950"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type 'help' to begin..."
        spellCheck={false}
      />
      <div className="w-2 h-5 bg-emerald-500 animate-pulse ml-1"></div>
    </form>
  );
};

export default CommandInput;
