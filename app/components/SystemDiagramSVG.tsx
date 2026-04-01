'use client';

export default function SystemDiagramSVG() {
  return (
    <svg viewBox="0 0 1400 900" style={{ width: '100%', height: 'auto', maxWidth: 1400 }}>
      {/* Background */}
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f0f9ff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="macminiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#faf5ff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f3e8ff', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="infraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f0fdf4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#dcfce7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Laptop Container */}
      <rect x="50" y="50" width="580" height="800" rx="12" fill="url(#laptopGrad)" stroke="#0ea5e9" strokeWidth="2" />
      <text x="70" y="85" fontSize="24" fontWeight="bold" fill="#0066cc">💻 Laptop</text>
      <text x="70" y="105" fontSize="12" fill="#666">Analysis & Intelligence Layer</text>

      {/* Laptop Agents */}
      <g id="laptop-agents">
        {/* Vega */}
        <rect x="70" y="130" width="150" height="110" rx="8" fill="#fff" stroke="#8B5CF6" strokeWidth="2" />
        <text x="90" y="155" fontSize="14" fontWeight="bold" fill="#8B5CF6">🔷 Vega</text>
        <text x="90" y="175" fontSize="11" fill="#333">SEO Commander</text>
        <text x="90" y="190" fontSize="10" fill="#666">GSC monitoring</text>
        <text x="90" y="205" fontSize="10" fill="#666">Keyword research</text>
        <text x="90" y="220" fontSize="10" fill="#666">Priority scoring</text>

        {/* Dot */}
        <rect x="250" y="130" width="150" height="110" rx="8" fill="#fff" stroke="#0EA5E9" strokeWidth="2" />
        <text x="270" y="155" fontSize="14" fontWeight="bold" fill="#0EA5E9">🔵 Dot</text>
        <text x="270" y="175" fontSize="11" fill="#333">Analytics Brain</text>
        <text x="270" y="190" fontSize="10" fill="#666">GA4 + AdSense</text>
        <text x="270" y="205" fontSize="10" fill="#666">Daily briefing</text>
        <text x="270" y="220" fontSize="10" fill="#666">Revenue tracking</text>

        {/* Milo */}
        <rect x="430" y="130" width="150" height="110" rx="8" fill="#fff" stroke="#10B981" strokeWidth="2" />
        <text x="450" y="155" fontSize="14" fontWeight="bold" fill="#10B981">🟢 Milo</text>
        <text x="450" y="175" fontSize="11" fill="#333">Retention Specialist</text>
        <text x="450" y="190" fontSize="10" fill="#666">User engagement</text>
        <text x="450" y="205" fontSize="10" fill="#666">Email sequences</text>
        <text x="450" y="220" fontSize="10" fill="#666">FursBliss focus</text>

        {/* Scout */}
        <rect x="70" y="280" width="150" height="110" rx="8" fill="#fff" stroke="#F59E0B" strokeWidth="2" />
        <text x="90" y="305" fontSize="14" fontWeight="bold" fill="#F59E0B">🟠 Scout</text>
        <text x="90" y="325" fontSize="11" fill="#333">Competitive Intel</text>
        <text x="90" y="340" fontSize="10" fill="#666">Market monitoring</text>
        <text x="90" y="355" fontSize="10" fill="#666">Competitor tracking</text>
        <text x="90" y="370" fontSize="10" fill="#666">Weekly digests</text>

        {/* Forge */}
        <rect x="250" y="280" width="330" height="110" rx="8" fill="#fff" stroke="#EF4444" strokeWidth="2" />
        <text x="270" y="305" fontSize="14" fontWeight="bold" fill="#EF4444">🔴 Forge</text>
        <text x="270" y="325" fontSize="11" fill="#333">Content Scaler (Page Generator)</text>
        <text x="270" y="340" fontSize="10" fill="#666">Autonomous page generation • TMDB + Reddit signals</text>
        <text x="270" y="355" fontSize="10" fill="#666">Trending detection • Triggers Gary for execution</text>
        <text x="270" y="370" fontSize="10" fill="#666">movieslike.app volume driver</text>
      </g>

      {/* Mac Mini Container */}
      <rect x="720" y="50" width="630" height="800" rx="12" fill="url(#macminiGrad)" stroke="#8B5CF6" strokeWidth="2" />
      <text x="740" y="85" fontSize="24" fontWeight="bold" fill="#8B5CF6">🖥️ Mac mini (OpenClaw)</text>
      <text x="740" y="105" fontSize="12" fill="#666">Execution & Automation Layer</text>

      {/* Mac Mini Agents */}
      <g id="macmini-agents">
        {/* Greggles */}
        <rect x="740" y="130" width="130" height="110" rx="8" fill="#fff" stroke="#8B5CF6" strokeWidth="2" />
        <text x="760" y="155" fontSize="13" fontWeight="bold" fill="#8B5CF6">👑 Greggles</text>
        <text x="760" y="175" fontSize="10" fill="#333">CEO & Strategist</text>
        <text x="760" y="190" fontSize="9" fill="#666">High-level strategy</text>
        <text x="760" y="203" fontSize="9" fill="#666">Oversight</text>
        <text x="760" y="216" fontSize="9" fill="#666">Priorities</text>

        {/* Gary & Raquella */}
        <rect x="890" y="130" width="230" height="110" rx="8" fill="#fff" stroke="#0EA5E9" strokeWidth="2" />
        <text x="910" y="155" fontSize="13" fontWeight="bold" fill="#0EA5E9">🔵 Gary & Raquella</text>
        <text x="910" y="175" fontSize="10" fill="#333">Senior & Junior Coders</text>
        <text x="910" y="190" fontSize="9" fill="#666">Build automation scripts</text>
        <text x="910" y="203" fontSize="9" fill="#666">Execute page generation</text>
        <text x="910" y="216" fontSize="9" fill="#666">Bug fixes & improvements</text>

        {/* Joyce */}
        <rect x="1140" y="130" width="200" height="110" rx="8" fill="#fff" stroke="#10B981" strokeWidth="2" />
        <text x="1160" y="155" fontSize="13" fontWeight="bold" fill="#10B981">🟢 Joyce</text>
        <text x="1160" y="175" fontSize="10" fill="#333">Platform Researcher</text>
        <text x="1160" y="190" fontSize="9" fill="#666">Scan platforms</text>
        <text x="1160" y="203" fontSize="9" fill="#666">Identify opportunities</text>
        <text x="1160" y="216" fontSize="9" fill="#666">8 AM research sync</text>

        {/* Luna */}
        <rect x="740" y="280" width="130" height="110" rx="8" fill="#fff" stroke="#F97316" strokeWidth="2" />
        <text x="760" y="305" fontSize="13" fontWeight="bold" fill="#F97316">🟠 Luna</text>
        <text x="760" y="325" fontSize="10" fill="#333">Visual Creator</text>
        <text x="760" y="340" fontSize="9" fill="#666">DALL-E 3 HD</text>
        <text x="760" y="353" fontSize="9" fill="#666">Infographics</text>
        <text x="760" y="366" fontSize="9" fill="#666">Campaign assets</text>

        {/* Rico */}
        <rect x="890" y="280" width="130" height="110" rx="8" fill="#fff" stroke="#F59E0B" strokeWidth="2" />
        <text x="910" y="305" fontSize="13" fontWeight="bold" fill="#F59E0B">🟠 Rico</text>
        <text x="910" y="325" fontSize="10" fill="#333">Distributor</text>
        <text x="910" y="340" fontSize="9" fill="#666">Format content</text>
        <text x="910" y="353" fontSize="9" fill="#666">Multi-channel adapt</text>
        <text x="910" y="366" fontSize="9" fill="#666">Post coordination</text>

        {/* Ralph */}
        <rect x="1040" y="280" width="130" height="110" rx="8" fill="#fff" stroke="#EF4444" strokeWidth="2" />
        <text x="1060" y="305" fontSize="13" fontWeight="bold" fill="#EF4444">🔴 Ralph</text>
        <text x="1060" y="325" fontSize="10" fill="#333">Operations</text>
        <text x="1060" y="340" fontSize="9" fill="#666">Execution loop</text>
        <text x="1060" y="353" fontSize="9" fill="#666">Retry handling</text>
        <text x="1060" y="366" fontSize="9" fill="#666">Final delivery</text>

        {/* Vinny */}
        <rect x="1190" y="280" width="150" height="110" rx="8" fill="#fff" stroke="#EC4899" strokeWidth="2" />
        <text x="1210" y="305" fontSize="13" fontWeight="bold" fill="#EC4899">💗 Vinny</text>
        <text x="1210" y="325" fontSize="10" fill="#333">Analyst</text>
        <text x="1210" y="340" fontSize="9" fill="#666">Performance review</text>
        <text x="1210" y="353" fontSize="9" fill="#666">Pattern detection</text>
        <text x="1210" y="366" fontSize="9" fill="#666">Improvements</text>
      </g>

      {/* Shared Infrastructure */}
      <g id="infrastructure">
        <rect x="50" y="600" width="1300" height="220" rx="12" fill="url(#infraGrad)" stroke="#22c55e" strokeWidth="2" />
        <text x="70" y="635" fontSize="20" fontWeight="bold" fill="#16a34a">🔗 Shared Infrastructure & Communication</text>

        {/* Supabase */}
        <rect x="70" y="660" width="220" height="130" rx="8" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
        <text x="90" y="685" fontSize="13" fontWeight="bold" fill="#3b82f6">📊 Supabase</text>
        <text x="90" y="705" fontSize="10" fill="#333">FursBliss database</text>
        <text x="90" y="720" fontSize="9" fill="#666">User auth & health data</text>
        <text x="90" y="734" fontSize="9" fill="#666">Real-time subscriptions</text>
        <text x="90" y="748" fontSize="9" fill="#666">Monitored by: Milo, Dot</text>

        {/* Vercel Blob */}
        <rect x="320" y="660" width="220" height="130" rx="8" fill="#fff" stroke="#1f2937" strokeWidth="2" />
        <text x="340" y="685" fontSize="13" fontWeight="bold" fill="#1f2937">☁️ Vercel Blob</text>
        <text x="340" y="705" fontSize="10" fill="#333">Image CDN & Storage</text>
        <text x="340" y="720" fontSize="9" fill="#666">Instagram posts via API</text>
        <text x="340" y="734" fontSize="9" fill="#666">movieslike.app hosting</text>
        <text x="340" y="748" fontSize="9" fill="#666">Automated @ 9 AM</text>

        {/* Telegram Bots */}
        <rect x="570" y="660" width="240" height="130" rx="8" fill="#fff" stroke="#0088cc" strokeWidth="2" />
        <text x="590" y="685" fontSize="13" fontWeight="bold" fill="#0088cc">💬 Telegram Bots</text>
        <text x="590" y="705" fontSize="10" fill="#333">#laptop-ops channel</text>
        <text x="590" y="720" fontSize="9" fill="#666">Agents: Vega, Dot, Milo</text>
        <text x="590" y="734" fontSize="9" fill="#666">#macmini-ops channel</text>
        <text x="590" y="748" fontSize="9" fill="#666">Agents: Gary, Joyce, Rico</text>

        {/* Cron Jobs */}
        <rect x="840" y="660" width="220" height="130" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="2" />
        <text x="860" y="685" fontSize="13" fontWeight="bold" fill="#6366f1">⏰ Cron Scheduling</text>
        <text x="860" y="705" fontSize="10" fill="#333">7 AM: Dot briefing</text>
        <text x="860" y="720" fontSize="9" fill="#666">8 AM: Joyce research</text>
        <text x="860" y="734" fontSize="9" fill="#666">9 AM: Content pack</text>
        <text x="860" y="748" fontSize="9" fill="#666">Backup & monitoring</text>

        {/* Discord & APIs */}
        <rect x="1090" y="660" width="260" height="130" rx="8" fill="#fff" stroke="#5865f2" strokeWidth="2" />
        <text x="1110" y="685" fontSize="13" fontWeight="bold" fill="#5865f2">🤖 External APIs</text>
        <text x="1110" y="705" fontSize="10" fill="#333">Discord Bot (Distribution)</text>
        <text x="1110" y="720" fontSize="9" fill="#666">TMDB (Movie data)</text>
        <text x="1110" y="734" fontSize="9" fill="#666">GSC, GA4, AdSense</text>
        <text x="1110" y="748" fontSize="9" fill="#666">Instagram, Facebook, Resend</text>
      </g>

      {/* Data Flow Arrows */}
      <g id="dataflows" stroke="#999" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#999" />
          </marker>
        </defs>

        {/* Laptop to Mac mini - Forge to Gary */}
        <path d="M 580 335 Q 650 335 720 335" strokeDasharray="5,5" />
        <text x="620" y="320" fontSize="11" fill="#666">Forge triggers</text>
        <text x="620" y="333" fontSize="11" fill="#666">page generation</text>

        {/* Dot to Macmini -->
        <path d="M 400 240 Q 500 300 740 200" strokeDasharray="5,5" />

        {/* All agents to Infrastructure */}
        <line x1="300" y1="390" x2="300" y2="600" strokeDasharray="5,5" />
        <line x1="1050" y1="390" x2="1050" y2="600" strokeDasharray="5,5" />
      </g>

      {/* Legend */}
      <g id="legend">
        <text x="50" y="860" fontSize="11" fontWeight="bold" fill="#333">Legend:</text>
        <line x1="120" y1="855" x2="160" y2="855" stroke="#999" strokeWidth="2" />
        <text x="170" y="860" fontSize="11" fill="#333">Data flows between agents</text>

        <line x1="520" y1="855" x2="560" y2="855" stroke="#999" strokeWidth="2" strokeDasharray="5,5" />
        <text x="570" y="860" fontSize="11" fill="#333">Asynchronous communication via Telegram/Supabase</text>
      </g>
    </svg>
  );
}
