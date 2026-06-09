// --- FLOOR METADATA (drives the switcher + dropdown labels) ---
export const FLOORS = [
  { id: 0, label: 'Ground Floor', short: 'G' },
  { id: 1, label: '1st Floor', short: '1' },
  { id: 2, label: '2nd Floor', short: '2' },
  { id: 3, label: '3rd Floor', short: '3' },
];

// --- GLOBAL NODE COORDINATES ---
export const NODES = {
  // Ground Floor Main Vertical Spine (x = 635)
  'G_CORR_1': { id: 'G_CORR_1', floor: 0, x: 635, y: 50, isRoom: false },
  'G_CORR_2': { id: 'G_CORR_2', floor: 0, x: 635, y: 117, isRoom: false },
  'G_CORR_3': { id: 'G_CORR_3', floor: 0, x: 635, y: 237, isRoom: false },
  'G_CORR_4': { id: 'G_CORR_4', floor: 0, x: 635, y: 295, isRoom: false },
  'G_CORR_JOIN': { id: 'G_CORR_JOIN', floor: 0, x: 635, y: 315, isRoom: false },
  'G_CORR_5': { id: 'G_CORR_5', floor: 0, x: 635, y: 380, isRoom: false },
  'G_CORR_6': { id: 'G_CORR_6', floor: 0, x: 635, y: 475, isRoom: false },
  'G_CORR_7': { id: 'G_CORR_7', floor: 0, x: 635, y: 600, isRoom: false },

  'G_WING_1': { id: 'G_WING_1', floor: 0, x: 500, y: 387, isRoom: false },
  'G_WING_2': { id: 'G_WING_2', floor: 0, x: 350, y: 466, isRoom: false },

  'G_MEN':        { id: 'G_MEN', floor: 0, x: 665, y: 50, isRoom: true, label: "Men's Washroom" },
  'G_WOMEN':      { id: 'G_WOMEN', floor: 0, x: 800, y: 117, isRoom: true, label: "Women's Washroom" },
  'G_DATA':       { id: 'G_DATA', floor: 0, x: 770, y: 237, isRoom: true, label: "Data Centre" },
  'G_LIFT':       { id: 'G_LIFT', floor: 0, x: 690, y: 295, isRoom: true, label: "Lift", isTransit: true },
  'G_DISCUSSION': { id: 'G_DISCUSSION', floor: 0, x: 770, y: 380, isRoom: true, label: "Discussion Room" },
  'G_FACULTY':    { id: 'G_FACULTY', floor: 0, x: 724, y: 475, isRoom: true, label: "Faculty Room" },
  'G_SERVER':     { id: 'G_SERVER', floor: 0, x: 825, y: 475, isRoom: true, label: "Server Room" },
  'G_LAB':        { id: 'G_LAB', floor: 0, x: 735, y: 600, isRoom: true, label: "Ground Floor Lab" },
  'G_SEMINAR':    { id: 'G_SEMINAR', floor: 0, x: 220, y: 535, isRoom: true, label: "Seminar Hall" },

  // First Floor Main Vertical Spine (x = 680)
  '1_CORR_1': { id: '1_CORR_1', floor: 1, x: 680, y: 60, isRoom: false },
  '1_CORR_JOIN': { id: '1_CORR_JOIN', floor: 1, x: 680, y: 240, isRoom: false },
  '1_CORR_2': { id: '1_CORR_2', floor: 1, x: 680, y: 290, isRoom: false },
  '1_CORR_3': { id: '1_CORR_3', floor: 1, x: 680, y: 350, isRoom: false },
  '1_CORR_4': { id: '1_CORR_4', floor: 1, x: 680, y: 410, isRoom: false },
  '1_CORR_5': { id: '1_CORR_5', floor: 1, x: 680, y: 505, isRoom: false },
  '1_CORR_6': { id: '1_CORR_6', floor: 1, x: 680, y: 625, isRoom: false },

  '1_WING_1': { id: '1_WING_1', floor: 1, x: 530, y: 327, isRoom: false },
  '1_WING_2': { id: '1_WING_2', floor: 1, x: 380, y: 413, isRoom: false },

  '1_LIBRARY': { id: '1_LIBRARY', floor: 1, x: 640, y: 60, isRoom: true, label: "Library" },
  '1_LIFT':    { id: '1_LIFT', floor: 1, x: 730, y: 290, isRoom: true, label: "Lift", isTransit: true },
  '1_HOD':     { id: '1_HOD', floor: 1, x: 780, y: 350, isRoom: true, label: "HOD Office" },
  '1_INFO':    { id: '1_INFO', floor: 1, x: 780, y: 410, isRoom: true, label: "Information Desk" },
  '1_STAFF':   { id: '1_STAFF', floor: 1, x: 780, y: 505, isRoom: true, label: "Staff Room" },
  '1_ET101':   { id: '1_ET101', floor: 1, x: 710, y: 625, isRoom: true, label: "ET-101 Lecture Hall" },
  '1_LAB':     { id: '1_LAB', floor: 1, x: 350, y: 430, isRoom: true, label: "Advanced Lab" },
  '1_DSPLAB':  { id: '1_DSPLAB', floor: 1, x: 200, y: 517, isRoom: true, label: "DSP Lab" },

  // Second Floor — right wing vertical hallway (x = 660), lift + stairs at top
  '2_CORR_1': { id: '2_CORR_1', floor: 2, x: 660, y: 200, isRoom: false }, // top: lift + bridge junction
  '2_CORR_2': { id: '2_CORR_2', floor: 2, x: 660, y: 270, isRoom: false }, // by ET-201
  '2_CORR_3': { id: '2_CORR_3', floor: 2, x: 660, y: 390, isRoom: false }, // by ET-202
  '2_CORR_4': { id: '2_CORR_4', floor: 2, x: 660, y: 500, isRoom: false }, // by ET-203
  '2_WING_1': { id: '2_WING_1', floor: 2, x: 470, y: 215, isRoom: false }, // bridge into left cluster

  // Second Floor Rooms
  '2_LIFT':  { id: '2_LIFT', floor: 2, x: 712, y: 175, isRoom: true, label: "Lift", isTransit: true },
  '2_ET201': { id: '2_ET201', floor: 2, x: 787, y: 270, isRoom: true, label: "ET-201" },
  '2_ET202': { id: '2_ET202', floor: 2, x: 787, y: 390, isRoom: true, label: "ET-202" },
  '2_ET203': { id: '2_ET203', floor: 2, x: 787, y: 500, isRoom: true, label: "ET-203" },
  '2_LAB':   { id: '2_LAB', floor: 2, x: 342, y: 305, isRoom: true, label: "Second Floor Lab" },
  '2_PG':    { id: '2_PG', floor: 2, x: 542, y: 280, isRoom: true, label: "PG Classroom" },
  '2_FREE':  { id: '2_FREE', floor: 2, x: 542, y: 372, isRoom: true, label: "Free Space" },
  '2_STAFF': { id: '2_STAFF', floor: 2, x: 442, y: 470, isRoom: true, label: "Second Floor Staff Room" },

  // Third Floor — top washrooms, angled corridor, right-side room column
  '3_CORR_TOP': { id: '3_CORR_TOP', floor: 3, x: 410, y: 180, isRoom: false }, // below washrooms
  '3_WING':     { id: '3_WING', floor: 3, x: 545, y: 250, isRoom: false },     // angled link
  '3_CORR_1':   { id: '3_CORR_1', floor: 3, x: 660, y: 320, isRoom: false },   // lift area
  '3_CORR_2':   { id: '3_CORR_2', floor: 3, x: 660, y: 405, isRoom: false },   // by ET-301
  '3_CORR_3':   { id: '3_CORR_3', floor: 3, x: 660, y: 520, isRoom: false },   // by LAB

  // Third Floor Rooms
  '3_MEN':   { id: '3_MEN', floor: 3, x: 325, y: 125, isRoom: true, label: "Third Floor Men's Washroom" },
  '3_WOMEN': { id: '3_WOMEN', floor: 3, x: 485, y: 125, isRoom: true, label: "Third Floor Women's Washroom" },
  '3_LIFT':  { id: '3_LIFT', floor: 3, x: 712, y: 315, isRoom: true, label: "Lift", isTransit: true },
  '3_ET301': { id: '3_ET301', floor: 3, x: 785, y: 400, isRoom: true, label: "ET-301" },
  '3_LAB':   { id: '3_LAB', floor: 3, x: 787, y: 530, isRoom: true, label: "Third Floor Lab" },
};

// --- EDGE DEFINITIONS (logical; distances auto-computed) ---
export const CONNECTIONS = [
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

  // Second Floor (right hallway + bridge to left cluster)
  ['2_CORR_1', '2_CORR_2'], ['2_CORR_2', '2_CORR_3'], ['2_CORR_3', '2_CORR_4'],
  ['2_CORR_1', '2_WING_1'], ['2_CORR_1', '2_LIFT'],
  ['2_CORR_2', '2_ET201'], ['2_CORR_3', '2_ET202'], ['2_CORR_4', '2_ET203'],
  ['2_WING_1', '2_LAB'], ['2_WING_1', '2_PG'], ['2_PG', '2_FREE'], ['2_LAB', '2_STAFF'],

  // Third Floor (washrooms -> angled corridor -> right room column)
  ['3_MEN', '3_CORR_TOP'], ['3_WOMEN', '3_CORR_TOP'],
  ['3_CORR_TOP', '3_WING'], ['3_WING', '3_CORR_1'],
  ['3_CORR_1', '3_LIFT'], ['3_CORR_1', '3_CORR_2'], ['3_CORR_2', '3_CORR_3'],
  ['3_CORR_2', '3_ET301'], ['3_CORR_3', '3_LAB'],

  // Vertical Transit
  ['G_LIFT', '1_LIFT'], ['1_LIFT', '2_LIFT'], ['2_LIFT', '3_LIFT'],
];

// --- ADJACENCY LIST with exact Euclidean distances ---
export const EDGES = {};
Object.keys(NODES).forEach(id => { EDGES[id] = []; });

CONNECTIONS.forEach(([a, b]) => {
  const nodeA = NODES[a];
  const nodeB = NODES[b];
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (nodeA.floor !== nodeB.floor) dist += 1000; // penalty: prefer local pathing
  EDGES[a].push({ to: b, w: dist });
  EDGES[b].push({ to: a, w: dist });
});

// --- A* ENGINE ---
function heuristic(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  const floorDifference = Math.abs(nodeA.floor - nodeB.floor) * 1000;
  return Math.sqrt(dx * dx + dy * dy) + floorDifference;
}

export function findShortestPathAStar(startId, endId) {
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
    for (const neighbor of neighbors) {
      const tentativeGScore = gScore[current] + neighbor.w;
      if (tentativeGScore < gScore[neighbor.to]) {
        cameFrom[neighbor.to] = current;
        gScore[neighbor.to] = tentativeGScore;
        fScore[neighbor.to] = gScore[neighbor.to] + heuristic(NODES[neighbor.to], NODES[endId]);
        if (!openSet.includes(neighbor.to)) openSet.push(neighbor.to);
      }
    }
  }
  return [];
}

// --- ROOM OPTIONS for dropdowns (rooms only, sorted by label) ---
export function getRoomOptions() {
  return Object.values(NODES)
    .filter(n => n.isRoom)
    .sort((a, b) => a.label.localeCompare(b.label));
}
