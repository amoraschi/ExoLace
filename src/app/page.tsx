'use client'

import ListedExoplanet from '@/components/home/listed-exoplanet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader, Loader2 } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

const defaultData = {
  result: [],
  pages: -1,
  current: 0
}

export default function Home () {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<Results>(defaultData)
  const [fetching, setFetching] = useState(false)
  const [page, setPage] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const leftStyles = {
    color: page > 0 ? 'white' : 'gray',
    cursor: page > 0 ? 'pointer' : 'auto'
  }

  const rightStyles = {
    color: page < data.pages - 1 ? 'white' : 'gray',
    cursor: page < data.pages - 1 ? 'pointer' : 'auto'
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.target.value)
  }

  const fetchData = async () => {
    setFetching(true)
    console.log(`Fetching: ${query}`)
    abortRequest()

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const response = await fetch(`/api/exoplanets?query=${query}&page=${page}`, {
      signal: abortController.signal
    })

    const data = await response.json()
    setData(data)
    console.log(`Fetched: ${query} (${data.result.length})`)
    console.log(data)

    setFetching(false)
    abortControllerRef.current = null
  }

  const abortRequest = () => {
    if (abortControllerRef.current != null) {
      setFetching(false)
      abortControllerRef.current.abort('Cancelled')
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage > data.pages - 1) {
      return
    }

    setPage(newPage)
  }

  useEffect(() => {
    if (query === '' || query == null) {
      setData(defaultData)
    } else {
      fetchData()
    }

    return abortRequest
  }, [query, page])

  return (
    <main>
      <div
        className='flex flex-col max-w-sm gap-2 m-2 p-2 rounded-lg bg-[rgba(255,255,255,0.1)]'
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
          {
            fetching ? (
              <Loader2
                className='animate-spin'
              />
            ) : (
              <Loader2
                className='opacity-0'
              />
            )
          }
        </div>
        {
          data.result.length > 0 && (
            <div
              className='flex flex-col gap-2 overflow-x-auto'
            >
              {
                data.result.map((exoplanet, index) => (
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
          <ChevronsLeft
            className='w-6 h-6'
            strokeWidth={1.5}
            onClick={() => handlePageChange(0)}
            style={leftStyles}
          />
          <ChevronLeft
            className='w-6 h-6'
            strokeWidth={1.5}
            onClick={() => handlePageChange(page - 1)}
            style={leftStyles}
          />
          <span
            style={{
              color: data.pages === -1 ? 'gray' : 'white'
            }}
          >
            {
              data.result.length > 0 ? `${page + 1} / ${data.pages}` : '...' 
            }
          </span>
          <ChevronRight
            className='w-6 h-6'
            strokeWidth={1.5}
            onClick={() => handlePageChange(page + 1)}
            style={rightStyles}
          />
          <ChevronsRight
            className='w-6 h-6'
            strokeWidth={1.5}
            onClick={() => handlePageChange(data.pages - 1)}
            style={rightStyles}
          />
        </div>
      </div>
    </main>
  )
}
