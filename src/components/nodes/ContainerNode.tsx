import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Box, Layers, Code, Shield, Bug, Radio, Activity, Terminal, Server, Globe, Fingerprint, Users, FileSearch, Workflow, Siren, Search, Database } from 'lucide-react';
import NodeWrapper from '../NodeWrapper';

// Map icon string to Lucide component
const getIcon = (iconName: string) => {
    switch (iconName) {
        // VAPT
        case 'bug': return Bug;
        case 'radar': return Radio; // Radar approx
        case 'shield': return Shield;
        case 'activity': return Activity;
        case 'search': return Search;

        // SOC
        case 'siren': return Siren;
        case 'eye': return Activity; // Monitoring

        // Automation
        case 'workflow': return Workflow;
        case 'code': return Code;
        case 'terminal': return Terminal;

        // Infra
        case 'users': return Users;
        case 'server': return Server;
        case 'docker': return Box;
        case 'database': return Database;

        // Forensics
        case 'globe': return Globe;
        case 'fingerprint': return Fingerprint;
        case 'file': return FileSearch;

        // Default & Others
        case 'n8n': return Layers;
        case 'python': return Code;
        case 'security': return Shield;
        default: return Box;
    }
};

const ContainerNode: React.FC<NodeProps> = ({ data, selected }) => {
    const Icon = getIcon(data.icon as string);

    return (
        <NodeWrapper selected={selected} className="p-2 min-w-[100px] !bg-blueprint-bg/80 !border-dashed">
            <Handle type="target" position={Position.Top} className="!bg-blueprint-text !w-1 !h-1" style={{ opacity: 0 }} />

            <div className="flex items-center gap-2">
                <Icon size={16} className="text-blue-300" />
                <span className="text-xs font-mono text-blue-100">{data.label as string}</span>
            </div>

        </NodeWrapper>
    );
};

export default memo(ContainerNode);
