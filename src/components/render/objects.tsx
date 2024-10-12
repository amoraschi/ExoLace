// import { Center, OrbitControls } from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// import { useRef } from 'react'
// import { Mesh } from 'three'
// // import { Bloom, EffectComposer } from '@react-three/postprocessing'

// interface ObjectsProps {
//   // starsData: StarsQuery | null
//   exoplanetData: ExoplanetQuery | null
// }

// export default function Objects ({
//   // starsData,
//   exoplanetData
// }: ObjectsProps) {
//   return (
//     <>
//       {
//         exoplanetData != null && (
//           exoplanetData.result.map((exoplanet, index) => {
//             return (
//               <mesh
//                 key={index}
//                 position={[x, y, z]}
//               >
//                 <sphereGeometry
//                   args={[0.1, 4, 4]}
//                 />
//                 <meshStandardMaterial
//                   color='white'
//                   emissive='white'
//                   emissiveIntensity={5}
//                 />
//               </mesh>
//             )
//           })
//         )
//       }
//       <OrbitControls />
//     </>
//   )
// }
