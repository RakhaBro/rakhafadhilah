import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";

const SkillCube = React.memo(({mouseCoordinate, scrollPosition, ...props}) => {

    const meshRef = useRef();
    const rotationRef = useRef();
    const { scene, animations } = useGLTF('assets/glb/skillcube.glb');

    const { actions, names } = useAnimations(animations, scene);
    useEffect(() => {
        if (names.length > 0) {
            names.forEach((name) => {
            actions[name]?.play();
            })
        }
    }, [actions, names]);


    const controlAnimation = () => {
        if (meshRef.current && rotationRef.current) {
            
            // General rotation control by mouse X coordinate
            rotationRef.current.rotation.y = MathUtils.lerp(
                rotationRef.current.rotation.y,
                mouseCoordinate.x * 1,
                0.06
            );
            
            // General rotation control by mouse Y coordinate
            rotationRef.current.rotation.x = MathUtils.lerp(
                rotationRef.current.rotation.x,
                -mouseCoordinate.y * 1,
                0.06
            );

            // General position control by mouse coordinate
            const scrollPhase_xPosition = scrollPosition <= 100 ? -100 : (scrollPosition - 200);
            meshRef.current.position.x = MathUtils.lerp(
                meshRef.current.position.x,
                scrollPhase_xPosition * 0.03,
                0.05
            );
            meshRef.current.rotation.x = MathUtils.lerp(
                meshRef.current.rotation.x,
                scrollPhase_xPosition * .03,
                0.05
            );

        }
    }


     useFrame((state, delta) => {
        controlAnimation();
    });


    useEffect(() => {
        meshRef.current.position.x = -3;
        controlAnimation();
    }, []);


    return(
        <group {...props}
        ref={meshRef}
        >
            <group
                position={[-1, -.1, 0]}
                scale={[.38, .38, .38]}
                >
                <group ref={rotationRef}>
                    <primitive object={scene}/>
                </group>
            </group>
        </group>
    );
});

export default SkillCube;