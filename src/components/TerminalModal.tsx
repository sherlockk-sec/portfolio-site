import React, { useEffect, useState, useRef } from 'react';
import { X, Terminal, FastForward } from 'lucide-react';

interface TerminalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string[];
}

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, title, content }) => {
    const [displayedContent, setDisplayedContent] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isSkipped, setIsSkipped] = useState(false);

    // Refs for timeouts to clear them properly
    const typeTimeoutRef = useRef<number | null>(null);
    const lineTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            setDisplayedContent([]);
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setIsSkipped(false);
        }
    }, [isOpen]);

    const handleSkip = () => {
        setIsSkipped(true);
        setDisplayedContent([...content]);
        setCurrentLineIndex(content.length);
        if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
        if (lineTimeoutRef.current) clearTimeout(lineTimeoutRef.current);
    };

    useEffect(() => {
        if (!isOpen || isSkipped) return;

        if (currentLineIndex < content.length) {
            const line = content[currentLineIndex];

            if (currentCharIndex < line.length) {
                typeTimeoutRef.current = setTimeout(() => {
                    setDisplayedContent(prev => {
                        const newContent = [...prev];
                        if (newContent[currentLineIndex] === undefined) {
                            newContent[currentLineIndex] = '';
                        }
                        newContent[currentLineIndex] += line[currentCharIndex];
                        return newContent;
                    });
                    setCurrentCharIndex(prev => prev + 1);
                }, 10); // 3x speed (10ms)
            } else {
                lineTimeoutRef.current = setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentCharIndex(0);
                }, 100); // Faster line pause (100ms)
            }
        }

        return () => {
            if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
            if (lineTimeoutRef.current) clearTimeout(lineTimeoutRef.current);
        };
    }, [isOpen, currentLineIndex, currentCharIndex, content, isSkipped]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-blueprint-bg border border-blueprint-border w-full max-w-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] modal-animate m-4 flex flex-col max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-blueprint-border bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-blueprint-text" />
                        <span className="text-sm font-bold text-blueprint-text tracking-wider">{title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isSkipped && currentLineIndex < content.length && (
                            <button
                                onClick={handleSkip}
                                className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-white transition-colors border border-blue-900 bg-blue-900/20 px-2 py-0.5 rounded"
                            >
                                <FastForward size={10} /> SKIP
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-blueprint-text hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 font-mono text-sm overflow-y-auto flex-1">
                    {displayedContent.map((line, i) => (
                        <div key={i} className="mb-2 text-green-400 break-words">
                            <span className="text-blue-400 mr-2">$</span>
                            {line}
                        </div>
                    ))}
                    {!isSkipped && currentLineIndex < content.length && (
                        <span className="blink-cursor text-green-400"></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TerminalModal;
