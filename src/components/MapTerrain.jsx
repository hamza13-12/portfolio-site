export default function MapTerrain() {
    return (
        <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
                {/* Reusable tree symbol */}
                <symbol id="tree" viewBox="0 0 10 16">
                    <path d="M5 0 L0 10 L3 10 L1 16 L9 16 L7 10 L10 10 Z" fill="#3B6030" />
                </symbol>
                <symbol id="tree-sm" viewBox="0 0 8 12">
                    <path d="M4 0 L0 8 L2.5 8 L1 12 L7 12 L5.5 8 L8 8 Z" fill="#3B6030" />
                </symbol>
                {/* Grass tuft symbol */}
                <symbol id="grass" viewBox="0 0 12 8">
                    <path d="M2 8 Q3 2, 4 0 Q4 3, 6 8" stroke="#3B6030" strokeWidth="0.8" fill="none" />
                    <path d="M5 8 Q6 3, 8 1 Q7 4, 9 8" stroke="#3B6030" strokeWidth="0.6" fill="none" />
                    <path d="M0 8 Q1 4, 2 2" stroke="#3B6030" strokeWidth="0.5" fill="none" />
                </symbol>
                {/* Anchor symbol */}
                <symbol id="anchor" viewBox="0 0 16 20">
                    <circle cx="8" cy="3" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
                    <line x1="8" y1="5.5" x2="8" y2="18" stroke="currentColor" strokeWidth="1" />
                    <path d="M3 18 Q8 22, 13 18" stroke="currentColor" strokeWidth="1" fill="none" />
                    <line x1="4" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1" />
                </symbol>
            </defs>

            {/* ============================================= */}
            {/* ORNATE BORDER — double-line with tick marks   */}
            {/* ============================================= */}
            <g opacity="0.4" stroke="#5C3D28">
                {/* Outer border */}
                <rect x="10" y="10" width="1380" height="780" rx="4" strokeWidth="1.5" fill="none" />
                {/* Inner border */}
                <rect x="22" y="22" width="1356" height="756" rx="2" strokeWidth="0.8" fill="none" />

                {/* Corner flourishes — top-left */}
                <path d="M10 40 Q5 10, 40 10" strokeWidth="1.2" fill="none" />
                <path d="M22 50 Q14 22, 50 22" strokeWidth="0.8" fill="none" />
                <circle cx="16" cy="16" r="3" fill="#5C3D28" opacity="0.3" />

                {/* Corner flourishes — top-right */}
                <path d="M1390 40 Q1395 10, 1360 10" strokeWidth="1.2" fill="none" />
                <path d="M1378 50 Q1386 22, 1350 22" strokeWidth="0.8" fill="none" />
                <circle cx="1384" cy="16" r="3" fill="#5C3D28" opacity="0.3" />

                {/* Corner flourishes — bottom-left */}
                <path d="M10 760 Q5 790, 40 790" strokeWidth="1.2" fill="none" />
                <path d="M22 750 Q14 778, 50 778" strokeWidth="0.8" fill="none" />
                <circle cx="16" cy="784" r="3" fill="#5C3D28" opacity="0.3" />

                {/* Corner flourishes — bottom-right */}
                <path d="M1390 760 Q1395 790, 1360 790" strokeWidth="1.2" fill="none" />
                <path d="M1378 750 Q1386 778, 1350 778" strokeWidth="0.8" fill="none" />
                <circle cx="1384" cy="784" r="3" fill="#5C3D28" opacity="0.3" />

                {/* Tick marks — top edge */}
                {Array.from({ length: 19 }).map((_, i) => (
                    <line key={`tt${i}`} x1={74 * (i + 1)} y1="10" x2={74 * (i + 1)} y2="22" strokeWidth="0.5" />
                ))}
                {/* Tick marks — bottom edge */}
                {Array.from({ length: 19 }).map((_, i) => (
                    <line key={`tb${i}`} x1={74 * (i + 1)} y1="778" x2={74 * (i + 1)} y2="790" strokeWidth="0.5" />
                ))}
                {/* Tick marks — left edge */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`tl${i}`} x1="10" y1={73 * (i + 1)} x2="22" y2={73 * (i + 1)} strokeWidth="0.5" />
                ))}
                {/* Tick marks — right edge */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`tr${i}`} x1="1378" y1={73 * (i + 1)} x2="1390" y2={73 * (i + 1)} strokeWidth="0.5" />
                ))}
            </g>

            {/* ============================================= */}
            {/* OCEAN / WATER — bottom-left (x:0–450 y:600–800) */}
            {/* ============================================= */}
            <g opacity="0.5" stroke="#1A3C59" strokeWidth="0.8" fill="none">
                {/* Dense wave lines */}
                <path d="M25 620 Q60 610, 95 620 Q130 630, 165 620 Q200 610, 235 620 Q270 630, 305 620 Q340 610, 375 620 Q410 630, 440 620" />
                <path d="M25 635 Q65 625, 105 635 Q145 645, 185 635 Q225 625, 265 635 Q305 645, 345 635 Q385 625, 425 635" />
                <path d="M25 650 Q70 640, 115 650 Q160 660, 205 650 Q250 640, 295 650 Q340 660, 385 650 Q430 640, 445 650" />
                <path d="M25 665 Q55 655, 85 665 Q115 675, 145 665 Q175 655, 205 665 Q235 675, 265 665 Q295 655, 325 665 Q355 675, 385 665 Q415 655, 445 665" />
                <path d="M25 680 Q60 670, 95 680 Q130 690, 165 680 Q200 670, 235 680 Q270 690, 305 680 Q340 670, 375 680 Q410 690, 440 680" />
                <path d="M25 695 Q65 685, 105 695 Q145 705, 185 695 Q225 685, 265 695 Q305 705, 345 695 Q385 685, 420 695" />
                <path d="M25 710 Q60 700, 95 710 Q130 720, 165 710 Q200 700, 235 710 Q270 720, 305 710 Q340 700, 375 710 Q410 720, 440 710" />
                <path d="M25 725 Q55 715, 85 725 Q115 735, 145 725 Q175 715, 205 725 Q235 735, 265 725 Q295 715, 325 725 Q355 735, 385 725" />
                <path d="M25 740 Q70 730, 115 740 Q160 750, 205 740 Q250 730, 295 740 Q340 750, 385 740 Q430 730, 445 740" />
                <path d="M25 755 Q60 745, 95 755 Q130 765, 165 755 Q200 745, 235 755 Q270 765, 305 755 Q340 745, 375 755 Q410 765, 440 755" />
                <path d="M25 770 Q65 760, 105 770 Q145 780, 185 770 Q225 760, 265 770 Q305 780, 345 770 Q385 760, 420 770" />
                <path d="M25 785 Q60 775, 95 785 Q130 795, 165 785 Q200 775, 235 785 Q270 795, 305 785" />
                {/* Extra partial waves for depth */}
                <path d="M50 640 Q80 632, 110 640 Q140 648, 170 640" strokeWidth="0.5" opacity="0.6" />
                <path d="M200 658 Q230 650, 260 658 Q290 666, 320 658" strokeWidth="0.5" opacity="0.6" />
                <path d="M100 700 Q140 692, 180 700 Q220 708, 260 700" strokeWidth="0.5" opacity="0.6" />
            </g>

            {/* Sailing ship (~x:100, y:720) */}
            <g opacity="0.55" transform="translate(80, 700)" stroke="#2C1810" fill="none" className="float-animation">
                {/* Hull */}
                <path d="M0 15 Q10 20, 30 20 Q45 20, 50 15 Q48 8, 40 5 L10 5 Q2 8, 0 15Z" fill="#5C3D28" opacity="0.4" strokeWidth="0.8" />
                {/* Mast */}
                <line x1="25" y1="5" x2="25" y2="-22" strokeWidth="1" />
                {/* Sails */}
                <path d="M25 -20 Q38 -14, 42 -5 L25 -5 Z" fill="#E8D4A0" opacity="0.6" strokeWidth="0.6" />
                <path d="M25 -20 Q15 -14, 12 -5 L25 -5 Z" fill="#E8D4A0" opacity="0.4" strokeWidth="0.6" />
                {/* Flag */}
                <path d="M25 -22 L35 -20 L25 -18" fill="#9B2335" opacity="0.5" strokeWidth="0.4" />
                {/* Wake lines */}
                <path d="M-5 18 Q-12 20, -20 19" strokeWidth="0.4" opacity="0.4" />
                <path d="M-3 22 Q-10 24, -16 23" strokeWidth="0.3" opacity="0.3" />
            </g>

            {/* Sea serpent/kraken (~x:350, y:740) */}
            <g opacity="0.45" transform="translate(320, 720)" stroke="#1A3C59" fill="none" strokeWidth="1">
                {/* Serpent humps */}
                <path d="M0 10 Q8 0, 16 10 Q24 20, 32 10 Q40 0, 48 10 Q56 20, 64 10" />
                {/* Head */}
                <circle cx="0" cy="10" r="3.5" fill="#1A3C59" opacity="0.3" />
                <circle cx="1.5" cy="9" r="0.8" fill="#E8D4A0" />
                {/* Tail */}
                <path d="M64 10 Q70 5, 72 0" strokeWidth="0.8" />
                <path d="M64 10 Q70 14, 74 18" strokeWidth="0.5" />
            </g>

            {/* "HERE BE DRAGONS" text */}
            <text x="200" y="790" fill="#1A3C59" opacity="0.3" fontSize="8" fontFamily="'Cinzel', serif" letterSpacing="3" textAnchor="middle">
                HERE BE DRAGONS
            </text>

            {/* ============================================= */}
            {/* COASTAL / BEACH TRANSITION (x:0–500 y:550–650) */}
            {/* ============================================= */}
            <g opacity="0.35">
                {/* Shoreline path */}
                <path d="M25 610 Q80 600, 140 608 Q200 616, 260 605 Q320 594, 380 600 Q430 606, 460 612 Q490 618, 500 625" stroke="#8B7050" strokeWidth="1.2" fill="none" strokeDasharray="4 2" />
                {/* Sandy stipple dots */}
                {[
                    [40,600,1,0.35],[55,605,0.7,0.42],[70,598,1,0.38],[85,602,0.7,0.31],[100,606,1,0.44],[120,595,0.7,0.36],[140,600,1,0.40],
                    [160,610,0.7,0.33],[180,603,1,0.45],[200,608,0.7,0.37],[220,600,1,0.32],[240,605,0.7,0.41],[260,598,1,0.39],[280,604,0.7,0.34],
                    [300,600,1,0.43],[320,594,0.7,0.36],[340,596,1,0.38],[360,600,0.7,0.45],[380,605,1,0.31],[400,603,0.7,0.40],[420,608,1,0.37],
                    [440,612,0.7,0.42],[460,615,1,0.34],[480,618,0.7,0.39],[50,612,1,0.36],[90,615,0.7,0.43],[130,612,1,0.35],[170,615,0.7,0.41],
                    [210,613,1,0.38],[250,610,0.7,0.33],[290,608,1,0.44],[330,602,0.7,0.37],[370,606,1,0.40],[410,610,0.7,0.35],[450,614,1,0.42],
                ].map(([cx, cy, r, op], i) => (
                    <circle key={`sand${i}`} cx={cx} cy={cy} r={r} fill="#A08050" opacity={op} />
                ))}
            </g>

            {/* ============================================= */}
            {/* CONTOUR LINES — lower terrain (raised opacity) */}
            {/* ============================================= */}
            <g opacity="0.28" stroke="#5C3D28" strokeWidth="0.6">
                <path d="M80 680 Q200 650, 320 670 Q440 690, 500 660" />
                <path d="M60 660 Q180 620, 340 640 Q460 660, 520 630" />
                <path d="M100 640 Q220 600, 360 610 Q480 630, 540 600" />
                <path d="M120 610 Q250 575, 380 580 Q500 600, 560 570" />
            </g>

            {/* CONTOUR LINES — mid terrain */}
            <g opacity="0.30" stroke="#5C3D28" strokeWidth="0.5">
                <path d="M300 520 Q420 490, 540 500 Q660 510, 750 480" />
                <path d="M280 500 Q400 465, 560 470 Q680 480, 780 450" />
                <path d="M320 480 Q440 440, 580 445 Q700 455, 800 420" />
                <path d="M350 460 Q470 420, 600 420 Q720 430, 820 395" />
                <path d="M370 440 Q500 400, 620 400 Q740 408, 840 370" />
            </g>

            {/* CONTOUR LINES — high terrain (dense near summit) */}
            <g opacity="0.35" stroke="#5C3D28" strokeWidth="0.5">
                <path d="M850 300 Q950 270, 1050 260 Q1150 250, 1250 230" />
                <path d="M860 280 Q960 248, 1060 238 Q1160 228, 1260 210" />
                <path d="M870 260 Q970 225, 1070 215 Q1170 205, 1270 190" />
                <path d="M880 240 Q980 200, 1080 190 Q1180 182, 1280 168" />
                <path d="M900 220 Q1000 178, 1100 168 Q1200 160, 1300 148" />
                <path d="M920 200 Q1020 155, 1120 145 Q1220 140, 1320 130" />
                <path d="M940 180 Q1040 132, 1140 124 Q1240 120, 1340 112" />
                <path d="M960 160 Q1060 112, 1160 104 Q1260 100, 1350 96" />
            </g>

            {/* ============================================= */}
            {/* FORESTS — dense clusters using reusable symbols */}
            {/* ============================================= */}

            {/* Forest cluster 1 — large, bottom-left (x:150–350, y:540–650) ~25 trees */}
            <g opacity="0.55">
                <use href="#tree" x="150" y="555" width="10" height="16" />
                <use href="#tree-sm" x="162" y="560" width="8" height="12" />
                <use href="#tree" x="175" y="548" width="10" height="16" />
                <use href="#tree-sm" x="188" y="558" width="8" height="12" />
                <use href="#tree" x="200" y="545" width="10" height="16" />
                <use href="#tree" x="213" y="552" width="10" height="16" />
                <use href="#tree-sm" x="226" y="548" width="8" height="12" />
                <use href="#tree" x="238" y="555" width="10" height="16" />
                <use href="#tree-sm" x="250" y="542" width="8" height="12" />
                <use href="#tree" x="262" y="550" width="10" height="16" />
                <use href="#tree" x="275" y="558" width="10" height="16" />
                <use href="#tree-sm" x="288" y="545" width="8" height="12" />
                <use href="#tree" x="300" y="552" width="10" height="16" />
                <use href="#tree-sm" x="312" y="560" width="8" height="12" />
                <use href="#tree" x="325" y="548" width="10" height="16" />
                <use href="#tree-sm" x="338" y="555" width="8" height="12" />
                {/* Second row deeper */}
                <use href="#tree" x="160" y="570" width="10" height="16" />
                <use href="#tree-sm" x="180" y="575" width="8" height="12" />
                <use href="#tree" x="200" y="568" width="10" height="16" />
                <use href="#tree-sm" x="220" y="572" width="8" height="12" />
                <use href="#tree" x="240" y="575" width="10" height="16" />
                <use href="#tree" x="260" y="570" width="10" height="16" />
                <use href="#tree-sm" x="280" y="578" width="8" height="12" />
                <use href="#tree" x="300" y="572" width="10" height="16" />
                <use href="#tree-sm" x="320" y="575" width="8" height="12" />
            </g>

            {/* Forest cluster 2 — medium, center (x:400–550, y:350–450) ~15 trees */}
            <g opacity="0.5">
                <use href="#tree" x="405" y="355" width="10" height="16" />
                <use href="#tree-sm" x="418" y="360" width="8" height="12" />
                <use href="#tree" x="432" y="350" width="10" height="16" />
                <use href="#tree-sm" x="445" y="358" width="8" height="12" />
                <use href="#tree" x="458" y="365" width="10" height="16" />
                <use href="#tree" x="472" y="352" width="10" height="16" />
                <use href="#tree-sm" x="485" y="360" width="8" height="12" />
                <use href="#tree" x="498" y="368" width="10" height="16" />
                <use href="#tree-sm" x="510" y="355" width="8" height="12" />
                <use href="#tree" x="522" y="362" width="10" height="16" />
                <use href="#tree-sm" x="535" y="370" width="8" height="12" />
                {/* Second row */}
                <use href="#tree" x="420" y="378" width="10" height="16" />
                <use href="#tree-sm" x="445" y="382" width="8" height="12" />
                <use href="#tree" x="470" y="380" width="10" height="16" />
                <use href="#tree-sm" x="500" y="385" width="8" height="12" />
            </g>

            {/* Forest cluster 3 — scattered along path (x:600–800, y:300–400) ~10 trees */}
            <g opacity="0.45">
                <use href="#tree-sm" x="610" y="380" width="8" height="12" />
                <use href="#tree" x="635" y="370" width="10" height="16" />
                <use href="#tree-sm" x="660" y="375" width="8" height="12" />
                <use href="#tree" x="690" y="360" width="10" height="16" />
                <use href="#tree-sm" x="715" y="355" width="8" height="12" />
                <use href="#tree" x="738" y="345" width="10" height="16" />
                <use href="#tree-sm" x="758" y="350" width="8" height="12" />
                <use href="#tree" x="775" y="340" width="10" height="16" />
                <use href="#tree-sm" x="790" y="348" width="8" height="12" />
                <use href="#tree" x="800" y="335" width="10" height="16" />
            </g>

            {/* ============================================= */}
            {/* MOUNTAINS — foothills + expanded main range    */}
            {/* ============================================= */}

            {/* Foothills (x:700–900, y:250–350) */}
            <g opacity="0.45" stroke="#5C3D28" fill="none" strokeWidth="0.8">
                <path d="M710 340 L735 290 L760 340" />
                <path d="M745 340 L775 280 L805 340" />
                <path d="M790 340 L815 295 L840 340" />
                <path d="M825 340 L855 285 L885 340" />
                <path d="M860 340 L882 300 L904 340" />
                {/* Light shading */}
                <path d="M735 290 L748 315 L760 340 L735 340 Z" fill="#5C3D28" opacity="0.06" />
                <path d="M775 280 L790 310 L805 340 L775 340 Z" fill="#5C3D28" opacity="0.06" />
            </g>

            {/* Main mountain range (x:900–1380, y:40–200) — 10 peaks */}
            <g opacity="0.55" stroke="#5C3D28" fill="none" strokeWidth="1">
                <path d="M920 170 L955 85 L990 170" />
                <path d="M960 170 L1000 60 L1040 170" />
                <path d="M1010 170 L1045 75 L1080 170" />
                <path d="M1050 170 L1095 40 L1140 170" />
                <path d="M1100 170 L1135 65 L1170 170" />
                <path d="M1140 170 L1175 80 L1210 170" />
                <path d="M1185 170 L1215 55 L1245 170" />
                <path d="M1220 170 L1255 70 L1290 170" />
                <path d="M1260 170 L1290 85 L1320 170" />
                <path d="M1300 170 L1330 75 L1360 170" />

                {/* Shadow-side hatching (right side of each peak) */}
                <g strokeWidth="0.4" opacity="0.3">
                    <path d="M955 85 L970 130 L990 170 L955 170 Z" fill="#5C3D28" opacity="0.08" />
                    <path d="M1000 60 L1020 115 L1040 170 L1000 170 Z" fill="#5C3D28" opacity="0.1" />
                    <path d="M1095 40 L1118 105 L1140 170 L1095 170 Z" fill="#5C3D28" opacity="0.1" />
                    <path d="M1215 55 L1230 112 L1245 170 L1215 170 Z" fill="#5C3D28" opacity="0.08" />
                    <path d="M1330 75 L1345 122 L1360 170 L1330 170 Z" fill="#5C3D28" opacity="0.08" />
                </g>

                {/* Snow caps — more prominent */}
                <g stroke="#8B7050" strokeWidth="0.8" fill="#F0DEB0" opacity="0.6">
                    <path d="M948 98 L955 85 L962 98 Z" />
                    <path d="M992 75 L1000 60 L1008 75 Z" />
                    <path d="M1038 88 L1045 75 L1052 88 Z" />
                    <path d="M1086 56 L1095 40 L1104 56 Z" />
                    <path d="M1128 78 L1135 65 L1142 78 Z" />
                    <path d="M1168 92 L1175 80 L1182 92 Z" />
                    <path d="M1207 70 L1215 55 L1223 70 Z" />
                    <path d="M1248 84 L1255 70 L1262 84 Z" />
                    <path d="M1283 98 L1290 85 L1297 98 Z" />
                    <path d="M1323 88 L1330 75 L1337 88 Z" />
                </g>
            </g>

            {/* ============================================= */}
            {/* COMPASS ROSE — bottom-right (x:1250 y:650)    */}
            {/* ============================================= */}
            <g transform="translate(1250, 650)" opacity="0.55">
                {/* Outer ring */}
                <circle cx="0" cy="0" r="55" stroke="#2C1810" strokeWidth="1.2" fill="none" />
                <circle cx="0" cy="0" r="50" stroke="#8B6914" strokeWidth="0.6" fill="none" />
                <circle cx="0" cy="0" r="46" stroke="#2C1810" strokeWidth="0.3" fill="none" />

                {/* 8-point star — cardinal points (larger) */}
                {/* North */}
                <path d="M0 -45 L4 -10 L0 -6 L-4 -10 Z" fill="#8B6914" stroke="#2C1810" strokeWidth="0.4" />
                {/* South */}
                <path d="M0 45 L4 10 L0 6 L-4 10 Z" fill="#2C1810" stroke="#2C1810" strokeWidth="0.4" />
                {/* East */}
                <path d="M45 0 L10 4 L6 0 L10 -4 Z" fill="#2C1810" stroke="#2C1810" strokeWidth="0.4" />
                {/* West */}
                <path d="M-45 0 L-10 4 L-6 0 L-10 -4 Z" fill="#8B6914" stroke="#2C1810" strokeWidth="0.4" />

                {/* Intercardinal points (smaller) */}
                {/* NE */}
                <path d="M32 -32 L7 -3 L3 -7 Z" fill="#2C1810" opacity="0.6" />
                {/* SE */}
                <path d="M32 32 L7 3 L3 7 Z" fill="#8B6914" opacity="0.6" />
                {/* SW */}
                <path d="M-32 32 L-7 3 L-3 7 Z" fill="#2C1810" opacity="0.6" />
                {/* NW */}
                <path d="M-32 -32 L-7 -3 L-3 -7 Z" fill="#8B6914" opacity="0.6" />

                {/* Center ornament */}
                <circle cx="0" cy="0" r="5" fill="#8B6914" opacity="0.5" />
                <circle cx="0" cy="0" r="2.5" fill="#2C1810" opacity="0.6" />

                {/* Cardinal labels */}
                <text x="0" y="-56" textAnchor="middle" fill="#2C1810" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="600">N</text>
                <text x="0" y="65" textAnchor="middle" fill="#2C1810" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="600">S</text>
                <text x="62" y="4" textAnchor="middle" fill="#2C1810" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="600">E</text>
                <text x="-62" y="4" textAnchor="middle" fill="#2C1810" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="600">W</text>

                {/* Decorative ring dots */}
                {Array.from({ length: 32 }).map((_, i) => {
                    const angle = (i * 360 / 32) * Math.PI / 180
                    return (
                        <circle key={`cd${i}`} cx={Math.sin(angle) * 48} cy={-Math.cos(angle) * 48} r={i % 4 === 0 ? 1.5 : 0.7} fill="#2C1810" opacity="0.4" />
                    )
                })}
            </g>

            {/* ============================================= */}
            {/* DECORATIVE CARTOUCHE — top-left title scroll   */}
            {/* ============================================= */}
            <g transform="translate(30, 30)" opacity="0.75">
                {/* Scroll background */}
                <rect x="0" y="0" width="160" height="80" rx="3" fill="#E8D4A0" stroke="#5C3D28" strokeWidth="0.8" opacity="0.5" />
                {/* Scroll curl top */}
                <path d="M0 5 Q-5 -5, 5 -3 L155 -3 Q165 -5, 160 5" stroke="#5C3D28" strokeWidth="0.6" fill="#E8D4A0" opacity="0.4" />
                {/* Scroll curl bottom */}
                <path d="M0 75 Q-5 85, 5 83 L155 83 Q165 85, 160 75" stroke="#5C3D28" strokeWidth="0.6" fill="#E8D4A0" opacity="0.4" />
                {/* Inner frame */}
                <rect x="8" y="8" width="144" height="64" rx="1" fill="none" stroke="#5C3D28" strokeWidth="0.4" />
                {/* Title text */}
                <text x="80" y="36" textAnchor="middle" fill="#2C1810" fontSize="11" fontFamily="'Cinzel', serif" fontWeight="600" letterSpacing="3">
                    CAREER ATLAS
                </text>
                {/* Subtitle */}
                <text x="80" y="52" textAnchor="middle" fill="#5C3D28" fontSize="6" fontFamily="'Cinzel', serif" letterSpacing="2">
                    A JOURNEY IN CODE
                </text>
                {/* Decorative line */}
                <line x1="30" y1="60" x2="130" y2="60" stroke="#5C3D28" strokeWidth="0.4" />
                <circle cx="80" cy="60" r="2" fill="#5C3D28" opacity="0.4" />
                <circle cx="30" cy="60" r="1" fill="#5C3D28" opacity="0.3" />
                <circle cx="130" cy="60" r="1" fill="#5C3D28" opacity="0.3" />
            </g>

            {/* ============================================= */}
            {/* ROLLING HILLS — bottom-right (x:1000–1400 y:600–780) */}
            {/* ============================================= */}
            <g opacity="0.3" stroke="#5C3D28" fill="none" strokeWidth="0.6">
                {/* Hill silhouettes */}
                <path d="M1000 750 Q1040 710, 1080 730 Q1120 750, 1160 720 Q1200 690, 1240 710 Q1280 730, 1320 700 Q1360 670, 1380 690" />
                <path d="M1020 770 Q1060 740, 1100 755 Q1140 770, 1180 745 Q1220 720, 1260 735 Q1300 750, 1340 730 Q1370 715, 1380 720" />
                <path d="M980 760 Q1010 735, 1050 748 Q1090 760, 1130 738" />
            </g>
            {/* Grass tufts on hills */}
            <g opacity="0.35">
                <use href="#grass" x="1020" y="742" width="12" height="8" />
                <use href="#grass" x="1080" y="722" width="12" height="8" />
                <use href="#grass" x="1140" y="715" width="12" height="8" />
                <use href="#grass" x="1200" y="700" width="12" height="8" />
                <use href="#grass" x="1260" y="725" width="12" height="8" />
                <use href="#grass" x="1320" y="695" width="12" height="8" />
                <use href="#grass" x="1050" y="750" width="12" height="8" />
                <use href="#grass" x="1160" y="738" width="12" height="8" />
                <use href="#grass" x="1280" y="742" width="12" height="8" />
                <use href="#grass" x="1350" y="710" width="12" height="8" />
            </g>

            {/* ============================================= */}
            {/* SCATTERED DECORATIONS                          */}
            {/* ============================================= */}

            {/* Anchors near water */}
            <g opacity="0.25" fill="none" stroke="#5C3D28">
                <use href="#anchor" x="420" y="660" width="12" height="15" />
                <use href="#anchor" x="30" y="680" width="10" height="13" />
            </g>

            {/* Crossed swords */}
            <g opacity="0.2" stroke="#5C3D28" strokeWidth="0.7" strokeLinecap="round">
                <g transform="translate(580, 520)">
                    <line x1="-8" y1="-8" x2="8" y2="8" />
                    <line x1="8" y1="-8" x2="-8" y2="8" />
                    <line x1="-9" y1="-6" x2="-6" y2="-9" />
                    <line x1="9" y1="-6" x2="6" y2="-9" />
                </g>
                <g transform="translate(900, 380)">
                    <line x1="-6" y1="-6" x2="6" y2="6" />
                    <line x1="6" y1="-6" x2="-6" y2="6" />
                    <line x1="-7" y1="-4" x2="-4" y2="-7" />
                    <line x1="7" y1="-4" x2="4" y2="-7" />
                </g>
            </g>

            {/* Dotted secondary trails */}
            <g opacity="0.15" stroke="#5C3D28" strokeWidth="0.5" strokeDasharray="2 6">
                <path d="M200 700 Q300 680, 400 650 Q500 620, 550 580" />
                <path d="M600 500 Q700 470, 800 450 Q900 430, 950 400" />
                <path d="M700 300 Q800 260, 900 240 Q1000 220, 1050 200" />
                {/* Additional trail */}
                <path d="M450 550 Q500 530, 560 510 Q620 490, 680 480" />
                <path d="M820 260 Q880 240, 940 230 Q1000 220, 1060 210" />
            </g>

            {/* Small mystery islands */}
            <g opacity="0.3" stroke="#5C3D28" strokeWidth="0.6" fill="none">
                {/* Island 1 */}
                <ellipse cx="380" cy="720" rx="15" ry="6" />
                <use href="#tree-sm" x="376" y="706" width="8" height="12" opacity="0.5" />
                {/* Island 2 */}
                <ellipse cx="150" cy="760" rx="10" ry="4" />
                <use href="#tree-sm" x="147" y="748" width="6" height="10" opacity="0.4" />
            </g>

            {/* Scattered map markers (retained from original, boosted) */}
            <g opacity="0.2" stroke="#5C3D28" strokeWidth="0.8">
                <circle cx="330" cy="510" r="3" />
                <circle cx="680" cy="400" r="2" />
                <circle cx="900" cy="320" r="2.5" />
                <circle cx="550" cy="450" r="2" />
                <line x1="170" y1="640" x2="178" y2="648" /><line x1="178" y1="640" x2="170" y2="648" />
                <line x1="620" y1="370" x2="628" y2="378" /><line x1="628" y1="370" x2="620" y2="378" />
                <line x1="1050" y1="250" x2="1058" y2="258" /><line x1="1058" y1="250" x2="1050" y2="258" />
            </g>
        </svg>
    )
}
