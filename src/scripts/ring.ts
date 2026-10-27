import * as THREE from 'three';
import { simplexNoise } from './noise';

/**
 * Particle torus behind the page. It reads the visitor's presence:
 * pointer movement pushes particles away, scrolling ripples and fades the ring,
 * and a still pointer (dwell) makes it breathe more.
 */
export function initRing(canvas: HTMLCanvasElement) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  } catch {
    return;
  }
  const pixelRatio = Math.min(devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const isSmall = () => innerWidth < 760;

  // torus surface sampled on a jittered grid
  const U = isSmall() ? 190 : 300;
  const V = isSmall() ? 90 : 130;
  const R = 1.55, r = 0.82;
  const count = U * V;
  const pos = new Float32Array(count * 3);
  const nrm = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  let k = 0;
  for (let i = 0; i < U; i++) {
    for (let j = 0; j < V; j++) {
      const u = ((i + Math.random() * 0.6) / U) * Math.PI * 2;
      const v = ((j + Math.random() * 0.6) / V) * Math.PI * 2;
      const cu = Math.cos(u), su = Math.sin(u), cv = Math.cos(v), sv = Math.sin(v);
      pos.set([(R + r * cv) * cu, (R + r * cv) * su, r * sv], k * 3);
      nrm.set([cv * cu, cv * su, sv], k * 3);
      rnd[k] = Math.random();
      k++;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aNormal', new THREE.BufferAttribute(nrm, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));

  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(10, 10) },
    uPointerForce: { value: 0 },
    uAmp: { value: 1 },
    uScroll: { value: 0 },
    uAspect: { value: innerWidth / innerHeight },
    uSize: { value: 26 * pixelRatio },
    uOpacity: { value: 1 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: simplexNoise + /* glsl */ `
      uniform float uTime, uPointerForce, uAmp, uScroll, uAspect, uSize;
      uniform vec2 uPointer;
      attribute vec3 aNormal;
      attribute float aRand;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        float n  = snoise(p * 0.75 + vec3(0.0, 0.0, uTime * 0.22));
        float n2 = snoise(p * 2.1 - vec3(uTime * 0.12));
        p += aNormal * (n * 0.42 * uAmp + n2 * 0.09 + uScroll * 0.35 * n2);

        vec4 world = modelMatrix * vec4(p, 1.0);
        vec4 mv = viewMatrix * world;
        vec4 clip = projectionMatrix * mv;
        vec2 d = clip.xy / clip.w - uPointer;
        d.x *= uAspect;
        float f = smoothstep(0.42, 0.0, length(d)) * uPointerForce;
        mv.xy += normalize(d + 1e-4) * f * 0.55;
        mv.z  += f * 0.4;
        gl_Position = projectionMatrix * mv;

        gl_PointSize = uSize * (0.6 + aRand * 0.6) * (1.0 + f * 0.8) / -mv.z;

        float t = clamp(0.5 - position.y * 0.26 + position.x * 0.16 + n * 0.12, 0.0, 1.0);
        vec3 green  = vec3(0.24, 0.94, 0.62);
        vec3 blue   = vec3(0.30, 0.50, 1.00);
        vec3 violet = vec3(0.74, 0.36, 1.00);
        vColor = t < 0.5 ? mix(green, blue, t * 2.0) : mix(blue, violet, (t - 0.5) * 2.0);
        vColor += f * 0.35;
        vAlpha = mix(0.4, 1.0, smoothstep(-1.4, 1.2, world.z)) * (0.75 + 0.25 * aRand);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(vColor, smoothstep(0.5, 0.3, d) * vAlpha * uOpacity);
      }`,
  });

  const torus = new THREE.Points(geo, material);
  const group = new THREE.Group();
  group.add(torus);
  scene.add(group);

  // ambient dust
  const DUST = isSmall() ? 60 : 140;
  const dpos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dpos.set([(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6 - 1], i * 3);
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({
    color: 0x9b8cff, size: 0.05, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(dust);

  const layout = { x: 0, y: 0, scale: 1, dim: 1 };
  function resize() {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    uniforms.uAspect.value = w / h;
    const small = isSmall();
    layout.x = small ? 0 : 0.35;
    // on phones the ring sits between the headline and the intro, dimmed so text stays readable
    layout.y = small ? 0.8 : -0.15;
    layout.dim = small ? 0.6 : 1;
    // keep the ring at ~62% of the viewport height (and inside the width on portrait screens)
    layout.scale = Math.min(0.72, 0.72 * (w / h) * (small ? 0.95 : 0.8));
    uniforms.uSize.value = 26 * pixelRatio * (small ? 0.6 : 1);
  }
  resize();
  addEventListener('resize', resize);

  const pointer = new THREE.Vector2(10, 10);
  let force = 0;
  let lastMove = -10;
  let scrollVel = 0;
  let lastScrollY = scrollY;
  addEventListener('pointermove', (e) => {
    pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    lastMove = performance.now() / 1000;
  });
  document.addEventListener('pointerleave', () => pointer.set(10, 10));

  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible && !reduceMotion) requestAnimationFrame(frame);
  });

  const clock = new THREE.Clock();
  function frame() {
    const t = clock.getElapsedTime();
    const idle = performance.now() / 1000 - lastMove;
    const hasPointer = pointer.x < 5;

    force += ((idle < 0.25 ? 1 : 0.35) - force) * 0.05;
    uniforms.uPointer.value.lerp(pointer, 0.12);
    uniforms.uPointerForce.value = force;
    uniforms.uAmp.value += ((idle > 1.5 ? 1.45 : 1.0) - uniforms.uAmp.value) * 0.015;

    const y = scrollY;
    scrollVel += (Math.abs(y - lastScrollY) - scrollVel) * 0.1;
    lastScrollY = y;
    const scrollP = Math.min(1, y / innerHeight);
    uniforms.uScroll.value += (Math.min(scrollVel / 40, 1) - uniforms.uScroll.value) * 0.08;
    uniforms.uOpacity.value = layout.dim * (1 - scrollP * 0.8);
    uniforms.uTime.value = t;

    group.scale.setScalar(layout.scale * (1 - scrollP * 0.15));
    group.position.x = layout.x + scrollP * (isSmall() ? 0 : 1.2);
    group.position.y = layout.y + scrollP * 0.4;
    group.rotation.x = 0.38 + Math.sin(t * 0.18) * 0.12 + (hasPointer ? uniforms.uPointer.value.y * 0.12 : 0) + scrollP * 0.6;
    group.rotation.y = -0.18 + Math.cos(t * 0.15) * 0.15 + (hasPointer ? uniforms.uPointer.value.x * 0.18 : 0);
    torus.rotation.z = t * 0.06 + scrollP * 1.2;

    dust.rotation.y = t * 0.01;
    dust.position.y = Math.sin(t * 0.2) * 0.15;

    renderer.render(scene, camera);
    if (!reduceMotion && visible) requestAnimationFrame(frame);
  }
  frame();
  if (reduceMotion) addEventListener('scroll', () => requestAnimationFrame(frame), { passive: true });

  canvas.classList.add('ready');
}
