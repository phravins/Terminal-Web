
import React from 'react';
import { Folder, Circle, Clock, Code, MoreHorizontal } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectDashboard: React.FC = () => {
    const getStatusColor = (status: Project['status']) => {
        switch (status) {
            case 'active': return 'text-emerald-400';
            case 'development': return 'text-blue-400';
            case 'archived': return 'text-zinc-500';
            default: return 'text-zinc-400';
        }
    };

    return (
        <div className="flex flex-col h-full font-mono">
            <div className="flex justify-between items-center mb-6 pt-4">
                <div>
                    <div className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <Folder className="text-emerald-500" size={20} /> Project Manager
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">Found 5 local repositories</div>
                </div>
                <div className="flex gap-4 text-[10px] text-zinc-500">
                    <div className="hover:text-emerald-400 cursor-pointer">[N] New Project</div>
                    <div className="hover:text-emerald-400 cursor-pointer">[I] Import</div>
                    <div className="hover:text-emerald-400 cursor-pointer">[R] Refresh</div>
                </div>
            </div>

            <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/20 w-full mb-4">
                <table className="w-full text-left bg-zinc-900/40">
                    <thead className="bg-zinc-900/80 text-[10px] uppercase text-zinc-500 border-b border-zinc-800">
                        <tr>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-zinc-300">Project Name</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-zinc-300">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-zinc-300">Language</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-zinc-300 text-right">Last Updated</th>
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-xs">
                        {MOCK_PROJECTS.map((project) => (
                            <tr key={project.id} className="hover:bg-zinc-800/30 group transition-colors cursor-pointer text-zinc-300">
                                <td className="px-4 py-3 font-medium flex flex-col">
                                    <span className="group-hover:text-white transition-colors">{project.name}</span>
                                    <span className="text-[10px] text-zinc-600 font-mono truncate max-w-[150px]">{project.path}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 ${getStatusColor(project.status)} text-[10px]`}>
                                        <Circle size={6} fill="currentColor" /> {project.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5 text-zinc-400">
                                        <Code size={12} /> {project.language}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right text-zinc-500 font-mono">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <Clock size={12} /> {project.lastUpdated}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-zinc-600 hover:text-white cursor-pointer">
                                    <MoreHorizontal size={14} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-auto border-t border-zinc-800/50 py-3 flex gap-6 text-[10px] text-zinc-500">
                <span>Total: <span className="text-zinc-300">5</span></span>
                <span>Active: <span className="text-emerald-400">2</span></span>
                <span>Archived: <span className="text-zinc-400">1</span></span>
            </div>
        </div>
    );
};

export default ProjectDashboard;
