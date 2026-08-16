// Interactive low-poly car for the "What gets touched, where" explorer.
// Ported from the design handoff's <car-explorer> web component (car3d.js).
// Pure three.js — no React in here. `createCarScene(host, opts)` mounts a
// canvas into `host` and returns a controller; the React component
// (CarExplorer.js) owns the selected zone and calls `setZone`.
//
// This module imports `three` statically and is itself loaded with a dynamic
// import() only when the viewer scrolls near, so three.js never lands in the
// main bundle.
import * as THREE from 'three';

export const ZONES = ['paint', 'wheels', 'glass', 'cabin', 'engine', 'trunk'];

// Camera preset per zone (azimuth, elevation, distance, look-at height).
const VIEW = {
  paint: { az: -0.75, el: 0.3, dist: 7.2, y: 0.75 },
  wheels: { az: -1.05, el: 0.08, dist: 5.8, y: 0.42 },
  glass: { az: -0.55, el: 0.42, dist: 6.4, y: 1.05 },
  cabin: { az: -0.35, el: 0.55, dist: 5.6, y: 1.1 },
  engine: { az: -1.35, el: 0.5, dist: 5.9, y: 1.0 },
  trunk: { az: 2.1, el: 0.48, dist: 5.9, y: 1.0 },
};
const HOME = { az: -0.8, el: 0.28, dist: 7.4, y: 0.78 };
const MIN_DIST = 3.8;
const MAX_DIST = 11;

/**
 * @param {HTMLElement} host  empty block element the canvas is appended to
 * @param {object} opts
 * @param {string} [opts.accent]      accent colour (hex)
 * @param {string} [opts.bg]          solid background colour, used to fade unselected parts
 * @param {string} [opts.fx]          wash style: scrub | sheet | wipe | fade
 * @param {boolean} [opts.reducedMotion]  skip the wash demo + auto-rotate
 * @param {(zone: string) => void} [opts.onPick]  a car panel was tapped ('' = empty space)
 */
export function createCarScene(host, opts = {}) {
  const S = {
    zone: '',
    fxStyle: opts.fx || 'scrub',
    accent: opts.accent || '#ed2f38',
    bg: opts.bg || '#0d0d0f',
    reduced: !!opts.reducedMotion,
    az: HOME.az,
    el: HOME.el,
    dist: HOME.dist,
    ty: HOME.y,
    taz: HOME.az,
    tel: HOME.el,
    tdist: HOME.dist,
    tty: HOME.y,
    idle: 0,
    fx: null,
    mittOut: -1,
    sparkleT: -1,
    foamAcc: 0,
    dirt: { paint: 0, wheels: 0, glass: 0, cabin: 0, engine: 0, trunk: 0 },
    dead: false,
    raf: 0,
    fit: 1,
    coverage: null,
  };

  host.style.touchAction = 'pan-y'; // vertical swipes still scroll the page
  host.style.cursor = 'grab';
  host.style.userSelect = 'none';
  host.style.webkitUserSelect = 'none';

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.localClippingEnabled = true;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

  const accent = () => new THREE.Color(S.accent);
  const bg = () => new THREE.Color(S.bg);

  // ---- materials, one per zone-ish part ----
  const M = {};
  const mk = (name, zone, color, o) => {
    const m = new THREE.MeshStandardMaterial(
      Object.assign({ color: new THREE.Color(color) }, o || {})
    );
    m.name = name;
    m.userData.zone = zone;
    m.userData.base = new THREE.Color(color);
    M[name] = m;
    return m;
  };
  mk('paint', 'paint', '#bfc7d1', { roughness: 0.28, metalness: 0.6 });
  mk('trim', 'paint', '#26272b', { roughness: 0.7, metalness: 0.2 });
  mk('glass', 'glass', '#7f8f9c', {
    roughness: 0.08,
    metalness: 0.1,
    transparent: true,
    opacity: 0.42,
  });
  mk('tire', 'wheels', '#181819', { roughness: 0.92, metalness: 0.0 });
  mk('rim', 'wheels', '#b9bcc2', { roughness: 0.28, metalness: 0.9 });
  mk('seat', 'cabin', '#3a3a40', { roughness: 0.85 });
  mk('dash', 'cabin', '#2c2c31', { roughness: 0.8 });
  mk('carpet', 'cabin', '#4a4a52', { roughness: 0.95 });
  mk('engine', 'engine', '#5c6068', { roughness: 0.55, metalness: 0.7 });
  mk('trunkfloor', 'trunk', '#54545c', { roughness: 0.95 });
  mk('lamp', 'paint', '#e8e2d6', {
    roughness: 0.2,
    emissive: new THREE.Color('#332f28'),
  });
  mk('tail', 'paint', '#8e1f1c', { roughness: 0.25 });

  // ---- geometry ----
  const car = new THREE.Group();
  const W = 1.86,
    HW = W / 2;

  const prof = (pts, depth, mat, bevel) => {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelSize: bevel || 0.05,
      bevelThickness: bevel || 0.05,
      bevelSegments: 2,
      curveSegments: 4,
    });
    g.translate(0, 0, -depth / 2);
    return new THREE.Mesh(g, mat);
  };

  // wheel-arch curve for the side profile
  const arch = (cx, r, y0, n) => {
    const out = [],
      N = n || 16;
    for (let i = 0; i <= N; i++) {
      const t = Math.PI * (1 - i / N);
      out.push([cx + Math.cos(t) * r, y0 + Math.sin(t) * r]);
    }
    return out;
  };

  // lower body side profile (x = length, y = height), with real wheel arches
  const bodyPts = [[-2.28, 0.54]]
    .concat([
      [-2.24, 0.24],
      [-2.0, 0.2],
    ])
    .concat(arch(-1.42, 0.5, 0.2))
    .concat([
      [-0.86, 0.2],
      [0.9, 0.2],
    ])
    .concat(arch(1.44, 0.5, 0.2))
    .concat([
      [2.04, 0.2],
      [2.26, 0.24],
    ])
    .concat([
      [2.32, 0.58],
      [2.28, 0.86],
      [1.32, 0.96],
      [0.88, 1.0],
      [-0.72, 0.98],
      [-1.48, 0.91],
      [-2.08, 0.78],
    ]);
  const body = prof(bodyPts, W, M.paint, 0.035);
  body.name = 'body';
  body.castShadow = true;
  body.receiveShadow = true;
  car.add(body);

  // greenhouse (glass volume)
  const green = prof(
    [
      [-1.44, 0.96],
      [-0.7, 1.44],
      [0.64, 1.46],
      [1.28, 0.98],
    ],
    W - 0.34,
    M.glass,
    0.03
  );
  green.name = 'greenhouse';
  car.add(green);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.44, 0.07, W - 0.3),
    M.paint
  );
  roof.name = 'roof';
  roof.position.set(-0.03, 1.45, 0);
  roof.castShadow = true;
  car.add(roof);

  // B pillar only, flush in the door line
  [0.755, -0.755].forEach((z) => {
    const pl = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.42, 0.02), M.trim);
    pl.position.set(0.1, 1.2, z);
    car.add(pl);
  });

  // sunroof + antenna fin
  const sunroof = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.02, 0.82),
    M.glass
  );
  sunroof.position.set(-0.28, 1.5, 0);
  car.add(sunroof);
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.05), M.trim);
  fin.position.set(0.56, 1.5, 0);
  fin.rotation.z = -0.35;
  car.add(fin);

  // hood lid + engine bay
  const hoodPivot = new THREE.Group();
  hoodPivot.position.set(-1.46, 0.885, 0);
  const hood = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.05, W - 0.18),
    M.paint
  );
  hood.name = 'hood';
  hood.position.set(-0.31, -0.02, 0);
  hood.rotation.z = 0.16;
  hood.castShadow = true;
  hoodPivot.add(hood);
  car.add(hoodPivot);
  const engine = new THREE.Group();
  engine.add(
    Object.assign(
      new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.34, 1.24), M.engine),
      { name: 'block' }
    )
  );
  const airbox = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.12, 24),
    M.engine
  );
  airbox.position.set(0.14, 0.2, 0.34);
  engine.add(airbox);
  engine.position.set(-1.85, 0.55, 0);
  car.add(engine);

  // trunk lid + trunk floor
  const trunkPivot = new THREE.Group();
  trunkPivot.position.set(1.3, 0.955, 0);
  const tlid = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.05, W - 0.18),
    M.paint
  );
  tlid.name = 'trunklid';
  tlid.position.set(0.47, -0.02, 0);
  tlid.rotation.z = 0.1;
  tlid.castShadow = true;
  trunkPivot.add(tlid);
  car.add(trunkPivot);
  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.34, 1.34),
    M.trunkfloor
  );
  trunk.position.set(1.79, 0.6, 0);
  car.add(trunk);

  // cabin: seats, dash, carpet
  const seatAt = (x, z) => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.4), M.seat);
    base.position.y = 0.05;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.34, 0.4), M.seat);
    back.position.set(0.19, 0.25, 0);
    back.rotation.z = -0.16;
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.11, 0.2), M.seat);
    head.position.set(0.24, 0.47, 0);
    g.add(base, back, head);
    g.position.set(x, 0.8, z);
    return g;
  };
  car.add(
    seatAt(-0.26, 0.36),
    seatAt(-0.26, -0.36),
    seatAt(0.6, 0.36),
    seatAt(0.6, -0.36)
  );
  const dash = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.2, W - 0.4),
    M.dash
  );
  dash.position.set(-1.06, 0.94, 0);
  dash.rotation.z = 0.18;
  car.add(dash);
  const carpet = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.04, W - 0.38),
    M.carpet
  );
  carpet.position.set(-0.1, 0.79, 0);
  car.add(carpet);

  // wheels — tire, dished rim face, spokes, brake disc
  const wheel = (x, z) => {
    const g = new THREE.Group();
    const side = z > 0 ? 1 : -1;
    const t = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.09, 12, 30),
      M.tire
    );
    t.castShadow = true;
    g.add(t);
    const tread = new THREE.Mesh(
      new THREE.CylinderGeometry(0.375, 0.375, 0.24, 34, 1, true),
      M.tire
    );
    tread.rotation.x = Math.PI / 2;
    g.add(tread);
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.19, 0.05, 22),
      M.rim
    );
    disc.rotation.x = Math.PI / 2;
    g.add(disc);
    const face = new THREE.Mesh(
      new THREE.CylinderGeometry(0.245, 0.245, 0.035, 26),
      M.rim
    );
    face.rotation.x = Math.PI / 2;
    face.position.z = side * 0.085;
    g.add(face);
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.07, 16),
      M.rim
    );
    hub.rotation.x = Math.PI / 2;
    hub.position.z = side * 0.11;
    g.add(hub);
    for (let i = 0; i < 5; i++) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.035), M.rim);
      sp.position.set(
        Math.cos(i * 1.2566) * 0.115,
        Math.sin(i * 1.2566) * 0.115,
        side * 0.105
      );
      sp.rotation.z = i * 1.2566 - Math.PI / 2;
      g.add(sp);
    }
    g.position.set(x, 0.375, z);
    return g;
  };
  car.add(
    wheel(-1.42, HW - 0.13),
    wheel(-1.42, -HW + 0.13),
    wheel(1.44, HW - 0.13),
    wheel(1.44, -HW + 0.13)
  );

  // lamps — housing + lens
  const lamp = (x, z, mat, w, h) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.09, h, w), mat);
    m.position.set(x, 0.7, z);
    car.add(m);
    const lens = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, h * 0.8, w * 0.86),
      M.glass
    );
    lens.position.set(x + (x < 0 ? -0.05 : 0.05), 0.7, z);
    car.add(lens);
  };
  lamp(-2.25, 0.6, M.lamp, 0.46, 0.15);
  lamp(-2.25, -0.6, M.lamp, 0.46, 0.15);
  lamp(2.29, 0.58, M.tail, 0.46, 0.13);
  lamp(2.29, -0.58, M.tail, 0.46, 0.13);
  // plates + door handles
  [
    [-2.28, 0.44],
    [2.32, 0.44],
  ].forEach(([px, py]) => {
    const pl = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.13, 0.34), M.lamp);
    pl.position.set(px, py, 0);
    car.add(pl);
  });
  [-0.34, 0.86].forEach((hx) =>
    [0.972, -0.972].forEach((hz) => {
      const hd = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.045, 0.04), M.rim);
      hd.position.set(hx, 0.75, hz);
      car.add(hd);
    })
  );

  // grille, bumper bars, rockers, shut lines, mirrors, exhaust
  const boxAt = (w, h, d, x, y, z, mat) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    car.add(m);
    return m;
  };
  boxAt(0.1, 0.19, 1.0, -2.26, 0.5, 0, M.trim);
  boxAt(0.1, 0.13, 1.42, -2.24, 0.3, 0, M.trim);
  boxAt(0.1, 0.13, 1.46, 2.28, 0.3, 0, M.trim);
  boxAt(0.34, 0.05, 1.52, -2.16, 0.17, 0, M.trim);
  boxAt(0.34, 0.05, 1.44, 2.18, 0.17, 0, M.trim);
  [0.52, -0.52].forEach((z) => boxAt(0.06, 0.07, 0.14, -2.27, 0.32, z, M.lamp));
  [0.972, -0.972].forEach((z) => boxAt(2.44, 0.1, 0.05, 0.0, 0.27, z, M.trim));
  [-0.52, 0.7].forEach((x) =>
    [0.972, -0.972].forEach((z) => boxAt(0.022, 0.6, 0.025, x, 0.58, z, M.trim))
  );
  [HW - 0.04, -HW + 0.04].forEach((z) => {
    const sgn = z > 0 ? 1 : -1;
    boxAt(0.055, 0.05, 0.16, -1.0, 1.0, z + sgn * 0.1, M.trim);
    boxAt(0.15, 0.1, 0.09, -1.02, 1.01, z + sgn * 0.19, M.paint);
  });
  [0.46, -0.46].forEach((z) => {
    const ex = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.14, 18),
      M.rim
    );
    ex.rotation.z = Math.PI / 2;
    ex.position.set(2.32, 0.27, z);
    car.add(ex);
  });

  car.position.y = 0.0;
  scene.add(car);

  // ---- dirt overlay: transparent mud-splat shell, shown only during the demo ----
  const grimeCanvas = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const g = c.getContext('2d');
    g.clearRect(0, 0, 512, 512);
    // large soft mud patches
    for (let i = 0; i < 26; i++) {
      const x = Math.random() * 512,
        y = Math.random() * 512,
        r = Math.random() * 90 + 50;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, 'rgba(74,58,38,0.5)');
      gr.addColorStop(0.7, 'rgba(74,58,38,0.22)');
      gr.addColorStop(1, 'rgba(74,58,38,0)');
      g.fillStyle = gr;
      g.beginPath();
      g.arc(x, y, r, 0, 6.284);
      g.fill();
    }
    // mid splats with hard rims (dried mud)
    for (let i = 0; i < 240; i++) {
      const x = Math.random() * 512,
        y = Math.random() * 512,
        r = Math.random() * 16 + 3;
      const shade = ['96,74,48', '70,54,34', '118,96,64', '52,40,26'][
        Math.floor(Math.random() * 4)
      ];
      g.fillStyle = 'rgba(' + shade + ',' + (Math.random() * 0.5 + 0.45) + ')';
      g.beginPath();
      const n = 7;
      for (let j = 0; j <= n; j++) {
        const a = (j / n) * 6.284,
          rr = r * (0.6 + Math.random() * 0.6);
        if (j) g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
        else g.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      g.fill();
    }
    // fine speckle
    for (let i = 0; i < 900; i++) {
      g.fillStyle = 'rgba(60,46,30,' + (Math.random() * 0.6 + 0.2) + ')';
      const x = Math.random() * 512,
        y = Math.random() * 512;
      g.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 3 + 1);
    }
    // drip streaks with heads
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * 512,
        y0 = Math.random() * 300,
        len = 50 + Math.random() * 150;
      const a = Math.random() * 0.45 + 0.3;
      g.strokeStyle = 'rgba(66,52,34,' + a + ')';
      g.lineWidth = Math.random() * 4 + 2;
      g.lineCap = 'round';
      g.beginPath();
      g.moveTo(x, y0);
      g.lineTo(x + (Math.random() - 0.5) * 14, y0 + len);
      g.stroke();
      g.fillStyle = 'rgba(66,52,34,' + (a + 0.15) + ')';
      g.beginPath();
      g.arc(x, y0, Math.random() * 5 + 3, 0, 6.284);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1.3, 1.3);
    return t;
  })();
  const clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 100);
  const DIRT = {};
  ZONES.forEach((z) => {
    DIRT[z] = new THREE.MeshStandardMaterial({
      map: grimeCanvas,
      color: new THREE.Color('#c9b89a'),
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      clippingPlanes: [clipPlane],
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
  });
  const dirtCar = car.clone(true);
  dirtCar.scale.setScalar(1.008);
  const dirtPivots = {};
  const dirtMeshes = [];
  dirtCar.traverse((o) => {
    if (!o.isMesh) return;
    const z = o.material && o.material.userData && o.material.userData.zone;
    if (!z) {
      o.visible = false;
      return;
    }
    o.material = DIRT[z];
    o.userData.dirtZone = z;
    o.castShadow = false;
    o.receiveShadow = false;
    dirtMeshes.push(o);
    if (o.name === 'hood') dirtPivots.hood = o.parent;
    if (o.name === 'trunklid') dirtPivots.trunk = o.parent;
  });
  scene.add(dirtCar);

  const DIRT_BASE = new THREE.Color('#c9b89a'),
    SUDS = new THREE.Color('#edf1f4');

  // wash mitt: sponge pad + towel flap that follows a per-zone path over the surface
  const mitt = new THREE.Group();
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.12, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xf2c744, roughness: 0.9 })
  );
  pad.geometry.translate(0, -0.02, 0);
  const padTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.07, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xe8e4da, roughness: 0.95 })
  );
  padTop.position.y = 0.07;
  mitt.add(pad, padTop);
  mitt.visible = false;
  scene.add(mitt);

  // per-zone mitt paths hugging the geometry (never through the body)
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const wheelLoop = (cx, z) => {
    const pts = [];
    for (let i = 0; i <= 7; i++) {
      const a = Math.PI * 0.5 + (i / 7) * Math.PI * 2;
      pts.push(
        V(
          cx + Math.cos(a) * 0.52,
          Math.max(0.12, 0.375 + Math.sin(a) * 0.36),
          z
        )
      );
    }
    return pts;
  };
  const bayLoop = (cx, y) => {
    const pts = [];
    for (let i = 0; i <= 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      pts.push(
        V(
          cx + Math.cos(a) * 0.34,
          y + Math.sin(a * 2) * 0.05,
          Math.sin(a) * 0.42
        )
      );
    }
    return pts;
  };
  const PATHS = {
    paint: [
      V(-2.55, 0.85, 0.5),
      V(-1.8, 1.03, 0.95),
      V(-0.6, 1.0, 1.14),
      V(0.8, 1.0, 1.14),
      V(2.0, 1.02, 0.9),
      V(2.55, 0.9, 0.2),
      V(2.55, 0.9, -0.5),
      V(1.2, 1.0, -1.14),
      V(-0.4, 1.0, -1.14),
      V(-1.7, 1.03, -0.95),
      V(-2.5, 0.85, -0.3),
    ],
    wheels: wheelLoop(-1.42, 1.16).concat(wheelLoop(1.44, 1.16)),
    glass: [
      V(-1.38, 1.06, 0.45),
      V(-1.1, 1.32, 0.25),
      V(-0.5, 1.58, 0.1),
      V(0.3, 1.58, -0.1),
      V(0.95, 1.34, -0.25),
      V(1.32, 1.06, -0.4),
      V(0.9, 1.28, 0.82),
      V(-0.2, 1.3, 0.85),
      V(-0.9, 1.26, -0.82),
      V(0.2, 1.3, -0.85),
    ],
    cabin: [
      V(-1.02, 1.12, 0.3),
      V(-0.26, 1.02, 0.4),
      V(0.3, 1.0, -0.4),
      V(0.62, 1.02, 0.36),
      V(0.1, 1.06, 0.0),
      V(-0.5, 1.0, -0.36),
      V(-1.0, 1.1, -0.2),
    ],
    engine: bayLoop(-1.85, 1.02),
    trunk: bayLoop(1.79, 0.98),
  };
  const FOCUS = {
    paint: (p) => V(p.x * 0.85, Math.min(p.y, 0.9), 0),
    wheels: (p) =>
      V(
        Math.abs(p.x + 1.42) < Math.abs(p.x - 1.44) ? -1.42 : 1.44,
        0.375,
        p.z > 0 ? 0.85 : -0.85
      ),
    glass: (p) => V(p.x * 0.5, 1.12, 0),
    cabin: (p) => V(p.x, 0.8, p.z * 0.4),
    engine: () => V(-1.85, 0.55, 0),
    trunk: () => V(1.79, 0.55, 0),
  };
  const curveCache = {};
  const getCurve = (z) =>
    curveCache[z] ||
    (curveCache[z] = new THREE.CatmullRomCurve3(
      PATHS[z],
      false,
      'centripetal',
      0.2
    ));

  // foam bubbles trailing the mitt
  const foamTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    [
      [22, 26, 14],
      [38, 22, 12],
      [32, 42, 13],
      [44, 38, 9],
      [18, 42, 9],
    ].forEach(([x, y, r]) => {
      const gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
      gr.addColorStop(0, 'rgba(255,255,255,0.95)');
      gr.addColorStop(0.7, 'rgba(235,242,248,0.55)');
      gr.addColorStop(1, 'rgba(235,242,248,0)');
      g.fillStyle = gr;
      g.beginPath();
      g.arc(x, y, r, 0, 6.284);
      g.fill();
    });
    return new THREE.CanvasTexture(c);
  })();
  const foamPool = [];
  for (let i = 0; i < 22; i++) {
    const f = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: foamTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    f.visible = false;
    scene.add(f);
    foamPool.push(f);
  }
  let foamIdx = 0;

  // sparkle sprites for the finish
  const sparkTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.strokeStyle = 'rgba(255,255,255,1)';
    g.lineWidth = 5;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(32, 6);
    g.lineTo(32, 58);
    g.moveTo(6, 32);
    g.lineTo(58, 32);
    g.stroke();
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(14, 14);
    g.lineTo(50, 50);
    g.moveTo(50, 14);
    g.lineTo(14, 50);
    g.stroke();
    return new THREE.CanvasTexture(c);
  })();
  const sparkles = [];
  for (let i = 0; i < 10; i++) {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sparkTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sp.scale.setScalar(0.001);
    scene.add(sp);
    sparkles.push(sp);
  }
  // sparkle anchors sit ON the cleaned surfaces
  const SPARK_ANCHORS = {
    paint: [
      [-1.8, 1.02, 0.5],
      [-0.4, 1.0, 1.0],
      [0.9, 1.0, -1.0],
      [2.0, 1.0, 0.4],
      [0.2, 1.53, 0.3],
      [-2.3, 0.75, -0.3],
      [1.6, 0.98, 0.9],
      [-1.0, 0.98, -1.0],
      [2.35, 0.7, 0],
      [-0.9, 1.5, -0.2],
    ],
    wheels: [
      [-1.42, 0.55, 1.05],
      [-1.42, 0.2, 1.05],
      [1.44, 0.5, 1.05],
      [1.44, 0.25, -1.05],
      [-1.42, 0.375, -1.05],
      [1.44, 0.6, 1.05],
      [-1.2, 0.15, 1.0],
      [1.6, 0.15, -1.0],
      [-1.42, 0.7, -1.0],
      [1.44, 0.7, 1.0],
    ],
    glass: [
      [-1.1, 1.25, 0.4],
      [-1.15, 1.2, -0.3],
      [0, 1.52, 0.5],
      [-0.28, 1.52, 0],
      [1.05, 1.25, 0.35],
      [1.1, 1.2, -0.4],
      [-0.4, 1.3, 0.8],
      [0.4, 1.3, -0.8],
      [-0.28, 1.51, -0.35],
      [0.2, 1.35, 0.75],
    ],
    cabin: [
      [-0.26, 1.05, 0.36],
      [-0.26, 1.0, -0.36],
      [0.6, 1.0, 0.36],
      [0.6, 1.05, -0.36],
      [-1.05, 1.15, 0],
      [0, 0.95, 0],
      [0.2, 1.1, 0.2],
      [-0.5, 1.05, -0.2],
      [0.4, 0.95, 0.3],
      [-0.8, 1.1, 0.3],
    ],
    engine: [
      [-1.85, 0.95, 0.3],
      [-1.85, 0.95, -0.3],
      [-1.6, 0.9, 0],
      [-2.1, 0.9, 0.2],
      [-1.85, 1.05, 0],
      [-1.7, 0.95, -0.35],
      [-2.0, 0.95, 0.35],
      [-1.85, 0.85, 0.5],
      [-1.85, 0.85, -0.5],
      [-1.75, 1.0, 0.15],
    ],
    trunk: [
      [1.79, 0.9, 0.3],
      [1.79, 0.9, -0.3],
      [1.6, 0.95, 0],
      [2.0, 0.85, 0.2],
      [1.79, 1.0, 0],
      [1.9, 0.9, -0.35],
      [1.7, 0.9, 0.35],
      [1.79, 0.8, 0.5],
      [1.79, 0.8, -0.5],
      [1.85, 0.95, 0.15],
    ],
  };
  const startSparkles = (zone) => {
    const anchors = SPARK_ANCHORS[zone] || SPARK_ANCHORS.paint;
    sparkles.forEach((sp, i) => {
      const a = anchors[i % anchors.length];
      sp.position.set(
        a[0] + (Math.random() - 0.5) * 0.12,
        a[1] + (Math.random() - 0.5) * 0.08,
        a[2] + (Math.random() - 0.5) * 0.12
      );
      sp.userData.delay = i * 0.11;
      sp.userData.t = 0;
      sp.userData.size = 0.13 + Math.random() * 0.14;
    });
    S.sparkleT = 0;
  };

  // contact shadow
  const cnv = document.createElement('canvas');
  cnv.width = cnv.height = 256;
  const cx = cnv.getContext('2d');
  const grd = cx.createRadialGradient(128, 128, 10, 128, 128, 126);
  grd.addColorStop(0, 'rgba(0,0,0,0.55)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  cx.fillStyle = grd;
  cx.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.6, 3.0),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(cnv),
      transparent: true,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.005;
  scene.add(shadow);

  // lights
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(-4, 6.5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(5, 3, -4);
  scene.add(fill);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
  rimLight.position.set(2, 1.5, -6);
  scene.add(rimLight);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x20222a, 0.85);
  scene.add(hemi);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x30333c);
  const strip = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 6),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  strip.position.set(0, 9, -6);
  envScene.add(strip);
  const strip2 = strip.clone();
  strip2.position.set(0, 9, 8);
  envScene.add(strip2);
  const envTex = pmrem.fromScene(envScene, 0.04).texture;
  scene.environment = envTex;
  ['paint', 'rim', 'glass', 'engine'].forEach((k) => {
    M[k].envMap = envTex;
    M[k].envMapIntensity = k === 'paint' ? 0.85 : 0.6;
    M[k].needsUpdate = true;
  });
  pmrem.dispose();

  // ---- theme + zone application ----
  const paint = () => {
    const z = S.zone,
      a = accent();
    ZONES.forEach((k) => {
      DIRT[k].opacity = 0.92 * S.dirt[k];
    });
    dirtMeshes.forEach((o) => {
      o.visible = S.dirt[o.userData.dirtZone] > 0.02;
    });
    const cov = S.coverage; // Set of zones the current package touches, or null
    Object.values(M).forEach((m) => {
      const mz = m.userData.zone;
      const selected = z && mz === z;
      const covered = !cov || cov.has(mz);
      const glassOn = m.name === 'glass' ? (z === 'cabin' ? 0.16 : 0.42) : 1;
      if (selected) {
        // tapped zone: true colour with a clear accent glow
        m.color.copy(m.userData.base).lerp(a, cov ? 0.35 : 0);
        m.emissive = a.clone().multiplyScalar(0.3);
        m.opacity = glassOn;
        m.transparent = m.name === 'glass';
      } else if (cov && covered) {
        // covered by the package: painted in the accent so it reads at a glance
        m.color.copy(m.userData.base).lerp(a, z ? 0.45 : 0.72);
        m.emissive = a.clone().multiplyScalar(z ? 0.06 : 0.1);
        m.opacity = z ? (m.name === 'glass' ? 0.3 : 0.9) : glassOn;
        m.transparent = m.name === 'glass' || !!z;
      } else if (!cov && !z) {
        // no package context, nothing selected: plain showroom car
        m.color.copy(m.userData.base);
        m.emissive = new THREE.Color(0x000000);
        m.opacity = glassOn;
        m.transparent = m.name === 'glass';
      } else {
        // not touched by this package / not the selected zone: ghosted
        m.color.copy(m.userData.base).lerp(bg(), 0.72);
        m.emissive = new THREE.Color(0x000000);
        m.transparent = true;
        m.opacity = m.name === 'glass' ? 0.1 : 0.55;
      }
      m.needsUpdate = true;
    });
  };
  const theme = () => {
    const a = accent(),
      b = bg();
    hemi.groundColor = b.clone().lerp(new THREE.Color('#ffffff'), 0.06);
    M.tail.userData.base.copy(a).lerp(new THREE.Color('#000'), 0.35);
    paint();
  };
  // dirt demo: car is clean by default; selecting a zone soils it, then washes it.
  const resetFx = () => {
    ZONES.forEach((k) => {
      S.dirt[k] = 0;
      DIRT[k].alphaTest = 0;
      DIRT[k].color.copy(DIRT_BASE);
      DIRT[k].opacity = 0;
      DIRT[k].needsUpdate = true;
    });
    clipPlane.normal.set(1, 0, 0);
    clipPlane.constant = 100;
    mitt.visible = false;
    S.mittOut = -1;
    foamPool.forEach((f) => {
      f.visible = false;
      f.material.opacity = 0;
    });
    S.fx = null;
  };
  const applyZone = () => {
    const z = S.zone;
    if (S.fx) resetFx();
    // Only wash zones the package actually touches.
    const touched = !S.coverage || S.coverage.has(z);
    if (z && touched && !S.reduced) S.fx = { zone: z, phase: 'soil', t: 0 };
    paint();
  };
  theme();

  // ---- interaction ----
  let drag = null;
  const pointers = new Map(); // active pointers, for pinch-zoom
  let pinchDist = 0;
  const ray = new THREE.Raycaster(),
    ptr = new THREE.Vector2();
  const pick = (ev) => {
    const r = renderer.domElement.getBoundingClientRect();
    if (!r.width || !r.height) return '';
    ptr.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
    ptr.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ptr, cam);
    const hit = ray
      .intersectObjects(car.children, true)
      .find((h) => h.object.material && h.object.material.userData.zone);
    return hit ? hit.object.material.userData.zone : '';
  };
  const dist2 = () => {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const onDown = (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      pinchDist = dist2();
      drag = null;
    } else if (pointers.size === 1) {
      drag = { x: e.clientX, y: e.clientY, moved: 0 };
    }
    try {
      host.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    host.style.cursor = 'grabbing';
    S.idle = 0;
  };
  const onMove = (e) => {
    if (pointers.has(e.pointerId))
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const d = dist2();
      if (pinchDist > 0) {
        S.tdist = Math.max(
          MIN_DIST,
          Math.min(MAX_DIST, S.tdist * (pinchDist / d))
        );
      }
      pinchDist = d;
      S.idle = 0;
      return;
    }
    if (!drag) {
      if (e.pointerType === 'mouse')
        host.style.cursor = pick(e) ? 'pointer' : 'grab';
      return;
    }
    const dx = e.clientX - drag.x,
      dy = e.clientY - drag.y;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    S.taz -= dx * 0.008;
    S.az -= dx * 0.008;
    S.tel = Math.max(-0.05, Math.min(1.1, S.tel + dy * 0.006));
    S.el = Math.max(-0.05, Math.min(1.1, S.el + dy * 0.006));
    drag.x = e.clientX;
    drag.y = e.clientY;
    S.idle = 0;
  };
  const onUp = (e) => {
    pointers.delete(e.pointerId);
    const wasDrag = drag && drag.moved > 8;
    const hadDrag = !!drag;
    drag = null;
    pinchDist = 0;
    host.style.cursor = 'grab';
    if (hadDrag && !wasDrag && pointers.size === 0) {
      const z = pick(e);
      if (opts.onPick) opts.onPick(z);
    }
  };
  const onCancel = (e) => {
    // the browser took the gesture (e.g. vertical page scroll on touch)
    pointers.delete(e.pointerId);
    drag = null;
    pinchDist = 0;
    host.style.cursor = 'grab';
  };
  const onWheel = (e) => {
    // Only zoom on ctrl/⌘-wheel (trackpad pinch arrives as ctrl+wheel), so
    // an ordinary scroll over the viewer still scrolls the page.
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    S.tdist = Math.max(
      MIN_DIST,
      Math.min(MAX_DIST, S.tdist + e.deltaY * 0.012)
    );
    S.idle = 0;
  };
  const onLeave = () => {
    if (!drag) host.style.cursor = 'grab';
  };
  host.addEventListener('pointerdown', onDown);
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerup', onUp);
  host.addEventListener('pointercancel', onCancel);
  host.addEventListener('pointerleave', onLeave);
  host.addEventListener('wheel', onWheel, { passive: false });

  // ---- loop ----
  const resize = () => {
    const w = host.clientWidth || 600,
      h = host.clientHeight || 380;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    // Portrait / narrow viewers: back the camera off so the car still fits.
    S.fit = cam.aspect < 1.25 ? Math.min(2.0, 1.25 / cam.aspect) : 1;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Pause rendering while the viewer is off-screen.
  let visible = true;
  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (es) => {
            visible = es.some((x) => x.isIntersecting);
            if (visible && !S.raf && !S.dead) {
              clock.getDelta(); // drop the paused interval
              S.raf = requestAnimationFrame(tick);
            }
          },
          { rootMargin: '100px' }
        )
      : null;
  if (io) io.observe(host);

  const clock = new THREE.Clock();
  const tick = () => {
    S.raf = 0;
    if (S.dead) return;
    if (!visible) return; // resumed by the IntersectionObserver
    const dt = Math.min(clock.getDelta(), 0.05);
    S.idle += dt;
    try {
      if (S.fx) {
        const fx = S.fx,
          mat = DIRT[fx.zone];
        const style = S.fxStyle || 'scrub';
        const curve = getCurve(fx.zone);
        const placeMitt = (u, wobT, scale) => {
          // short back-and-forth strokes overlaid on the main pass
          const uu = Math.max(0, Math.min(1, u + Math.sin(wobT * 6.5) * 0.018));
          const posn = curve.getPointAt(uu);
          const focus = FOCUS[fx.zone](posn);
          const dir = posn.clone().sub(focus).normalize();
          const press = 0.015 * Math.sin(wobT * 13);
          mitt.position.copy(posn).addScaledVector(dir, -0.02 + press);
          // orient: up = surface normal, forward = direction of travel
          const tan = curve.getTangentAt(uu);
          const zax = new THREE.Vector3().crossVectors(tan, dir);
          if (zax.lengthSq() > 0.001) {
            zax.normalize();
            const xax = new THREE.Vector3().crossVectors(dir, zax).normalize();
            mitt.quaternion.setFromRotationMatrix(
              new THREE.Matrix4().makeBasis(xax, dir, zax)
            );
          } else {
            mitt.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          }
          // squash on the press, stretch on the release
          const sq = Math.sin(wobT * 13) * 0.07;
          mitt.scale.set(
            Math.max(0.001, scale * (1 + sq)),
            Math.max(0.001, scale * (1 - sq * 1.4)),
            Math.max(0.001, scale * (1 + sq))
          );
        };
        fx.t += dt;
        if (fx.phase === 'soil') {
          const p = Math.min(1, fx.t / 0.9);
          S.dirt[fx.zone] = p;
          paint();
          if (p >= 1) {
            fx.phase = 'suds';
            fx.t = 0;
          }
        } else if (fx.phase === 'suds') {
          // soap up: grime whitens into foam while the mitt scales in at the path start
          const p = Math.min(1, fx.t / 0.6);
          mat.color.copy(DIRT_BASE).lerp(SUDS, p * 0.85);
          mitt.visible = true;
          placeMitt(0, fx.t, p);
          if (p >= 1) {
            fx.phase = 'wash';
            fx.t = 0;
          }
        } else if (fx.phase === 'wash') {
          const DUR =
            { scrub: 3.0, sheet: 3.2, wipe: 2.8, fade: 1.8 }[style] || 2.8;
          const p = Math.min(1, fx.t / DUR);
          const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          placeMitt(e, fx.t, 1);
          // foam trail at the contact point
          S.foamAcc += dt;
          if (S.foamAcc > 0.08) {
            S.foamAcc = 0;
            const f = foamPool[foamIdx++ % foamPool.length];
            f.position.copy(mitt.position);
            f.userData.t = 0;
            f.visible = true;
          }
          if (style === 'scrub') {
            mat.alphaTest = e * 0.98;
            mat.needsUpdate = true;
          } else if (style === 'sheet') {
            clipPlane.normal.set(0, -1, 0);
            clipPlane.constant = 1.75 - e * 1.9;
          } else if (style === 'wipe') {
            clipPlane.normal.set(1, 0, 0);
            clipPlane.constant = -(-2.9 + e * 5.9);
          } else {
            mat.opacity = 0.92 * (1 - e);
          }
          if (p >= 1) {
            const done = fx.zone;
            resetFx();
            paint();
            // mitt lifts away and shrinks while the sparkles pop
            mitt.visible = true;
            S.mittOut = 0;
            startSparkles(done);
          }
        }
      }
      // mitt lift-off after the wash
      if (S.mittOut >= 0) {
        S.mittOut += dt;
        const q = S.mittOut / 0.45;
        if (q >= 1) {
          mitt.visible = false;
          S.mittOut = -1;
        } else {
          mitt.position.y += dt * 1.4;
          mitt.scale.setScalar(Math.max(0.001, 1 - q));
        }
      }
      // foam bubbles expand and pop
      foamPool.forEach((f) => {
        if (!f.visible) return;
        f.userData.t += dt;
        const q = f.userData.t / 0.7;
        if (q >= 1) {
          f.visible = false;
          f.material.opacity = 0;
        } else {
          f.material.opacity = 0.75 * (1 - q * q);
          f.scale.setScalar(0.09 + q * 0.2);
          f.position.y += dt * 0.12;
        }
      });
    } catch (fxErr) {
      console.error('car fx', fxErr);
      S.fx = null;
      S.mittOut = -1;
      mitt.visible = false;
    }
    // sparkle pops after the wash
    if (S.sparkleT >= 0) {
      S.sparkleT += dt;
      let alive = false;
      sparkles.forEach((sp) => {
        const t = S.sparkleT - sp.userData.delay;
        if (t < 0) {
          alive = true;
          return;
        }
        const LIFE = 0.7;
        if (t < LIFE) {
          alive = true;
          const q = t / LIFE;
          const pulse = Math.sin(q * Math.PI);
          sp.material.opacity = pulse;
          sp.scale.setScalar(sp.userData.size * (0.4 + q * 1.1));
          sp.material.rotation = q * 1.4;
        } else {
          sp.material.opacity = 0;
          sp.scale.setScalar(0.001);
        }
      });
      if (!alive) S.sparkleT = -1;
    }
    if (!drag && !S.zone && !S.reduced && S.idle > 2.5) S.taz += dt * 0.12;
    const k = 1 - Math.pow(0.0015, dt);
    S.az += (S.taz - S.az) * k;
    S.el += (S.tel - S.el) * k;
    S.dist += (S.tdist - S.dist) * k;
    S.ty += (S.tty - S.ty) * k;
    const ce = Math.cos(S.el),
      se = Math.sin(S.el);
    const d = S.dist * (S.fit || 1);
    cam.position.set(
      Math.sin(S.az) * ce * d,
      se * d + 0.2,
      Math.cos(S.az) * ce * d
    );
    cam.lookAt(0, S.ty, 0);
    const oh = S.zone === 'engine' ? -0.95 : 0;
    const ot = S.zone === 'trunk' ? 0.85 : 0;
    hoodPivot.rotation.z +=
      (oh - hoodPivot.rotation.z) * (1 - Math.pow(0.02, dt));
    trunkPivot.rotation.z +=
      (ot - trunkPivot.rotation.z) * (1 - Math.pow(0.02, dt));
    if (dirtPivots.hood) dirtPivots.hood.rotation.z = hoodPivot.rotation.z;
    if (dirtPivots.trunk) dirtPivots.trunk.rotation.z = trunkPivot.rotation.z;
    renderer.render(scene, cam);
    S.raf = requestAnimationFrame(tick);
  };
  S.raf = requestAnimationFrame(tick);

  // ---- controller ----
  return {
    /** Select a zone ('' clears). Moves the camera + plays the wash demo. */
    setZone(z) {
      z = z || '';
      if (z === S.zone) return;
      S.zone = z;
      const t = VIEW[z] || HOME;
      S.taz = t.az;
      S.tel = t.el;
      S.tdist = t.dist;
      S.tty = t.y;
      S.idle = 0;
      applyZone();
    },
    /** Zones the current package touches (array) — others are ghosted. null = all. */
    setCoverage(zones) {
      S.coverage = zones ? new Set(zones) : null;
      paint();
    },
    setFx(style) {
      S.fxStyle = style || 'scrub';
    },
    setColors({ accent: a, bg: b } = {}) {
      if (a) S.accent = a;
      if (b) S.bg = b;
      theme();
    },
    dispose() {
      S.dead = true;
      if (S.raf) cancelAnimationFrame(S.raf);
      S.raf = 0;
      ro.disconnect();
      if (io) io.disconnect();
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp);
      host.removeEventListener('pointercancel', onCancel);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('wheel', onWheel);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => {
          if (!m) return;
          if (m.map) m.map.dispose();
          m.dispose();
        });
      });
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host)
        host.removeChild(renderer.domElement);
    },
  };
}
