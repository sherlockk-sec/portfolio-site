import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Network } from 'lucide-react';
import NodeWrapper from '../NodeWrapper';

const SwitchNode: React.FC<NodeProps> = ({ data, selected }) => {
    return (
        <NodeWrapper selected={selected} label="CORE-SW-01" className="p-4 min-w-[150px]">
            <Handle type="target" position={Position.Top} className="!bg-blueprint-text !w-1 !h-1" />

            <div className="flex flex-col items-center gap-2">
                <div className="border border-blueprint-text/50 p-2 rounded-sm bg-blue-900/20">
                    <Network size={32} className="text-blueprint-text" />
                </div>
                <div className="text-center">
                    <div className="text-xs text-blue-400 font-bold tracking-widest uppercase">Identity</div>
                    <div className="text-sm font-bold text-white">{data.label as string}</div>
                    <div className="text-[10px] text-blue-300/70 mt-1">VLAN 1: ACTIVE</div>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} className="!bg-blueprint-text !w-1 !h-1" />
        </NodeWrapper>
    );
};

export default memo(SwitchNode);
