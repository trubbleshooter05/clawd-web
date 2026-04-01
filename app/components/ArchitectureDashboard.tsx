'use client';

import React, { useState } from "react";
import SystemDiagramSVG from "./SystemDiagramSVG";

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  color: string;
  responsibilities: string[];
  location: 'laptop' | 'macmini' | 'both';
}

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'monitoring';
  color: string;
  location: 'laptop' | 'macmini' | 'both';
  agents: string[];
}

const agents: Agent[] = [
  // Mac Mini Agents
  {
    id: 'greggles',
    name: 'Greggles',
    role: 'CEO & Strategist',
    model: 'gpt-4o-mini',
    color: '#8B5CF6',
    responsibilities: ['High-level strategy', 'Project oversight', 'Priority setting', 'Team alignment'],
    location: 'macmini',
  },
  {
    id: 'gary',
    name: 'Gary',
    role: 'Senior Coder',
    model: 'gpt-5.1-codex-mini',
    color: '#0EA5E9',
    responsibilities: ['Build automation scripts', 'Python logic', 'Bug fixes', 'Script improvements'],
    location: 'macmini',
  },
  {
    id: 'raquella',
    name: 'Raquella',
    role: 'Junior Coder',
    model: 'gpt-4o-mini',
    color: '#06B6D4',
    responsibilities: ['Support coding', 'Script execution', 'Testing', 'Documentation'],
    location: 'macmini',
  },
  {
    id: 'joyce',
    name: 'Joyce',
    role: 'Platform Researcher',
    model: 'gpt-4o-mini',
    color: '#10B981',
    responsibilities: ['Scan platforms', 'Identify opportunities', 'Pain point analysis', 'Research synthesis'],
    location: 'macmini',
  },
  {
    id: 'rico',
    name: 'Rico',
    role: 'Content Distributor',
    model: 'gpt-4o-mini',
    color: '#F59E0B',
    responsibilities: ['Content adaptation', 'Platform-ready posts', 'Multi-channel messaging', 'Distribution'],
    location: 'macmini',
  },
  {
    id: 'ralph',
    name: 'Ralph',
    role: 'Operations Manager',
    model: 'gpt-4o-mini',
    color: '#EF4444',
    responsibilities: ['Daily execution', 'Workflow management', 'Retry handling', 'Output delivery'],
    location: 'macmini',
  },
  {
    id: 'vinny',
    name: 'Vinny',
    role: 'Analyst',
    model: 'gpt-4o-mini',
    color: '#EC4899',
    responsibilities: ['Performance review', 'Pattern identification', 'Results analysis', 'Improvement recs'],
    location: 'macmini',
  },
  {
    id: 'luna',
    name: 'Luna',
    role: 'Visual Creator',
    model: 'DALL-E 3 HD',
    color: '#F97316',
    responsibilities: ['Generate visuals', 'Infographics', 'Creative assets', 'Campaign imagery'],
    location: 'macmini',
  },

  // Laptop Agents
  {
    id: 'vega',
    name: 'Vega',
    role: 'SEO Commander',
    model: 'gpt-4o-mini',
    color: '#8B5CF6',
    responsibilities: ['GSC data monitoring', 'CTR analysis', 'Keyword opportunities', 'Page prioritization'],
    location: 'laptop',
  },
  {
    id: 'dot',
    name: 'Dot',
    role: 'Analytics Brain',
    model: 'gpt-4o-mini',
    color: '#0EA5E9',
    responsibilities: ['GA4 monitoring', 'AdSense tracking', 'Revenue pace', 'Daily briefings'],
    location: 'laptop',
  },
  {
    id: 'milo',
    name: 'Milo',
    role: 'Retention Specialist',
    model: 'gpt-4o-mini',
    color: '#10B981',
    responsibilities: ['User engagement', 'Email sequences', 'Behavioral patterns', 'Onboarding optimization'],
    location: 'laptop',
  },
  {
    id: 'scout',
    name: 'Scout',
    role: 'Competitive Intel',
    model: 'gpt-4o-mini',
    color: '#F59E0B',
    responsibilities: ['Competitor monitoring', 'Market trends', 'Pricing analysis', 'Weekly digests'],
    location: 'laptop',
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'Content Scaler',
    model: 'gpt-4o-mini + DALL-E',
    color: '#EF4444',
    responsibilities: ['Page generation', 'Trending detection', 'Reddit signals', 'Autonomous commits'],
    location: 'laptop',
  },
];

const projects: Project[] = [
  {
    id: 'openclaw',
    name: 'OpenClaw',
    type: 'Agent Framework',
    status: 'active',
    color: '#8B5CF6',
    location: 'both',
    agents: ['greggles', 'gary', 'raquella', 'ralph'],
  },
  {
    id: 'hermes',
    name: 'Hermes',
    type: 'Research Agent',
    status: 'active',
    color: '#0EA5E9',
    location: 'macmini',
    agents: ['gary', 'raquella'],
  },
  {
    id: 'fursbliss',
    name: 'FursBliss',
    type: 'Web App (Supabase)',
    status: 'active',
    color: '#10B981',
    location: 'both',
    agents: ['joyce', 'milo', 'rico', 'vinny'],
  },
  {
    id: 'movieslike',
    name: 'movieslike.app',
    type: 'TMDB Content Hub',
    status: 'active',
    color: '#F59E0B',
    location: 'both',
    agents: ['vega', 'forge', 'joyce', 'vinny'],
  },
  {
    id: 'clawd-web',
    name: 'Clawd-Web',
    type: 'Next.js Dashboard',
    status: 'active',
    color: '#EF4444',
    location: 'laptop',
    agents: ['dot'],
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    type: 'Content Distribution',
    status: 'active',
    color: '#EC4899',
    location: 'macmini',
    agents: ['rico', 'ralph'],
  },
  {
    id: 'movies-app',
    name: 'Movies.app',
    type: 'macOS App',
    status: 'monitoring',
    color: '#F97316',
    location: 'macmini',
    agents: ['joyce'],
  },
];

export default function ArchitectureDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'projects' | 'dataflow'>('overview');

  const laptopAgents = agents.filter(a => a.location === 'laptop' || a.location === 'both');
  const macminiAgents = agents.filter(a => a.location === 'macmini' || a.location === 'both');

  const getAgent = (id: string) => agents.find(a => a.id === id);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏗️ OpenClaw System Architecture</h1>
        <p style={styles.subtitle}>
          Distributed automation across Laptop + Mac mini | {agents.length} agents | {projects.length} projects
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabs}>
        {(['overview', 'agents', 'projects', 'dataflow'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : styles.tabInactive),
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div style={styles.content}>
          {/* System Diagram */}
          <div style={styles.diagramSection}>
            <SystemDiagramSVG />
          </div>

          <div style={styles.systemGrid}>
            {/* Laptop Section */}
            <div style={styles.computerCard}>
              <div style={styles.computerHeader}>
                <h2 style={styles.computerTitle}>💻 Laptop</h2>
                <span style={styles.computerSubtitle}>Analysis & Intelligence</span>
              </div>
              <div style={styles.computerContent}>
                <div style={styles.agentsList}>
                  {laptopAgents.filter(a => a.location === 'laptop').map(agent => (
                    <div
                      key={agent.id}
                      style={{...styles.agentBadge, borderLeftColor: agent.color}}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <span style={styles.agentName}>{agent.name}</span>
                      <span style={{...styles.agentRole, color: agent.color}}>{agent.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mac Mini Section */}
            <div style={styles.computerCard}>
              <div style={styles.computerHeader}>
                <h2 style={styles.computerTitle}>🖥️ Mac mini (Openclaw)</h2>
                <span style={styles.computerSubtitle}>Execution & Automation</span>
              </div>
              <div style={styles.computerContent}>
                <div style={styles.agentsList}>
                  {macminiAgents.filter(a => a.location === 'macmini').map(agent => (
                    <div
                      key={agent.id}
                      style={{...styles.agentBadge, borderLeftColor: agent.color}}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <span style={styles.agentName}>{agent.name}</span>
                      <span style={{...styles.agentRole, color: agent.color}}>{agent.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shared Systems */}
          <div style={styles.sharedSection}>
            <h3 style={styles.sharedTitle}>🔗 Shared Infrastructure</h3>
            <div style={styles.sharedGrid}>
              <div style={styles.infrastructureCard}>
                <strong>Supabase</strong>
                <p>FursBliss database & auth</p>
              </div>
              <div style={styles.infrastructureCard}>
                <strong>Vercel Blob</strong>
                <p>Image storage & CDN</p>
              </div>
              <div style={styles.infrastructureCard}>
                <strong>Telegram</strong>
                <p>Agent communication</p>
              </div>
              <div style={styles.infrastructureCard}>
                <strong>Cron Jobs</strong>
                <p>Scheduled automation</p>
              </div>
            </div>
          </div>

          {/* Selected Agent Details */}
          {selectedAgent && (
            <AgentDetails agent={getAgent(selectedAgent)!} onClose={() => setSelectedAgent(null)} />
          )}
        </div>
      )}

      {activeTab === 'agents' && (
        <div style={styles.content}>
          <div style={styles.agentsGrid}>
            {agents.map(agent => (
              <div key={agent.id} style={{...styles.agentCard, borderTopColor: agent.color}}>
                <h3 style={styles.agentCardName}>{agent.name}</h3>
                <p style={{...styles.agentCardRole, color: agent.color}}>{agent.role}</p>
                <p style={styles.agentCardModel}>{agent.model}</p>
                <div style={styles.agentCardLocation}>
                  {agent.location === 'macmini' && '🖥️ Mac mini'}
                  {agent.location === 'laptop' && '💻 Laptop'}
                  {agent.location === 'both' && '🔗 Both'}
                </div>
                <div style={styles.responsibilitiesList}>
                  {agent.responsibilities.map((resp, i) => (
                    <div key={i} style={styles.responsibility}>• {resp}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div style={styles.content}>
          <div style={styles.projectsGrid}>
            {projects.map(project => (
              <div key={project.id} style={{...styles.projectCard, borderLeftColor: project.color}}>
                <div style={styles.projectHeader}>
                  <h3 style={styles.projectName}>{project.name}</h3>
                  <span style={{...styles.projectStatus, backgroundColor:
                    project.status === 'active' ? '#10B981' :
                    project.status === 'inactive' ? '#EF4444' : '#F59E0B'
                  }}>
                    {project.status}
                  </span>
                </div>
                <p style={styles.projectType}>{project.type}</p>
                <p style={styles.projectLocation}>
                  {project.location === 'macmini' && '🖥️ Mac mini'}
                  {project.location === 'laptop' && '💻 Laptop'}
                  {project.location === 'both' && '🔗 Both'}
                </p>
                <div style={styles.agentsList}>
                  <strong>Agents:</strong>
                  <div style={styles.projectAgents}>
                    {project.agents.map(agentId => {
                      const agent = getAgent(agentId);
                      return agent ? (
                        <span key={agentId} style={{...styles.projectAgent, backgroundColor: agent.color}}>
                          {agent.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dataflow' && (
        <div style={styles.content}>
          <DataFlowDiagram agents={agents} projects={projects} />
        </div>
      )}
    </div>
  );
}

interface AgentDetailsProps {
  agent: Agent;
  onClose: () => void;
}

function AgentDetails({ agent, onClose }: AgentDetailsProps) {
  return (
    <div style={styles.modal}>
      <div style={{...styles.modalContent, borderTopColor: agent.color}}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        <h2 style={{color: agent.color}}>{agent.name}</h2>
        <p><strong>Role:</strong> {agent.role}</p>
        <p><strong>Model:</strong> {agent.model}</p>
        <p><strong>Location:</strong>
          {agent.location === 'macmini' && ' 🖥️ Mac mini'}
          {agent.location === 'laptop' && ' 💻 Laptop'}
          {agent.location === 'both' && ' 🔗 Both'}
        </p>
        <div style={styles.responsibilitiesSection}>
          <h4>Responsibilities:</h4>
          {agent.responsibilities.map((resp, i) => (
            <div key={i} style={styles.responsibility}>✓ {resp}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DataFlowDiagramProps {
  agents: Agent[];
  projects: Project[];
}

function DataFlowDiagram({ agents, projects }: DataFlowDiagramProps) {
  return (
    <div style={styles.dataflowContainer}>
      <h2 style={styles.dataflowTitle}>Data & Communication Flow</h2>
      <div style={styles.dataflowContent}>
        <div style={styles.dataflowSection}>
          <h3>📊 Morning Cycle (8 AM Mac mini)</h3>
          <div style={styles.dataflowStep}>
            <span>Dot (Laptop)</span>
            <span style={{color: '#999'}}>→ Daily Analytics Briefing</span>
            <span>Gary (Mac mini)</span>
          </div>
          <div style={styles.dataflowStep}>
            <span>Joyce (Mac mini)</span>
            <span style={{color: '#999'}}>→ Research Synthesis</span>
            <span>Forge (Laptop)</span>
          </div>
        </div>

        <div style={styles.dataflowSection}>
          <h3>📱 Content Distribution Flow</h3>
          <div style={styles.dataflowStep}>
            <span>Luna (Mac mini)</span>
            <span style={{color: '#999'}}>→ Visual Assets</span>
            <span>Rico (Mac mini)</span>
          </div>
          <div style={styles.dataflowStep}>
            <span>Rico (Mac mini)</span>
            <span style={{color: '#999'}}>→ Formatted Posts</span>
            <span>Discord Bot / Ralph</span>
          </div>
        </div>

        <div style={styles.dataflowSection}>
          <h3>🔄 FursBliss Engagement Loop</h3>
          <div style={styles.dataflowStep}>
            <span>Milo (Laptop)</span>
            <span style={{color: '#999'}}>→ Supabase Queries</span>
            <span>User Behavior Data</span>
          </div>
          <div style={styles.dataflowStep}>
            <span>Milo (Laptop)</span>
            <span style={{color: '#999'}}>→ Email Drafts</span>
            <span>Rico (Mac mini Review)</span>
          </div>
        </div>

        <div style={styles.dataflowSection}>
          <h3>🎬 Movie Page Generation</h3>
          <div style={styles.dataflowStep}>
            <span>Forge (Laptop)</span>
            <span style={{color: '#999'}}>→ Trigger Generation</span>
            <span>Gary (Mac mini)</span>
          </div>
          <div style={styles.dataflowStep}>
            <span>Vega (Laptop)</span>
            <span style={{color: '#999'}}>→ SEO Signals</span>
            <span>Forge Priority Scoring</span>
          </div>
        </div>

        <div style={styles.dataflowSection}>
          <h3>⏰ Communication Channel</h3>
          <div style={{padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '6px'}}>
            <strong>Telegram Bots:</strong> Laptop ops channel vs Mac mini ops channel
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    backgroundColor: '#ffffff',
  } as React.CSSProperties,
  header: {
    marginBottom: '40px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '42px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '40px',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '16px',
    justifyContent: 'center',
  } as React.CSSProperties,
  tab: {
    padding: '8px 16px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
  } as React.CSSProperties,
  tabActive: {
    color: '#8B5CF6',
    borderBottom: '3px solid #8B5CF6',
  } as React.CSSProperties,
  tabInactive: {
    color: '#999',
  } as React.CSSProperties,
  content: {
    animation: 'fadeIn 0.3s',
  } as React.CSSProperties,
  systemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '32px',
    marginBottom: '40px',
  } as React.CSSProperties,
  computerCard: {
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#f9fafb',
  } as React.CSSProperties,
  computerHeader: {
    marginBottom: '24px',
  },
  computerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#1a1a1a',
  },
  computerSubtitle: {
    fontSize: '13px',
    color: '#666',
  },
  computerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  agentsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  agentBadge: {
    padding: '12px 16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  agentName: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  agentRole: {
    fontSize: '12px',
    fontWeight: '500',
  },
  sharedSection: {
    marginBottom: '40px',
  },
  sharedTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  sharedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,
  infrastructureCard: {
    padding: '16px',
    backgroundColor: '#f0f9ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    fontSize: '14px',
  } as React.CSSProperties,
  agentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,
  agentCard: {
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    borderTopWidth: '4px',
    borderTopStyle: 'solid',
  } as React.CSSProperties,
  agentCardName: {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#1a1a1a',
  },
  agentCardRole: {
    fontSize: '13px',
    fontWeight: '500',
    margin: '0 0 4px 0',
  },
  agentCardModel: {
    fontSize: '12px',
    color: '#999',
    margin: '0 0 8px 0',
  },
  agentCardLocation: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    marginBottom: '12px',
    padding: '4px 8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    width: 'fit-content',
  } as React.CSSProperties,
  responsibilitiesList: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.6',
  } as React.CSSProperties,
  responsibility: {
    marginBottom: '6px',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,
  projectCard: {
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: '#f9fafb',
    borderLeftWidth: '6px',
    borderLeftStyle: 'solid',
  } as React.CSSProperties,
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '12px',
  } as React.CSSProperties,
  projectName: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
    color: '#1a1a1a',
  },
  projectStatus: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#fff',
    textTransform: 'capitalize' as const,
  },
  projectType: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 8px 0',
  },
  projectLocation: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    margin: '0 0 12px 0',
  },
  projectAgents: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginTop: '8px',
  },
  projectAgent: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#fff',
  },
  dataflowContainer: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
  },
  dataflowTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 24px 0',
    color: '#1a1a1a',
  },
  dataflowContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
  } as React.CSSProperties,
  dataflowSection: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  } as React.CSSProperties,
  dataflowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px',
    marginTop: '12px',
    marginBottom: '12px',
  } as React.CSSProperties,
  diagramSection: {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    marginBottom: '40px',
    border: '1px solid #e5e7eb',
  } as React.CSSProperties,
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative' as const,
    borderTopWidth: '6px',
    borderTopStyle: 'solid' as const,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
  } as React.CSSProperties,
  closeButton: {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
  },
  responsibilitiesSection: {
    marginTop: '16px',
  },
};
