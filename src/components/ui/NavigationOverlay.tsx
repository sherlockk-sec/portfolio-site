import React from 'react';
import { Info, Map } from 'lucide-react';

interface NavigationOverlayProps {
    onNavigate: (section: string) => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ onNavigate }) => {
    return (
        <>
            {/* Top Navigation Bar */}
            <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-10 w-[95%] md:w-auto max-w-2xl flex md:justify-center gap-4 bg-blueprint-bg/80 backdrop-blur-md border border-blueprint-border px-4 md:px-6 py-2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] overflow-x-auto whitespace-nowrap scrollbar-hide">
                <button onClick={() => onNavigate('home')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors">ROOT</button>
                <span className="text-blue-800">|</span>
                <button onClick={() => onNavigate('experience')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors">EXPERIENCE</button>
                <span className="text-blue-800">|</span>
                <button onClick={() => onNavigate('projects')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors">PROJECTS</button>
                <span className="text-blue-800">|</span>
                <button onClick={() => onNavigate('certifications')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors">CERTS</button>
                <span className="text-blue-800">|</span>
                <button onClick={() => onNavigate('skills')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors">SKILLS</button>
            </div>

            {/* Legend / Info Box - Hidden on mobile */}
            <div className="!hidden md:!block absolute bottom-4 left-4 z-10 p-4 max-w-sm">
                <div className="flex items-center gap-2 mb-2 border-b border-blueprint-border pb-1">
                    <Info size={16} className="text-blueprint-text" />
                    <span className="text-xs font-bold text-blueprint-text uppercase">Network Legend</span>
                </div>
                <div className="space-y-2 text-xs text-blue-200">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 border border-blueprint-text bg-blue-900/50 block"></span>
                        <span>Active Nodes: Click to access Systems/Logs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Map size={12} className="text-blue-500" />
                        <span>Map represents Professional Infrastructure</span>
                    </div>
                    <p className="text-[10px] text-blue-400 mt-2 italic border-t border-blue-900/30 pt-1">
                        "Complexity is a feature. Navigate the nodes to inspect the architecture."
                    </p>
                </div>
            </div>
        </>
    );
};

export default NavigationOverlay;
