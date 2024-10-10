'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Arrows from '@/components/home/arrows'
import ListedExoplanet from '@/components/home/listed-exoplanet'
import Loader from '@/components/home/loader'
import { Input } from '@/components/ui/input'

const defaultData = {
  result: [],
  pages: -1,
  current: 0
}

export default function HomePage () {
  const [query, setQuery] = useState('')
  const [namesData, setNamesData] = useState<Results>(defaultData)
  const [fetchingNames, setFetchingNames] = useState(false)
  const [page, setPage] = useState(0)
  const nameControllerRef = useRef<AbortController | null>(null)

  const leftStyles = {
    color: query !== '' && page > 0 ? 'white' : 'gray',
    cursor: query !== '' && page > 0 ? 'pointer' : 'auto'
  }

  const rightStyles = {
    color: query !== '' && page < namesData.pages - 1 ? 'white' : 'gray',
    cursor: query !== '' && page < namesData.pages - 1 ? 'pointer' : 'auto'
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
    if (page > data.pages - 1) {
      setPage(data.pages - 1)
    }

    console.log(`Fetched: ${query} (${data.result.length})`)
    console.log(data)

    nameControllerRef.current = null
    setFetchingNames(false)
  }

  const abortRequest = () => {
    if (nameControllerRef.current != null) {
      nameControllerRef.current.abort('Cancelled')
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

  return (
    <main
      className='h-[100vh] grid place-items-center'
    >
      <div
        className='absolute top-1/4 w-1/2'
      >
        <span
          className='text-white text-4xl font-bold'
        >
          EXOLACE
        </span>
        <div
          // className='absolute top-0 flex flex-col w-1/4 max-h-[50%] gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-br-lg'
          className='flex flex-col gap-2 p-2 bg-[rgba(255,255,255,0.1)] rounded-lg'
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
      </div>
    </main>
  )
}
