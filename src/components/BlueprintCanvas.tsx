import React, { useState, useCallback } from 'react';
import { Lock, Unlock } from 'lucide-react';
import {
    ReactFlow,
    Controls,
    ControlButton,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow,
} from '@xyflow/react';
import type {
    Connection,
    Edge,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import SwitchNode from './nodes/SwitchNode';
import ServerNode from './nodes/ServerNode';
import ContainerNode from './nodes/ContainerNode';
import RouterNode from './nodes/RouterNode';
import DataEdge from './edges/DataEdge';
import TerminalModal from './TerminalModal';

import NavigationOverlay from './ui/NavigationOverlay';

const nodeTypes = {
    switch: SwitchNode,
    server: ServerNode,
    container: ContainerNode,
    router: RouterNode,
};

const edgeTypes = {
    data: DataEdge,
};

// ---------------------------------------------------------------------
// LAYOUT CONSTANTS
// ---------------------------------------------------------------------
// Central Skills Hub at (0, 600)
// Categories spaced horizontally relative to Skills Hub

const initialNodes: Node[] = [
    // CPU & Bridges
    { id: 'switch-1', type: 'switch', position: { x: 0, y: 0 }, data: { label: 'Karthikeyan S' } },
    // ---------------------------------------------------------
    // NORTH BRIDGE (Certifications)
    // ---------------------------------------------------------
    {
        id: 'router-ceh',
        type: 'router',
        position: { x: 0, y: -250 },
        data: {
            label: 'CEH v12',
            heading: 'CERTIFICATION',
            progress: 100,
            modalTitle: 'Certification Details',
            modalContent: [
                'Metric: Score 111/125 (88.8%)',
                'Issuer: EC-Council',
                '--------------------------------------------------',
                'Demonstrated comprehensive mastery of offensive security principles and penetration testing methodologies.'
            ]
        },
    },

    // ---------------------------------------------------------
    // WEST BRIDGE (Education)
    // ---------------------------------------------------------
    {
        id: 'server-vit',
        type: 'server',
        position: { x: -400, y: 0 },
        data: {
            label: 'VIT Bhopal',
            category: 'EDUCATION',
            subLabel: 'M.Tech CSE',
            modalTitle: 'Academic Transcript',
            modalContent: [
                'CGPA: 7.09/10.0',
                'Integrated M.Tech Computer Science (Cybersecurity)',
                '--------------------------------------------------',
                'Relevant Coursework:',
                '- Penetration Testing & Red Teaming',
                '- Digital Forensic Analysis',
                '- Artificial Intelligence',
                '- Capture The Flag (CTF) Challenges',
                'Status: Active Student'
            ]
        },
    },

    // ---------------------------------------------------------
    // EAST BRIDGE (Work Experience)
    // ---------------------------------------------------------
    {
        id: 'server-tevel',
        type: 'server',
        position: { x: 400, y: 0 },
        data: {
            label: 'Tevel Cyber Corps',
            category: 'EXPERIENCE',
            subLabel: 'Cybersecurity Intern',
            modalTitle: 'Experience Record',
            modalContent: [
                'Role: Cybersecurity Intern (Oct 2025 - Jan 2026)',
                '--------------------------------------------------',
                '> Executed DDoS Penetration Testing & Web App VAPT.',
                '> Designed Security Automation workflows using n8n.',
                '> Managed SOC Operations with Wazuh SIEM.',
                '> Performed Real-time Log Monitoring & Incident Response.',
                '> Conducted Root Cause Analysis (RCA) & Documentation.',
                '> Configured Fortinet Firewalls & Proxmox Environments.'
            ]
        },
    },

    // ---------------------------------------------------------
    // SOUTH BRIDGE (Projects)
    // ---------------------------------------------------------
    {
        id: 'server-homelab',
        type: 'server',
        position: { x: 0, y: 300 },
        data: {
            label: 'Homelab Cluster',
            category: 'PROJECT',
            subLabel: 'Infrastructure',
            modalTitle: 'Project Details',
            modalContent: [
                'Project: Cybersecurity Homelab & Infrastructure',
                'Technologies: Proxmox VE, Docker, Tailscale, Linux',
                '--------------------------------------------------',
                '> Architected bare-metal virtualization cluster (Proxmox/OMV).',
                '> Deployed centralized NAS with automated remote backups.',
                '> Engineered secure remote access via Tailscale Subnet Routing.',
                '> Maintained 24/7 headless uptime for containerized services.',
                '> Services: Uptime Kuma, Jellyfin, Portainer.'
            ]
        },
    },

    // ---------------------------------------------------------
    // LANGUAGES (Diagonal South-East)
    // ---------------------------------------------------------
    {
        id: 'server-lang',
        type: 'server',
        position: { x: 250, y: 150 },
        data: {
            label: 'Languages',
            category: 'COMMUNICATION',
            subLabel: 'Polyglot',
            modalTitle: 'Language Proficiency',
            modalContent: [
                'English: Fluent (Professional)',
                'Tamil: Native (Fluent)',
                'Japanese: Basic (Learning)'
            ]
        },
    },

    // ---------------------------------------------------------
    // SKILLS HUB
    // ---------------------------------------------------------
    { id: 'router-skills', type: 'router', position: { x: 0, y: 600 }, data: { label: 'SKILLS HUB', subLabel: 'MAIN NODE' } },

    // ---------------------------------------------------------
    // CATEGORY ROUTERS
    // ---------------------------------------------------------
    // VAPT (Left-Far)
    { id: 'cat-vapt', type: 'router', position: { x: -600, y: 750 }, data: { label: 'VAPT & SECURITY', subLabel: 'DOMAIN', icon: 'shield' } },
    // SOC (Left-Mid)
    { id: 'cat-soc', type: 'router', position: { x: -300, y: 750 }, data: { label: 'SOC & OPS', subLabel: 'DOMAIN', icon: 'siren' } },
    // AUTOMATION (Center)
    { id: 'cat-auto', type: 'router', position: { x: 0, y: 750 }, data: { label: 'AUTOMATION', subLabel: 'DOMAIN', icon: 'workflow' } },
    // INFRA (Right-Mid)
    { id: 'cat-infra', type: 'router', position: { x: 300, y: 750 }, data: { label: 'INFRASTRUCTURE', subLabel: 'DOMAIN', icon: 'server' } },
    // FORENSICS (Right-Far)
    { id: 'cat-foren', type: 'router', position: { x: 600, y: 750 }, data: { label: 'FORENSICS', subLabel: 'DOMAIN', icon: 'search' } },
];

const skillNodes: Node[] = [
    // VAPT Skills (Relative to cat-vapt)
    { id: 's-burp', type: 'container', position: { x: -60, y: 110 }, data: { label: 'Burp Suite', icon: 'bug' }, parentId: 'cat-vapt' },
    { id: 's-nmap', type: 'container', position: { x: 60, y: 110 }, data: { label: 'Nmap', icon: 'radar' }, parentId: 'cat-vapt' },
    { id: 's-nessus', type: 'container', position: { x: -60, y: 160 }, data: { label: 'Nessus', icon: 'search' }, parentId: 'cat-vapt' },
    { id: 's-meta', type: 'container', position: { x: 60, y: 160 }, data: { label: 'Metasploit', icon: 'shield' }, parentId: 'cat-vapt' },
    { id: 's-blood', type: 'container', position: { x: -60, y: 210 }, data: { label: 'Bloodhound', icon: 'radar' }, parentId: 'cat-vapt' },
    { id: 's-wire', type: 'container', position: { x: 60, y: 210 }, data: { label: 'Wireshark', icon: 'activity' }, parentId: 'cat-vapt' },

    // SOC Skills
    { id: 's-wazuh', type: 'container', position: { x: 0, y: 110 }, data: { label: 'Wazuh SIEM', icon: 'shield' }, parentId: 'cat-soc' },
    { id: 's-ir', type: 'container', position: { x: 0, y: 160 }, data: { label: 'Incident Resp', icon: 'siren' }, parentId: 'cat-soc' },
    { id: 's-rca', type: 'container', position: { x: 0, y: 210 }, data: { label: 'RCA', icon: 'search' }, parentId: 'cat-soc' },

    // Automation Skills
    { id: 's-n8n', type: 'container', position: { x: 0, y: 110 }, data: { label: 'n8n', icon: 'workflow' }, parentId: 'cat-auto' },
    { id: 's-py', type: 'container', position: { x: 0, y: 160 }, data: { label: 'Python', icon: 'code' }, parentId: 'cat-auto' },
    { id: 's-bash', type: 'container', position: { x: 0, y: 210 }, data: { label: 'Bash', icon: 'terminal' }, parentId: 'cat-auto' },

    // Infrastructure Skills
    { id: 's-ad', type: 'container', position: { x: 60, y: 110 }, data: { label: 'Active Dir', icon: 'users' }, parentId: 'cat-infra' },
    { id: 's-prox', type: 'container', position: { x: -60, y: 110 }, data: { label: 'Proxmox', icon: 'server' }, parentId: 'cat-infra' },
    { id: 's-forti', type: 'container', position: { x: 60, y: 160 }, data: { label: 'Fortinet', icon: 'shield' }, parentId: 'cat-infra' },
    { id: 's-docker', type: 'container', position: { x: -60, y: 160 }, data: { label: 'Docker', icon: 'docker' }, parentId: 'cat-infra' },
    { id: 's-lin', type: 'container', position: { x: 60, y: 210 }, data: { label: 'Linux (Kali)', icon: 'terminal' }, parentId: 'cat-infra' },
    { id: 's-win', type: 'container', position: { x: -60, y: 210 }, data: { label: 'Win Server', icon: 'server' }, parentId: 'cat-infra' },

    // Forensics Skills
    { id: 's-mal', type: 'container', position: { x: -60, y: 110 }, data: { label: 'Maltego', icon: 'radar' }, parentId: 'cat-foren' },
    { id: 's-osint', type: 'container', position: { x: 60, y: 110 }, data: { label: 'OSINT', icon: 'globe' }, parentId: 'cat-foren' },
    { id: 's-df', type: 'container', position: { x: -60, y: 160 }, data: { label: 'Forensics', icon: 'fingerprint' }, parentId: 'cat-foren' },
    { id: 's-auto', type: 'container', position: { x: 60, y: 160 }, data: { label: 'Autopsy', icon: 'file' }, parentId: 'cat-foren' },
];

const initialEdges: Edge[] = [
    // Core Bus
    { id: 'bus-north', source: 'switch-1', target: 'router-ceh', type: 'data', animated: true },
    { id: 'bus-west', source: 'switch-1', target: 'server-vit', type: 'data', animated: true },
    { id: 'bus-east', source: 'switch-1', target: 'server-tevel', type: 'data', animated: true },
    { id: 'bus-south', source: 'switch-1', target: 'server-homelab', type: 'data', animated: true },

    // Language Link
    { id: 'bus-lang', source: 'switch-1', target: 'server-lang', type: 'data', animated: true },

    // Skills Hub Link
    { id: 'bus-skills', source: 'server-homelab', target: 'router-skills', type: 'data', animated: true },

    // Category Links
    { id: 'l-cat-1', source: 'router-skills', target: 'cat-vapt', type: 'data' },
    { id: 'l-cat-2', source: 'router-skills', target: 'cat-soc', type: 'data' },
    { id: 'l-cat-3', source: 'router-skills', target: 'cat-auto', type: 'data' },
    { id: 'l-cat-4', source: 'router-skills', target: 'cat-infra', type: 'data' },
    { id: 'l-cat-5', source: 'router-skills', target: 'cat-foren', type: 'data' },

    // Skill Sub-links (VAPT)
    { id: 'l-v-1', source: 'cat-vapt', target: 's-burp', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-v-2', source: 'cat-vapt', target: 's-nmap', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-v-3', source: 'cat-vapt', target: 's-nessus', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-v-4', source: 'cat-vapt', target: 's-meta', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-v-5', source: 'cat-vapt', target: 's-blood', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-v-6', source: 'cat-vapt', target: 's-wire', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },

    // SOC
    { id: 'l-soc-1', source: 'cat-soc', target: 's-wazuh', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-soc-2', source: 'cat-soc', target: 's-ir', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-soc-3', source: 'cat-soc', target: 's-rca', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },

    // Auto
    { id: 'l-a-1', source: 'cat-auto', target: 's-n8n', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-a-2', source: 'cat-auto', target: 's-py', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-a-3', source: 'cat-auto', target: 's-bash', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },

    // Infra
    { id: 'l-i-1', source: 'cat-infra', target: 's-ad', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-i-2', source: 'cat-infra', target: 's-prox', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-i-3', source: 'cat-infra', target: 's-forti', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-i-4', source: 'cat-infra', target: 's-docker', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-i-5', source: 'cat-infra', target: 's-lin', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-i-6', source: 'cat-infra', target: 's-win', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },

    // Forensics
    { id: 'l-f-1', source: 'cat-foren', target: 's-mal', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-f-2', source: 'cat-foren', target: 's-osint', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-f-3', source: 'cat-foren', target: 's-df', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
    { id: 'l-f-4', source: 'cat-foren', target: 's-auto', type: 'step', style: { strokeWidth: 1, strokeDasharray: '5,5', opacity: 0.3 } },
];

const BlueprintCanvas: React.FC = () => {
    // Removed ghostNodes from state to improve zoom behavior
    const [nodes, , onNodesChange] = useNodesState([...initialNodes, ...skillNodes]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { fitView, setCenter } = useReactFlow();

    // Initial Welcome Message
    React.useEffect(() => {
        setTimeout(() => {
            setModalData({
                title: 'TERMINAL v2.0.4',
                content: [
                    '$ ssh guest@karthikeyan-portfolio',
                    '> [OK] Connection established.',
                    '> Initializing Motherboard Architecture...',
                    '> ACCESS GRANTED.'
                ]
            });
            setIsModalOpen(true);
        }, 1500); // 1.5s delay to let the map animation finish first
    }, []);

    const [isLocked, setIsLocked] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', content: [] as string[] });

    const handleNavigation = (section: string) => {
        let targetId = '';
        switch (section) {
            case 'home': targetId = 'switch-1'; break;
            case 'experience': targetId = 'server-tevel'; break;
            case 'projects': targetId = 'server-homelab'; break;
            case 'certifications': targetId = 'router-ceh'; break;
            case 'skills': targetId = 'router-skills'; break;
        }

        if (section === 'skills') {
            // Widen zoom for the large skills cluster
            setCenter(0, 750, { zoom: 0.9, duration: 1000 });
            return;
        }

        const targetNode = nodes.find(n => n.id === targetId);
        if (targetNode) {
            // Zoom in tighter (1.5) now that map is smaller
            setCenter(targetNode.position.x, targetNode.position.y, { zoom: 1.5, duration: 800 });
        } else {
            if (section === 'home') fitView({ duration: 800 });
        }
    };

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = (_: React.MouseEvent, node: Node) => {
        // Generic check for any node with modal content
        if (node.data.modalContent) {
            setModalData({
                title: node.data.modalTitle as string || 'System Log',
                content: node.data.modalContent as string[]
            });
            setIsModalOpen(true);
        }
    };

    // Initial View: Center on Main Node (0,0) with slight zoom
    React.useEffect(() => {
        setTimeout(() => {
            setCenter(0, 0, { zoom: 1.1, duration: 1000 });
        }, 100);
    }, [setCenter]);

    return (
        <div className="w-screen h-screen bg-blueprint-bg relative">
            <NavigationOverlay onNavigate={handleNavigation} />

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className="blueprint-cursor"
                defaultEdgeOptions={{ type: 'data' }}
                connectionLineStyle={{ stroke: '#64ffda' }}
                onNodeClick={onNodeClick}
                minZoom={0.5}
                maxZoom={2}
                nodesDraggable={!isLocked}
            >
                <Background
                    color="#1e3a8a"
                    gap={40}
                    size={1}
                    variant={BackgroundVariant.Lines}
                    className="opacity-20"
                />
                <Controls position="bottom-right" showInteractive={false} className="!bg-blueprint-bg !border-blueprint-border">
                    <ControlButton onClick={() => setIsLocked(!isLocked)} title={isLocked ? "Unlock Layout" : "Lock Layout"}>
                        {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                    </ControlButton>
                </Controls>
            </ReactFlow>

            <TerminalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalData.title}
                content={modalData.content}
            />
        </div>
    );
};

export default BlueprintCanvas;
