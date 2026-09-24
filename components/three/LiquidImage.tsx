"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Vertex shader: physically bulges the plane's surface toward the camera
// around the pointer (not just a flat UV trick), so lighting/perspective
// actually sell it as 3D. A couple of overlapping sine waves keyed on
// distance-from-pointer and time give the bulge a "liquid" wobble instead
// of a static bump.
const VERTEX_SHADER = `
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    vUv = uv;
    vec2 delta = uv - uMouse;
    float dist = length(delta);
    float radius = 0.3;
    float bump = smoothstep(radius, 0.0, dist);
    float wobble = sin(dist * 22.0 - uTime * 2.4) * 0.35 + 0.65;
    float displacement = bump * wobble * uHover;
    vDisplacement = displacement;
    vec3 pos = position + normal * displacement * 0.4;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader: samples the texture with a small UV pull away from the
// bulge's center (a cheap "liquid lens" refraction) and adds a soft
// highlight where the bulge is tallest — implies the surface is catching
// light without a full normal-map recompute.
const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    vec2 uv = vUv - (vUv - 0.5) * vDisplacement * 0.05;
    vec4 color = texture2D(uTexture, uv);
    color.rgb += vDisplacement * 0.22;
    gl_FragColor = color;
  }
`;

const HOVER_EASE_RATE = 4;

function LiquidPlane({ src }: { src: string }) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hoverTarget = useRef(0);
  const { viewport } = useThree();

  // Created once and never replaced — uniforms are meant to be mutated in
  // place (see useFrame and the effect below), not swapped for a new
  // object every render. If this were a fresh object literal on every
  // render instead, the "in place" updates below would only ever land on
  // a copy r3f immediately discards, since it can't tell that came from
  // the same logical uniform.
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberately created once; texture changes are applied to this same object in the effect below instead of recreating it
    [],
  );

  // The hero illustration cycles through 3 images on one persistent
  // LiquidImage instance (see HeroImageCycle) rather than remounting a
  // fresh Canvas per image — so swapping the picture now means updating
  // this uniform's value in place instead of getting a new material for
  // free. Goes through materialRef (like useFrame below does for the other
  // uniforms), not the `uniforms` object directly — mutating a value
  // straight from useMemo's return trips the immutability lint rule, even
  // though mutating .value in place is exactly how three.js uniforms are
  // meant to be updated.
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  // The plane just fills the whole canvas edge-to-edge — the "contain fit"
  // for the image's own aspect ratio is already handled one level up, in
  // plain measured pixels (see HeroImageCycle's boxSize), so this
  // component's own <div className={className}> is always exactly the
  // right box already. An earlier version re-derived a "contain" size here
  // too, via r3f's viewport (world-unit) math — a second, independent
  // implementation of the same idea that didn't quite agree with the
  // glitch transition's plain CSS object-contain, which is what made the
  // image visibly shrink specifically during that transition.
  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;
    const ease = 1 - Math.exp(-HOVER_EASE_RATE * delta);
    material.uniforms.uHover.value = THREE.MathUtils.lerp(
      material.uniforms.uHover.value,
      hoverTarget.current,
      ease,
    );
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.set(
      (state.pointer.x + 1) / 2,
      (state.pointer.y + 1) / 2,
    );
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerEnter={() => {
        hoverTarget.current = 1;
      }}
      onPointerLeave={() => {
        hoverTarget.current = 0;
      }}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// Renders `src` as a WebGL plane that bulges into a liquid, blob-like bump
// wherever the pointer hovers, instead of a flat <img>. Only ever mounted
// client-side (see HeroImageCycle's dynamic import) and skipped entirely
// under prefers-reduced-motion, since the whole effect is motion.
export function LiquidImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        {/* useTexture suspends while the image loads — without a Suspense
            boundary here, that thrown promise has nowhere to be caught
            inside the Canvas and surfaces as a misleading "hooks can only
            be used within the Canvas component" error instead. */}
        <Suspense fallback={null}>
          <LiquidPlane src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}
