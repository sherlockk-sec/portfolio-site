import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Server } from 'lucide-react';
import NodeWrapper from '../NodeWrapper';

const ServerNode: React.FC<NodeProps> = ({ data, selected }) => {
    return (
        <NodeWrapper selected={selected} label="SRV-NODE" className="p-4 min-w-[180px]">
            <Handle type="target" position={Position.Top} className="!bg-blueprint-text !w-1 !h-1" />

            <div className="flex items-start gap-3">
                <Server size={24} className="text-blueprint-text mt-1" />
                <div className="flex flex-col">
                    <span className="text-xs text-blue-400 font-bold tracking-wider uppercase">{data.category as string || 'Experience'}</span>
                    <span className="text-sm font-bold text-white">{data.label as string}</span>
                    {(data.subLabel as string) && (
                        <span className="text-[10px] text-blue-300 mt-1">{data.subLabel as string}</span>
                    )}
                    <div className="mt-2 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[9px] text-green-500 uppercase">Online</span>
                    </div>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-blueprint-text !w-1 !h-1" />
        </NodeWrapper>
    );
};

export default memo(ServerNode);
