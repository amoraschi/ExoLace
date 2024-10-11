import { Center, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

interface ObjectsProps {
  starsData: StarsQuery | null
}

const distance = 5
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
      <OrbitControls />
    </>
  )
}
