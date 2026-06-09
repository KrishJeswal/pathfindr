export default function FloorPlans({ floor, getRoomFill, getRoomStroke, onNodeClick }) {
  return (
    <>
      {/* === GROUND FLOOR LAYER === */}
      {floor === 0 && (
        <g id="g-floor-group" className="animate-fade-in">
          <rect x="600" y="80" width="70" height="450" rx="4" className="structural-spine" />
          <rect x="600" y="80" width="125" height="70" rx="4" className="structural-spine" />

          <g onClick={() => onNodeClick('G_MEN')}>
            <rect x="600" y="20" width="130" height="60" rx="4" className="room-core" fill={getRoomFill('G_MEN')} stroke={getRoomStroke('G_MEN')} strokeWidth="1.5" />
            <text x="665" y="54" className="room-txt">MEN'S WR</text>
          </g>

          <g onClick={() => onNodeClick('G_WOMEN')}>
            <rect x="725" y="85" width="150" height="65" rx="4" className="room-core" fill={getRoomFill('G_WOMEN')} stroke={getRoomStroke('G_WOMEN')} strokeWidth="1.5" />
            <text x="800" y="121" className="room-txt">WOMEN'S WR</text>
          </g>

          <g transform="rotate(-28 520 300) translate(460,270)">
            <rect x="0" y="0" width="140" height="25" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
            {[15, 30, 45, 60, 75, 90, 105, 120].map(v => <line key={`h1-${v}`} x1={v} y1="0" x2={v} y2="25" className="stair-hatch" />)}
            <rect x="0" y="30" width="140" height="25" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
            {[15, 30, 45, 60, 75, 90, 105, 120].map(v => <line key={`h2-${v}`} x1={v} y1="30" x2={v} y2="55" className="stair-hatch" />)}
          </g>

          <g transform="rotate(-28 520 680)">
            <rect x="460" y="290" width="170" height="170" rx="4" className="structural-spine" />
          </g>

          <g transform="rotate(-28 300 650)" onClick={() => onNodeClick('G_SEMINAR')}>
            <rect x="120" y="380" width="300" height="180" rx="4" className="room-core" fill={getRoomFill('G_SEMINAR')} stroke={getRoomStroke('G_SEMINAR')} strokeWidth="1.5" />
            <text x="270" y="475" className="room-txt">SEMINAR HALL</text>
          </g>

          <g onClick={() => onNodeClick('G_DATA')}>
            <rect x="670" y="202" width="200" height="70" rx="4" className="room-core" fill={getRoomFill('G_DATA')} stroke={getRoomStroke('G_DATA')} strokeWidth="1.5" />
            <text x="770" y="241" className="room-txt">DATA CENTRE</text>
          </g>

          <g onClick={() => onNodeClick('G_DISCUSSION')}>
            <rect x="670" y="320" width="200" height="120" rx="4" className="room-core" fill={getRoomFill('G_DISCUSSION')} stroke={getRoomStroke('G_DISCUSSION')} strokeWidth="1.5" />
            <text x="770" y="385" className="room-txt">DISCUSSION</text>
          </g>

          <g onClick={() => onNodeClick('G_LIFT')} className="cursor-crosshair group">
            <rect x="670" y="275" width="40" height="40" rx="4" fill={getRoomFill('G_LIFT', '#1e3a8a')} stroke={getRoomStroke('G_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
            <text x="690" y="299" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
          </g>

          <g onClick={() => onNodeClick('G_FACULTY')}>
            <rect x="670" y="440" width="109" height="70" rx="4" className="room-core" fill={getRoomFill('G_FACULTY')} stroke={getRoomStroke('G_FACULTY')} strokeWidth="1.5" />
            <text x="724" y="479" className="room-txt">FACULTY</text>
          </g>

          <g onClick={() => onNodeClick('G_SERVER')}>
            <rect x="780" y="440" width="90" height="70" rx="4" className="room-core" fill={getRoomFill('G_SERVER')} stroke={getRoomStroke('G_SERVER')} strokeWidth="1.5" />
            <text x="825" y="479" className="room-txt" style={{ fontSize: '9px' }}>SERVER</text>
          </g>

          <g onClick={() => onNodeClick('G_LAB')}>
            <rect x="600" y="510" width="270" height="180" rx="4" className="room-core" fill={getRoomFill('G_LAB')} stroke={getRoomStroke('G_LAB')} strokeWidth="1.5" />
            <text x="735" y="605" className="room-txt">CORE LAB</text>
          </g>
        </g>
      )}

      {/* === FIRST FLOOR LAYER === */}
      {floor === 1 && (
        <g id="1-floor-group" className="animate-fade-in">
          <rect x="650" y="80" width="60" height="500" rx="4" className="structural-spine" />
          <rect x="750" y="100" width="100" height="210" rx="4" className="structural-spine" />
          <rect x="650" y="100" width="100" height="210" rx="4" className="structural-spine" />

          <g transform="rotate(-30 460 350)">
            <rect x="285" y="255" width="450" height="80" rx="4" className="structural-spine" />
          </g>

          <g onClick={() => onNodeClick('1_LIBRARY')}>
            <rect x="570" y="20" width="140" height="80" rx="4" className="room-core" fill={getRoomFill('1_LIBRARY')} stroke={getRoomStroke('1_LIBRARY')} strokeWidth="1.5" />
            <text x="640" y="64" className="room-txt">LIBRARY</text>
          </g>

          <g transform="rotate(-30 590 450) translate(690,180)">
            <rect width="120" height="20" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
            {[15, 30, 45, 60, 75, 90].map(v => <line key={`h3-${v}`} x1={v} y1="0" x2={v} y2="20" className="stair-hatch" />)}
          </g>

          <g transform="rotate(-30 300 450)" onClick={() => onNodeClick('1_DSPLAB')}>
            <rect x="100" y="350" width="220" height="180" rx="4" className="room-core" fill={getRoomFill('1_DSPLAB')} stroke={getRoomStroke('1_DSPLAB')} strokeWidth="1.5" />
            <text x="210" y="444" className="room-txt">DSP LAB</text>
          </g>

          <g transform="rotate(-30 450 420)" onClick={() => onNodeClick('1_LAB')}>
            <rect x="325" y="350" width="90" height="100" rx="4" className="room-core" fill={getRoomFill('1_LAB')} stroke={getRoomStroke('1_LAB')} strokeWidth="1.5" />
            <text x="370" y="404" className="room-txt">ADV LAB</text>
          </g>

          <g onClick={() => onNodeClick('1_LIFT')} className="cursor-crosshair group">
            <rect x="710" y="270" width="40" height="40" rx="4" fill={getRoomFill('1_LIFT', '#1e3a8a')} stroke={getRoomStroke('1_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
            <text x="730" y="294" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
          </g>

          <g onClick={() => onNodeClick('1_HOD')}>
            <rect x="710" y="310" width="140" height="80" rx="4" className="room-core" fill={getRoomFill('1_HOD')} stroke={getRoomStroke('1_HOD')} strokeWidth="1.5" />
            <text x="780" y="354" className="room-txt">HOD OFFICE</text>
          </g>

          <g onClick={() => onNodeClick('1_INFO')}>
            <rect x="710" y="390" width="140" height="40" rx="4" className="room-core" fill={getRoomFill('1_INFO')} stroke={getRoomStroke('1_INFO')} strokeWidth="1.5" />
            <text x="780" y="413" className="room-txt" style={{ fontSize: '9px' }}>INFO DESK</text>
          </g>

          <g onClick={() => onNodeClick('1_STAFF')}>
            <rect x="710" y="430" width="140" height="150" rx="4" className="room-core" fill={getRoomFill('1_STAFF')} stroke={getRoomStroke('1_STAFF')} strokeWidth="1.5" />
            <text x="780" y="509" className="room-txt">STAFF ROOM</text>
          </g>

          <g onClick={() => onNodeClick('1_ET101')}>
            <rect x="650" y="580" width="120" height="90" rx="4" className="room-core" fill={getRoomFill('1_ET101')} stroke={getRoomStroke('1_ET101')} strokeWidth="1.5" />
            <text x="710" y="629" className="room-txt">ET-101</text>
          </g>
        </g>
      )}

      {/* === SECOND FLOOR LAYER === */}
      {floor === 2 && (
        <g id="2-floor-group" className="animate-fade-in">
          {/* Right hallway spine + bridge to the left cluster */}
          <rect x="635" y="150" width="50" height="400" rx="4" className="structural-spine" />
          <rect x="400" y="190" width="250" height="45" rx="4" className="structural-spine" />

          {/* Stairs at the top of the hallway, beside the lift */}
          <g transform="translate(690,112)">
            <rect width="90" height="32" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
            {[15, 30, 45, 60, 75].map(v => <line key={`f2s-${v}`} x1={v} y1="0" x2={v} y2="32" className="stair-hatch" />)}
          </g>

          <g onClick={() => onNodeClick('2_LIFT')} className="cursor-crosshair group">
            <rect x="690" y="153" width="45" height="45" rx="4" fill={getRoomFill('2_LIFT', '#1e3a8a')} stroke={getRoomStroke('2_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
            <text x="712" y="180" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
          </g>

          {/* ET rooms stacked uniformly down the right of the hallway */}
          <g onClick={() => onNodeClick('2_ET201')}>
            <rect x="690" y="215" width="195" height="110" rx="4" className="room-core" fill={getRoomFill('2_ET201')} stroke={getRoomStroke('2_ET201')} strokeWidth="1.5" />
            <text x="787" y="274" className="room-txt">ET-201</text>
          </g>
          <g onClick={() => onNodeClick('2_ET202')}>
            <rect x="690" y="335" width="195" height="110" rx="4" className="room-core" fill={getRoomFill('2_ET202')} stroke={getRoomStroke('2_ET202')} strokeWidth="1.5" />
            <text x="787" y="394" className="room-txt">ET-202</text>
          </g>
          <g onClick={() => onNodeClick('2_ET203')}>
            <rect x="690" y="455" width="195" height="110" rx="4" className="room-core" fill={getRoomFill('2_ET203')} stroke={getRoomStroke('2_ET203')} strokeWidth="1.5" />
            <text x="787" y="514" className="room-txt">ET-203</text>
          </g>

          {/* Left cluster reached over the bridge */}
          <g onClick={() => onNodeClick('2_LAB')}>
            <rect x="250" y="240" width="185" height="130" rx="4" className="room-core" fill={getRoomFill('2_LAB')} stroke={getRoomStroke('2_LAB')} strokeWidth="1.5" />
            <text x="342" y="308" className="room-txt">LAB</text>
          </g>
          <g onClick={() => onNodeClick('2_PG')}>
            <rect x="450" y="240" width="185" height="80" rx="4" className="room-core" fill={getRoomFill('2_PG')} stroke={getRoomStroke('2_PG')} strokeWidth="1.5" />
            <text x="542" y="285" className="room-txt">PG CLASSROOM</text>
          </g>
          <g onClick={() => onNodeClick('2_FREE')}>
            <rect x="450" y="332" width="185" height="78" rx="4" className="room-core" fill={getRoomFill('2_FREE')} stroke={getRoomStroke('2_FREE')} strokeWidth="1.5" />
            <text x="542" y="375" className="room-txt">FREE SPACE</text>
          </g>
          <g onClick={() => onNodeClick('2_STAFF')}>
            <rect x="250" y="420" width="385" height="115" rx="4" className="room-core" fill={getRoomFill('2_STAFF')} stroke={getRoomStroke('2_STAFF')} strokeWidth="1.5" />
            <text x="442" y="481" className="room-txt">STAFF ROOM</text>
          </g>
        </g>
      )}

      {/* === THIRD FLOOR LAYER === */}
      {floor === 3 && (
        <g id="3-floor-group" className="animate-fade-in">
          {/* Top washroom corridor, angled link, right vertical corridor */}
          <rect x="250" y="160" width="320" height="40" rx="4" className="structural-spine" />
          <g transform="rotate(36 545 250)">
            <rect x="523" y="170" width="44" height="170" rx="4" className="structural-spine" />
          </g>
          <rect x="635" y="290" width="50" height="270" rx="4" className="structural-spine" />

          {/* Washrooms top-left, side by side */}
          <g onClick={() => onNodeClick('3_MEN')}>
            <rect x="250" y="90" width="150" height="70" rx="4" className="room-core" fill={getRoomFill('3_MEN')} stroke={getRoomStroke('3_MEN')} strokeWidth="1.5" />
            <text x="325" y="130" className="room-txt">MEN'S WR</text>
          </g>
          <g onClick={() => onNodeClick('3_WOMEN')}>
            <rect x="410" y="90" width="150" height="70" rx="4" className="room-core" fill={getRoomFill('3_WOMEN')} stroke={getRoomStroke('3_WOMEN')} strokeWidth="1.5" />
            <text x="485" y="130" className="room-txt">WOMEN'S WR</text>
          </g>

          {/* Stairs beside the lift */}
          <g transform="translate(690,253)">
            <rect width="90" height="32" fill="#06101c" stroke="#1e3a5f" strokeWidth="1.5" />
            {[15, 30, 45, 60, 75].map(v => <line key={`f3s-${v}`} x1={v} y1="0" x2={v} y2="32" className="stair-hatch" />)}
          </g>

          <g onClick={() => onNodeClick('3_LIFT')} className="cursor-crosshair group">
            <rect x="690" y="293" width="45" height="45" rx="4" fill={getRoomFill('3_LIFT', '#1e3a8a')} stroke={getRoomStroke('3_LIFT')} strokeWidth="1.5" className="transition-all group-hover:stroke-blue-400" />
            <text x="712" y="320" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
          </g>

          {/* ET-301 above the large bottom LAB, right of the corridor */}
          <g onClick={() => onNodeClick('3_ET301')}>
            <rect x="690" y="350" width="195" height="100" rx="4" className="room-core" fill={getRoomFill('3_ET301')} stroke={getRoomStroke('3_ET301')} strokeWidth="1.5" />
            <text x="787" y="404" className="room-txt">ET-301</text>
          </g>
          <g onClick={() => onNodeClick('3_LAB')}>
            <rect x="690" y="460" width="195" height="140" rx="4" className="room-core" fill={getRoomFill('3_LAB')} stroke={getRoomStroke('3_LAB')} strokeWidth="1.5" />
            <text x="787" y="535" className="room-txt">LAB</text>
          </g>
        </g>
      )}
    </>
  );
}
