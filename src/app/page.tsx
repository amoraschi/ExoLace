'use client'

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Arrows from '@/components/home/arrows'
import ListedExoplanet from '@/components/home/listed-exoplanet'
import ListedExoplanetData from '@/components/home/listed-exoplanet-data'
import Loader from '@/components/home/loader'
import Objects from '@/components/render/objects'
import { Input } from '@/components/ui/input'
import { labels, spectralTypes } from '@/lib/data'

const defaultData = {
  result: [],
  pages: -1,
  current: 0
}

export default function Home () {
  const [query, setQuery] = useState('')
  const [namesData, setNamesData] = useState<Results>(defaultData)
  const [exoplanetData, setExoplanetData] = useState<ExoplanetQuery | null>(null)
  const [fetchingNames, setFetchingNames] = useState(false)
  const [fetchingExoplanet, setFetchingExoplanet] = useState(false)
  const [page, setPage] = useState(0)
  const [exoplanet, setExoplanet] = useState<string | null>(null)
  const nameControllerRef = useRef<AbortController | null>(null)
  const exoplanetControllerRef = useRef<AbortController | null>(null)

  const leftStyles = {
    color: page > 0 ? 'white' : 'gray',
    cursor: page > 0 ? 'pointer' : 'auto'
  }

  const rightStyles = {
    color: page < namesData.pages - 1 ? 'white' : 'gray',
    cursor: page < namesData.pages - 1 ? 'pointer' : 'auto'
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value)
  }

  const fetchNames = async () => {
    setFetchingNames(true)
    console.log(`Fetching: ${query}`)
    abortRequest()

    const abortController = new AbortController()
    nameControllerRef.current = abortController

    const response = await fetch(`/api/exoplanets?query=${query}&page=${page}`, {
      signal: abortController.signal
    })

    const data = await response.json()
    setNamesData(data)
    console.log(`Fetched: ${query} (${data.result.length})`)
    console.log(data)

    nameControllerRef.current = null
    setFetchingNames(false)
  }

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
    if (nameControllerRef.current != null) {
      nameControllerRef.current.abort('Cancelled')
      // setFetchingNames(false)
    }

    if (exoplanetControllerRef.current != null) {
      exoplanetControllerRef.current.abort('Cancelled')
      // setFetchingExoplanet(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage > namesData.pages - 1) {
      return
    }

    setPage(newPage)
  }

  useEffect(() => {
    if (query !== '' && query != null) {
      fetchNames()
    } else {
      setNamesData(defaultData)
    }

    return abortRequest
  }, [query, page])

  useEffect(() => {
    console.log(exoplanet)
    if (exoplanet != null) {
      fetchExoplanet(exoplanet)
    }

    return abortRequest
  }, [exoplanet])

  return (
    <main
      className='h-[100vh]'
    >
      <Canvas
        className='h-full w-full'
      >
        <Objects />
      </Canvas>
      <div
        className='absolute top-0 flex flex-col w-1/4 max-h-[50%] gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-br-lg'
      >
        <div
          className='flex items-center gap-2'
        >
          <Input
            placeholder='Exoplanet Search'
            type='search'
            className='transition duration-50'
            onChange={handleChange}
          />
          <Loader
            isVisible={fetchingNames}
          />
        </div>
        {
          namesData.result.length > 0 && (
            <div
              className='flex flex-col gap-2 overflow-x-auto'
            >
              {
                namesData.result.map((exoplanet, index) => (
                  <ListedExoplanet
                    key={index}
                    name={exoplanet}
                    setExoplanet={setExoplanet}
                  />
                ))
              }
            </div>
          )
        }
        <div
          className='flex items-center gap-1'
        >
          <Arrows
            direction={true}
            onClick={() => handlePageChange(page - 1)}
            onClickLimit={() => handlePageChange(0)}
            styles={leftStyles}
          />
          <span
            style={{
              color: namesData.pages === -1 ? 'gray' : 'white'
            }}
          >
            {
              namesData.result.length > 0 ? `${page + 1} / ${namesData.pages}` : '...'
            }
          </span>
          <Arrows
            direction={false}
            onClick={() => handlePageChange(page + 1)}
            onClickLimit={() => handlePageChange(namesData.pages - 1)}
            styles={rightStyles}
          />
        </div>
      </div>
      <div
        className='absolute bottom-0 flex flex-col w-1/4 max-h-[50%] gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-tr-lg'
      >
        <div
          className='flex items-center justify-between gap-2'
        >
          <span>
            Exoplanet Info
          </span>
          <Loader
            isVisible={fetchingExoplanet}
          />
        </div>
        {
          exoplanetData != null && (
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
