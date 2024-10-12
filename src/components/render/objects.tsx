import { Center, Line, OrbitControls, Stars, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
// import { Bloom, EffectComposer } from '@react-three/postprocessing'

interface ObjectsProps {
  exoplanetData: ExoplanetData[]
}

interface OrbitLineProps {
  majorAxis: number
  minorAxis: number
  radInclination: number
  name: string
}

const starScreenSize = 5
const lineSegments = 100
const defaultValue = {
  pl_orbsmax: 100,
  pl_orbeccen: 0,
  st_rad: 5,
  pl_orbincl: 0
}

export default function Objects ({
  exoplanetData
}: ObjectsProps) {
  console.log(exoplanetData)
  const notNullSolarRadius = exoplanetData[0].st_rad ?? defaultValue.st_rad

  const solarRadiusInMeters = 6.957e8
  const auInMeters = 1.496e11

  const scaleFactor = starScreenSize / (notNullSolarRadius * solarRadiusInMeters)

  const scaledStarRadius = notNullSolarRadius * solarRadiusInMeters * scaleFactor

  const calculateExoplanet = (exoplanet: ExoplanetData) => {
    const notNullMajorAxis = exoplanet.pl_orbsmax ?? defaultValue.pl_orbsmax
    const notNullEccentricity = exoplanet.pl_orbeccen ?? defaultValue.pl_orbeccen
    const notNullInclination = exoplanet.pl_orbincl ?? defaultValue.pl_orbincl

    const radInclination = notNullInclination * Math.PI / 180

    const scaledSemiMajorAxis = notNullMajorAxis * auInMeters * scaleFactor
    const scaledSemiMinorAxis = scaledSemiMajorAxis * Math.sqrt(1 - notNullEccentricity * notNullEccentricity)

    return {
      scaledSemiMajorAxis,
      scaledSemiMinorAxis,
      radInclination
    }
  }

  return (
    <>
      <pointLight
        color='white'
        // intensity={500}
        position={[0, 0, 0]}
        distance={1000}
        decay={0}
      />
      {
        exoplanetData.map((exoplanet, index) => {
          const {
            scaledSemiMajorAxis,
            scaledSemiMinorAxis,
            radInclination
          } = calculateExoplanet(exoplanet)

          return (
            // <>
              <mesh
                key={index}
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
                <OrbitLine
                  majorAxis={scaledSemiMajorAxis}
                  minorAxis={scaledSemiMinorAxis}
                  radInclination={radInclination}
                  name={exoplanet.pl_name}
                />
              </mesh>
            // </>
          )
        })
      }
      <OrbitControls
        minDistance={50}
        maxDistance={500}
      />
      <Stars
        radius={300}
        depth={100}
        count={5000}
        factor={20}
        saturation={0}
        fade
      />
    </>
  )
}

function OrbitLine ({
  majorAxis,
  minorAxis,
  radInclination,
  name
}: OrbitLineProps) {
  const points: [number, number, number][] = []
  const focalDistance = Math.sqrt(majorAxis * majorAxis - minorAxis * minorAxis)

  console.log(majorAxis, minorAxis, radInclination)
  for (let i = 0; i < lineSegments; i++) {
    const t = (i / lineSegments) * 2 * Math.PI; // Parameter from 0 to 2pi
    const x = majorAxis * Math.cos(t) - focalDistance
    const y = minorAxis * Math.sin(t);

    // Apply rotation for inclination (in radians)
    const z = y * Math.sin(radInclination - Math.PI / 2); // Z component after inclination
    const yInclined = y * Math.cos(radInclination - Math.PI / 2); // Adjusted Y component

    points.push([x, yInclined, z])
  }

  const startPoint = points[0]
  points.push(startPoint)

  return (
    <>
      <Line
        points={points}
        color='white'
      />
      <Text
        position={[startPoint[0], 2.5, startPoint[2]]}
        color='white'
        anchorX='center'
        anchorY='middle'
        fontSize={5}
        rotation={[0, Math.PI / 2, 0]}
      >
        {name}
      </Text>
    </>
  )
}
