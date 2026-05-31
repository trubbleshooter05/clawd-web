'use client';

export default function SystemDiagramSVG() {
  return (
    <svg viewBox="0 0 1400 1020" style={{ width: '100%', height: 'auto', maxWidth: 1400 }}>
      <defs>
        <linearGradient id="hermesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#faf5ff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ede9fe', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f0f9ff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="projectsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fff7ed', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffedd5', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="infraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#dcfce7', stopOpacity: 1 }} />
        </linearGradient>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
        </marker>
      </defs>

      {/* Hermes Control Plane */}
      <rect x="50" y="30" width="1300" height="155" rx="12" fill="url(#hermesGrad)" stroke="#8B5CF6" strokeWidth="2" />
      <text x="70" y="62" fontSize="22" fontWeight="bold" fill="#7c3aed">⚡ Hermes Control Plane</text>
      <text x="70" y="82" fontSize="12" fill="#666">MacBook Air M2 · 1 gateway · 36 cron · 17 skills · gpt-4o-mini default</text>

      <rect x="70" y="95" width="185" height="72" rx="6" fill="#fff" stroke="#8B5CF6" strokeWidth="1.5" />
      <text x="85" y="115" fontSize="11" fontWeight="bold" fill="#7c3aed">hermes-agent</text>
      <text x="85" y="130" fontSize="9" fill="#666">CLI · .venv/bin/hermes</text>
      <text x="85" y="143" fontSize="9" fill="#666">config.yaml · .env</text>
      <text x="85" y="156" fontSize="9" fill="#666">Telegram · Discord gateways</text>

      <rect x="270" y="95" width="185" height="72" rx="6" fill="#fff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="285" y="115" fontSize="11" fontWeight="bold" fill="#6366f1">cron/jobs.json</text>
      <text x="285" y="130" fontSize="9" fill="#666">~40 scheduled jobs</text>
      <text x="285" y="143" fontSize="9" fill="#666">deliver: telegram</text>
      <text x="285" y="156" fontSize="9" fill="#666">run_with_logging.py</text>

      <rect x="470" y="95" width="185" height="72" rx="6" fill="#fff" stroke="#0EA5E9" strokeWidth="1.5" />
      <text x="485" y="115" fontSize="11" fontWeight="bold" fill="#0EA5E9">skills/</text>
      <text x="485" y="130" fontSize="9" fill="#666">59 skill packages</text>
      <text x="485" y="143" fontSize="9" fill="#666">SKILL.md + scripts</text>
      <text x="485" y="156" fontSize="9" fill="#666">hermes-saas-ops glue</text>

      <rect x="670" y="95" width="185" height="72" rx="6" fill="#fff" stroke="#10B981" strokeWidth="1.5" />
      <text x="685" y="115" fontSize="11" fontWeight="bold" fill="#10B981">scripts/ + logs/</text>
      <text x="685" y="130" fontSize="9" fill="#666">linear_dashboard.py</text>
      <text x="685" y="143" fontSize="9" fill="#666">hermes_master_check.py</text>
      <text x="685" y="156" fontSize="9" fill="#666">gateway.log · kanban_runner</text>

      <rect x="870" y="95" width="460" height="72" rx="6" fill="#fff" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="885" y="115" fontSize="11" fontWeight="bold" fill="#d97706">Operating Contract</text>
      <text x="885" y="132" fontSize="10" fill="#333">Cron → Hermes job → skill/script → full report in Obsidian → stdout summary → Telegram</text>
      <text x="885" y="150" fontSize="9" fill="#666">Scripts never send Telegram directly · income priority: CiteLens + CardSnap</text>

      {/* Skills Layer */}
      <rect x="50" y="210" width="630" height="340" rx="12" fill="url(#skillsGrad)" stroke="#0ea5e9" strokeWidth="2" />
      <text x="70" y="240" fontSize="20" fontWeight="bold" fill="#0369a1">🧩 Skill Domains</text>
      <text x="70" y="258" fontSize="11" fill="#666">~/.hermes/skills · invoked by cron or manual hermes run</text>

      <rect x="70" y="275" width="285" height="95" rx="6" fill="#fff" stroke="#8B5CF6" strokeWidth="1.5" />
      <text x="85" y="295" fontSize="12" fontWeight="bold" fill="#8B5CF6">SEO &amp; Content</text>
      <text x="85" y="312" fontSize="9" fill="#666">movieslike-vega · movieslike-forge · movieslike-link</text>
      <text x="85" y="325" fontSize="9" fill="#666">seo-chief · seo-batch · geo-monitor</text>
      <text x="85" y="338" fontSize="9" fill="#666">cardsnap-seo-daily · friday-metrics-sync</text>
      <text x="85" y="358" fontSize="9" fill="#999">6 AM Vega · 7 AM Forge · 11 PM SEO batch</text>

      <rect x="370" y="275" width="285" height="95" rx="6" fill="#fff" stroke="#EF4444" strokeWidth="1.5" />
      <text x="385" y="295" fontSize="12" fontWeight="bold" fill="#EF4444">Growth Intel (income)</text>
      <text x="385" y="312" fontSize="9" fill="#666">citelens-growth-intel · cardsnap-growth-intel</text>
      <text x="385" y="325" fontSize="9" fill="#666">cardsnap-signal-hunter · cardsnap-reddit-grader</text>
      <text x="385" y="338" fontSize="9" fill="#666">cardsnap-content-gen · cardsnap-script</text>
      <text x="385" y="358" fontSize="9" fill="#999">UGC daily packs · Remotion MP4s · approval docs</text>

      <rect x="70" y="385" width="285" height="95" rx="6" fill="#fff" stroke="#10B981" strokeWidth="1.5" />
      <text x="85" y="405" fontSize="12" fontWeight="bold" fill="#10B981">FursBliss Social</text>
      <text x="85" y="422" fontSize="9" fill="#666">fursbliss-campaign · fursbliss-dalle</text>
      <text x="85" y="435" fontSize="9" fill="#666">fursbliss-social · pet-symptom-content-ideas</text>
      <text x="85" y="448" fontSize="9" fill="#666">DALL-E 3 → Vercel Blob → IG/FB API</text>
      <text x="85" y="468" fontSize="9" fill="#999">9 AM campaign · 9:30 image · 10 AM post</text>

      <rect x="370" y="385" width="285" height="95" rx="6" fill="#fff" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="385" y="405" fontSize="12" fontWeight="bold" fill="#F59E0B">Research &amp; Ops</text>
      <text x="385" y="422" fontSize="9" fill="#666">demand-scout · market-intel · hermes-saas-ops</text>
      <text x="385" y="435" fontSize="9" fill="#666">hermes-master-doctor · geo-monitor</text>
      <text x="385" y="448" fontSize="9" fill="#666">movieslike-amp · movieslike-rev · job-hunter</text>
      <text x="385" y="468" fontSize="9" fill="#999">8 AM demand scout · 11 AM market intel · nightly doctor</text>

      <rect x="70" y="495" width="585" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="85" y="520" fontSize="10" fill="#92400e">
        Kanban runner (allowlisted): cardsnap-growth-intel · citelens-growth-intel · cardsnap-signal-hunter · hermes-saas-ops
      </text>

      {/* Projects Layer */}
      <rect x="720" y="210" width="630" height="340" rx="12" fill="url(#projectsGrad)" stroke="#f97316" strokeWidth="2" />
      <text x="740" y="240" fontSize="20" fontWeight="bold" fill="#ea580c">🏢 Properties &amp; Repos</text>
      <text x="740" y="258" fontSize="11" fill="#666">~/projects/ · Vercel deploys · income-priority flagged</text>

      <rect x="740" y="275" width="280" height="110" rx="6" fill="#fff" stroke="#EF4444" strokeWidth="2" />
      <text x="755" y="295" fontSize="13" fontWeight="bold" fill="#EF4444">★ CiteLens</text>
      <text x="755" y="312" fontSize="9" fill="#666">AI citation / GEO visibility SaaS</text>
      <text x="755" y="327" fontSize="9" fill="#666">~/projects/CiteLens</text>
      <text x="755" y="342" fontSize="9" fill="#666">Daily UGC pack 9:20 AM · growth intel</text>
      <text x="755" y="357" fontSize="9" fill="#666">Obsidian: ~/ObsidianVault/projects/citelens</text>
      <text x="755" y="375" fontSize="9" fill="#999">Goal: GEO audit leads · early access</text>

      <rect x="1040" y="275" width="280" height="110" rx="6" fill="#fff" stroke="#EF4444" strokeWidth="2" />
      <text x="1055" y="295" fontSize="13" fontWeight="bold" fill="#EF4444">★ CardSnap</text>
      <text x="1055" y="312" fontSize="9" fill="#666">Sports card grading / value tool</text>
      <text x="1055" y="327" fontSize="9" fill="#666">~/projects/cardsnap · getsnapcard.com</text>
      <text x="1055" y="342" fontSize="9" fill="#666">UGC 7:30 AM · Reddit grader 3× daily</text>
      <text x="1055" y="357" fontSize="9" fill="#666">Obsidian: ~/ObsidianVault/cardsnap</text>
      <text x="1055" y="375" fontSize="9" fill="#999">Goal: analyzer → grading ROI decisions</text>

      <rect x="740" y="400" width="180" height="90" rx="6" fill="#fff" stroke="#10B981" strokeWidth="1.5" />
      <text x="755" y="420" fontSize="12" fontWeight="bold" fill="#10B981">FursBliss</text>
      <text x="755" y="437" fontSize="9" fill="#666">Pet health · Supabase</text>
      <text x="755" y="450" fontSize="9" fill="#666">~/projects/fursbliss</text>
      <text x="755" y="463" fontSize="9" fill="#666">IG/FB daily automation</text>
      <text x="755" y="480" fontSize="9" fill="#999">Symptom SEO content ideas</text>

      <rect x="935" y="400" width="180" height="90" rx="6" fill="#fff" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="950" y="420" fontSize="12" fontWeight="bold" fill="#F59E0B">MoviesLike</text>
      <text x="950" y="437" fontSize="9" fill="#666">movieslike.app · TMDB</text>
      <text x="950" y="450" fontSize="9" fill="#666">~/projects/movieslike</text>
      <text x="950" y="463" fontSize="9" fill="#666">Forge 3× daily · Vega GSC</text>
      <text x="950" y="480" fontSize="9" fill="#999">Mediavine threshold tracking</text>

      <rect x="1130" y="400" width="190" height="90" rx="6" fill="#fff" stroke="#0EA5E9" strokeWidth="1.5" />
      <text x="1145" y="420" fontSize="12" fontWeight="bold" fill="#0EA5E9">WatchThis + Clawd</text>
      <text x="1145" y="437" fontSize="9" fill="#666">watchthisapp · clawd-web</text>
      <text x="1145" y="450" fontSize="9" fill="#666">Forge monitor · this dashboard</text>
      <text x="1145" y="463" fontSize="9" fill="#666">Vercel Blob CDN</text>
      <text x="1145" y="480" fontSize="9" fill="#999">clawd-web-fawn.vercel.app</text>

      <rect x="740" y="505" width="580" height="32" rx="6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
      <text x="755" y="526" fontSize="10" fill="#374151">
        Also: snapbrand · seo-batch repo · outreach-engine · spamscore (paused/experimental)
      </text>

      {/* Obsidian + Infrastructure */}
      <rect x="50" y="575" width="1300" height="310" rx="12" fill="url(#infraGrad)" stroke="#22c55e" strokeWidth="2" />
      <text x="70" y="608" fontSize="20" fontWeight="bold" fill="#16a34a">🔗 Obsidian + Shared Infra + Linear</text>

      <rect x="70" y="625" width="240" height="115" rx="8" fill="#fff" stroke="#16a34a" strokeWidth="2" />
      <text x="90" y="650" fontSize="13" fontWeight="bold" fill="#16a34a">📓 ~/ObsidianVault</text>
      <text x="90" y="668" fontSize="9" fill="#666">hermes_system/ · operator_briefs/</text>
      <text x="90" y="681" fontSize="9" fill="#666">kanban_queue · keyword_warehouse</text>
      <text x="90" y="694" fontSize="9" fill="#666">automation_runs.md · cardsnap/</text>
      <text x="90" y="712" fontSize="9" fill="#999">Obsidian = memory · 9 PM sync</text>

      <rect x="330" y="625" width="200" height="115" rx="8" fill="#fff" stroke="#5E6AD2" strokeWidth="2" />
      <text x="350" y="650" fontSize="13" fontWeight="bold" fill="#5E6AD2">📋 Linear (HER)</text>
      <text x="350" y="668" fontSize="9" fill="#666">Team Hermes123 · issue tracker</text>
      <text x="350" y="681" fontSize="9" fill="#666">Create before fix · reopen on recurrence</text>
      <text x="350" y="694" fontSize="9" fill="#666">linear_dashboard.py</text>
      <text x="350" y="712" fontSize="9" fill="#999">linear.app/hermes123/team/HER</text>

      <rect x="550" y="625" width="200" height="115" rx="8" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="570" y="650" fontSize="13" fontWeight="bold" fill="#7c3aed">🚀 Gateway (launchd)</text>
      <text x="570" y="668" fontSize="9" fill="#666">ai.hermes.gateway.plist</text>
      <text x="570" y="681" fontSize="9" fill="#666">hermes_run.py · Telegram delivery</text>
      <text x="570" y="694" fontSize="9" fill="#666">Hermes-only scheduler (no crontab)</text>
      <text x="570" y="712" fontSize="9" fill="#999">launchctl kickstart to restart</text>

      <rect x="770" y="625" width="240" height="115" rx="8" fill="#fff" stroke="#0088cc" strokeWidth="1.5" />
      <text x="790" y="650" fontSize="13" fontWeight="bold" fill="#0088cc">💬 Telegram</text>
      <text x="790" y="668" fontSize="9" fill="#666">TELEGRAM_* in ~/.hermes/.env</text>
      <text x="790" y="681" fontSize="9" fill="#666">deliver: telegram · scripts never send</text>
      <text x="790" y="694" fontSize="9" fill="#666">Morning brief every 2h</text>
      <text x="790" y="712" fontSize="9" fill="#999">Telegram = alert · stdout summary</text>

      <rect x="1030" y="625" width="300" height="115" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="1050" y="650" fontSize="13" fontWeight="bold" fill="#6366f1">🛠 Dev Tools + Linear MCP</text>
      <text x="1050" y="668" fontSize="9" fill="#666">Cursor · Claude Code · Codex · Cowork</text>
      <text x="1050" y="681" fontSize="9" fill="#666">All auto-create HER issues on task start</text>
      <text x="1050" y="694" fontSize="9" fill="#666">~/.cursor/mcp.json · ~/.claude/CLAUDE.md</text>
      <text x="1050" y="712" fontSize="9" fill="#999">Commit messages include HER-N</text>

      {/* Row 2 infra */}
      <rect x="70" y="755" width="180" height="110" rx="8" fill="#fff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="90" y="778" fontSize="12" fontWeight="bold" fill="#3b82f6">📊 Supabase</text>
      <text x="90" y="795" fontSize="9" fill="#666">FursBliss DB + auth</text>
      <text x="90" y="808" fontSize="9" fill="#666">Friday metrics sync</text>

      <rect x="270" y="755" width="180" height="110" rx="8" fill="#fff" stroke="#1f2937" strokeWidth="1.5" />
      <text x="290" y="778" fontSize="12" fontWeight="bold" fill="#1f2937">☁️ Vercel</text>
      <text x="290" y="795" fontSize="9" fill="#666">movieslike · clawd-web · Blob</text>
      <text x="290" y="808" fontSize="9" fill="#666">Build checks 10:15 AM</text>

      <rect x="470" y="755" width="180" height="110" rx="8" fill="#fff" stroke="#5865f2" strokeWidth="1.5" />
      <text x="490" y="778" fontSize="12" fontWeight="bold" fill="#5865f2">🤖 External APIs</text>
      <text x="490" y="795" fontSize="9" fill="#666">GSC · GA4 · TMDB · OpenAI</text>
      <text x="490" y="808" fontSize="9" fill="#666">IG/FB · Stripe · Remotion</text>

      <rect x="670" y="755" width="660" height="110" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="690" y="778" fontSize="11" fontWeight="bold" fill="#92400e">Operating Contract</text>
      <text x="690" y="798" fontSize="10" fill="#78350f">Cron → Hermes job → skill/script → full report in Obsidian → stdout summary → Telegram via Hermes</text>
      <text x="690" y="818" fontSize="9" fill="#92400e">Mental model: Obsidian=memory · Telegram=alert · Hermes=pipeline · Skills=brain · Cron=trigger · Linear=tracker</text>
      <text x="690" y="838" fontSize="9" fill="#92400e">Repos: ~/projects/CiteLens · cardsnap · watchthisapp · fursbliss · movieslike · clawd-web</text>

      {/* Flow arrows */}
      <g stroke="#6366f1" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <path d="M 700 185 L 700 210" />
        <path d="M 365 550 L 365 575" strokeDasharray="4,4" />
        <path d="M 1035 550 L 1035 575" strokeDasharray="4,4" />
        <text x="620" y="200" fontSize="10" fill="#6366f1">cron triggers</text>
        <text x="300" y="568" fontSize="10" fill="#6366f1">writes reports</text>
        <text x="980" y="568" fontSize="10" fill="#6366f1">deploys / APIs</text>
      </g>

      {/* Legend */}
      <text x="50" y="920" fontSize="11" fontWeight="bold" fill="#333">Legend:</text>
      <line x1="110" y1="915" x2="150" y2="915" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <text x="160" y="920" fontSize="11" fill="#333">Data / trigger flow</text>
      <rect x="380" y="906" width="12" height="12" fill="none" stroke="#EF4444" strokeWidth="2" />
      <text x="400" y="920" fontSize="11" fill="#333">Income-priority property</text>
      <rect x="580" y="906" width="12" height="12" fill="none" stroke="#5E6AD2" strokeWidth="2" />
      <text x="600" y="920" fontSize="11" fill="#333">Linear issue tracking</text>
      <line x1="780" y1="915" x2="820" y2="915" stroke="#999" strokeWidth="2" strokeDasharray="4,4" />
      <text x="830" y="920" fontSize="11" fill="#333">Async writes to Obsidian / deploy</text>
    </svg>
  );
}
