'use client';

import React, { useState } from 'react';
import SystemDiagramSVG from './SystemDiagramSVG';

interface SkillDomain {
  id: string;
  name: string;
  color: string;
  skills: string[];
  schedule: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'monitoring' | 'paused';
  priority: boolean;
  color: string;
  repo: string;
  obsidian: string;
  cronJobs: string[];
  goal: string;
}

interface CronJob {
  time: string;
  name: string;
  skill?: string;
  enabled: boolean;
}

interface HermesPath {
  path: string;
  description: string;
}

interface ObsidianPath {
  path: string;
  description: string;
}

const HERMES_PATHS: HermesPath[] = [
  { path: '~/.hermes', description: 'Root — gateway, state, sessions' },
  { path: '~/.hermes/hermes-agent', description: 'Hermes Agent CLI package' },
  { path: '~/.hermes/hermes-agent/.venv/bin/hermes', description: 'Main executable' },
  { path: '~/.hermes/skills', description: '59 skill packages (SKILL.md + scripts)' },
  { path: '~/.hermes/cron/jobs.json', description: 'Single scheduler — user crontab removed' },
  { path: '~/.hermes/config.yaml', description: 'Model, toolsets, gateway config' },
  { path: '~/.hermes/.env', description: 'LINEAR_API_KEY, TELEGRAM_*, API keys' },
  { path: '~/.hermes/logs', description: 'gateway.log · gateway.error.log · cron logs' },
  { path: '~/.hermes/scripts', description: 'linear_dashboard.py · hermes_master_check.py · run_with_logging' },
  { path: '~/.hermes/hermes_run.py', description: 'Gateway wrapper — injects context + logs runs' },
  { path: '~/.hermes/kanban_runner.sh', description: 'Allowlisted safe queue runner (--next)' },
  { path: '~/.hermes/obsidian_daily_sync.py', description: '9 PM daily vault sync' },
  { path: '~/.hermes/results/', description: 'Script output fallback (prefer Obsidian)' },
  { path: '~/Library/LaunchAgents/ai.hermes.gateway.plist', description: 'launchd gateway — always-on' },
  { path: '~/venv/bin/python3', description: 'Python 3.11 for scripts (not system 3.9)' },
];

const OBSIDIAN_PATHS: ObsidianPath[] = [
  { path: '~/ObsidianVault', description: 'Master knowledge vault — memory layer' },
  { path: '~/ObsidianVault/hermes_system', description: 'Orchestration, SaaS ops, reports' },
  { path: '~/ObsidianVault/hermes_system/orchestration/agent_orchestration_kanban.md', description: 'Daily command center / dashboard' },
  { path: '~/ObsidianVault/hermes_system/saas_ops/operator_briefs', description: 'Daily operator briefs' },
  { path: '~/ObsidianVault/hermes_system/orchestration/kanban_queue.md', description: 'Safe autonomous task queue' },
  { path: '~/ObsidianVault/hermes_system/saas_ops/backlink_crm', description: 'Backlink opportunity CRM' },
  { path: '~/ObsidianVault/seo-chief/03_data/keyword_warehouse', description: 'Central keyword warehouse' },
  { path: '~/ObsidianVault/cardsnap', description: 'CardSnap growth intel + UGC + ads' },
  { path: '~/ObsidianVault/fursbliss', description: 'FursBliss campaign + pet_symptom_content' },
  { path: '~/ObsidianVault/logs/automation_runs.md', description: 'Full execution history log' },
];

const skillDomains: SkillDomain[] = [
  {
    id: 'seo',
    name: 'SEO & Content',
    color: '#8B5CF6',
    skills: ['movieslike-vega', 'movieslike-forge', 'movieslike-link', 'seo-chief', 'seo-batch', 'geo-monitor', 'cardsnap-seo-daily'],
    schedule: '6 AM Vega · 7 AM Forge · 7:05 SEO Chief · 11 PM batch',
    description: 'GSC monitoring, page generation, affiliate links, nightly SEO batch, GEO health checks across all properties.',
  },
  {
    id: 'growth',
    name: 'Growth Intel',
    color: '#EF4444',
    skills: ['citelens-growth-intel', 'cardsnap-growth-intel', 'cardsnap-signal-hunter', 'cardsnap-reddit-grader', 'cardsnap-content-gen', 'cardsnap-script'],
    schedule: '7:30 AM CardSnap UGC · 9:20 AM CiteLens UGC · 3× Reddit grader',
    description: 'Income-priority pipelines. UGC daily packs, Remotion videos, signal hunting, Reddit reply templates.',
  },
  {
    id: 'fursbliss',
    name: 'FursBliss Social',
    color: '#10B981',
    skills: ['fursbliss-campaign', 'fursbliss-dalle', 'fursbliss-social', 'pet-symptom-content-ideas'],
    schedule: '9 AM campaign · 9:30 DALL-E · 10 AM IG/FB post · 9:15 symptom ideas',
    description: 'Daily social automation — copy generation, DALL-E images, Meta Graph API posting, symptom SEO ideas.',
  },
  {
    id: 'research',
    name: 'Research & Intel',
    color: '#F59E0B',
    skills: ['demand-scout', 'market-intel', 'movieslike-amp', 'movieslike-rev', 'job-hunter'],
    schedule: '8 AM + 6 PM demand scout · 11 AM market intel',
    description: 'Cross-business demand research, market intelligence, Reddit seeding drafts, revenue optimization.',
  },
  {
    id: 'ops',
    name: 'Ops & Health',
    color: '#0EA5E9',
    skills: ['hermes-saas-ops', 'hermes-master-doctor', 'friday-metrics-sync', 'geo-monitor', 'daily-sync', 'productivity/linear'],
    schedule: '7:15 GEO monitor · 10:15 build checks · Fri 7:30 PM metrics · 9 PM Obsidian sync',
    description: 'System health, operator briefs, keyword warehouse aggregation, Linear issue tracking, nightly doctor.',
  },
];

const LINEAR_RULES = [
  'Create HER issue (In Progress) before fixing Hermes/cron/gateway bugs',
  'Reopen existing issue on recurrence — never duplicate (HER-6 vs HER-19)',
  'Close only after same-day verify: hermes_master_check.py PASS',
  'Commit messages must include HER-N identifier',
];

const DEV_TOOLS = [
  { name: 'Cursor', config: '~/.cursor/mcp.json + rules', linear: 'Linear MCP — auto-creates HER issues' },
  { name: 'Claude Code', config: '~/.claude/CLAUDE.md', linear: 'Linear MCP connected' },
  { name: 'Codex', config: '~/.codex/config.yaml', linear: 'Linear MCP connected' },
  { name: 'Cowork', config: 'claude.ai', linear: 'Linear MCP connected' },
];

interface PersonaAlias {
  persona: string;
  role: string;
  mapsTo: string;
  model: string;
  status: 'active' | 'legacy';
}

const PERSONA_ALIASES: PersonaAlias[] = [
  { persona: 'Vega', role: 'SEO Commander', mapsTo: 'movieslike-vega · seo-chief · geo-monitor', model: 'Hermes gpt-4o-mini + GSC scripts', status: 'active' },
  { persona: 'Forge', role: 'Content Scaler', mapsTo: 'movieslike-forge · seo-batch', model: 'Hermes gpt-4o-mini + Python/npm scripts', status: 'active' },
  { persona: 'Dot', role: 'Analytics Brain', mapsTo: 'friday-metrics-sync · morning-brief', model: 'Hermes gpt-4o-mini', status: 'active' },
  { persona: 'Scout', role: 'Competitive Intel', mapsTo: 'demand-scout · market-intel · cardsnap-signal-hunter', model: 'Hermes gpt-4o-mini', status: 'active' },
  { persona: 'Milo', role: 'Retention Specialist', mapsTo: 'fursbliss-campaign · pet-symptom-content-ideas', model: 'Hermes gpt-4o-mini', status: 'active' },
  { persona: 'Luna', role: 'Visual Creator', mapsTo: 'fursbliss-dalle', model: 'gpt-image-1 (not chat LLM)', status: 'active' },
  { persona: 'Rico', role: 'Content Distributor', mapsTo: 'fursbliss-social · movieslike-amp · movieslike-link', model: 'Hermes gpt-4o-mini + Meta API scripts', status: 'active' },
  { persona: 'Vinny', role: 'Analyst', mapsTo: 'hermes-saas-ops · movieslike-rev · friday-metrics-sync', model: 'Hermes gpt-4o-mini', status: 'active' },
  { persona: 'Ralph', role: 'Operations Manager', mapsTo: 'build-checks · obsidian-daily-sync · kanban_runner', model: 'Scripts + Hermes orchestration', status: 'active' },
  { persona: 'Gary', role: 'Senior Coder', mapsTo: 'movieslike-forge execution · build_checks_cron.sh', model: 'Was gpt-5.1-codex-mini (diagram only)', status: 'legacy' },
  { persona: 'Raquella', role: 'Junior Coder', mapsTo: 'Support scripts · UGC shell pipelines', model: 'Was gpt-4o-mini (diagram only)', status: 'legacy' },
  { persona: 'Joyce', role: 'Platform Researcher', mapsTo: 'demand-scout · market-intel · cardsnap-signal-hunter', model: 'Merged into Scout skills', status: 'legacy' },
  { persona: 'Greggles', role: 'CEO & Strategist', mapsTo: 'Freedom 50 review · operator briefs · Linear HER', model: 'Human + weekly LLM prompt', status: 'legacy' },
];

const RUNTIME_STATS = {
  gatewayProcesses: 1,
  totalCronJobs: 45,
  enabledCronJobs: 36,
  pausedCronJobs: 9,
  uniqueActiveSkills: 17,
  hermesModel: 'gpt-4o-mini',
  hermesProvider: 'OpenAI API (api.openai.com/v1)',
  imageModel: 'gpt-image-1',
  scriptModels: 'gpt-4o-mini (CardSnap SEO) · gpt-4o (some FursBliss SEO batch paths)',
};

const projects: Project[] = [
  {
    id: 'citelens',
    name: 'CiteLens',
    domain: 'citelens.com',
    status: 'active',
    priority: true,
    color: '#EF4444',
    repo: '~/projects/CiteLens',
    obsidian: '~/ObsidianVault/projects/citelens',
    cronJobs: ['Daily CiteLens UGC Pack (9:20 AM)'],
    goal: 'GEO audit leads · AI citation visibility · early access',
  },
  {
    id: 'cardsnap',
    name: 'CardSnap',
    domain: 'getsnapcard.com',
    status: 'active',
    priority: true,
    color: '#EF4444',
    repo: '~/projects/cardsnap',
    obsidian: '~/ObsidianVault/cardsnap',
    cronJobs: ['UGC Daily (7:30 AM)', 'Reddit Grader (3×)', 'Signal Hunter (M/W/F)', 'SEO Daily (M/T/Th)'],
    goal: 'Grading ROI decisions · analyzer flow · collector acquisition',
  },
  {
    id: 'fursbliss',
    name: 'FursBliss',
    domain: 'fursbliss.com',
    status: 'active',
    priority: false,
    color: '#10B981',
    repo: '~/projects/fursbliss',
    obsidian: '~/ObsidianVault/fursbliss',
    cronJobs: ['Campaign (9 AM)', 'DALL-E (9:30 AM)', 'Social (10 AM)', 'Pet Symptom Ideas (9:15 AM)'],
    goal: 'Pet health engagement · symptom SEO · IG/FB growth',
  },
  {
    id: 'movieslike',
    name: 'MoviesLike',
    domain: 'movieslike.app',
    status: 'active',
    priority: false,
    color: '#F59E0B',
    repo: '~/projects/movieslike',
    obsidian: '~/ObsidianVault (various)',
    cronJobs: ['Vega GSC (6 AM)', 'Forge (7 AM/1 PM/7 PM)', 'Link Daily (10 AM)', 'SEO Batch (11 PM)'],
    goal: 'Mediavine 50K sessions · TMDB page volume · AdSense RPM',
  },
  {
    id: 'watchthis',
    name: 'WatchThis',
    domain: 'watchthisapp',
    status: 'active',
    priority: false,
    color: '#0EA5E9',
    repo: '~/projects/watchthisapp',
    obsidian: '~/ObsidianVault (various)',
    cronJobs: ['Forge Monitor (3× daily)', 'Forge Weekly Report (Mon)'],
    goal: 'Forge execution monitoring · page generation triggers',
  },
  {
    id: 'clawd-web',
    name: 'Clawd-Web',
    domain: 'clawd-web-fawn.vercel.app',
    status: 'active',
    priority: false,
    color: '#8B5CF6',
    repo: '~/projects/clawd-web',
    obsidian: '—',
    cronJobs: [],
    goal: 'System architecture dashboard · internal ops UI',
  },
];

const cronSchedule: CronJob[] = [
  { time: '6:00 AM', name: 'Vega GSC Daily', skill: 'movieslike-vega', enabled: true },
  { time: '6:50 AM', name: 'Daily Health Check', enabled: false },
  { time: '7:00 AM', name: 'Forge Morning', skill: 'movieslike-forge', enabled: true },
  { time: '7:05 AM', name: 'SEO Chief Daily', skill: 'seo-chief', enabled: true },
  { time: '7:10 AM', name: 'Forge Monitor Morning', enabled: true },
  { time: '7:15 AM', name: 'GEO Monitor Daily', skill: 'geo-monitor', enabled: true },
  { time: '7:30 AM', name: 'CardSnap UGC Daily', enabled: true },
  { time: '8:00 AM', name: 'Demand Scout Morning', skill: 'demand-scout', enabled: true },
  { time: '8:00 AM', name: 'CardSnap Reddit Grader', skill: 'cardsnap-reddit-grader', enabled: true },
  { time: '8:45 AM', name: 'Hermes Daily Digest', enabled: true },
  { time: '9:00 AM', name: 'FursBliss Campaign', skill: 'fursbliss-campaign', enabled: true },
  { time: '9:15 AM', name: 'Pet Symptom Content Ideas', enabled: true },
  { time: '9:20 AM', name: 'Daily CiteLens UGC Pack', enabled: true },
  { time: '9:30 AM', name: 'FursBliss DALL-E', skill: 'fursbliss-dalle', enabled: true },
  { time: '10:00 AM', name: 'Link Daily · FursBliss Social · Reddit Grader', enabled: true },
  { time: '10:15 AM', name: 'Build Checks Daily', enabled: true },
  { time: '11:00 AM', name: 'Market Intel Daily', skill: 'market-intel', enabled: true },
  { time: '1:00 PM', name: 'Forge Afternoon · Monitor · Reddit Grader', enabled: true },
  { time: '6:00 PM', name: 'Demand Scout Evening · Reddit Grader', enabled: true },
  { time: '7:00 PM', name: 'Forge Evening · Monitor', enabled: true },
  { time: '9:00 PM', name: 'Obsidian Daily Sync', enabled: true },
  { time: '10:50 PM', name: 'CardSnap Pre-SEO Cleanup', enabled: true },
  { time: '11:00 PM', name: 'SEO Batch Nightly', skill: 'seo-batch', enabled: true },
  { time: '11:30 PM', name: 'Hermes Master Doctor', enabled: false },
  { time: 'Every 2h', name: 'Morning Brief', enabled: true },
  { time: 'Fri 7:30 PM', name: 'Friday Metrics Sync', skill: 'friday-metrics-sync', enabled: true },
  { time: 'Sun 9:00 AM', name: 'Freedom 50 Weekly Review', enabled: true },
  { time: 'Mon 8:00 AM', name: 'CardSnap Script', skill: 'cardsnap-script', enabled: true },
  { time: 'Mon 9:00 AM', name: 'CardSnap Weekly Content', skill: 'cardsnap-content-gen', enabled: true },
  { time: 'Mon/Wed/Fri', name: 'CardSnap Signal Hunter', skill: 'cardsnap-signal-hunter', enabled: true },
];

type Tab = 'overview' | 'agents' | 'hermes' | 'linear' | 'skills' | 'projects' | 'schedule' | 'dataflow' | 'obsidian';

export default function ArchitectureDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const enabledJobs = cronSchedule.filter(j => j.enabled).length;
  const priorityProjects = projects.filter(p => p.priority);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>⚡ Hermes System Architecture</h1>
        <p style={styles.subtitle}>
          MacBook Air M2 · {RUNTIME_STATS.gatewayProcesses} gateway · {RUNTIME_STATS.enabledCronJobs} active cron jobs ·{' '}
          {RUNTIME_STATS.uniqueActiveSkills} skills · {projects.length} properties · default {RUNTIME_STATS.hermesModel}
        </p>
        <p style={styles.hardwarePrinciples}>
          <strong>Runtime:</strong> One always-on Hermes gateway spins up temporary sessions when cron fires — not 13
          separate agents. Legacy persona names (Vega, Forge, Luna…) map to skills; see <strong>Agents</strong> tab.{' '}
          <strong>Income priority:</strong> CiteLens + CardSnap.
        </p>
      </div>

      <div style={styles.tabs}>
        {(
          [
            ['overview', 'Overview'],
            ['agents', 'Agents'],
            ['hermes', 'Hermes'],
            ['linear', 'Linear'],
            ['skills', 'Skills'],
            ['projects', 'Projects'],
            ['schedule', 'Schedule'],
            ['dataflow', 'Dataflow'],
            ['obsidian', 'Obsidian'],
          ] as const
        ).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : styles.tabInactive) }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={styles.content}>
          <div style={styles.diagramSection}>
            <SystemDiagramSVG />
          </div>

          <div style={styles.overviewGrid}>
            <div style={styles.overviewCard}>
              <h3 style={styles.overviewCardTitle}>Operating Contract</h3>
              <ol style={styles.orderedList}>
                <li>Cron fires job from <code>~/.hermes/cron/jobs.json</code></li>
                <li>Hermes invokes skill or script via <code>run_with_logging.py</code></li>
                <li>Full report written to Obsidian vault</li>
                <li>Script prints concise stdout summary</li>
                <li>Hermes delivers to Telegram (<code>deliver: telegram</code>)</li>
              </ol>
              <p style={styles.note}>Scripts never send Telegram directly.</p>
            </div>

            <div style={styles.overviewCard}>
              <h3 style={styles.overviewCardTitle}>★ Income Priority</h3>
              {priorityProjects.map(p => (
                <div key={p.id} style={{ ...styles.priorityRow, borderLeftColor: p.color }}>
                  <strong>{p.name}</strong>
                  <span style={styles.priorityGoal}>{p.goal}</span>
                </div>
              ))}
            </div>

            <div style={styles.overviewCard}>
              <h3 style={styles.overviewCardTitle}>Autonomous vs Manual</h3>
              <p style={styles.splitLabel}>✅ Autonomous</p>
              <p style={styles.splitText}>Cron jobs, growth intel, UGC packs, social posting, SEO batch, Obsidian sync</p>
              <p style={styles.splitLabel}>🛑 Manual</p>
              <p style={styles.splitText}>Deploys, commits, cron changes, publishing outreach, production code from Kanban</p>
            </div>

            <div style={styles.overviewCard}>
              <h3 style={styles.overviewCardTitle}>Mental Model</h3>
              <p style={styles.mentalModel}>
                <strong>Obsidian</strong> = memory · <strong>Telegram</strong> = alert · <strong>Hermes</strong> = pipeline ·{' '}
                <strong>Skills</strong> = brain · <strong>Cron</strong> = trigger · <strong>Linear</strong> = issue tracker
              </p>
              <p style={styles.note}>
                Hermes-only scheduler (user crontab removed). Gateway via launchd:{' '}
                <code>ai.hermes.gateway</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div style={styles.content}>
          <AgentsRuntimePanel />
        </div>
      )}

      {activeTab === 'hermes' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Hermes Control Plane</h2>
          <p style={styles.sectionDesc}>
            All automation runs through Hermes on the MacBook Air. Gateway handles Telegram/Discord; cron scheduler
            invokes skills on schedule.
          </p>
          <div style={styles.pathGrid}>
            {HERMES_PATHS.map(p => (
              <div key={p.path} style={styles.pathCard}>
                <code style={styles.pathCode}>{p.path}</code>
                <p style={styles.pathDesc}>{p.description}</p>
              </div>
            ))}
          </div>

          <h3 style={{ ...styles.sectionTitle, marginTop: 32, fontSize: 18 }}>Key Components</h3>
          <div style={styles.componentGrid}>
            <div style={styles.componentCard}>
              <strong>Gateway (launchd)</strong>
              <p>ai.hermes.gateway.plist · Telegram + Discord · deliver: telegram · gateway.log</p>
            </div>
            <div style={styles.componentCard}>
              <strong>Cron Engine</strong>
              <p>jobs.json only — no macOS crontab · retry · capture_logs · timeout_seconds</p>
            </div>
            <div style={styles.componentCard}>
              <strong>Kanban Runner</strong>
              <p>~/.hermes/kanban_runner.sh --next · allowlisted report skills only</p>
            </div>
            <div style={styles.componentCard}>
              <strong>SaaS Ops Glue</strong>
              <p>Aggregates briefs, keyword warehouse, backlink CRM, skill health</p>
            </div>
          </div>

          <h3 style={{ ...styles.sectionTitle, marginTop: 32, fontSize: 18 }}>Mandatory Rules</h3>
          <ul style={styles.orderedList}>
            <li>All scheduled jobs through Hermes — never standalone crontab/launchd cron</li>
            <li>Scripts load ~/.hermes/.env · write to Obsidian or ~/.hermes/results/</li>
            <li>Scripts never send Telegram — Hermes handles delivery</li>
            <li>Full output → Obsidian · stdout → one short summary only</li>
            <li>launchd strips env — test with: <code>set -a; source ~/.hermes/.env; set +a</code></li>
          </ul>
        </div>
      )}

      {activeTab === 'linear' && (
        <div style={styles.content}>
          <LinearPanel />
        </div>
      )}

      {activeTab === 'skills' && (
        <div style={styles.content}>
          <div style={styles.skillsGrid}>
            {skillDomains.map(domain => (
              <div
                key={domain.id}
                style={{ ...styles.skillCard, borderTopColor: domain.color }}
                onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
              >
                <h3 style={{ ...styles.skillCardName, color: domain.color }}>{domain.name}</h3>
                <p style={styles.skillSchedule}>{domain.schedule}</p>
                <div style={styles.skillTags}>
                  {domain.skills.map(s => (
                    <span key={s} style={styles.skillTag}>{s}</span>
                  ))}
                </div>
                {selectedDomain === domain.id && (
                  <p style={styles.skillDesc}>{domain.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div style={styles.content}>
          <div style={styles.projectsGrid}>
            {projects.map(project => (
              <div
                key={project.id}
                style={{ ...styles.projectCard, borderLeftColor: project.color }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                <div style={styles.projectHeader}>
                  <h3 style={styles.projectName}>
                    {project.priority && '★ '}{project.name}
                  </h3>
                  <span
                    style={{
                      ...styles.projectStatus,
                      backgroundColor:
                        project.status === 'active' ? '#10B981' :
                        project.status === 'paused' ? '#EF4444' : '#F59E0B',
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <p style={styles.projectDomain}>{project.domain}</p>
                <p style={styles.projectRepo}>{project.repo}</p>
                {selectedProject === project.id && (
                  <>
                    <p style={styles.projectObsidian}><strong>Obsidian:</strong> {project.obsidian}</p>
                    <p style={styles.projectGoal}><strong>Goal:</strong> {project.goal}</p>
                    <div style={styles.cronList}>
                      {project.cronJobs.map(j => (
                        <span key={j} style={styles.cronBadge}>{j}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div style={styles.content}>
          <p style={styles.sectionDesc}>
            Daily automation timeline from <code>~/.hermes/cron/jobs.json</code>. Disabled jobs shown in gray.
          </p>
          <div style={styles.scheduleList}>
            {cronSchedule.map(job => (
              <div
                key={`${job.time}-${job.name}`}
                style={{ ...styles.scheduleRow, opacity: job.enabled ? 1 : 0.45 }}
              >
                <span style={styles.scheduleTime}>{job.time}</span>
                <span style={styles.scheduleName}>{job.name}</span>
                {job.skill && <span style={styles.scheduleSkill}>{job.skill}</span>}
                {!job.enabled && <span style={styles.schedulePaused}>paused</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dataflow' && (
        <div style={styles.content}>
          <DataFlowPanel />
        </div>
      )}

      {activeTab === 'obsidian' && (
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Obsidian Knowledge Layer</h2>
          <p style={styles.sectionDesc}>
            Full reports land in Obsidian; Telegram gets the summary. SaaS Ops aggregates cross-property intelligence.
          </p>
          <div style={styles.pathGrid}>
            {OBSIDIAN_PATHS.map(p => (
              <div key={p.path} style={styles.pathCard}>
                <code style={styles.pathCode}>{p.path}</code>
                <p style={styles.pathDesc}>{p.description}</p>
              </div>
            ))}
          </div>

          <h3 style={{ ...styles.sectionTitle, marginTop: 32, fontSize: 18 }}>Morning Operator Checklist</h3>
          <ol style={styles.orderedList}>
            <li>Open Kanban dashboard: <code>orchestration/agent_orchestration_kanban.md</code></li>
            <li>Read operator brief: <code>saas_ops/operator_briefs/</code></li>
            <li>Review CiteLens + CardSnap revenue actions first</li>
            <li>Check keyword warehouse + Kanban queue</li>
            <li>Run one safe task: <code>~/.hermes/kanban_runner.sh --next</code></li>
            <li>Pick ONE revenue action (page, landing page, outreach, backlink)</li>
            <li>Refresh SaaS Ops: <code>hermes-saas-ops/scripts/saas_ops.py</code></li>
          </ol>
        </div>
      )}
    </div>
  );
}

function AgentsRuntimePanel() {
  const active = PERSONA_ALIASES.filter(p => p.status === 'active');
  const legacy = PERSONA_ALIASES.filter(p => p.status === 'legacy');

  return (
    <div>
      <h2 style={styles.sectionTitle}>What&apos;s Actually Running</h2>
      <p style={styles.sectionDesc}>
        Pulled from <code>~/.hermes/cron/jobs.json</code>, <code>config.yaml</code>, and session logs. Persona names are
        friendly labels — not separate processes.
      </p>

      <div style={styles.runtimeGrid}>
        <div style={styles.runtimeStatCard}>
          <span style={styles.runtimeStatNum}>{RUNTIME_STATS.gatewayProcesses}</span>
          <span style={styles.runtimeStatLabel}>Always-on gateway</span>
          <span style={styles.runtimeStatDetail}>ai.hermes.gateway (launchd)</span>
        </div>
        <div style={styles.runtimeStatCard}>
          <span style={styles.runtimeStatNum}>{RUNTIME_STATS.enabledCronJobs}</span>
          <span style={styles.runtimeStatLabel}>Active cron jobs</span>
          <span style={styles.runtimeStatDetail}>{RUNTIME_STATS.pausedCronJobs} paused · {RUNTIME_STATS.totalCronJobs} total</span>
        </div>
        <div style={styles.runtimeStatCard}>
          <span style={styles.runtimeStatNum}>{RUNTIME_STATS.uniqueActiveSkills}</span>
          <span style={styles.runtimeStatLabel}>Distinct skills invoked</span>
          <span style={styles.runtimeStatDetail}>13 direct-script jobs · 9 paused</span>
        </div>
        <div style={styles.runtimeStatCard}>
          <span style={styles.runtimeStatNum}>0–1</span>
          <span style={styles.runtimeStatLabel}>Concurrent sessions</span>
          <span style={styles.runtimeStatDetail}>Temporary per cron fire, then exit</span>
        </div>
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Models</h3>
      <div style={styles.componentGrid}>
        <div style={styles.componentCard}>
          <strong>Hermes orchestrator (all cron jobs)</strong>
          <p>{RUNTIME_STATS.hermesModel} via {RUNTIME_STATS.hermesProvider}. No per-job overrides in jobs.json.</p>
        </div>
        <div style={styles.componentCard}>
          <strong>FursBliss images</strong>
          <p>{RUNTIME_STATS.imageModel} via fursbliss-dalle script (OPENAI_IMAGE_MODEL override)</p>
        </div>
        <div style={styles.componentCard}>
          <strong>SEO batch scripts</strong>
          <p>{RUNTIME_STATS.scriptModels}</p>
        </div>
        <div style={styles.componentCard}>
          <strong>No-LLM jobs</strong>
          <p>Vega GSC pull, Reddit grader scrape, GEO monitor, UGC shell scripts, build checks — Python/shell only; Hermes still uses gpt-4o-mini to run the job wrapper.</p>
        </div>
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Legacy Persona → Skill Map</h3>
      <p style={styles.sectionDesc}>Old org-chart names mapped to what runs today. Active personas have live cron/skills.</p>
      <div style={styles.aliasTable}>
        <div style={styles.aliasHeader}>
          <span>Persona</span>
          <span>Role</span>
          <span>Maps to today</span>
          <span>Model</span>
        </div>
        {active.map(row => (
          <div key={row.persona} style={styles.aliasRow}>
            <span style={styles.aliasPersona}>{row.persona}</span>
            <span>{row.role}</span>
            <span style={styles.aliasSkill}>{row.mapsTo}</span>
            <span style={styles.aliasModel}>{row.model}</span>
          </div>
        ))}
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Retired Personas (diagram only)</h3>
      <p style={styles.sectionDesc}>Mac mini coder roles and CEO persona — work absorbed by Hermes + skills on the Air.</p>
      <div style={styles.aliasTable}>
        {legacy.map(row => (
          <div key={row.persona} style={{ ...styles.aliasRow, opacity: 0.75 }}>
            <span style={styles.aliasPersona}>{row.persona}</span>
            <span>{row.role}</span>
            <span style={styles.aliasSkill}>{row.mapsTo}</span>
            <span style={styles.aliasModel}>{row.model}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinearPanel() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Linear — Team HER (Hermes123)</h2>
      <p style={styles.sectionDesc}>
        Issue tracking integrated across Hermes diagnostics and all dev tools (Cursor, Claude, Codex).
        Docs: <code>~/.hermes/docs/LINEAR_DASHBOARD.md</code>
      </p>

      <a
        href="https://linear.app/hermes123/team/HER/active"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.linearBoardLink}
      >
        Open Linear Board → filter Todo + In Progress for current problems
      </a>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Three Rules (all agents)</h3>
      <ol style={styles.orderedList}>
        {LINEAR_RULES.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ol>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Issue Naming</h3>
      <div style={styles.namingGrid}>
        {['Fix: bugs, broken cron/gateway/API', 'Add: new automation or features', 'Cleanup: repo hygiene', 'Tech debt: upgrades (Python 3.11, etc.)'].map(n => (
          <span key={n} style={styles.namingBadge}>{n}</span>
        ))}
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Commands</h3>
      <div style={styles.pathGrid}>
        <div style={styles.pathCard}>
          <code style={styles.pathCode}>python3 ~/.hermes/scripts/hermes_master_check.py --save</code>
          <p style={styles.pathDesc}>Full diagnostic — ends with Linear dashboard summary</p>
        </div>
        <div style={styles.pathCard}>
          <code style={styles.pathCode}>python3 ~/.hermes/scripts/linear_dashboard.py</code>
          <p style={styles.pathDesc}>Standalone open/done issue summary (reads LINEAR_API_KEY from .env)</p>
        </div>
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Dev Tools + Linear MCP</h3>
      <p style={styles.sectionDesc}>All tools auto-create Linear issues in team Hermes123 when starting work.</p>
      <div style={styles.devToolsGrid}>
        {DEV_TOOLS.map(tool => (
          <div key={tool.name} style={styles.devToolCard}>
            <strong>{tool.name}</strong>
            <p style={styles.pathDesc}>{tool.config}</p>
            <p style={{ ...styles.pathDesc, color: '#7c3aed' }}>{tool.linear}</p>
          </div>
        ))}
      </div>

      <h3 style={{ ...styles.sectionTitle, marginTop: 28, fontSize: 18 }}>Linear Views</h3>
      <div style={styles.componentGrid}>
        <div style={styles.componentCard}>
          <strong>All issues → state filter</strong>
          <p>Current open problems — use Todo + In Progress for health</p>
        </div>
        <div style={styles.componentCard}>
          <strong>My issues → Assigned</strong>
          <p>Your personal queue</p>
        </div>
        <div style={styles.componentCard}>
          <strong>My issues → Activity</strong>
          <p>Personal history only — NOT system health</p>
        </div>
      </div>
    </div>
  );
}

function DataFlowPanel() {
  const flows = [
    {
      title: '🎬 MoviesLike Page Generation',
      steps: ['Vega GSC (6 AM) → priority signals', 'Forge (7/1/7 PM) → page triggers', 'SEO Batch (11 PM) → batch publish', 'Obsidian report → Telegram summary'],
    },
    {
      title: '★ CiteLens + CardSnap Growth',
      steps: ['Growth intel script → keyword/opportunity scan', 'UGC daily pack → Remotion MP4 + approval doc', 'Full report → Obsidian vault', 'Telegram: caption + file paths for review'],
    },
    {
      title: '🐾 FursBliss Daily Social',
      steps: ['Campaign skill (9 AM) → post copy', 'DALL-E (9:30 AM) → image → Vercel Blob', 'Social skill (10 AM) → IG/FB via Meta API', 'Pet symptom ideas → Obsidian SEO queue'],
    },
    {
      title: '📊 SaaS Ops Aggregation',
      steps: ['Individual skill reports write to Obsidian', 'hermes-saas-ops aggregates → operator brief', 'Keyword warehouse + backlink CRM updated', 'Kanban runner executes allowlisted report tasks'],
    },
    {
      title: '🔍 Research Loop',
      steps: ['Demand Scout (8 AM + 6 PM) → opportunity scan', 'Market Intel (11 AM) → trend report', 'SEO Chief (7:05 AM) → daily SEO priorities', 'All → Obsidian → Telegram digest'],
    },
    {
      title: '🏥 System Health',
      steps: ['GEO Monitor (7:15 AM) → 5-property schema/meta check', 'Build Checks (10:15 AM) → Vercel build status', 'Friday Metrics → Stripe/GA4/Supabase rollup', 'Obsidian Sync (9 PM) → vault consolidation'],
    },
    {
      title: '📋 Linear + Fix Workflow',
      steps: ['Bug detected → create HER issue (In Progress) before editing', 'Fix → verify with hermes_master_check.py', 'Same-day PASS → mark Done · recurrence → reopen, don\'t duplicate', 'Master check prints Linear dashboard at end'],
    },
  ];

  return (
    <div style={styles.dataflowContainer}>
      <h2 style={styles.dataflowTitle}>Data & Communication Flows</h2>
      <div style={styles.dataflowGrid}>
        {flows.map(flow => (
          <div key={flow.title} style={styles.dataflowSection}>
            <h3 style={styles.dataflowSectionTitle}>{flow.title}</h3>
            {flow.steps.map((step, i) => (
              <div key={i} style={styles.dataflowStep}>
                <span style={styles.stepNum}>{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    backgroundColor: '#ffffff',
  },
  header: { marginBottom: 40, textAlign: 'center' },
  title: { fontSize: 42, fontWeight: 700, margin: '0 0 12px', color: '#1a1a1a' },
  subtitle: { fontSize: 16, color: '#666', margin: 0 },
  hardwarePrinciples: {
    maxWidth: 900,
    margin: '20px auto 0',
    padding: '16px 20px',
    fontSize: 14,
    lineHeight: 1.65,
    color: '#374151',
    backgroundColor: '#faf5ff',
    border: '1px solid #e9d5ff',
    borderRadius: 10,
    textAlign: 'left',
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 40,
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '8px 16px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.3s',
  },
  tabActive: { color: '#8B5CF6', borderBottom: '3px solid #8B5CF6' },
  tabInactive: { color: '#999' },
  content: { animation: 'fadeIn 0.3s' },
  diagramSection: {
    padding: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 40,
    border: '1px solid #e5e7eb',
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
  },
  overviewCard: {
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
  },
  overviewCardTitle: { fontSize: 16, fontWeight: 600, margin: '0 0 12px', color: '#1a1a1a' },
  orderedList: { margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8, color: '#374151' },
  note: { fontSize: 12, color: '#999', marginTop: 12, fontStyle: 'italic' },
  priorityRow: {
    padding: '10px 12px',
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeft: '4px solid',
  },
  priorityGoal: { display: 'block', fontSize: 12, color: '#666', marginTop: 4 },
  splitLabel: { fontSize: 13, fontWeight: 600, margin: '12px 0 4px', color: '#374151' },
  splitText: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.5 },
  sectionTitle: { fontSize: 22, fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' },
  sectionDesc: { fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 1.6 },
  pathGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 12,
  },
  pathCard: {
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  pathCode: { fontSize: 13, fontWeight: 600, color: '#7c3aed', fontFamily: 'monospace' },
  pathDesc: { fontSize: 12, color: '#666', margin: '6px 0 0' },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 16,
  },
  componentCard: {
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    border: '1px solid #bfdbfe',
    fontSize: 13,
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 24,
  },
  skillCard: {
    padding: 20,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderTopWidth: 4,
    borderTopStyle: 'solid',
    cursor: 'pointer',
  },
  skillCardName: { fontSize: 18, fontWeight: 700, margin: '0 0 8px' },
  skillSchedule: { fontSize: 12, color: '#999', marginBottom: 12 },
  skillTags: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  skillTag: {
    padding: '3px 8px',
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#374151',
  },
  skillDesc: { fontSize: 13, color: '#666', marginTop: 12, lineHeight: 1.6 },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },
  projectCard: {
    padding: 20,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderLeftWidth: 6,
    borderLeftStyle: 'solid',
    cursor: 'pointer',
  },
  projectHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 },
  projectName: { fontSize: 18, fontWeight: 700, margin: 0, color: '#1a1a1a' },
  projectStatus: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: 4,
    color: '#fff',
    textTransform: 'capitalize',
  },
  projectDomain: { fontSize: 13, color: '#8B5CF6', margin: '0 0 4px' },
  projectRepo: { fontSize: 12, fontFamily: 'monospace', color: '#666', margin: 0 },
  projectObsidian: { fontSize: 12, color: '#666', marginTop: 12 },
  projectGoal: { fontSize: 12, color: '#666', marginTop: 4 },
  cronList: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  cronBadge: {
    padding: '4px 8px',
    backgroundColor: '#ede9fe',
    borderRadius: 4,
    fontSize: 11,
    color: '#7c3aed',
  },
  scheduleList: { display: 'flex', flexDirection: 'column', gap: 4 },
  scheduleRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr auto auto',
    gap: 16,
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    fontSize: 13,
  },
  scheduleTime: { fontWeight: 600, color: '#7c3aed', fontFamily: 'monospace' },
  scheduleName: { color: '#1a1a1a' },
  scheduleSkill: {
    padding: '2px 8px',
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#374151',
  },
  schedulePaused: { fontSize: 11, color: '#EF4444', fontWeight: 600 },
  dataflowContainer: { padding: 24, backgroundColor: '#f9fafb', borderRadius: 12 },
  dataflowTitle: { fontSize: 20, fontWeight: 600, margin: '0 0 24px', color: '#1a1a1a' },
  dataflowGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: 20,
  },
  dataflowSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  dataflowSectionTitle: { fontSize: 15, fontWeight: 600, margin: '0 0 12px', color: '#1a1a1a' },
  dataflowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13,
    marginBottom: 8,
    color: '#374151',
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
    fontSize: 11,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  mentalModel: { fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 },
  linearBoardLink: {
    display: 'inline-block',
    padding: '12px 20px',
    backgroundColor: '#5E6AD2',
    color: '#fff',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 8,
  },
  namingGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  namingBadge: {
    padding: '6px 12px',
    backgroundColor: '#eef2ff',
    borderRadius: 6,
    fontSize: 12,
    color: '#4338ca',
  },
  devToolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
  },
  devToolCard: {
    padding: 14,
    backgroundColor: '#faf5ff',
    borderRadius: 8,
    border: '1px solid #e9d5ff',
    fontSize: 13,
  },
  runtimeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
  },
  runtimeStatCard: {
    padding: 20,
    backgroundColor: '#faf5ff',
    borderRadius: 12,
    border: '1px solid #e9d5ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  runtimeStatNum: { fontSize: 36, fontWeight: 700, color: '#7c3aed', lineHeight: 1 },
  runtimeStatLabel: { fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginTop: 8 },
  runtimeStatDetail: { fontSize: 11, color: '#666', marginTop: 4 },
  aliasTable: {
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 13,
  },
  aliasHeader: {
    display: 'grid',
    gridTemplateColumns: '90px 140px 1fr 200px',
    gap: 12,
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    fontWeight: 600,
    color: '#374151',
  },
  aliasRow: {
    display: 'grid',
    gridTemplateColumns: '90px 140px 1fr 200px',
    gap: 12,
    padding: '12px 16px',
    borderTop: '1px solid #e5e7eb',
    alignItems: 'start',
    color: '#374151',
  },
  aliasPersona: { fontWeight: 700, color: '#7c3aed' },
  aliasSkill: { fontFamily: 'monospace', fontSize: 12, color: '#059669' },
  aliasModel: { fontSize: 12, color: '#666' },
};
