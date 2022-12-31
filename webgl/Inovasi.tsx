import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Html } from "@react-three/drei";
import useStore from "../helpers/store";

export default function Inovasi(props: any) {
  const [showPhone, setShowPhone] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  const gltf: any = useLoader(
    GLTFLoader,
    "/assets/models/05_Inovasi.glb",
    (loader: any) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("assets/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  gltf.castShadow = true;
  gltf.scene.castShadow = true;

  const { camera } = useThree();
  const phoneRef: any = useRef();

  // useFrame((state) => {
  //   const pos = camera.position;
  //   const t = state.clock.getElapsedTime();
  //   phoneRef.current.position.y = Math.sin(t) * 0.1;
  //   const distance =
  //     Math.pow(pos.x - props.position[0], 2) +
  //     Math.pow(pos.z - props.position[2], 2);
  //   if (distance < 60) {
  //     if (!showPhone) setShowPhone(true);
  //     if (!playMusic) setPlayMusic(true);
  //   } else {
  //     if (showPhone) setShowPhone(false);
  //     if (playMusic) setPlayMusic(false);
  //   }
  // });

  useEffect(() => {
    if (playMusic) {
      var vid: any = document.getElementById("audioDetail");
      vid.autoplay = true;
      vid.loop = true;
      vid.load();
    }
  }, [playMusic]);

  return (
    <>
      <mesh ref={phoneRef} visible={props.visible}>
        <primitive
          object={gltf.scene}
          position={props.position}
          scale={props.scale}
          rotation={[0.0, -Math.PI / 4, 0]}
        ></primitive>
      </mesh>
    </>
  );
}
