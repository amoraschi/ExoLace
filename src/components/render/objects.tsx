import { Center, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

interface ObjectsProps {
  starsData: StarsQuery | null
}

export default function Objects ({
  starsData
}: ObjectsProps) {
  const centerRef = useRef<Mesh>(null)

  useFrame(() => {
    if (centerRef.current != null) {
      centerRef.current.rotation.x += 0.01
      centerRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      {/* <directionalLight
        position={[0, 0, 5]}
      /> */}
      {/* <Center
        // @ts-expect-error
        ref={centerRef}
      >
        <mesh
          position={[0, 0, 0]}
        >
          <sphereGeometry
            args={[1, 8, 8]}
          />
          <meshStandardMaterial
            wireframe
          />
        </mesh>
      </Center> */}
      {/* <ambientLight
        intensity={0.1}
      /> */}
      {
        starsData != null && (
          starsData.result.map((star, index) => (
            <mesh
              key={index}
              position={[star.x, star.y, star.z]}
            >
              <sphereGeometry
                args={[0.1, 8, 8]}
              />
              <meshStandardMaterial
                color='white'
                emissive='white'
                emissiveIntensity={5}
              />
            </mesh>
          ))
        )
      }
      <OrbitControls />
    </>
  )
}
