import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { MathUtils, MeshStandardMaterial } from "three";

const Rakha = React.memo(({mouseCoordinate, ...props}) => {

    const meshRef = useRef();
    
    const { scene, animations } = useGLTF('assets/glb/rakha.glb');
    
    let headMesh = scene.getObjectByName('head');
    
    const { actions, names } = useAnimations(animations, scene);
    useEffect(() => {
        if (names.length > 0) {
          names.forEach((name) => {
            actions[name]?.play();
          })
        }
    }, [actions, names]);

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                // child.material = new MeshStandardMaterial({color: '#1d1d30', roughness: 0.2, metalness: 0.8});
            }
        });
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            
            // General rotation control by mouse coordinate
            meshRef.current.rotation.y = MathUtils.lerp(
                meshRef.current.rotation.y,
                mouseCoordinate.x * .55,
                0.075
            );
            
            // Head control by mouse coordinate
            if (headMesh) {
                // In head mesh, there are 3 sub-meshes (Main head, hair, eye)
                // Track all of them
                headMesh.children.forEach((subMesh) => {
                    if (mouseCoordinate.y >= 0) {
                        // SHAPE KEY: HEAD UP
                        subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_up']] = mouseCoordinate.y * 1.6;
                    } else {
                        // SHAPE KEY: HEAD DOWN
                        subMesh.morphTargetInfluences[subMesh.morphTargetDictionary['head_down']] = -mouseCoordinate.y * .8;
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
        
    });

    return(
        <group
            {...props} scale={[.5, .5, .5]} position={[0, -.9, 0]}
        >
            <primitive ref={meshRef} object={scene} />
        </group>
    );
})

export default Rakha;