import React, { memo } from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';

const DataEdge: React.FC<EdgeProps> = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: '#1e3a8a', strokeWidth: 1 }} />
            <g>
                <circle r="2" fill="#64ffda">
                    <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
                </circle>
                <circle r="2" fill="#64ffda">
                    <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path={edgePath} />
                </circle>
            </g>
        </>
    );
};

export default memo(DataEdge);
