import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import NodeWrapper from '../NodeWrapper';

const LanguageNode: React.FC<NodeProps> = ({ data, selected }) => {
    return (
        <NodeWrapper selected={selected} className="p-2 min-w-[120px] !bg-blueprint-bg/90 !border-blue-400/50">
            <Handle type="target" position={Position.Top} className="!bg-blueprint-text !w-1 !h-1" />

            <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-green-400" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{data.label as string}</span>
                    <span className="text-[9px] text-blue-300">{data.level as string}</span>
                </div>
            </div>
        </NodeWrapper>
    );
};

export default memo(LanguageNode);
