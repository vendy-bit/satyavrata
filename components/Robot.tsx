"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function Model() {
  const { scene, animations } = useGLTF("/poddy_m1_-_stylized_floating_robot_-_posed.glb");
  const robotRef = useRef<THREE.Group>(null);
  const [headBone, setHeadBone] = useState<THREE.Object3D | null>(null);
  
  const { actions } = useAnimations(animations, robotRef);
  
  const globalMouse = useRef({ x: 0, y: 0 });
  const isMouseInside = useRef(false);

  const isBodyHovered = useRef(false);
  const currentSequenceAction = useRef<THREE.AnimationAction | null>(null);
  const activeAction = useRef<THREE.AnimationAction | null>(null);

  // --- PERBAIKAN: Dipecah per baris agar TypeScript 100% lulus sensor ---
  const changeAnimSmoothly = (nextAction: THREE.AnimationAction | null | undefined) => {
    if (!nextAction) return;
    if (activeAction.current === nextAction) return;

    // Tidak dironcé/chaining lagi biar tidak error
    nextAction.reset();
    nextAction.enabled = true;
    nextAction.setEffectiveWeight(1);
    nextAction.setEffectiveTimeScale(1);
    nextAction.play();

    if (activeAction.current) {
      activeAction.current.crossFadeTo(nextAction, 0.3, true);
    }

    activeAction.current = nextAction;
  };

  useEffect(() => {
    const animKeys = Object.keys(actions);
    if (animKeys.length === 0) return;

    const getAct = (k: string, idx: number) => {
      const key = animKeys.find(name => name.toLowerCase().includes(k));
      return key ? actions[key] : actions[animKeys[idx]];
    };

    const actIdle = getAct("pose 1", 0);
    const actOmfg = getAct("omfg", 1);
    const actHello = getAct("hello", 2);
    const actWarm = getAct("warm", 3);

    currentSequenceAction.current = actIdle;

    let isCancelled = false;
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

    // --- TIMELINE LOOP ATRAKSI ---
    const runAtraksiLoop = async () => {
      changeAnimSmoothly(actIdle);
      await sleep(1000);

      while (!isCancelled) {
        if (!isBodyHovered.current) {
          // 1. Hello / Hay
          currentSequenceAction.current = actHello;
          changeAnimSmoothly(actHello);
          await sleep(3000); 

          // 2. OMFG (Fungsi hantu yang bikin error sudah dibuang bersih)
          if (!isBodyHovered.current && !isCancelled) {
            currentSequenceAction.current = actOmfg;
            changeAnimSmoothly(actOmfg);
            await sleep(3000);
          }

          // 3. Warm
          if (!isBodyHovered.current && !isCancelled) {
            currentSequenceAction.current = actWarm;
            changeAnimSmoothly(actWarm);
            await sleep(3000);
          }

          // 4. Standby & Istirahat 10 Detik
          if (!isBodyHovered.current && !isCancelled) {
            currentSequenceAction.current = actIdle;
            changeAnimSmoothly(actIdle);
            
            let cooldown = 10000; 
            while (cooldown > 0 && !isBodyHovered.current && !isCancelled) {
              await sleep(200);
              cooldown -= 200;
            }
          }
          
        } else {
          await sleep(200);
        }
      }
    };

    runAtraksiLoop();

    scene.traverse((node) => {
      if (node.name === "head01_02") {
        setHeadBone(node);
      }
    });

    const handleMouseMove = (event: MouseEvent) => {
      if (
        event.clientX <= 5 ||
        event.clientY <= 5 ||
        event.clientX >= window.innerWidth - 5 ||
        event.clientY >= window.innerHeight - 5
      ) {
        isMouseInside.current = false;
        return;
      }

      isMouseInside.current = true;
      const isDesktop = window.innerWidth > 768;
      const robotCenterX = isDesktop ? window.innerWidth * 0.7 : window.innerWidth * 0.5;
      
      globalMouse.current.x = ((event.clientX - robotCenterX) / window.innerWidth) * 2;
      globalMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => isMouseInside.current = false;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);
    
    document.addEventListener("mouseout", (event: MouseEvent) => {
      if (!event.relatedTarget) handleMouseLeave();
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [scene, actions]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation(); 
    isBodyHovered.current = true;
    
    const animKeys = Object.keys(actions);
    const sadKey = animKeys.find(name => name.toLowerCase().includes("sad"));
    const actSad = sadKey ? actions[sadKey] : actions[animKeys[4]];
    
    changeAnimSmoothly(actSad); 
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    isBodyHovered.current = false;
    changeAnimSmoothly(currentSequenceAction.current); 
  };

  useFrame((state) => {
    if (robotRef.current) {
      const t = state.clock.getElapsedTime();
      const floatY = Math.sin(t * 2) * 0.05; 

      const bodyTargetRotY = isMouseInside.current ? globalMouse.current.x * 0.5 : 0; 
      const bodyTargetRotX = isMouseInside.current ? globalMouse.current.y * 0.2 : 0; 

      let bodyTargetPosX = isMouseInside.current ? globalMouse.current.x * 1.8 : 0;
      bodyTargetPosX = Math.max(-1.5, Math.min(1.5, bodyTargetPosX)); 

      const bodyTargetPosY = isMouseInside.current ? globalMouse.current.y * 0.8 : 0;

      robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, bodyTargetRotY, 0.02);
      robotRef.current.rotation.x = THREE.MathUtils.lerp(robotRef.current.rotation.x, -bodyTargetRotX, 0.02);

      robotRef.current.position.x = THREE.MathUtils.lerp(robotRef.current.position.x, bodyTargetPosX, 0.02);
      robotRef.current.position.y = THREE.MathUtils.lerp(robotRef.current.position.y, floatY + bodyTargetPosY, 0.02);
    }

    if (headBone) {
      const headTargetX = isMouseInside.current ? globalMouse.current.x * 0.8 : 0; 
      const headTargetY = isMouseInside.current ? globalMouse.current.y * 0.5 : 0; 
      
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, headTargetX, 0.1);
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, headTargetY, 0.1); 
    }
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
      
      {/* Invisible Hitbox Tetap Dipertahankan untuk Sensor Sit Sad */}
      <mesh 
        position={[0, 0.5, 0]} 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1.6, 2.4, 1.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function LawyerCanvas() {
  return (
    <div className="h-full w-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}