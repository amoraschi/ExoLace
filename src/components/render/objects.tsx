import { getStarColor } from '@/lib/data'
import { OrbitControls, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { BufferGeometry, Float32BufferAttribute, Mesh, Vector3 } from 'three'

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
  const [maxZoom, setMaxZoom] = useState(500)

  console.log(exoplanetData)
  const notNullSolarRadius = exoplanetData[0].st_rad ?? defaultValue.st_rad
  const starColor = getStarColor(exoplanetData[0].st_spectype, exoplanetData[0].st_teff)

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

    if (scaledSemiMajorAxis > maxZoom) {
      setMaxZoom(scaledSemiMajorAxis)
    }

    return {
      scaledSemiMajorAxis,
      scaledSemiMinorAxis,
      radInclination
    }
  }

  console.log(starColor)

  return (
    <>
      <pointLight
        color={starColor}
        position={[0, 0, 0]}
      />
      <mesh
        position={[0, 0, 0]}
      >
        <sphereGeometry
          args={[scaledStarRadius, 32, 32]}
        />
        <meshStandardMaterial
          color={starColor}
          emissive={starColor}
          emissiveIntensity={1}
        />
      </mesh>
      {
        exoplanetData.map((exoplanet, index) => {
          const {
            scaledSemiMajorAxis,
            scaledSemiMinorAxis,
            radInclination
          } = calculateExoplanet(exoplanet)

          return (
            <OrbitLine
              key={index}
              majorAxis={scaledSemiMajorAxis}
              minorAxis={scaledSemiMinorAxis}
              radInclination={radInclination}
              name={exoplanet.pl_name}
            />
          )
        })
      }
      <OrbitControls
        minDistance={50}
        maxDistance={maxZoom * 2}
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
  const textRef = useRef<Mesh>()

  const points: Vector3[] = []
  const focalDistance = Math.sqrt(majorAxis * majorAxis - minorAxis * minorAxis)

  useFrame(({ camera }) => {
    if (textRef.current != null) {
      textRef.current.lookAt(camera.position)
    }
  })

  console.log(majorAxis, minorAxis, radInclination)
  for (let i = 0; i < lineSegments; i++) {
    const t = (i / lineSegments) * 2 * Math.PI
    const x = majorAxis * Math.cos(t) - focalDistance
    const y = minorAxis * Math.sin(t)

    const z = y * Math.sin(radInclination - Math.PI / 2)
    const yInclined = y * Math.cos(radInclination - Math.PI / 2)

    points.push(new Vector3(x, yInclined, z))
  }

  const startPoint = points[0]
  points.push(startPoint)

  const lineGeometry = new BufferGeometry().setFromPoints(points)

  const colors = []
  for (let i = 0; i < lineSegments; i++) {
    const alpha = i / lineSegments
    colors.push(1, 1, 1, alpha - 0.1)
  }

  lineGeometry.setAttribute('color', new Float32BufferAttribute(colors, 4))

  return (
    <>
      <line>
        <bufferGeometry
          attach='geometry'
          {...lineGeometry}
        />
        <lineBasicMaterial
          attach='material'
          vertexColors
          transparent
          opacity={1}
        />
      </line>
      <Text
        ref={textRef}
        position={[startPoint.x, 0, startPoint.z]}
        color='white'
        anchorX='center'
        anchorY='middle'
        fontSize={5}
      >
        {name}
      </Text>
    </>
  )
}
