import React from 'react';
import { Info, Download } from 'lucide-react';

interface NavigationOverlayProps {
    onNavigate: (section: string) => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ onNavigate }) => {
    return (
        <>
            {/* Navigation Bar - Responsive */}
            {/* Mobile: Horizontal Bottom Bar. Desktop: Vertical Left Sidebar */}
            <div className="fixed bottom-4 left-4 right-4 md:static md:absolute md:top-4 md:left-4 md:right-auto md:w-auto z-50 flex md:flex-col items-center md:items-start gap-4 bg-blueprint-bg/90 backdrop-blur-md border border-blueprint-border p-3 md:p-4 rounded-xl md:rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] overflow-x-auto whitespace-nowrap scrollbar-hide justify-between md:justify-start">
                <button onClick={() => onNavigate('home')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors md:w-full text-left">ROOT</button>
                <span className="text-blue-800 h-4 w-[1px] md:w-full md:h-[1px] bg-blue-900/50"></span>
                <button onClick={() => onNavigate('experience')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors md:w-full text-left">EXP</button>
                <span className="text-blue-800 h-4 w-[1px] md:w-full md:h-[1px] bg-blue-900/50"></span>
                <button onClick={() => onNavigate('projects')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors md:w-full text-left">PROJ</button>
                <span className="text-blue-800 h-4 w-[1px] md:w-full md:h-[1px] bg-blue-900/50"></span>
                <button onClick={() => onNavigate('certifications')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors md:w-full text-left">CERTS</button>
                <span className="text-blue-800 h-4 w-[1px] md:w-full md:h-[1px] bg-blue-900/50"></span>
                <button onClick={() => onNavigate('skills')} className="text-xs md:text-sm font-mono text-blueprint-text hover:text-white transition-colors md:w-full text-left">SKILLS</button>
            </div>

            {/* Resume Download Button - Top Right */}
            {/* Resume Download Button - Top Right */}
            <a
                href="/Karthikeyan_Cybersecurity_Resume.pdf"
                download="Karthikeyan_Cybersecurity_Resume.pdf"
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-blueprint-bg/80 backdrop-blur-md border border-blueprint-border px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] text-blueprint-text hover:text-white hover:bg-blue-900/30 transition-all group"
            >
                <Download size={16} className="group-hover:animate-bounce" />
                <span className="hidden md:inline text-sm font-bold font-mono tracking-wider">DOWNLOAD RESUME</span>
                <span className="md:hidden text-xs font-bold font-mono tracking-wider">RESUME</span>
            </a>

            {/* Gambit Quote - Compact Version */}
            <div className="!hidden md:!block absolute bottom-6 left-6 z-10 p-3 max-w-[280px] bg-blueprint-bg/90 backdrop-blur-xl rounded-lg border border-blueprint-border/40 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2 mb-2 border-b border-blueprint-border/30 pb-1">
                    <Info size={14} className="text-blueprint-text" />
                    <span className="text-xs font-bold text-blueprint-text tracking-wider uppercase">THE GAMBIT</span>
                </div>
                <div className="text-[10px] text-blue-200/80 leading-relaxed font-light tracking-wide">
                    "From the outside, it looked like I was throwing away a decade of security for a 'maybe.'
                    ...But they missed the underlying math.
                    <strong className="text-blueprint-text font-bold block my-1.5 border-l-2 border-blueprint-text pl-2">
                        It wasn’t a gamble, it was a gambit.
                    </strong>
                    I sacrificed a comfortable present to force a more powerful future."
                </div>
            </div>
        </>
    );
};

export default NavigationOverlay;
