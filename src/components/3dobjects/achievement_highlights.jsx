import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils, MeshBasicMaterial, MeshStandardMaterial } from "three";

const AchievementHighlights = React.memo(({mouseCoordinate, scrollPosition, ...props}) => {

    const windowAspectRatio = window.innerWidth / window.innerHeight;

    const [achievementPhaseProgress, setAchievementPhaseProgress] = useState(0);
    useFrame(() => {
        setAchievementPhaseProgress(
            (scrollPosition - 300)
            / 100
        );
    });
    
    
    const meshRef = useRef();
    const rotationRef = useRef();
    const childRotationRef = useRef();
    const { scene, animations } = useGLTF('assets/glb/achievement_highlights.glb');

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
            
            // // General rotation control by mouse Y coordinate
            rotationRef.current.rotation.y = MathUtils.lerp(
                rotationRef.current.rotation.y,
                mouseCoordinate.x * .17 - .6,
                0.06
            );
            
            // // General rotation control by mouse X coordinate
            childRotationRef.current.rotation.x = MathUtils.lerp(
                childRotationRef.current.rotation.x,
                -mouseCoordinate.y * .4,
                0.06
            );

            // X position control by skill phase progress
            meshRef.current.position.x = MathUtils.lerp(
                meshRef.current.position.x,
                (
                    achievementPhaseProgress <= 1
                        ? 3.2 * (1 - achievementPhaseProgress) + (windowAspectRatio * .11)
                        : (windowAspectRatio * .11)
                ),
                0.05
            );

            // Y position going down if skill phase progress is passed
            meshRef.current.position.y = MathUtils.lerp(
                meshRef.current.position.y,
                achievementPhaseProgress >= 1
                    ? -3 * (achievementPhaseProgress - 1)
                    : 0,
                0.05
            );

        }
    }


     useFrame((state, delta) => {
        controlAnimation();
    });


    useEffect(() => {
        meshRef.current.position.x = 3;
        controlAnimation();
    }, []);


    return(
        <group {...props}
            ref={meshRef}
        >
            <group
                position={[0, -.06, 0]}
                scale={[
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .27, 
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .27, 
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .27
                ]}
                ref={rotationRef}
            >
                <group
                    ref={childRotationRef}
                    rotation={[0, 0, 0]}
                >
                    <primitive object={scene}/>
                </group>
            </group>
        </group>
    );
});

export default AchievementHighlights;