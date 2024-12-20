import "./rakhascene.css";

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Rakha from "../../components/3dobjects/rakha";
import { EffectComposer, Bloom, SSAO, Vignette } from "@react-three/postprocessing";
import React, { useEffect, useState } from "react";


const Scene_Rakha = React.memo(({mousePosition}) => {


    // SCROLL
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const currentScrollPosition = (window.scrollY || document.documentElement.scrollTop) / window.innerHeight * 100;
        setScrollPosition(currentScrollPosition);
    };
    // ===============================================
    
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

    return(
        <div id="canvas_container_scrolltranslate"
            style={{
                transform: `translateY(${scrollPosition * -.2}svh)`,
                opacity: (80 - scrollPosition) / 100
            }}
        >
            <div className="canvas_container">
                <Canvas
                    flat
                    linear
                    shadows
                    gl={{antialias: true}}
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
                    <Environment preset="studio" backgroundIntensity={.2} />
                    <ambientLight intensity={0.45} color={"#4763ff"} />

                    <directionalLight
                        position={[4, 1.2, 1]}
                        color={"#ff5555"}
                        intensity={9}
                        castShadow
                    />
                    <directionalLight
                        position={[4, .5, -5]}
                        color={"#ffaeae"}
                        intensity={12}
                        castShadow
                    />

                    <directionalLight
                        position={[-4, .25, -4]}
                        color={"#47ffd7"}
                        intensity={7}
                        castShadow
                    />
                    <directionalLight
                        position={[-4, .5, 4]}
                        color={"#0000ff"}
                        intensity={1}
                        castShadow
                    />
                    
                    <Rakha mouseCoordinate={mousePosition} />
                    
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
        </div>
    );
});

export default Scene_Rakha;