import React, { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { LayoutGrid } from 'lucide-react';

const GhostNode: React.FC<NodeProps> = () => {
    return (
        <div className="opacity-10 pointer-events-none p-4 border border-blue-500/30 rounded flex flex-col items-center justify-center gap-2">
            <LayoutGrid size={40} className="text-blue-500" />
            <div className="w-16 h-1 bg-blue-500/30 rounded"></div>
            <div className="w-12 h-1 bg-blue-500/30 rounded"></div>
        </div>
    );
};

export default memo(GhostNode);
