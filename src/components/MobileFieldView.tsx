import React, { useState, useEffect } from 'react';
import {
    Terminal, Server, Shield, Wifi,
    ChevronDown, ChevronUp, Lock, Zap,
    User, Briefcase, FileCode
} from 'lucide-react';

// --- Data Constants (Duplicated from Desktop for Isolation) ---
const EDUCATION_DATA = {
    title: 'VIT Bhopal',
    subtitle: 'M.Tech CSE',
    details: [
        'CGPA: 7.09/10.0',
        'Integrated M.Tech Cybersec',
        '-----------------',
        'Coursework:',
        '> Pentesting & Red Teaming',
        '> Digital Forensics',
        '> AI & ML Security'
    ]
};

const EXPERIENCE_DATA = {
    title: 'Tevel Cyber Corps',
    subtitle: 'Cybersecurity Intern',
    details: [
        'Role: Intern (Oct 25 - Jan 26)',
        '-----------------',
        '> Executed DDoS Pentesting',
        '> Built n8n Automation Workflows',
        '> Managed Wazuh SOC Operations',
        '> Configured Fortinet Firewalls'
    ]
};

const PROJECT_DATA = {
    title: 'Homelab Cluster',
    subtitle: 'Infrastructure',
    details: [
        'Tech: Proxmox, Docker, Tailscale',
        '-----------------',
        '> Bare-metal Virtualization',
        '> Automated Remote Backups',
        '> Secure Subnet Routing',
        '> Self-hosted Services'
    ]
};

const CERT_DATA = {
    title: 'CEH v12',
    subtitle: 'Certified Ethical Hacker',
    details: [
        'Score: 111/125 (88.8%)',
        'Issuer: EC-Council',
        '-----------------',
        '> Mastery of Offensive Security',
        '> Advanced Penetration Testing'
    ]
};

const SKILLS_DATA = [
    { name: 'Burp Suite', status: 'ONLINE', icon: Zap },
    { name: 'Wazuh', status: 'ACTIVE', icon: Shield },
    { name: 'Python', status: 'READY', icon: FileCode },
    { name: 'Docker', status: 'RUNNING', icon: Server },
    { name: 'Linux', status: 'ROOT', icon: Terminal },
    { name: 'n8n', status: 'SYNCED', icon: Wifi },
];

const MobileFieldView: React.FC = () => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleCard = (id: string) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="h-[100dvh] w-full bg-slate-950 text-cyan-400 font-mono pb-20 overflow-y-auto overflow-x-hidden selection:bg-cyan-900 selection:text-white">

            {/* --- TOP HEADER (Sticky) --- */}
            <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-cyan-800/50 px-4 py-2 flex justify-between items-center shadow-lg shadow-cyan-900/20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold tracking-widest text-cyan-100">NET_DIAG_TOOL_v2</span>
                </div>
                <div className="text-[10px] text-cyan-600">{currentTime}</div>
            </div>

            {/* --- STATUS BAR --- */}
            <div className="bg-cyan-950/30 px-4 py-1 flex items-center justify-between border-b border-cyan-900/30">
                <span className="text-[10px] text-cyan-500 flex items-center gap-1">
                    <Lock size={10} /> ENCRYPTED // TAILSCALE
                </span>
                <span className="text-[10px] text-cyan-500">LATENCY: 12ms</span>
            </div>

            {/* --- MAIN FEED (Traceroute Timeline) --- */}
            <div className="px-4 py-6 relative">

                {/* Vertical Dotted Line */}
                <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 border-l border-dashed border-cyan-700/50"></div>

                <div className="space-y-8">

                    {/* IDENTITY NODE (Intro) */}
                    <div id="home" className="relative pl-8 animate-fade-in-up">
                        <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                            <User size={12} className="text-cyan-400" />
                        </div>
                        <div className="bg-slate-900/50 border border-cyan-500/30 p-4 rounded-sm hover:border-cyan-400 transition-colors">
                            <h1 className="text-xl font-bold text-white mb-1">KARTHIKEYAN S</h1>
                            <p className="text-xs text-cyan-500 mb-0 tracking-wider">CYBERSECURITY ENTHUSIAST // RED TEAMER</p>
                        </div>
                    </div>

                    {/* EDUCATION CARD */}
                    <div id="exp" className="relative pl-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-700 rounded-full flex items-center justify-center z-10">
                            <Briefcase size={12} className="text-cyan-600" />
                        </div>
                        <div
                            onClick={() => toggleCard('edu')}
                            className={`bg-slate-900/50 border ${expandedCard === 'edu' ? 'border-cyan-400 bg-cyan-950/10' : 'border-cyan-800/30'} p-4 rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-cyan-600 mb-1">EDUCATION</div>
                                    <h3 className="font-bold text-cyan-100">{EDUCATION_DATA.title}</h3>
                                    <div className="text-xs text-slate-400">Int {EDUCATION_DATA.subtitle}</div>
                                </div>
                                {expandedCard === 'edu' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>

                            {/* Accordion Content */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'edu' ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-3 bg-black/40 rounded border border-cyan-900/50 font-mono text-[11px] text-green-400/90 leading-relaxed whitespace-pre-line shadow-inner">
                                    {EDUCATION_DATA.details.join('\n')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPERIENCE CARD */}
                    <div className="relative pl-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-700 rounded-full flex items-center justify-center z-10">
                            <Shield size={12} className="text-cyan-600" />
                        </div>
                        <div
                            onClick={() => toggleCard('work')}
                            className={`bg-slate-900/50 border ${expandedCard === 'work' ? 'border-cyan-400 bg-cyan-950/10' : 'border-cyan-800/30'} p-4 rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-cyan-600 mb-1">EXPERIENCE</div>
                                    <h3 className="font-bold text-cyan-100">{EXPERIENCE_DATA.title}</h3>
                                    <div className="text-xs text-slate-400">{EXPERIENCE_DATA.subtitle}</div>
                                </div>
                                {expandedCard === 'work' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>

                            {/* Accordion Content */}
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'work' ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-3 bg-black/40 rounded border border-cyan-900/50 font-mono text-[11px] text-green-400/90 leading-relaxed whitespace-pre-line shadow-inner">
                                    {EXPERIENCE_DATA.details.join('\n')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROJECTS CARD */}
                    <div className="relative pl-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-700 rounded-full flex items-center justify-center z-10">
                            <Server size={12} className="text-cyan-600" />
                        </div>
                        <div
                            onClick={() => toggleCard('proj')}
                            className={`bg-slate-900/50 border ${expandedCard === 'proj' ? 'border-cyan-400 bg-cyan-950/10' : 'border-cyan-800/30'} p-4 rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-cyan-600 mb-1">PROJECTS</div>
                                    <h3 className="font-bold text-cyan-100">{PROJECT_DATA.title}</h3>
                                    <div className="text-xs text-slate-400">{PROJECT_DATA.subtitle}</div>
                                </div>
                                {expandedCard === 'proj' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'proj' ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-3 bg-black/40 rounded border border-cyan-900/50 font-mono text-[11px] text-green-400/90 leading-relaxed whitespace-pre-line shadow-inner">
                                    {PROJECT_DATA.details.join('\n')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CERTIFICATIONS */}
                    <div className="relative pl-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-700 rounded-full flex items-center justify-center z-10">
                            <AwardIcon size={12} className="text-cyan-600" />
                        </div>
                        <div
                            onClick={() => toggleCard('cert')}
                            className={`bg-slate-900/50 border ${expandedCard === 'cert' ? 'border-cyan-400 bg-cyan-950/10' : 'border-cyan-800/30'} p-4 rounded-sm transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs text-cyan-600 mb-1">CERTIFIED</div>
                                    <h3 className="font-bold text-cyan-100">{CERT_DATA.title}</h3>
                                    <div className="text-xs text-slate-400">{CERT_DATA.subtitle}</div>
                                </div>
                                {expandedCard === 'cert' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${expandedCard === 'cert' ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-3 bg-black/40 rounded border border-cyan-900/50 font-mono text-[11px] text-green-400/90 leading-relaxed whitespace-pre-line shadow-inner">
                                    {CERT_DATA.details.join('\n')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SKILLS LIST (Simplified) */}
                    <div id="skills" className="pt-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold text-cyan-100 tracking-widest">ACTIVE_SERVICES</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS_DATA.map((skill, idx) => (
                                <div key={idx} className="bg-slate-900/50 border border-cyan-900/50 px-3 py-1.5 rounded text-[11px] text-cyan-400 font-mono">
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DOWNLOAD RESUME - Bottom Scroll */}
                    <div className="pt-8 pb-4 flex justify-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                        <a
                            href="/Karthikeyan_Cybersecurity_Resume.pdf"
                            download
                            className="flex items-center gap-2 bg-cyan-900/20 border border-cyan-500/50 px-6 py-3 rounded text-cyan-400 hover:bg-cyan-900/40 hover:text-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        >
                            <Briefcase size={16} />
                            <span className="text-xs font-bold tracking-widest">DOWNLOAD RESUME</span>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    );
};

// Helper for Cert Icon
const AwardIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
);

export default MobileFieldView;
