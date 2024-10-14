'use client'

import ListedExoplanetData from '@/components/home/listed-exoplanet-data'
import Objects from '@/components/render/objects'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { labels } from '@/lib/data'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Euler } from 'three'

interface ExoplanetProps {
  params: {
    name: string
  }
}

export default function ExoplanetPage ({
  params
}: ExoplanetProps) {
  const [exoplanetData, setExoplanetData] = useState<ExoplanetQuery | null>(null)
  const [fetchingExoplanet, setFetchingExoplanet] = useState(false)
  const exoplanetControllerRef = useRef<AbortController | null>(null)

  const exoplanet = decodeURIComponent(params.name)

  const fetchExoplanet = async (name: string) => {
    setFetchingExoplanet(true)
    console.log(`Fetching: ${name}`)
    abortRequest()

    const abortController = new AbortController()
    exoplanetControllerRef.current = abortController

    const response = await fetch(`/api/system?name=${name}`, {
      signal: abortController.signal
    })

    const data = await response.json()
    console.log(`Fetched: ${name}`)
    setExoplanetData(data)
    console.log(data)

    exoplanetControllerRef.current = null
    setFetchingExoplanet(false)
  }

  const abortRequest = () => {
    if (exoplanetControllerRef.current != null) {
      exoplanetControllerRef.current.abort('Cancelled')
      // setFetchingExoplanet(false)
    }
  }

  useEffect(() => {
    console.log(exoplanet)
    if (exoplanet != null) {
      fetchExoplanet(exoplanet)
    }

    return abortRequest
  }, [])

  return (
    <main
      className='h-[100vh]'
    >
      {
        exoplanetData == null ? (
          <div
            className='flex flex-col items-center justify-center w-full h-full'
          >
            <Loader2
              strokeWidth={1.5}
              className='animate-spin w-12 h-12'
            />
            Fetching Exoplanet...
          </div>
        ) : (
          <Canvas
            className='w-full h-full'
          >
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 0]}
              far={10000}
            />
            <Environment
              files='/assets/background.jpg'
              background
              backgroundIntensity={0.25}
              backgroundRotation={new Euler(Math.PI / 4, 0, 0)}
            />
            <Objects
              exoplanetData={exoplanetData.result}
            />
          </Canvas>
        )
      }
      {
        exoplanetData != null && (
          <Accordion
            type='single'
            collapsible
            className='absolute bottom-0 flex flex-col w-1/4 max-h-[50%] gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-tr-lg overflow-y-auto'
          >
            {
              exoplanetData.result.map((exoplanet, index) => (
                <AccordionItem
                  key={index}
                  className='p-2 bg-[rgba(255,255,255,0.1)] rounded-lg'
                  value={exoplanet.pl_name}
                >
                  <AccordionTrigger
                    className='p-0'
                  >
                    {exoplanet.pl_name}
                  </AccordionTrigger>
                  <AccordionContent
                    className='flex flex-col gap-2 p-2 pb-0'
                  >
                    {
                      Object.keys(exoplanet).map((key, index) => (
                        <ListedExoplanetData
                          key={index}
                          name={labels[key]}
                          value={exoplanet[key as keyof ExoplanetData]}
                          color='white'
                        />
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        )
      }
    </main>
  )
}
