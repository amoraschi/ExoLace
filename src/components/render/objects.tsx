import { Center, OrbitControls } from '@react-three/drei'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

export default function Objects () {
  return (
    // Test
    <>
      {/* <directionalLight
        position={[0, 0, 5]}
      /> */}
      <Center>
        <mesh
          position={[0, 0, 0]}
        >
          <pointLight
            color={'#fff'}
            intensity={20}
            position={[0, 0, 0]}
            distance={20}
            // decay={2}
          />
          <sphereGeometry
            args={[1, 32, 32]}
          />
          <meshStandardMaterial
            color={'#ff0'}
            emissive={'#ff0'}
            emissiveIntensity={2}
          />
        </mesh>
        <mesh
          position={[5, 0, 0]}
        >
          <sphereGeometry
            args={[0.25, 32, 32]}
          />
          <meshStandardMaterial
            color={'#00f'}
          />
        </mesh>
      </Center>
      {/* <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer> */}
      <OrbitControls />
    </>
  )
}
