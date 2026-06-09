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

      {/* === SECOND FLOOR LAYER (geometry mirrors the source floor plan) === */}
      {floor === 2 && (
        <g id="2-floor-group" className="animate-fade-in">
          {/* LEFT WING — scaled 0.75 + rotated 60deg, exactly as the source plan */}
          <g transform="translate(-100,210) scale(0.75) rotate(60 570 300)">
            <rect x="500" y="250" width="60" height="250" className="structural-spine" />

            <g onClick={() => onNodeClick('2_STAFF')}>
              <rect x="300" y="500" width="460" height="150" className="room-core" fill={getRoomFill('2_STAFF')} stroke={getRoomStroke('2_STAFF')} strokeWidth="2" />
              <text x="530" y="580" className="room-txt">STAFF ROOM</text>
            </g>
            <g onClick={() => onNodeClick('2_LAB')}>
              <rect x="300" y="250" width="200" height="250" className="room-core" fill={getRoomFill('2_LAB')} stroke={getRoomStroke('2_LAB')} strokeWidth="2" />
              <text x="400" y="380" className="room-txt">LAB</text>
            </g>
            <g onClick={() => onNodeClick('2_PG')}>
              <rect x="560" y="250" width="200" height="180" className="room-core" fill={getRoomFill('2_PG')} stroke={getRoomStroke('2_PG')} strokeWidth="2" />
              <text x="660" y="345" className="room-txt">PG CLASSROOM</text>
            </g>
            <g onClick={() => onNodeClick('2_FREE')}>
              <rect x="560" y="430" width="200" height="70" className="room-core" fill={getRoomFill('2_FREE')} stroke={getRoomStroke('2_FREE')} strokeWidth="2" />
              <text x="660" y="470" className="room-txt">FREE SPACE</text>
            </g>

            <g transform="translate(300,120)">
              <rect width="40" height="130" className="structural-spine" />
              {[10, 25, 40, 55, 70, 85, 100].map(d => <line key={`f2sv-${d}`} x1="5" y1={d} x2="35" y2={d} className="stair-hatch" />)}
            </g>
            <g transform="translate(340,210)">
              <rect width="120" height="40" className="structural-spine" />
              {[10, 25, 40, 55, 70, 85, 100].map(d => <line key={`f2sh-${d}`} x1={d} y1="5" x2={d} y2="35" className="stair-hatch" />)}
            </g>
          </g>

          {/* RIGHT WING + bridge — translated +100, upright */}
          <g transform="translate(100,0)">
            <g transform="rotate(-30 400 300)">
              <rect x="220" y="250" width="450" height="120" className="structural-spine" />
            </g>
            <g transform="rotate(-210 400 300)">
              <rect x="130" y="349" width="420" height="90" className="structural-spine" />
            </g>

            <rect x="620" y="180" width="60" height="420" className="structural-spine" />

            <g onClick={() => onNodeClick('2_ET201')}>
              <rect x="680" y="219" width="200" height="120" className="room-core" fill={getRoomFill('2_ET201')} stroke={getRoomStroke('2_ET201')} strokeWidth="2" />
              <text x="780" y="283" className="room-txt">ET-201</text>
            </g>
            <g onClick={() => onNodeClick('2_ET202')}>
              <rect x="680" y="340" width="200" height="120" className="room-core" fill={getRoomFill('2_ET202')} stroke={getRoomStroke('2_ET202')} strokeWidth="2" />
              <text x="780" y="404" className="room-txt">ET-202</text>
            </g>
            <g onClick={() => onNodeClick('2_ET203')}>
              <rect x="680" y="460" width="200" height="140" className="room-core" fill={getRoomFill('2_ET203')} stroke={getRoomStroke('2_ET203')} strokeWidth="2" />
              <text x="780" y="534" className="room-txt">ET-203</text>
            </g>

            <g onClick={() => onNodeClick('2_LIFT')} className="cursor-crosshair group">
              <rect x="680" y="177" width="40" height="40" fill={getRoomFill('2_LIFT', '#1e3a8a')} stroke={getRoomStroke('2_LIFT')} strokeWidth="2" className="transition-all group-hover:stroke-blue-400" />
              <text x="700" y="201" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
            </g>

            <g transform="translate(685,135)">
              <rect width="100" height="40" className="structural-spine" />
              {[10, 25, 40, 55, 70].map(d => <line key={`f2rs-${d}`} x1={d} y1="2" x2={d} y2="38" className="stair-hatch" />)}
            </g>
          </g>
        </g>
      )}

      {/* === THIRD FLOOR LAYER (geometry mirrors the source floor plan) === */}
      {floor === 3 && (
        <g id="3-floor-group" className="animate-fade-in">
          {/* SECTION A — rooms + corridor, translated -100,+50 */}
          <g transform="translate(-100,50)">
            <rect x="550" y="230" width="50" height="190" className="structural-spine" />

            <g onClick={() => onNodeClick('3_LAB')}>
              <rect x="550" y="420" width="250" height="220" className="room-core" fill={getRoomFill('3_LAB')} stroke={getRoomStroke('3_LAB')} strokeWidth="2" />
              <text x="675" y="534" className="room-txt">LAB</text>
            </g>
            <g onClick={() => onNodeClick('3_ET301')}>
              <rect x="600" y="320" width="200" height="100" className="room-core" fill={getRoomFill('3_ET301')} stroke={getRoomStroke('3_ET301')} strokeWidth="2" />
              <text x="700" y="374" className="room-txt">ET-301</text>
            </g>

            <g onClick={() => onNodeClick('3_LIFT')} className="cursor-crosshair group">
              <rect x="600" y="280" width="40" height="40" fill={getRoomFill('3_LIFT', '#1e3a8a')} stroke={getRoomStroke('3_LIFT')} strokeWidth="2" className="transition-all group-hover:stroke-blue-400" />
              <text x="620" y="304" className="room-txt text-white" style={{ fill: '#93c5fd' }}>LIFT</text>
            </g>

            <g transform="translate(600,233)">
              <rect width="80" height="20" className="structural-spine" />
              {[10, 25, 40, 55].map(d => <line key={`f3sa-${d}`} x1={d} y1="2" x2={d} y2="18" className="stair-hatch" />)}
              <rect y="25" width="80" height="20" className="structural-spine" />
              {[10, 25, 40, 55].map(d => <line key={`f3sb-${d}`} x1={d} y1="27" x2={d} y2="43" className="stair-hatch" />)}
            </g>
          </g>

          {/* ANGLED CORRIDOR — rotated 39deg about the origin */}
          <g transform="rotate(39)">
            <rect x="529" y="-330" width="40" height="270" className="structural-spine" />
          </g>

          {/* SECTION C — washrooms, translated -100,-50 */}
          <g transform="translate(-100,-50)">
            <rect x="560" y="120" width="200" height="50" className="structural-spine" />

            <g onClick={() => onNodeClick('3_MEN')}>
              <rect x="560" y="70" width="100" height="50" className="room-core" fill={getRoomFill('3_MEN')} stroke={getRoomStroke('3_MEN')} strokeWidth="2" />
              <text x="610" y="100" className="room-txt">MEN'S</text>
            </g>
            <g onClick={() => onNodeClick('3_WOMEN')}>
              <rect x="660" y="70" width="100" height="50" className="room-core" fill={getRoomFill('3_WOMEN')} stroke={getRoomStroke('3_WOMEN')} strokeWidth="2" />
              <text x="710" y="100" className="room-txt">WOMEN'S</text>
            </g>
          </g>
        </g>
      )}
    </>
  );
}
