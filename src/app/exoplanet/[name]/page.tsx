'use client'

import ListedExoplanetData from '@/components/home/listed-exoplanet-data'
import { labels, spectralTypes } from '@/lib/data'
import { Canvas } from '@react-three/fiber'
import { Loader2, Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const [infoExpanded, setInfoExpanded] = useState(true)
  const exoplanetControllerRef = useRef<AbortController | null>(null)
  const starsControllerRef = useRef<AbortController | null>(null)

  const exoplanet = decodeURIComponent(params.name)

  const fetchExoplanet = async (name: string) => {
    setFetchingExoplanet(true)
    console.log(`Fetching: ${name}`)
    abortRequest()

    const abortController = new AbortController()
    exoplanetControllerRef.current = abortController

    const response = await fetch(`/api/exoplanet?name=${name}`, {
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

    if (starsControllerRef.current != null) {
      starsControllerRef.current.abort('Cancelled')
      // setFetchingStars
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
            <ambientLight />
          </Canvas>
        )
      }
      <div
        className='absolute bottom-0 flex flex-col w-1/4 max-h-[50%] gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-tr-lg'
      >
        <div
          className='flex items-center justify-between gap-2'
        >
          Exoplanet Info
          {
            fetchingExoplanet ? (
              <Loader2
                strokeWidth={1.5}
                className='animate-spin w-6 h-6'
              />
            ) : (
              infoExpanded ? (
                <Minus
                  strokeWidth={1.5}
                  className='cursor-pointer w-6 h-6'
                  onClick={() => setInfoExpanded(false)}
                />
              ) : (
                <Plus
                  strokeWidth={1.5}
                  className='cursor-pointer w-6 h-6'
                  onClick={() => setInfoExpanded(true)}
                />
              )
            )
          }
        </div>
        {
          exoplanetData != null && infoExpanded && (
            <div
              className='flex flex-col gap-2 p-2 overflow-y-auto'
            >
              {
                Object.entries(exoplanetData.result).filter(([key, value]) => value != null).map(([key, value], index) => (
                  <ListedExoplanetData
                    key={index}
                    name={labels[key as keyof ExoplanetData]}
                    value={value}
                    color={key === 'st_spectype' ? spectralTypes[value.charAt(0)] : 'white'}
                  />
                ))
              }
            </div>
          )
        }
      </div>
    </main>
  )
}
