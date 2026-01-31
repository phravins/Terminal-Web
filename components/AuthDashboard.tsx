
import React from 'react';
import { Shield, User, Key, Lock, CheckCircle, AlertTriangle, Fingerprint } from 'lucide-react';

const AuthDashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-full font-mono relative">
            <div className="flex justify-between items-center mb-6 pt-4">
                <div>
                    <div className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <Shield className="text-emerald-500" size={20} /> Auth & Security
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">Identity Management System v2.1</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    SECURE CONNECTION
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* User Profile Card */}
                <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
                            <User size={24} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Guest Developer</div>
                            <div className="text-xs text-zinc-500">guest@devcli.local</div>
                        </div>
                        <div className="ml-auto text-xs text-zinc-500 py-1 px-2 border border-zinc-700 rounded">
                            Role: Admin
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Session ID:</span>
                            <span className="text-zinc-400 font-mono">dev_88a91b2c</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Last Login:</span>
                            <span className="text-zinc-400">Just now</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">TFA Status:</span>
                            <span className="text-emerald-500 flex items-center gap-1"><CheckCircle size={10} /> Enabled</span>
                        </div>
                    </div>
                    <button className="w-full mt-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded transition-colors border border-zinc-700">
                        Manage Profile
                    </button>
                </div>

                {/* Security Settings */}
                <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/20">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Active Credentials</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-zinc-900/40 rounded border border-zinc-800/50">
                            <div className="flex items-center gap-3">
                                <Key size={14} className="text-orange-400" />
                                <div>
                                    <div className="text-xs text-zinc-300">SSH Key (id_rsa)</div>
                                    <div className="text-[10px] text-zinc-600">SHA256: 4e:9a:12...</div>
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-zinc-900/40 rounded border border-zinc-800/50">
                            <div className="flex items-center gap-3">
                                <Fingerprint size={14} className="text-purple-400" />
                                <div>
                                    <div className="text-xs text-zinc-300">GPG Key</div>
                                    <div className="text-[10px] text-zinc-600">ID: 0x9B8A...</div>
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-zinc-900/40 rounded border border-zinc-800/50 opacity-60">
                            <div className="flex items-center gap-3">
                                <Lock size={14} className="text-zinc-500" />
                                <div>
                                    <div className="text-xs text-zinc-400">API Tokens</div>
                                    <div className="text-[10px] text-zinc-600">None configured</div>
                                </div>
                            </div>
                            <AlertTriangle size={12} className="text-yellow-500/50" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-800 pt-4 mt-auto">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Security Audit Log</h3>
                <div className="space-y-1 font-mono text-[10px] text-zinc-500">
                    <div className="flex gap-4">
                        <span className="text-zinc-600">23:54:12</span>
                        <span className="text-emerald-500">SUCCESS</span>
                        <span>SSH handshake from 192.168.1.5 accepted</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-zinc-600">23:50:01</span>
                        <span className="text-emerald-500">SUCCESS</span>
                        <span>Environment variables encrypted</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-zinc-600">23:45:22</span>
                        <span className="text-yellow-500">WARN</span>
                        <span>Detected strict mode react re-render</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthDashboard;
