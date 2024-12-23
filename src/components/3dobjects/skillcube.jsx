import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";

const SkillCube = React.memo(({mouseCoordinate, scrollPosition, ...props}) => {

    const windowAspectRatio = window.innerWidth / window.innerHeight;

    const [skillPhaseProgress, setSkillPhaseProgress] = useState(0);
    useFrame(() => {
        setSkillPhaseProgress(
            (scrollPosition - 200)
            / 100
        );
    });
    
    
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
            
            // General rotation control by mouse Y coordinate
            rotationRef.current.rotation.y = MathUtils.lerp(
                rotationRef.current.rotation.y,
                mouseCoordinate.x * 1,
                0.06
            );
            
            // General rotation control by mouse X coordinate
            rotationRef.current.rotation.x = MathUtils.lerp(
                rotationRef.current.rotation.x,
                -mouseCoordinate.y * 1,
                0.06
            );

            // X position control by skill phase progress
            meshRef.current.position.x = MathUtils.lerp(
                meshRef.current.position.x,
                (
                    skillPhaseProgress <= 1
                        ? -2 * (1 - skillPhaseProgress) + (windowAspectRatio * -.5)
                        : (windowAspectRatio * -.5)
                ),
                0.05
            );
            meshRef.current.rotation.x = MathUtils.lerp(
                meshRef.current.rotation.x,
                4 * (1 - skillPhaseProgress),
                0.05
            );

            // Y position going down if skill phase progress is passed
            meshRef.current.position.y = MathUtils.lerp(
                meshRef.current.position.y,
                skillPhaseProgress >= 1
                    ? -2 * (skillPhaseProgress - 1)
                    : 0,
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
                position={[0, 0, 0]}
                scale={[
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38, 
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38, 
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38
                ]}
                rotation={[.6, .8, 0]}
                >
                <group ref={rotationRef}>
                    <primitive object={scene}/>
                </group>
            </group>
        </group>
    );
});

export default SkillCube;