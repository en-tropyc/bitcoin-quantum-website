'use client';

interface Milestone {
  id: string;
  title: string;
  subtitle?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const btqRoadmap: Milestone[] = [
  { id: 'phase-0', title: 'Phase 0', subtitle: 'BTC Fork', status: 'completed' },
  { id: 'phase-1', title: 'Phase 1', subtitle: 'Development', status: 'completed' },
  { id: 'phase-2', title: 'Phase 2', subtitle: 'Pre-Release', status: 'completed' },
  { id: 'testnet-v01', title: 'Testnet v1', subtitle: 'Latest', status: 'in-progress' },
  { id: 'testnet-v02', title: 'Testnet v2', subtitle: 'Upcoming', status: 'planned' },
  { id: 'genesis', title: 'BTQ Genesis', subtitle: 'Mainnet', status: 'planned' },
];

function StatusDot({ status, size = 'md' }: { status: 'completed' | 'in-progress' | 'planned'; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4 md:w-5 md:h-5';
  const innerSize = size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5 md:w-2 md:h-2';

  if (status === 'completed') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)] flex items-center justify-center`}>
        <div className={`${innerSize} bg-white rounded-full`} />
      </div>
    );
  }

  if (status === 'in-progress') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_14px_rgba(0,240,255,0.6)] flex items-center justify-center`}>
        <div className={`${innerSize} bg-white rounded-full`} />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} rounded-full bg-transparent border-2 border-white/30`} />
  );
}

export default function GitBranchRoadmap() {
  return (
    <div id="roadmap" className="mb-12 scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Roadmap</h2>
      <p className="text-white/70 mb-10 font-dm-mono text-lg">
        Bitcoin Quantum builds upon Bitcoin&apos;s legacy to create a quantum-resistant future for everyone.
      </p>

      {/* Container for container queries */}
      <div className="@container">
      {/* Desktop Layout */}
      <div className="hidden @lg:block">
        <div className="relative">
          {/* SVG for all lines - using viewBox for consistent scaling */}
          <svg
            className="absolute inset-0 w-full overflow-visible"
            style={{ height: '200px' }}
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
          >
            {/* Upper shaded region - Classical Bitcoin (gray) */}
            <rect
              x="280"
              y="0"
              width="720"
              height="70"
              fill="rgba(255,255,255,0.03)"
            />

            {/* Lower shaded region - Quantum-Safe Bitcoin (cyan) */}
            <rect
              x="280"
              y="70"
              width="720"
              height="130"
              fill="rgba(0,240,255,0.04)"
            />

            {/* Pre-fork line (BTC Genesis to Quantum Threat to fork point) */}
            <line
              x1="40"
              y1="48"
              x2="240"
              y2="48"
              stroke="rgba(0,240,255,0.5)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Upper branch - Classical Bitcoin (continues straight, dashed) */}
            <line
              x1="240"
              y1="48"
              x2="1000"
              y2="48"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeDasharray="6 4"
              vectorEffect="non-scaling-stroke"
            />

            {/* Fork curve - connects upper line to lower branch */}
            <path
              d="M 240 48 C 280 48 280 98 320 98"
              fill="none"
              stroke="rgba(0,240,255,0.5)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Lower branch - BTQ Quantum Safety */}
            <line
              x1="320"
              y1="98"
              x2="1000"
              y2="98"
              stroke="rgba(0,240,255,0.5)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Content layer */}
          <div className="relative" style={{ height: '200px' }}>
            {/* BTC Genesis node - on upper line */}
            <div className="absolute" style={{ left: '4%', top: '-6px' }}>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="text-sm font-dm-mono font-medium text-white whitespace-nowrap">BTC Genesis</div>
                  <div className="text-xs font-dm-mono text-white/50">2009</div>
                </div>
                <StatusDot status="completed" />
              </div>
            </div>

            {/* Quantum Threat node (fork point) - on upper line */}
            <div className="absolute" style={{ left: '18%', top: '-6px' }}>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <div className="text-sm font-dm-mono font-medium text-white whitespace-nowrap">Quantum Threat</div>
                  <div className="text-xs font-dm-mono text-white/50">Identified</div>
                </div>
                <StatusDot status="completed" />
              </div>
            </div>

            {/* Classical Bitcoin label (upper region) */}
            <div className="absolute" style={{ left: '64%', top: '10px', transform: 'translateX(-50%)' }}>
              <span className="text-xs font-dm-mono text-white/30 italic">Classical Bitcoin (vulnerable)</span>
            </div>

            {/* BTQ branch label (lower region) */}
            <div className="absolute" style={{ left: '64%', top: '165px', transform: 'translateX(-50%)' }}>
              <span className="text-xs font-dm-mono text-[#00f0ff]/60 whitespace-nowrap">Quantum-Safe Bitcoin</span>
            </div>

            {/* BTQ Roadmap nodes - on lower line */}
            {btqRoadmap.map((milestone, idx) => (
              <div
                key={milestone.id}
                className="absolute"
                style={{ left: `${34 + idx * 11}%`, top: '88px' }}
              >
                <div className="flex flex-col items-center">
                  <StatusDot status={milestone.status} />
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-dm-mono font-medium whitespace-nowrap ${
                      milestone.status === 'planned' ? 'text-white/40' : 'text-white'
                    }`}>
                      {milestone.title}
                    </div>
                    <div className={`text-xs font-dm-mono ${
                      milestone.status === 'planned' ? 'text-white/25' : 'text-white/50'
                    }`}>
                      {milestone.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden @md:block @lg:hidden">
        <div className="relative overflow-x-auto pb-4">
          <div className="min-w-[800px] relative" style={{ height: '200px' }}>
            {/* SVG for lines */}
            <svg className="absolute inset-0 w-full h-full overflow-visible">
              {/* Upper shaded region - Classical Bitcoin (gray) */}
              <rect x="190" y="0" width="590" height="65" fill="rgba(255,255,255,0.03)" />

              {/* Lower shaded region - Quantum-Safe Bitcoin (cyan) */}
              <rect x="190" y="65" width="590" height="135" fill="rgba(0,240,255,0.04)" />

              {/* Pre-fork line */}
              <line x1="20" y1="40" x2="160" y2="40" stroke="rgba(0,240,255,0.4)" strokeWidth="2" />

              {/* Upper branch - dashed (Classical Bitcoin) */}
              <line x1="160" y1="40" x2="780" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="6 4" />

              {/* Fork curve connecting upper to lower */}
              <path d="M 160 40 C 180 40 190 90 220 90" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="2" />

              {/* Lower branch (BTQ) */}
              <line x1="220" y1="90" x2="780" y2="90" stroke="rgba(0,240,255,0.4)" strokeWidth="2" />
            </svg>

            {/* BTC Genesis - on upper line */}
            <div className="absolute" style={{ left: '30px', top: '28px' }}>
              <div className="flex flex-col items-center">
                <StatusDot status="completed" size="sm" />
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] font-dm-mono font-medium text-white">BTC Genesis</div>
                  <div className="text-[9px] font-dm-mono text-white/50">2009</div>
                </div>
              </div>
            </div>

            {/* Quantum Threat - on upper line at fork point */}
            <div className="absolute" style={{ left: '120px', top: '28px' }}>
              <div className="flex flex-col items-center">
                <StatusDot status="completed" size="sm" />
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] font-dm-mono font-medium text-white">Quantum Threat</div>
                  <div className="text-[9px] font-dm-mono text-white/50">Identified</div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute" style={{ left: '485px', top: '8px', transform: 'translateX(-50%)' }}>
              <span className="text-[9px] font-dm-mono text-white/25 italic">Classical Bitcoin (vulnerable)</span>
            </div>
            <div className="absolute" style={{ left: '485px', top: '165px', transform: 'translateX(-50%)' }}>
              <span className="text-[9px] font-dm-mono text-[#00f0ff]/50 italic">Quantum-Safe Bitcoin</span>
            </div>

            {/* BTQ nodes - on lower line */}
            {btqRoadmap.map((milestone, idx) => (
              <div
                key={milestone.id}
                className="absolute"
                style={{ left: `${240 + idx * 90}px`, top: '78px' }}
              >
                <div className="flex flex-col items-center">
                  <StatusDot status={milestone.status} size="sm" />
                  <div className="mt-1.5 text-center">
                    <div className={`text-[10px] font-dm-mono font-medium ${
                      milestone.status === 'planned' ? 'text-white/40' : 'text-white'
                    }`}>
                      {milestone.title}
                    </div>
                    <div className={`text-[9px] font-dm-mono ${
                      milestone.status === 'planned' ? 'text-white/25' : 'text-white/50'
                    }`}>
                      {milestone.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Vertical */}
      <div className="@md:hidden">
        {/* BTC History */}
        <div className="mb-4 pl-2">
          <div className="text-[10px] text-white/40 font-dm-mono mb-2 uppercase tracking-wider">Bitcoin History</div>
          <div className="flex items-center gap-8 relative">
            <div className="absolute top-[6px] left-[6px] w-28 h-0.5 bg-[rgba(0,240,255,0.3)]" />
            <div className="flex flex-col items-center relative z-10">
              <StatusDot status="completed" size="sm" />
              <div className="mt-1.5 text-center">
                <div className="text-[10px] font-dm-mono font-medium text-white">BTC Genesis</div>
                <div className="text-[9px] font-dm-mono text-white/50">2009</div>
              </div>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <StatusDot status="completed" size="sm" />
              <div className="mt-1.5 text-center">
                <div className="text-[10px] font-dm-mono font-medium text-white">Quantum Threat</div>
                <div className="text-[9px] font-dm-mono text-white/50">Identified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fork visualization */}
        <div className="relative ml-4 mb-2 h-12">
          <svg width="100" height="48" className="overflow-visible">
            {/* Dashed line continuing (Classical) */}
            <line x1="0" y1="4" x2="90" y2="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Fork curve down */}
            <path d="M 0 4 Q 10 4 15 15 Q 20 26 30 26" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="1.5" />
            {/* BTQ line start */}
            <line x1="30" y1="26" x2="50" y2="26" stroke="rgba(0,240,255,0.4)" strokeWidth="1.5" />
          </svg>
          <span className="absolute top-0 left-24 text-[9px] text-white/25 font-dm-mono italic">Classical (vulnerable)</span>
          <span className="absolute top-5 left-14 text-[9px] text-[#00f0ff]/50 font-dm-mono italic">BTQ</span>
        </div>

        {/* BTQ Roadmap - vertical */}
        <div className="relative pl-2">
          <div className="text-[10px] text-white/40 font-dm-mono mb-2 uppercase tracking-wider">Quantum Safety</div>

          {/* Vertical line */}
          <div className="absolute left-[8px] top-[24px] w-0.5 bg-gradient-to-b from-[rgba(0,240,255,0.4)] to-[rgba(0,240,255,0.1)]" style={{ height: 'calc(100% - 32px)' }} />

          <div className="space-y-4">
            {btqRoadmap.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-4">
                <div className="relative z-10">
                  <StatusDot status={milestone.status} size="sm" />
                </div>
                <div>
                  <div className={`text-sm font-dm-mono font-medium ${
                    milestone.status === 'planned' ? 'text-white/40' : 'text-white'
                  }`}>
                    {milestone.title}
                  </div>
                  <div className={`text-xs font-dm-mono ${
                    milestone.status === 'planned' ? 'text-white/25' : 'text-white/50'
                  }`}>
                    {milestone.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-6 text-xs font-dm-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.5)] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
          <span className="text-white/50">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="text-white/50">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-white/30" />
          <span className="text-white/50">Planned</span>
        </div>
      </div>
    </div>
  );
}
