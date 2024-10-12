import { Center, Line, OrbitControls, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

interface ObjectsProps {
  exoplanetData: ExoplanetData
}

interface OrbitLineProps {
  majorAxis: number
  minorAxis: number
  name: string
}

const starScreenSize = 5
const lineSegments = 100
const defaultValue = {
  pl_orbsmax: 100,
  pl_orbeccen: 0,
  st_rad: 5
}

export default function Objects ({
  exoplanetData
}: ObjectsProps) {
  console.log(exoplanetData)

  const notNullMajorAxis = exoplanetData.pl_orbsmax ?? defaultValue.pl_orbsmax
  const notNullEccentricity = exoplanetData.pl_orbeccen ?? defaultValue.pl_orbeccen
  const notNullSolarRadius = exoplanetData.st_rad ?? defaultValue.st_rad

  const solarRadiusInMeters = 6.957e8
  const auInMeters = 1.496e11

  const scaleFactor = starScreenSize / (notNullSolarRadius * solarRadiusInMeters)

  const scaledStarRadius = notNullSolarRadius * solarRadiusInMeters * scaleFactor

  const scaledSemiMajorAxis = notNullMajorAxis * auInMeters * scaleFactor
  const scaledSemiMinorAxis = scaledSemiMajorAxis * Math.sqrt(1 - notNullEccentricity * notNullEccentricity)

  console.log(scaledStarRadius, scaledSemiMajorAxis, scaledSemiMinorAxis)

  return (
    <>
      <pointLight
        color='white'
        // intensity={500}
        position={[0, 0, 0]}
        distance={1000}
        decay={0}
      />
      <mesh
        position={[0, 0, 0]}
      >
        <sphereGeometry
          args={[scaledStarRadius, 32, 32]}
        />
        <meshStandardMaterial
          color='white'
          emissive='white'
          emissiveIntensity={1}
        />
      </mesh>
      <OrbitLine
        majorAxis={scaledSemiMajorAxis}
        minorAxis={scaledSemiMinorAxis}
        name={exoplanetData.pl_name}
      />
      <OrbitControls
        minDistance={50}
        maxDistance={500}
      />
    </>
  )
}

function OrbitLine ({
  majorAxis,
  minorAxis,
  name
}: OrbitLineProps) {
  const points: [number, number, number][] = []
  const focalDistance = Math.sqrt(majorAxis * majorAxis - minorAxis * minorAxis)

  for (let i = 0; i < lineSegments; i++) {
    const angle = Math.PI * 2 * (i / lineSegments)

    const x = Math.cos(angle) * majorAxis
    const z = Math.sin(angle) * minorAxis

    points.push([x - focalDistance, 0, z])
  }

  const startPoint = points[0]
  points.push(startPoint)

  return (
    <>
      <Line
        points={points}
        color='white'
        dashed
      />
      <Text
        position={[startPoint[0], 2, startPoint[2]]}
        color='white'
        anchorX='center'
        anchorY='middle'
        fontSize={2}
        rotation={[0, Math.PI / 2, 0]}
      >
        {name}
      </Text>
    </>
  )
}
