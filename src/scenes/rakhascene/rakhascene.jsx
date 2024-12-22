import "./rakhascene.css";

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Rakha from "../../components/3dobjects/rakha";
import { EffectComposer, Bloom, SSAO, Vignette } from "@react-three/postprocessing";
import React, { Suspense, useEffect, useState } from "react";
import SkillCube from "../../components/3dobjects/skillcube";


const Scene_Rakha = React.memo(({mousePosition, scrollPosition}) => {

    return(
        <div className="canvas_container">
            <Canvas
                flat
                linear
                shadows
                gl={{antialias: true, alpha: true}}
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
                    enableZoom={false} enablePan={false}
                    enabled={false}
                    minPolarAngle={Math.PI * .52}
                    maxPolarAngle={Math.PI * .52}
                />

                {/* Lighting */}
                <Scene_Rakha_Lighting mouseCoordinate={mousePosition} scrollPosition={scrollPosition} />
                
                
                <Suspense fallback={null}>
                    <Rakha mouseCoordinate={mousePosition} scrollPosition={scrollPosition} />
                    <SkillCube mouseCoordinate={mousePosition} scrollPosition={scrollPosition} />
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
const Scene_Rakha_Lighting = React.memo(({mousePosition, scrollPosition}) => {

    const [skillPhaseProgress, setSkillPhaseProgress] = useState(0);

    useFrame(() => {
        setSkillPhaseProgress(
            (scrollPosition - 100 > 0 ? scrollPosition - 100 : 0)
            / 100
        );
    });

    return(
        <>
            <Environment preset="studio" backgroundIntensity={.2} />
            <ambientLight intensity={0.45 + (skillPhaseProgress * 2)} color={"#4763ff"} />

            <directionalLight
                position={[4, 1.2, 1]}
                color={"#ff5555"}
                intensity={9 * (1 - skillPhaseProgress)}
                castShadow
            />

            <directionalLight
                position={[-4, .25, -4]}
                color={"#47ffd7"}
                intensity={7 * (1 - skillPhaseProgress)}
                castShadow
            />
            <directionalLight
                position={[-4, .5, 4]}
                color={"#0000ff"}
                intensity={1 * (1 - skillPhaseProgress)}
                castShadow
            />

            {/* LIGHT ADJUSTED FOR SKILL PHASE */}
            <directionalLight
                // position={[4, .5, -5]}
                position={[4, (.5 + (skillPhaseProgress / 2)), (-5 * (1 - skillPhaseProgress))]}
                color={"#ffabab"}
                intensity={12}
                castShadow
            />

        </>
    );
});



export default Scene_Rakha;