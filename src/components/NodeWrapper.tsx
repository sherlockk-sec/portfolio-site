import React from 'react';
// import { Handle, Position } from '@xyflow/react'; // Not used here

interface NodeWrapperProps {
    children: React.ReactNode;
    selected?: boolean;
    className?: string;
    label?: string; // Top label like "SWITCH-01"
}

const NodeWrapper: React.FC<NodeWrapperProps> = ({ children, selected, className = '', label }) => {
    return (
        <div
            className={`
        relative bg-blueprint-bg/90 
        border border-blueprint-border 
        text-blueprint-text 
        shadow-[0_0_10px_rgba(30,58,138,0.3)] 
        hover:shadow-[0_0_20px_rgba(100,255,218,0.4)]
        hover:border-blueprint-text
        transition-all duration-300
        group
        ${selected ? 'border-blueprint-text shadow-[0_0_15px_rgba(100,255,218,0.5)]' : ''}
        ${className}
      `}
        >
            {/* Decorative corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blueprint-text opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-blueprint-text opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-blueprint-text opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-blueprint-text opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Label Tag */}
            {label && (
                <div className="absolute -top-3 left-2 px-1 bg-blueprint-bg border border-blueprint-border text-[10px] text-blueprint-text opacity-80">
                    {label}
                </div>
            )}

            {children}
        </div>
    );
};

export default NodeWrapper;
