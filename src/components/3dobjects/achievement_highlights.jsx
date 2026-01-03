import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useContext, useEffect, useRef } from "react";
import { MathUtils } from "three";
import { LoadindicatorContext } from "../../providers/loadindicationProvider";

const AchievementHighlights = React.memo(
  ({ mouseCoordinate, scrollPosition, ...props }) => {
    const windowAspectRatioRef = useRef(window.innerWidth / window.innerHeight);
    const achievementPhaseProgressRef = useRef(0);

    // Update aspect ratio on window resize
    useEffect(() => {
      const handleResize = () => {
        windowAspectRatioRef.current = window.innerWidth / window.innerHeight;
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { loads, setLoads } = useContext(LoadindicatorContext);
    const meshRef = useRef();
    useEffect(() => {
      if (!loads.includes(meshRef.current.uuid)) {
        setLoads((prev) => [...prev, meshRef.current.uuid]);
      }
    }, [meshRef.current]);

    const groupRef = useRef();
    const rotationRef = useRef();
    const childRotationRef = useRef();
    const { scene, animations } = useGLTF(
      "assets/glb/achievement_highlights.glb"
    );

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
        const progress = achievementPhaseProgressRef.current;
        const aspectRatio = windowAspectRatioRef.current;

        // General rotation control by mouse Y coordinate
        rotationRef.current.rotation.y = MathUtils.lerp(
          rotationRef.current.rotation.y,
          mouseCoordinate.x * 0.3 - 0.6,
          0.06
        );

        // General rotation control by mouse X coordinate
        childRotationRef.current.rotation.x = MathUtils.lerp(
          childRotationRef.current.rotation.x,
          -mouseCoordinate.y * 0.4 - 0.1,
          0.06
        );

        // X position control by skill phase progress
        groupRef.current.position.x = MathUtils.lerp(
          groupRef.current.position.x,
          progress <= 1
            ? 3.2 * (1 - progress) + aspectRatio * 0.11
            : aspectRatio * 0.11,
          0.05
        );

        // Y position going down if skill phase progress is passed
        groupRef.current.position.y = MathUtils.lerp(
          groupRef.current.position.y,
          progress >= 1 ? -3 * (progress - 1) : 0,
          0.05
        );
      }
    };

    useEffect(() => {
      groupRef.current.position.x = 3;
      controlAnimation();
    }, []);

    useFrame(() => {
      achievementPhaseProgressRef.current = (scrollPosition - 300) / 100;
      controlAnimation();
    });

    const aspectRatio = windowAspectRatioRef.current;
    const scaleFactor = (aspectRatio <= 1 ? aspectRatio : 1) * 0.27;

    return (
      <group {...props} ref={groupRef}>
        <group
          position={[0, -0.06, 0]}
          scale={[scaleFactor, scaleFactor, scaleFactor]}
          ref={rotationRef}
        >
          <group ref={childRotationRef} rotation={[0, 0, 0]}>
            <primitive ref={meshRef} object={scene} />
          </group>
        </group>
      </group>
    );
  }
);

export default AchievementHighlights;
