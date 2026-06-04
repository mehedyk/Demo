"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useScroll, motion, useTransform } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// GLSL shaders definition for the morphing blob
const BlobShaderMaterial = {
  uniforms: {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_theme: { value: 0 }, // 0 = Theme A (Gold/Navy), 1 = Theme B (Violet/Coral)
  },
  vertexShader: `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simplex 3D Noise generator
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - D.yyy;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vNormal = normalMatrix * normal;
      vPosition = position;
      
      // Calculate vertex displacement (morph amplitude: 0.35, speed: 0.5)
      float noise = snoise(position * 1.6 + vec3(0.0, 0.0, u_time * 0.45));
      vec3 displaced = position + normal * noise * 0.32;
      
      // Subtle lean toward cursor coordinates
      displaced.xy += u_mouse * 0.14 * (position.z + 1.0);

      vec4 modelViewPosition = modelViewMatrix * vec4(displaced, 1.0);
      vViewPosition = -modelViewPosition.xyz;

      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  fragmentShader: `
    uniform float u_theme;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Fresnel rim reflection
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
      vec3 color = vec3(0.0);

      if (u_theme < 0.5) {
        // Theme A: iridescent gold/bronze — mix of #c9a84c, #ffffff, #0a2060 by normal + fresnel
        vec3 gold = vec3(0.788, 0.659, 0.298); // #c9a84c
        vec3 white = vec3(1.0, 1.0, 1.0);
        vec3 navy = vec3(0.039, 0.125, 0.376); // #0a2060
        
        vec3 base = mix(navy, gold, (normal.z + 1.0) * 0.5);
        color = mix(base, white, fresnel * 0.5);
        color += gold * fresnel * 0.8;
      } else {
        // Theme B: iridescent violet/coral — mix of #7c3aed, #f97316, #000000 by normal + fresnel
        vec3 violet = vec3(0.486, 0.227, 0.929); // #7c3aed
        vec3 coral = vec3(0.976, 0.451, 0.086); // #f97316
        vec3 black = vec3(0.0, 0.0, 0.0);
        
        vec3 base = mix(black, violet, (normal.z + 1.0) * 0.5);
        color = mix(base, coral, fresnel * 0.65);
        color += violet * fresnel * 0.9;
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// Shader wrapper inside fiber
function MorphingBlob({ themeValue, mouseRef }: { themeValue: number; mouseRef: React.RefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // 1. Slow Y rotation & idle floating
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.12;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    }

    // 2. Drive uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = time;
      materialRef.current.uniforms.u_theme.value = themeValue;
      
      // Smoothly lerp mouse coordinate updates
      if (mouseRef.current) {
        materialRef.current.uniforms.u_mouse.value.lerp(mouseRef.current, 0.08);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={BlobShaderMaterial.fragmentShader}
        vertexShader={BlobShaderMaterial.vertexShader}
        uniforms={BlobShaderMaterial.uniforms}
      />
    </mesh>
  );
}

// Mobile fallback: static metallic low-poly sphere
function MobileBlob({ themeValue }: { themeValue: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Theme A gold vs Theme B purple
  const color = themeValue === 0 ? "#c9a84c" : "#7c3aed";

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 3]} />
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.9}
        flatShading
      />
    </mesh>
  );
}

export default function Blob3D() {
  const { theme } = useTheme();
  const themeValue = theme === "a" ? 0 : 1;
  
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { scrollYProgress } = useScroll();

  // Scroll bindings for the floating brand element
  // Shrinks scale 1 -> 0.3
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.25]);
  
  // relocates coordinates: centered-right to top-right corner
  const x = useTransform(scrollYProgress, [0, 0.12], ["22%", "40%"]);
  const y = useTransform(scrollYProgress, [0, 0.12], ["0%", "-42%"]);

  useEffect(() => {
    setMounted(true);

    const checkDevice = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.set(nx, ny);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen z-30 pointer-events-none"
      style={{
        scale,
        x,
        y,
      }}
    >
      <div className="w-full h-full relative">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3], fov: 50 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Ambient lighting */}
          <ambientLight intensity={0.25} />
          
          {/* Light setup per theme rules */}
          <pointLight
            position={[5, 5, 5]}
            color={themeValue === 0 ? "#c9a84c" : "#7c3aed"}
            intensity={2}
          />
          <pointLight
            position={[-5, -3, -3]}
            color={themeValue === 0 ? "#0033ff" : "#f97316"}
            intensity={1}
          />
          <spotLight position={[0, 8, 2]} intensity={3} />

          <Suspense fallback={null}>
            {isMobile ? (
              <MobileBlob themeValue={themeValue} />
            ) : (
              <MorphingBlob themeValue={themeValue} mouseRef={mouse} />
            )}
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
}
