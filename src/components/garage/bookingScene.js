// Self-running "you're booked" celebration: the low-poly car in accent-red
// paint turning on a pedestal, a floating check badge and sparkle bursts.
// Ported from the design handoff's <booking-confirm> web component
// (booking3d.js). Non-interactive; loops every 8s. Framed tight so it reads
// well inside a small circle rather than a wide panel.
//
// Loaded via dynamic import() from BookingCelebration.js so three.js only
// ships when the confirmation screen renders.
import * as THREE from 'three';

const LOOP = 8;

/**
 * @param {HTMLElement} host   block element the canvas is appended to
 * @param {object} [opts]
 * @param {string}  [opts.accent]         paint / badge colour
 * @param {boolean} [opts.reducedMotion]  render a single still frame instead of animating
 */
export function createBookingScene(host, opts = {}) {
  const accent = new THREE.Color(opts.accent || '#d8352e');
  const reduced = !!opts.reducedMotion;
  let dead = false;
  let raf = 0;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 60);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1c1e26, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 3.2);
  key.position.set(-4, 6.5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.8);
  fill.position.set(5, 3, -4);
  scene.add(fill);
  const back = new THREE.DirectionalLight(0xffffff, 1.3);
  back.position.set(2, 1.5, -6);
  scene.add(back);

  // studio reflections
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x2c2f38);
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
  pmrem.dispose();

  // ---- materials ----
  const paintC = accent.clone();
  const M = {
    paint: new THREE.MeshStandardMaterial({
      color: paintC,
      roughness: 0.22,
      metalness: 0.65,
      envMapIntensity: 1.0,
    }),
    trim: new THREE.MeshStandardMaterial({
      color: 0x1e1f23,
      roughness: 0.65,
      metalness: 0.25,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x8fa2b3,
      roughness: 0.06,
      metalness: 0.1,
      transparent: true,
      opacity: 0.45,
      envMapIntensity: 0.8,
    }),
    tire: new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.92 }),
    rim: new THREE.MeshStandardMaterial({
      color: 0xc4c8cf,
      roughness: 0.22,
      metalness: 0.95,
      envMapIntensity: 0.8,
    }),
    lamp: new THREE.MeshStandardMaterial({
      color: 0xe8e2d6,
      roughness: 0.15,
      emissive: 0x4a4436,
    }),
    tail: new THREE.MeshStandardMaterial({
      color: paintC.clone().multiplyScalar(0.5),
      roughness: 0.2,
    }),
  };

  // ---- car (compact port of the showroom body) ----
  const car = new THREE.Group();
  const W = 1.86,
    HW = W / 2;
  const arch = (cx, r, y0, n) => {
    const out = [],
      N = n || 14;
    for (let i = 0; i <= N; i++) {
      const t = Math.PI * (1 - i / N);
      out.push([cx + Math.cos(t) * r, y0 + Math.sin(t) * r]);
    }
    return out;
  };
  const prof = (pts, depth, mat, bevel) => {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelSize: bevel || 0.035,
      bevelThickness: bevel || 0.035,
      bevelSegments: 2,
      curveSegments: 4,
    });
    g.translate(0, 0, -depth / 2);
    return new THREE.Mesh(g, mat);
  };
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
  body.castShadow = true;
  car.add(body);
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
  car.add(green);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.44, 0.07, W - 0.3),
    M.paint
  );
  roof.position.set(-0.03, 1.45, 0);
  roof.castShadow = true;
  car.add(roof);
  [0.755, -0.755].forEach((z) => {
    const pl = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.42, 0.02), M.trim);
    pl.position.set(0.1, 1.2, z);
    car.add(pl);
  });
  const sunroof = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.02, 0.82),
    M.glass
  );
  sunroof.position.set(-0.28, 1.5, 0);
  car.add(sunroof);
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
  [0.972, -0.972].forEach((z) => boxAt(2.44, 0.1, 0.05, 0.0, 0.27, z, M.trim));
  [-0.52, 0.7].forEach((x) =>
    [0.972, -0.972].forEach((z) => boxAt(0.022, 0.6, 0.025, x, 0.58, z, M.trim))
  );
  [0.972, -0.972].forEach((z) => {
    const sgn = z > 0 ? 1 : -1;
    boxAt(0.055, 0.05, 0.16, -1.0, 1.0, z + sgn * 0.08, M.trim);
    boxAt(0.15, 0.1, 0.09, -1.02, 1.01, z + sgn * 0.17, M.paint);
  });
  [-0.34, 0.86].forEach((hx) =>
    [0.972, -0.972].forEach((hz) => {
      const hd = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.045, 0.04), M.rim);
      hd.position.set(hx, 0.75, hz);
      car.add(hd);
    })
  );
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
  [
    [-2.28, 0.44],
    [2.32, 0.44],
  ].forEach(([px, py]) => {
    const pl = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.13, 0.34), M.lamp);
    pl.position.set(px, py, 0);
    car.add(pl);
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

  const turntable = new THREE.Group();
  car.scale.setScalar(0.56);
  turntable.add(car);
  scene.add(turntable);

  // contact shadow on the pedestal
  const cnv = document.createElement('canvas');
  cnv.width = cnv.height = 256;
  const cx2 = cnv.getContext('2d');
  const grd = cx2.createRadialGradient(128, 128, 10, 128, 128, 126);
  grd.addColorStop(0, 'rgba(0,0,0,0.5)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  cx2.fillStyle = grd;
  cx2.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.7),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(cnv),
      transparent: true,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.012;
  turntable.add(shadow);

  // pedestal (trimmed to hug the car — the circle crop leaves no room for stage)
  const PED_R = 1.5;
  const ped = new THREE.Mesh(
    new THREE.CylinderGeometry(PED_R, PED_R + 0.12, 0.14, 56),
    new THREE.MeshStandardMaterial({
      color: 0x212329,
      roughness: 0.35,
      metalness: 0.55,
      envMapIntensity: 0.5,
    })
  );
  ped.position.y = -0.07;
  scene.add(ped);
  const ringM = new THREE.MeshStandardMaterial({
    color: accent,
    roughness: 0.3,
    metalness: 0.4,
    emissive: accent.clone().multiplyScalar(0.45),
  });
  const trimRing = new THREE.Mesh(
    new THREE.TorusGeometry(PED_R + 0.06, 0.018, 10, 70),
    ringM
  );
  trimRing.rotation.x = Math.PI / 2;
  trimRing.position.y = 0.005;
  scene.add(trimRing);

  // check badge: accent disc + white ring & check
  const BADGE_Y = 1.4;
  const BADGE_SCALE = 1.2;
  const badge = new THREE.Group();
  const badgeM = new THREE.MeshStandardMaterial({
    color: accent,
    roughness: 0.3,
    metalness: 0.25,
    emissive: accent.clone().multiplyScalar(0.35),
    envMapIntensity: 0.7,
  });
  const whiteM = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    emissive: 0x555555,
  });
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.34, 0.34, 0.09, 40),
    badgeM
  );
  disc.rotation.x = Math.PI / 2;
  badge.add(disc);
  badge.add(
    new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.032, 12, 48), whiteM)
  );
  const a1 = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.17, 0.09), whiteM);
  a1.position.set(-0.08, -0.06, 0.06);
  a1.rotation.z = 0.74;
  const a2 = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.36, 0.09), whiteM);
  a2.position.set(0.065, 0.01, 0.06);
  a2.rotation.z = -0.62;
  badge.add(a1, a2);
  badge.position.y = BADGE_Y;
  scene.add(badge);

  // sparkles
  const sparkTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.strokeStyle = '#fff';
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
  // glints pinned to the paint so the car reads "just polished"
  const GLINTS = [
    [-1.0, 0.58, 0.55],
    [0.5, 0.56, -0.55],
    [1.15, 0.55, 0.5],
    [-0.15, 0.82, 0.15],
    [-1.25, 0.42, -0.5],
    [0.9, 0.4, 0.53],
  ];
  const sparkles = GLINTS.map((a, i) => {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sparkTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sp.position.set(a[0], a[1], a[2]);
    sp.userData.seed = i * 0.73;
    turntable.add(sp);
    return sp;
  });
  // celebration sparkles: burst around the car at loop start
  const burst = [];
  for (let i = 0; i < 26; i++) {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: sparkTex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color:
          i % 3 === 0
            ? accent.clone().lerp(new THREE.Color(0xffffff), 0.6).getHex()
            : 0xffffff,
      })
    );
    sp.userData = { seed: Math.random() * 10 };
    scene.add(sp);
    burst.push(sp);
  }
  const resetBurst = () =>
    burst.forEach((sp) => {
      const a = Math.random() * 6.284,
        r = 1.1 + Math.random() * 1.1;
      sp.position.set(
        Math.cos(a) * r,
        0.4 + Math.random() * 1.4,
        Math.sin(a) * r * 0.8
      );
      sp.userData.delay = Math.random() * 2.2;
      sp.userData.size = 0.08 + Math.random() * 0.14;
      sp.userData.rise = 0.1 + Math.random() * 0.25;
      sp.material.opacity = 0;
    });
  resetBurst();

  // Tight framing: fill the circle with car + badge, little stage around it.
  const LOOK = new THREE.Vector3(0, 0.66, 0);
  const CAM_DIR = new THREE.Vector3(0.55, 0.3, 0.75).normalize();
  let camDist = 5.7;
  const resize = () => {
    const w = host.clientWidth || 240,
      h = host.clientHeight || 240;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    // if the box is wider than tall, height limits; otherwise back off a bit
    camDist = cam.aspect >= 1 ? 5.7 : 5.7 / cam.aspect;
    if (reduced) render(0);
  };

  const render = (el) => {
    const t = el % LOOP;
    turntable.rotation.y = el * 0.3;
    const pop = Math.min(1, t / 0.7);
    const over = pop < 1 ? 1.12 * Math.sin(pop * Math.PI * 0.6) : 1;
    badge.scale.setScalar(BADGE_SCALE * Math.max(0.001, reduced ? 1 : over));
    badge.position.y = BADGE_Y + Math.sin(el * 1.5) * 0.05;
    badge.rotation.y = Math.sin(el * 0.7) * 0.35;
    burst.forEach((sp) => {
      const q = (t - sp.userData.delay) / 1.1;
      if (reduced || q < 0 || q >= 1) {
        sp.material.opacity = 0;
        return;
      }
      const pulse = Math.sin(q * Math.PI);
      sp.material.opacity = pulse * 0.9;
      sp.scale.setScalar(sp.userData.size * (0.5 + q));
      sp.position.y += sp.userData.rise * 0.016;
      sp.material.rotation = q * 1.6;
    });
    sparkles.forEach((sp) => {
      const q = (el * 0.5 + sp.userData.seed) % 1;
      sp.material.opacity = reduced
        ? 0
        : Math.max(0, Math.sin(q * Math.PI) - 0.55) * 2;
      sp.scale.setScalar(0.09 + Math.sin(q * Math.PI) * 0.08);
    });
    cam.position
      .copy(CAM_DIR)
      .multiplyScalar(camDist)
      .add(new THREE.Vector3(Math.sin(el * 0.09) * 0.3, 0, 0));
    cam.lookAt(LOOK);
    renderer.render(scene, cam);
  };

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const clock = new THREE.Clock();
  let last = 0;
  const tick = () => {
    raf = 0;
    if (dead) return;
    const el = clock.getElapsedTime();
    const t = el % LOOP;
    if (t < last) resetBurst();
    last = t;
    render(el);
    raf = requestAnimationFrame(tick);
  };
  if (reduced)
    render(0.9); // one still frame, badge already popped in
  else raf = requestAnimationFrame(tick);

  return {
    dispose() {
      dead = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
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
