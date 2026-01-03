import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useContext, useEffect, useRef } from "react";
import { MathUtils } from "three";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";

const SkillCube = React.memo(
  ({ mouseCoordinate, scrollPosition, ...props }) => {
    const windowAspectRatioRef = useRef(window.innerWidth / window.innerHeight);
    const skillPhaseProgressRef = useRef(0);

    // Update aspect ratio on window resize
    useEffect(() => {
      const handleResize = () => {
        windowAspectRatioRef.current = window.innerWidth / window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const groupRef = useRef();

    const { loads, setLoads } = useContext(LoadindicatorContext);
    const meshRef = useRef();
    useEffect(() => {
      if (!loads.includes(meshRef.current.uuid)) {
        setLoads((prev) => [...prev, meshRef.current.uuid]);
      }
    }, [meshRef.current]);

    const rotationRef = useRef();
    const { scene, animations } = useGLTF("assets/glb/skillcube.glb");

    const { actions, names } = useAnimations(animations, scene);
    useEffect(() => {
      if (names.length > 0) {
        names.forEach((name) => {
          actions[name]?.play();
        });
      }
    }, [actions, names]);

    const controlAnimation = () => {
      if (groupRef.current && rotationRef.current) {
        const progress = skillPhaseProgressRef.current;
        const aspectRatio = windowAspectRatioRef.current;

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
          progress <= 1
            ? -2 * (1 - progress) + aspectRatio * -0.45
            : aspectRatio * -0.45,
          0.05
        );
        groupRef.current.rotation.x = MathUtils.lerp(
          groupRef.current.rotation.x,
          4 * (1 - progress),
          0.05
        );

        // Y position going down if skill phase progress is passed
        groupRef.current.position.y = MathUtils.lerp(
          groupRef.current.position.y,
          progress >= 1 ? -2 * (progress - 1) : 0,
          0.05
        );
      }
    };

    useFrame(() => {
      skillPhaseProgressRef.current = (scrollPosition - 200) / 100;
      controlAnimation();
    });

    useEffect(() => {
      groupRef.current.position.x = -3;
      controlAnimation();
    }, []);

    const aspectRatio = windowAspectRatioRef.current;
    const scaleFactor = (aspectRatio <= 1 ? aspectRatio : 1) * 0.38;

    return (
      <group {...props} ref={groupRef}>
        <group
          position={[0, -0.05, 0]}
          scale={[scaleFactor, scaleFactor, scaleFactor]}
          rotation={[0.6, 0.8, 0]}
        >
          <group ref={rotationRef}>
            <primitive ref={meshRef} object={scene} />
          </group>
        </group>
      </group>
    );
  }
);

export default SkillCube;
