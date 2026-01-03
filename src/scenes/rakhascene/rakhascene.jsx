import "./rakhascene.css";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Rakha from "../../components/3dobjects/rakha";
import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  Outline,
} from "@react-three/postprocessing";
import React, { Suspense, useContext, useRef } from "react";
import { UimodeContext } from "../../providers/uimodeProvider";
import SkillCube from "../../components/3dobjects/skillcube";
import AchievementHighlights from "../../components/3dobjects/achievement_highlights";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";

const Scene_Rakha = React.memo(({ mousePosition, scrollPosition }) => {
  const { doneLoading } = useContext(LoadindicatorContext);

  return (
    <div className={"canvas_container" + (doneLoading ? " init" : "")}>
      <Canvas
        flat
        linear
        shadows
        dpr={[0.5, 1]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={20}
          near={0.1}
          far={1000}
          aspect={window.innerWidth / window.innerHeight}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enabled={false}
          minPolarAngle={Math.PI * 0.52}
          maxPolarAngle={Math.PI * 0.52}
        />

        {/* Lighting */}
        <Scene_Rakha_Lighting
          mouseCoordinate={mousePosition}
          scrollPosition={scrollPosition}
        />

        <Suspense fallback={null}>
          <Rakha
            mouseCoordinate={mousePosition}
            scrollPosition={scrollPosition}
          />
        </Suspense>
        <Suspense fallback={null}>
          <SkillCube
            mouseCoordinate={mousePosition}
            scrollPosition={scrollPosition}
          />
        </Suspense>
        <Suspense fallback={null}>
          <AchievementHighlights
            mouseCoordinate={mousePosition}
            scrollPosition={scrollPosition}
          />
        </Suspense>

        <EffectComposer>
          {/* <SSAO
                        samples={31}
                        radius={0.1}
                        intensity={20}
                        luminanceInfluence={0.6}
                        color="black"
                    /> */}
          {/* <Bloom
                        intensity={15}
                        radius={2}
                        luminanceThreshold={3}
                    /> */}
          <Vignette eskil={true} offset={0.2} darkness={2.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
});

// LIGHTING SETUP
const Scene_Rakha_Lighting = React.memo(({ mousePosition, scrollPosition }) => {
  const { uimode } = useContext(UimodeContext);

  const ambientRef = useRef();
  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();
  const light4Ref = useRef();

  useFrame(() => {
    const achievementProgress =
      (scrollPosition - 200 > 100 ? scrollPosition - 300 : 0) / 100;

    // Update light intensities directly
    if (ambientRef.current) {
      ambientRef.current.intensity =
        (uimode === "light" ? 1.5 : 0.4) + achievementProgress * 2;
    }
    if (light1Ref.current) {
      light1Ref.current.intensity = 10 * (1 - achievementProgress);
    }
    if (light2Ref.current) {
      light2Ref.current.intensity = 9 * (1 - achievementProgress);
    }
    if (light3Ref.current) {
      light3Ref.current.intensity = 12 * (1 - achievementProgress);
    }
    if (light4Ref.current) {
      light4Ref.current.position.x = 4 * (1 - achievementProgress);
      light4Ref.current.position.y = 0.5 + achievementProgress / 2;
      light4Ref.current.position.z = -9 * (1 - achievementProgress) + 5;
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={uimode === "light" ? 1.5 : 0.4}
        color={"#8c9eff"}
      />

      <directionalLight
        ref={light1Ref}
        position={[4, 1.2, 1]}
        color={"#ff816b"}
        intensity={10}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={light2Ref}
        position={[-4, 0.25, -4]}
        color={"#2f9bfa"}
        intensity={9}
      />

      <directionalLight
        ref={light3Ref}
        position={[-4, 0.5, 4]}
        color={"#1818ff"}
        intensity={12}
      />

      <directionalLight
        ref={light4Ref}
        position={[4, 0.5, 5]}
        color={"#ffe8bd"}
        intensity={7.5}
      />
    </>
  );
});

export default Scene_Rakha;
