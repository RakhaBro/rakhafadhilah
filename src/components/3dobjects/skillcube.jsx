import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";

const SkillCube = React.memo(({mouseCoordinate, scrollPosition, ...props}) => {

    const windowAspectRatio = window.innerWidth / window.innerHeight;

    const [skillPhaseProgress, setSkillPhaseProgress] = useState(0);

    const groupRef = useRef();
    
    const { loads, setLoads } = useContext(LoadindicatorContext);
    const meshRef = useRef();
    useEffect(() => {
        if (!loads.includes(meshRef.current.uuid)) {
            setLoads((prev) => [...prev, meshRef.current.uuid]);
        }
    }, [meshRef.current]);

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
        if (groupRef.current && rotationRef.current) {
            
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
            groupRef.current.position.x = MathUtils.lerp(
                groupRef.current.position.x,
                (
                    skillPhaseProgress <= 1
                        ? -2 * (1 - skillPhaseProgress) + (windowAspectRatio * -.45)
                        : (windowAspectRatio * -.45)
                ),
                0.05
            );
            groupRef.current.rotation.x = MathUtils.lerp(
                groupRef.current.rotation.x,
                4 * (1 - skillPhaseProgress),
                0.05
            );

            // Y position going down if skill phase progress is passed
            groupRef.current.position.y = MathUtils.lerp(
                groupRef.current.position.y,
                skillPhaseProgress >= 1
                    ? -2 * (skillPhaseProgress - 1)
                    : 0,
                0.05
            );

        }
    }


     useFrame((state, delta) => {
        setSkillPhaseProgress(
            (scrollPosition - 200)
            / 100
        );
        controlAnimation();
    });


    useEffect(() => {
        groupRef.current.position.x = -3;
        controlAnimation();
    }, []);


    return(
        <group {...props}
        ref={groupRef}
        >
            <group
                position={[0, -.05, 0]}
                scale={[
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38,
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38,
                    (windowAspectRatio <= 1 ? windowAspectRatio : 1) * .38
                ]}
                rotation={[.6, .8, 0]}
                >
                <group ref={rotationRef}>
                    <primitive ref={meshRef} object={scene}/>
                </group>
            </group>
        </group>
    );
});

export default SkillCube;