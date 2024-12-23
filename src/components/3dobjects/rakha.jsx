import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils, MeshStandardMaterial, NormalBlending } from "three";

const Rakha = React.memo(({mouseCoordinate, scrollPosition, ...props}) => {

    const meshRef = useRef();
    const { scene, animations } = useGLTF('assets/glb/rakha.glb');

    let headMesh = scene.getObjectByName('head');

    const controlHead = () => {
        // Head control by mouse coordinate
        const mousePosition_adjusted_to_head = mouseCoordinate.y + .17;
        if (headMesh) {
            // In head mesh, there are 3 sub-meshes (Main head, hair, eye)
            // Track all of them
            headMesh.children.forEach((subMesh) => {
                if (mousePosition_adjusted_to_head >= 0) {
                    // SHAPE KEY: HEAD UP
                    subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_up']] = mousePosition_adjusted_to_head * 1.4;
                } else {
                    // SHAPE KEY: HEAD DOWN
                    subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_down']] = -mousePosition_adjusted_to_head * .8;
                }

                if (mouseCoordinate.x >= 0) {
                    // SHAPE KEY: HEAD LEFT
                    subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_left']] = mouseCoordinate.x * 1.2;
                } else {
                    // SHAPE KEY: HEAD RIGHT
                    subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_right']] = -mouseCoordinate.x * 1.2;
                }

            });
        }
    }
    
    const { actions, names } = useAnimations(animations, scene);
    useEffect(() => {
        if (names.length > 0) {
          names.forEach((name) => {
            actions[name]?.play();
          })
        }
    }, [actions, names]);


    useFrame((state, delta) => {
        if (meshRef.current) {
            
            // General rotation control by mouse coordinate
            const scrollPhase_rotation = scrollPosition <= 100 ? scrollPosition : 100;
            meshRef.current.rotation.y = MathUtils.lerp(
                meshRef.current.rotation.y,
                // Rotation influence based on mouse x coordinate
                (mouseCoordinate.x * .55)
                // Rotation influence based on scroll position
                + ((scrollPhase_rotation * 20 / 100) * .28),
                0.03
            );

            // General position control by mouse coordinate
            const scrollPhase_xPosition = scrollPosition <= 200 ? scrollPosition : 200;
            const windowAspectRatio = window.innerWidth / window.innerHeight;
            meshRef.current.position.x = MathUtils.lerp(
                meshRef.current.position.x,
                (
                    scrollPhase_xPosition <= 100
                        ? (scrollPhase_xPosition * 20 / 100) * .1 
                        : (scrollPhase_xPosition * 20 / 100) * .2
                ) * (windowAspectRatio * .5),
                0.07
            );

            controlHead();
        }
        
    });


    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                // child.material = new MeshStandardMaterial({color: '#1d1d30', roughness: 0.2, metalness: 0.8});
            }
        });
        controlHead();
    }, []);

    return(
        <group
            {...props} scale={[.5, .5, .5]} position={[0, -.9, 0]}
        >
            <primitive ref={meshRef} object={scene} />
        </group>
    );
})

export default Rakha;