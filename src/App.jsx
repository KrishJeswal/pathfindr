import React, { useState, useMemo } from 'react';

// --- MATHEMATICALLY PERFECT GLOBAL COORDINATES ---
// Wing nodes are mapped to precise linear equations: y = mx + b
const NODES = {
  // Ground Floor Main Vertical Spine (x = 635)
  'G_CORR_1': { id: 'G_CORR_1', floor: 0, x: 635, y: 50, isRoom: false },
  'G_CORR_2': { id: 'G_CORR_2', floor: 0, x: 635, y: 117, isRoom: false },
  'G_CORR_3': { id: 'G_CORR_3', floor: 0, x: 635, y: 237, isRoom: false },
  'G_CORR_4': { id: 'G_CORR_4', floor: 0, x: 635, y: 295, isRoom: false }, // Lift Area
  'G_CORR_JOIN': { id: 'G_CORR_JOIN', floor: 0, x: 635, y: 315, isRoom: false }, // True Intersection to Wing
  'G_CORR_5': { id: 'G_CORR_5', floor: 0, x: 635, y: 380, isRoom: false },
  'G_CORR_6': { id: 'G_CORR_6', floor: 0, x: 635, y: 475, isRoom: false },
  'G_CORR_7': { id: 'G_CORR_7', floor: 0, x: 635, y: 600, isRoom: false },
  
  // Ground Floor Angled Wing Pathing (Slope = -0.53, perfectly parallel to -28° rotation)
  'G_WING_1': { id: 'G_WING_1', floor: 0, x: 500, y: 387, isRoom: false },
  'G_WING_2': { id: 'G_WING_2', floor: 0, x: 350, y: 466, isRoom: false },

  // Ground Floor Rooms
  'G_MEN':          { id: 'G_MEN', floor: 0, x: 665, y: 50, isRoom: true, label: "Men's Washroom" },
  'G_WOMEN':        { id: 'G_WOMEN', floor: 0, x: 800, y: 117, isRoom: true, label: "Women's Washroom" },
  'G_DATA':         { id: 'G_DATA', floor: 0, x: 770, y: 237, isRoom: true, label: "Data Centre" },
  'G_LIFT':         { id: 'G_LIFT', floor: 0, x: 690, y: 295, isRoom: true, label: "Lift", isTransit: true },
  'G_DISCUSSION':   { id: 'G_DISCUSSION', floor: 0, x: 770, y: 380, isRoom: true, label: "Discussion Room" },
  'G_FACULTY':      { id: 'G_FACULTY', floor: 0, x: 724, y: 475, isRoom: true, label: "Faculty Room" },
  'G_SERVER':       { id: 'G_SERVER', floor: 0, x: 825, y: 475, isRoom: true, label: "Server Room" },
  'G_LAB':          { id: 'G_LAB', floor: 0, x: 735, y: 600, isRoom: true, label: "Ground Floor Lab" },
  'G_SEMINAR':      { id: 'G_SEMINAR', floor: 0, x: 220, y: 535, isRoom: true, label: "Seminar Hall" },

  // First Floor Main Vertical Spine (x = 680)
  '1_CORR_1': { id: '1_CORR_1', floor: 1, x: 680, y: 60, isRoom: false },
  '1_CORR_JOIN': { id: '1_CORR_JOIN', floor: 1, x: 680, y: 240, isRoom: false }, // True Intersection to Wing
  '1_CORR_2': { id: '1_CORR_2', floor: 1, x: 680, y: 290, isRoom: false },
  '1_CORR_3': { id: '1_CORR_3', floor: 1, x: 680, y: 350, isRoom: false },
  '1_CORR_4': { id: '1_CORR_4', floor: 1, x: 680, y: 410, isRoom: false },
  '1_CORR_5': { id: '1_CORR_5', floor: 1, x: 680, y: 505, isRoom: false },
  '1_CORR_6': { id: '1_CORR_6', floor: 1, x: 680, y: 625, isRoom: false },
  
  // First Floor Angled Diagonal Wing Pathing (Slope = -0.577, perfectly parallel to -30° rotation)
  '1_WING_1': { id: '1_WING_1', floor: 1, x: 530, y: 327, isRoom: false },
  '1_WING_2': { id: '1_WING_2', floor: 1, x: 380, y: 413, isRoom: false },

  // First Floor Rooms
  '1_LIBRARY':      { id: '1_LIBRARY', floor: 1, x: 640, y: 60, isRoom: true, label: "Library" },
  '1_LIFT':         { id: '1_LIFT', floor: 1, x: 730, y: 290, isRoom: true, label: "Lift", isTransit: true },
  '1_HOD':          { id: '1_HOD', floor: 1, x: 780, y: 350, isRoom: true, label: "HOD Office" },
  '1_INFO':         { id: '1_INFO', floor: 1, x: 780, y: 410, isRoom: true, label: "Information Desk" },
  '1_STAFF':        { id: '1_STAFF', floor: 1, x: 780, y: 505, isRoom: true, label: "Staff Room" },
  '1_ET101':        { id: '1_ET101', floor: 1, x: 710, y: 625, isRoom: true, label: "ET-101 Lecture Hall" },
  '1_LAB':          { id: '1_LAB', floor: 1, x: 350, y: 430, isRoom: true, label: "Advanced Lab" },
  '1_DSPLAB':       { id: '1_DSPLAB', floor: 1, x: 200, y: 517, isRoom: true, label: "DSP Lab" } 
};

// --- DYNAMIC EDGE DEFINITIONS ---
// Defining logical connections. The system will auto-calculate exact geometric distances.
const CONNECTIONS = [
  // Ground Floor
  ['G_CORR_1', 'G_CORR_2'], ['G_CORR_2', 'G_CORR_3'], ['G_CORR_3', 'G_CORR_4'],
  ['G_CORR_4', 'G_CORR_JOIN'], ['G_CORR_JOIN', 'G_CORR_5'], ['G_CORR_5', 'G_CORR_6'], ['G_CORR_6', 'G_CORR_7'],
  ['G_CORR_JOIN', 'G_WING_1'], ['G_WING_1', 'G_WING_2'], ['G_WING_2', 'G_SEMINAR'],
  ['G_CORR_1', 'G_MEN'], ['G_CORR_2', 'G_WOMEN'], ['G_CORR_3', 'G_DATA'],
  ['G_CORR_4', 'G_LIFT'], ['G_CORR_5', 'G_DISCUSSION'], ['G_CORR_6', 'G_FACULTY'], 
  ['G_CORR_6', 'G_SERVER'], ['G_CORR_7', 'G_LAB'],

  // First Floor
  ['1_CORR_1', '1_CORR_JOIN'], ['1_CORR_JOIN', '1_CORR_2'], ['1_CORR_2', '1_CORR_3'], 
  ['1_CORR_3', '1_CORR_4'], ['1_CORR_4', '1_CORR_5'], ['1_CORR_5', '1_CORR_6'],
  ['1_CORR_JOIN', '1_WING_1'], ['1_WING_1', '1_WING_2'], ['1_WING_2', '1_LAB'], ['1_WING_2', '1_DSPLAB'],
  ['1_CORR_1', '1_LIBRARY'], ['1_CORR_2', '1_LIFT'], ['1_CORR_3', '1_HOD'], 
  ['1_CORR_4', '1_INFO'], ['1_CORR_5', '1_STAFF'], ['1_CORR_6', '1_ET101'],

  // Vertical Transit
  ['G_LIFT', '1_LIFT']
];

// Compile Adjacency List with exact Euclidean distances automatically
const EDGES = {};
Object.keys(NODES).forEach(id => EDGES[id] = []);

CONNECTIONS.forEach(([a, b]) => {
  const nodeA = NODES[a];
  const nodeB = NODES[b];
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  
  if (nodeA.floor !== nodeB.floor) dist += 1000; // Heavy penalty for cross-floor to optimize local pathing first

  EDGES[a].push({ to: b, w: dist });
  EDGES[b].push({ to: a, w: dist });
});

// --- A* ALGORITHM ENGINE ---
function heuristic(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  const floorDifference = Math.abs(nodeA.floor - nodeB.floor) * 1000;
  return Math.sqrt(dx * dx + dy * dy) + floorDifference;
}

function findShortestPathAStar(startId, endId) {
  if (!NODES[startId] || !NODES[endId]) return [];
  const openSet = [startId];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};
  
  Object.keys(NODES).forEach(key => {
    gScore[key] = Infinity;
    fScore[key] = Infinity;
  });
  
  gScore[startId] = 0;
  fScore[startId] = heuristic(NODES[startId], NODES[endId]);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    const current = openSet.shift();

    if (current === endId) {
      const path = [];
      let temp = current;
      while (temp) {
        path.push(temp);
        temp = cameFrom[temp];
      }
      return path.reverse();
    }

    const neighbors = EDGES[current] || [];
    for (let neighbor of neighbors) {
      const tentativeGScore = gScore[current] + neighbor.w;
      if (tentativeGScore < gScore[neighbor.to]) {
        cameFrom[neighbor.to] = current;
        gScore[neighbor.to] = tentativeGScore;
        fScore[neighbor.to] = gScore[neighbor.to] + heuristic(NODES[neighbor.to], NODES[endId]);
        if (!openSet.includes(neighbor.to)) {
          openSet.push(neighbor.to);
        }
      }
    }
  }
  return [];
}

export default function App() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [sourceNode, setSourceNode] = useState('');
  const [destNode, setDestNode] = useState('');
  const [calculatedPath, setCalculatedPath] = useState([]);
  const [activeSelectionMode, setActiveSelectionMode] = useState('src');

  const roomOptions = useMemo(() => {
    return Object.values(NODES)
      .filter(n => n.isRoom)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

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
      `}</style>

      {/* HEADER BAR */}
      <header className="flex h-16 items-center justify-between px-8 border-b border-white/5 bg-black/60 backdrop-blur-xl z-20">
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
          <button 
            onClick={() => setCurrentFloor(0)}
            className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${currentFloor === 0 ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            Ground Floor
          </button>
          <button 
            onClick={() => setCurrentFloor(1)}
            className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${currentFloor === 1 ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
          >
            1st Floor
          </button>
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
                      {node.label} (Level {node.floor === 0 ? 'G' : '1'})
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
                      {node.label} (Level {node.floor === 0 ? 'G' : '1'})
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
                  <div className="text-[10px] text-cyan-400 font-mono bg-black/40 px-2 py-1 rounded inline-block border border-cyan-500/20">
                    Nodes traversed: {calculatedPath.length}
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

              {/* === GROUND FLOOR LAYER === */}
              {currentFloor === 0 && (
                <g id="g-floor-group" className="animate-fade-in">
                  {/* MAIN CORRIDORS */}
                  <rect x="600" y="80" width="70" height="450" rx="4" className="structural-spine" />
                  <rect x="600" y="80" width="125" height="70" rx="4" className="structural-spine" />

                  <g onClick={() => handleMapNodeClick('G_MEN')}>
                    <rect x="600" y="20" width="130" height="60" rx="4" className="room-core" fill={getRoomFill('G_MEN')} stroke={getRoomStroke('G_MEN')} strokeWidth="1.5" />
                    <text x="665" y="54" className="room-txt">MEN'S WR</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_WOMEN')}>
                    <rect x="725" y="85" width="150" height="65" rx="4" className="room-core" fill={getRoomFill('G_WOMEN')} stroke={getRoomStroke('G_WOMEN')} strokeWidth="1.5" />
                    <text x="800" y="121" className="room-txt">WOMEN'S WR</text>
                  </g>

                  {/* CONNECTING CORRIDOR STRIP (Former Stairs) */}
                  <g transform="rotate(-28 520 300) translate(460,270)">
                    <rect x="0" y="0" width="140" height="25" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
                    {[15, 30, 45, 60, 75, 90, 105, 120].map(v => <line key={`h1-${v}`} x1={v} y1="0" x2={v} y2="25" className="stair-hatch" />)}
                    <rect x="0" y="30" width="140" height="25" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
                    {[15, 30, 45, 60, 75, 90, 105, 120].map(v => <line key={`h2-${v}`} x1={v} y1="30" x2={v} y2="55" className="stair-hatch" />)}
                  </g>

                  {/* ANGLED CONNECTOR BUFFER */}
                  <g transform="rotate(-28 520 680)">
                    <rect x="460" y="290" width="170" height="170" rx="4" className="structural-spine" />
                  </g>

                  <g transform="rotate(-28 300 650)" onClick={() => handleMapNodeClick('G_SEMINAR')}>
                    <rect x="120" y="380" width="300" height="180" rx="4" className="room-core" fill={getRoomFill('G_SEMINAR')} stroke={getRoomStroke('G_SEMINAR')} strokeWidth="1.5" />
                    <text x="270" y="475" className="room-txt">SEMINAR HALL</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_DATA')}>
                    <rect x="670" y="202" width="200" height="70" rx="4" className="room-core" fill={getRoomFill('G_DATA')} stroke={getRoomStroke('G_DATA')} strokeWidth="1.5" />
                    <text x="770" y="241" className="room-txt">DATA CENTRE</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_DISCUSSION')}>
                    <rect x="670" y="320" width="200" height="120" rx="4" className="room-core" fill={getRoomFill('G_DISCUSSION')} stroke={getRoomStroke('G_DISCUSSION')} strokeWidth="1.5" />
                    <text x="770" y="385" className="room-txt">DISCUSSION</text>
                  </g>

                  {/* CORE LIFT */}
                  <g onClick={() => handleMapNodeClick('G_LIFT')} className="cursor-crosshair group">
                    <rect x="670" y="275" width="40" height="40" rx="4" fill={getRoomFill('G_LIFT', '#1e3a8a')} stroke={getRoomStroke('G_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
                    <text x="690" y="299" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_FACULTY')}>
                    <rect x="670" y="440" width="109" height="70" rx="4" className="room-core" fill={getRoomFill('G_FACULTY')} stroke={getRoomStroke('G_FACULTY')} strokeWidth="1.5" />
                    <text x="724" y="479" className="room-txt">FACULTY</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_SERVER')}>
                    <rect x="780" y="440" width="90" height="70" rx="4" className="room-core" fill={getRoomFill('G_SERVER')} stroke={getRoomStroke('G_SERVER')} strokeWidth="1.5" />
                    <text x="825" y="479" className="room-txt" style={{ fontSize: '9px' }}>SERVER</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('G_LAB')}>
                    <rect x="600" y="510" width="270" height="180" rx="4" className="room-core" fill={getRoomFill('G_LAB')} stroke={getRoomStroke('G_LAB')} strokeWidth="1.5" />
                    <text x="735" y="605" className="room-txt">CORE LAB</text>
                  </g>
                </g>
              )}

              {/* === FIRST FLOOR LAYER === */}
              {currentFloor === 1 && (
                <g id="1-floor-group" className="animate-fade-in">
                  {/* MAIN CORRIDORS */}
                  <rect x="650" y="80" width="60" height="500" rx="4" className="structural-spine" />
                  <rect x="750" y="100" width="100" height="210" rx="4" className="structural-spine" />
                  <rect x="650" y="100" width="100" height="210" rx="4" className="structural-spine" />

                  {/* ANGLED CORRIDOR BUFFER */}
                  <g transform="rotate(-30 460 350)">
                    <rect x="285" y="255" width="450" height="80" rx="4" className="structural-spine" />
                  </g>

                  <g onClick={() => handleMapNodeClick('1_LIBRARY')}>
                    <rect x="570" y="20" width="140" height="80" rx="4" className="room-core" fill={getRoomFill('1_LIBRARY')} stroke={getRoomStroke('1_LIBRARY')} strokeWidth="1.5" />
                    <text x="640" y="64" className="room-txt">LIBRARY</text>
                  </g>

                  {/* CONNECTING CORRIDOR STRIP */}
                  <g transform="rotate(-30 590 450) translate(690,180)">
                    <rect width="120" height="20" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
                    {[15, 30, 45, 60, 75, 90].map(v => <line key={`h3-${v}`} x1={v} y1="0" x2={v} y2="20" className="stair-hatch" />)}
                  </g>

                  <g transform="rotate(-30 300 450)" onClick={() => handleMapNodeClick('1_DSPLAB')}>
                    <rect x="100" y="350" width="220" height="180" rx="4" className="room-core" fill={getRoomFill('1_DSPLAB')} stroke={getRoomStroke('1_DSPLAB')} strokeWidth="1.5" />
                    <text x="210" y="444" className="room-txt">DSP LAB</text>
                  </g>

                  <g transform="rotate(-30 450 420)" onClick={() => handleMapNodeClick('1_LAB')}>
                    <rect x="325" y="350" width="90" height="100" rx="4" className="room-core" fill={getRoomFill('1_LAB')} stroke={getRoomStroke('1_LAB')} strokeWidth="1.5" />
                    <text x="370" y="404" className="room-txt">ADV LAB</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('1_LIFT')} className="cursor-crosshair group">
                    <rect x="710" y="270" width="40" height="40" rx="4" fill={getRoomFill('1_LIFT', '#1e3a8a')} stroke={getRoomStroke('1_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
                    <text x="730" y="294" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('1_HOD')}>
                    <rect x="710" y="310" width="140" height="80" rx="4" className="room-core" fill={getRoomFill('1_HOD')} stroke={getRoomStroke('1_HOD')} strokeWidth="1.5" />
                    <text x="780" y="354" className="room-txt">HOD OFFICE</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('1_INFO')}>
                    <rect x="710" y="390" width="140" height="40" rx="4" className="room-core" fill={getRoomFill('1_INFO')} stroke={getRoomStroke('1_INFO')} strokeWidth="1.5" />
                    <text x="780" y="413" className="room-txt" style={{ fontSize: '9px' }}>INFO DESK</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('1_STAFF')}>
                    <rect x="710" y="430" width="140" height="150" rx="4" className="room-core" fill={getRoomFill('1_STAFF')} stroke={getRoomStroke('1_STAFF')} strokeWidth="1.5" />
                    <text x="780" y="509" className="room-txt">STAFF ROOM</text>
                  </g>

                  <g onClick={() => handleMapNodeClick('1_ET101')}>
                    <rect x="650" y="580" width="120" height="90" rx="4" className="room-core" fill={getRoomFill('1_ET101')} stroke={getRoomStroke('1_ET101')} strokeWidth="1.5" />
                    <text x="710" y="629" className="room-txt">ET-101</text>
                  </g>
                </g>
              )}

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