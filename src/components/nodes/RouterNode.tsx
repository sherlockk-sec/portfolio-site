import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import {
    Router as RouterIcon,
    Bug,
    Shield,
    Server,
    Users,
    Search,
    Globe,
    Fingerprint,
    Workflow,
    Terminal,
    Radar,
    Siren,
    Code,
    Box
} from 'lucide-react';
import NodeWrapper from '../NodeWrapper';

const RouterNode: React.FC<NodeProps> = ({ data, selected }) => {

    const getIcon = (name: string) => {
        switch (name) {
            case 'bug': return Bug;
            case 'shield': return Shield;
            case 'server': return Server;
            case 'users': return Users;
            case 'search': return Search;
            case 'globe': return Globe;
            case 'fingerprint': return Fingerprint;
            case 'workflow': return Workflow;
            case 'terminal': return Terminal;
            case 'radar': return Radar;
            case 'siren': return Siren;
            case 'code': return Code;
            case 'docker': return Box;
            default: return RouterIcon;
        }
    };

    const Icon = data.icon ? getIcon(data.icon as string) : RouterIcon;
    const showProgress = data.showProgress === true;

    return (
        <NodeWrapper selected={selected} label={data.subLabel as string || "GATEWAY"} className="p-4 min-w-[200px]">
            <Handle type="target" position={Position.Top} className="!bg-blueprint-text !w-1 !h-1" />

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    {/* Render Icon dynamically */}
                    <Icon size={24} className="text-blueprint-text" />
                    <div className="flex flex-col">
                        {/* Only show heading if provided */}
                        {(data.heading as string) && <span className="text-xs text-blue-400 font-bold tracking-wider uppercase">{data.heading as string}</span>}
                        <span className="text-sm font-bold text-white">{data.label as string}</span>
                    </div>
                </div>

                {/* Progress Bar - Only if showProgress is true */}
                {showProgress && (
                    <div className="w-full">
                        <div className="flex justify-between text-[10px] text-blue-300 mb-1">
                            <span>SYNC STATUS</span>
                            <span>{data.progress as number}%</span>
                        </div>
                        <div className="h-2 w-full bg-blue-900/30 rounded-full border border-blue-900 overflow-hidden">
                            <div
                                className="h-full bg-blueprint-text relative"
                                style={{ width: `${data.progress as number}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-blueprint-text !w-1 !h-1" />
        </NodeWrapper>
    );
};

export default memo(RouterNode);
