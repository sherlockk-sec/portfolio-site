import React from 'react';
import { Info } from 'lucide-react';

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

            {/* Gambit Quote - Hidden on mobile */}
            <div className="!hidden md:!block absolute bottom-4 left-4 z-10 p-5 max-w-md bg-blueprint-bg/90 backdrop-blur-xl rounded-lg border border-blueprint-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 mb-3 border-b border-blueprint-border/50 pb-2">
                    <Info size={16} className="text-blueprint-text" />
                    <span className="text-sm font-bold text-blueprint-text tracking-wider uppercase">THE GAMBIT</span>
                </div>
                <div className="text-xs text-blue-200 leading-relaxed font-light tracking-wide">
                    "From the outside, it looked like I was throwing away a decade of security for a 'maybe.'
                    People called it a risk; some even called it reckless. But they missed the underlying math.
                    <strong className="text-blueprint-text font-bold block my-2 text-sm border-l-2 border-blueprint-text pl-3 py-1 bg-blue-900/20">
                        It wasn’t a gamble, it was a gambit.
                    </strong>
                    I didn't just hope for a better outcome—I sacrificed a comfortable present to force a more powerful future."
                </div>
            </div>
        </>
    );
};

export default NavigationOverlay;
