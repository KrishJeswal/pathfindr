import { useState, useMemo } from 'react';
import { NODES, FLOORS, getRoomOptions, findShortestPathAStar } from './navigation.js';
import FloorPlans from './FloorPlans.jsx';

export default function App() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [sourceNode, setSourceNode] = useState('');
  const [destNode, setDestNode] = useState('');
  const [calculatedPath, setCalculatedPath] = useState([]);
  const [activeSelectionMode, setActiveSelectionMode] = useState('src');

  const roomOptions = useMemo(() => getRoomOptions(), []);

  const handleMapNodeClick = (nodeId) => {
    if (activeSelectionMode === 'src') {
      setSourceNode(nodeId);
      setActiveSelectionMode('dest');
    } else {
      setDestNode(nodeId);
    }
  };

  const executeNavigation = () => {
    if (sourceNode && destNode) {
      const path = findShortestPathAStar(sourceNode, destNode);
      setCalculatedPath(path);
      if (NODES[sourceNode]) {
        setCurrentFloor(NODES[sourceNode].floor);
      }
    }
  };

  const clearNavigation = () => {
    setSourceNode('');
    setDestNode('');
    setCalculatedPath([]);
    setActiveSelectionMode('src');
  };

  const navigationInstructions = useMemo(() => {
    if (calculatedPath.length === 0) return null;
    const pathNodes = calculatedPath.map(id => NODES[id]);
    const floors = new Set(pathNodes.map(n => n.floor));
    if (floors.size > 1) {
      return `Multi-floor route active. Use the LIFT to transit between floors.`;
    }
    return "Local route plotted successfully.";
  }, [calculatedPath]);

  // Extracts continuous point lines for the current floor
  const getPathPolyline = () => {
    if (calculatedPath.length < 2) return null;
    const points = [];
    for (let i = 0; i < calculatedPath.length; i++) {
      const n = NODES[calculatedPath[i]];
      if (n.floor === currentFloor) {
        points.push(`${n.x},${n.y}`);
      }
    }
    return points.join(' ');
  };

  // Modern UI Helper Fills
  const getRoomFill = (nodeId, standardColor = '#0b1c2e') => {
    if (sourceNode === nodeId) return 'rgba(52, 211, 153, 0.2)';
    if (destNode === nodeId) return 'rgba(34, 211, 238, 0.2)';
    if (calculatedPath.includes(nodeId)) return 'rgba(14, 116, 144, 0.25)';
    return standardColor;
  };

  const getRoomStroke = (nodeId) => {
    if (sourceNode === nodeId) return '#34d399';
    if (destNode === nodeId) return '#22d3ee';
    return '#1e3a5f';
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#030712] text-zinc-100 font-sans overflow-hidden select-none relative">

      {/* GLOBAL CSS ANIMATION INJECTION */}
      <style>{`
        .energy-flow {
          stroke-dasharray: 15 15;
          animation: march 0.8s linear infinite reverse;
        }
        @keyframes march {
          to { stroke-dashoffset: 30; }
        }
        .grid-bg {
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HEADER BAR */}
      <header className="flex h-16 items-center justify-between gap-4 px-6 border-b border-white/5 bg-black/60 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] text-white">PATHFINDR</h1>
            <p className="text-[9px] text-cyan-400/80 font-bold tracking-widest uppercase">RVCE ETE Block Spatial Matrix</p>
          </div>
        </div>
        <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10 shadow-inner">
          {FLOORS.map(f => (
            <button
              key={f.id}
              onClick={() => setCurrentFloor(f.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 whitespace-nowrap ${currentFloor === f.id ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative z-10">

        {/* GLASSMORPHISM SIDEBAR CONTROLS */}
        <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 flex flex-col gap-6 overflow-y-auto shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
          <div className="space-y-5">
            {/* Source Select */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Origin Node
              </label>
              <div className="relative">
                <select
                  value={sourceNode}
                  onChange={(e) => setSourceNode(e.target.value)}
                  onClick={() => setActiveSelectionMode('src')}
                  className={`w-full bg-white/5 border text-xs rounded-xl px-4 py-3 outline-none text-zinc-200 transition-all cursor-pointer appearance-none ${activeSelectionMode === 'src' ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.15)] bg-emerald-500/5' : 'border-white/10 hover:border-white/20'}`}
                >
                  <option value="" disabled>Initialize starting position...</option>
                  {roomOptions.map(node => (
                    <option key={`src-${node.id}`} value={node.id} className="bg-zinc-900">
                      {node.label} (Level {FLOORS.find(f => f.id === node.floor)?.short ?? node.floor})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs">▼</div>
              </div>
            </div>

            {/* Target Select */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Target Vector
              </label>
              <div className="relative">
                <select
                  value={destNode}
                  onChange={(e) => setDestNode(e.target.value)}
                  onClick={() => setActiveSelectionMode('dest')}
                  className={`w-full bg-white/5 border text-xs rounded-xl px-4 py-3 outline-none text-zinc-200 transition-all cursor-pointer appearance-none ${activeSelectionMode === 'dest' ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-cyan-500/5' : 'border-white/10 hover:border-white/20'}`}
                >
                  <option value="" disabled>Initialize destination target...</option>
                  {roomOptions.map(node => (
                    <option key={`dest-${node.id}`} value={node.id} className="bg-zinc-900">
                      {node.label} (Level {FLOORS.find(f => f.id === node.floor)?.short ?? node.floor})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs">▼</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-2">
            <button
              onClick={executeNavigation}
              disabled={!sourceNode || !destNode}
              className="col-span-3 bg-white text-black py-3 rounded-xl font-black text-[11px] tracking-[0.15em] uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-[0.98] disabled:opacity-20 disabled:pointer-events-none disabled:shadow-none"
            >
              Trace Route
            </button>
            <button
              onClick={clearNavigation}
              className="col-span-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all text-zinc-400 hover:text-white group"
            >
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

          <div className="flex-1 flex flex-col gap-5">
            {/* Telemetry Output */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 blur-2xl rounded-full"></div>
              <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3">System Telemetry</h4>
              {navigationInstructions ? (
                <div className="space-y-2">
                  <p className="text-xs text-white font-medium leading-relaxed">{navigationInstructions}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="text-[10px] text-cyan-400 font-mono bg-black/40 px-2 py-1 rounded inline-block border border-cyan-500/20">
                      Nodes traversed: {calculatedPath.length}
                    </div>
                    <div className="text-[10px] text-zinc-300 font-mono bg-black/40 px-2 py-1 rounded inline-block border border-white/10">
                      Viewing: {FLOORS.find(f => f.id === currentFloor)?.label}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">Select points dynamically from the interactive workspace or via the terminal dropdowns.</p>
              )}
            </div>
          </div>
        </aside>

        {/* INTERACTIVE RADAR WORKSPACE */}
        <section className="flex-1 p-8 flex items-center justify-center relative bg-gradient-to-b from-[#030712] to-[#0a1118]">
          <div className="absolute inset-0 grid-bg opacity-30"></div>

          <div className="w-full h-full max-w-5xl border border-white/10 bg-black/40 backdrop-blur-sm rounded-3xl p-6 flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] relative z-10">
            <svg viewBox="0 0 1000 700" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">

              <defs>
                <style>{`
                  .room-core { transition: all 0.3s ease; cursor: crosshair; }
                  .room-core:hover { stroke: #60a5fa !important; fill: rgba(255,255,255,0.05); filter: drop-shadow(0 0 10px rgba(96,165,250,0.2)); }
                  .room-txt { font-family: Inter, system-ui, sans-serif; font-size: 11px; fill: #64748b; font-weight: 700; letter-spacing: 1px; pointer-events: none; text-anchor: middle; }
                  .stair-hatch { stroke: #1e3a5f; stroke-width: 1.5; opacity: 0.5; }
                  .structural-spine { fill: #06101c; stroke: #0f1c2e; stroke-width: 1; }
                `}</style>

                {/* Flowing Energy Line Gradient */}
                <linearGradient id="neonPath" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* FLOOR LAYERS */}
              <FloorPlans
                floor={currentFloor}
                getRoomFill={getRoomFill}
                getRoomStroke={getRoomStroke}
                onNodeClick={handleMapNodeClick}
              />

              {/* DYNAMIC PATH VECTOR RUNNER */}
              {calculatedPath.length >= 2 && getPathPolyline() && (
                <polyline
                  points={getPathPolyline()}
                  fill="none"
                  stroke="url(#neonPath)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="energy-flow filter drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                />
              )}

              {/* LOCATION PING BEACONS */}
              {Object.values(NODES).map(node => {
                if (node.floor !== currentFloor) return null;
                const isSrc = sourceNode === node.id;
                const isDest = destNode === node.id;
                if (!isSrc && !isDest) return null;

                return (
                  <g key={`beacon-${node.id}`} className="pointer-events-none">
                    <circle cx={node.x} cy={node.y} r="14" className={`${isSrc ? 'fill-emerald-500' : 'fill-cyan-500'} opacity-20 animate-ping`} />
                    <circle cx={node.x} cy={node.y} r="6" className={`${isSrc ? 'fill-emerald-400' : 'fill-cyan-400'} filter drop-shadow-[0_0_8px_rgba(255,255,255,1)]`} />
                    <circle cx={node.x} cy={node.y} r="2" fill="#fff" />
                  </g>
                );
              })}
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}
