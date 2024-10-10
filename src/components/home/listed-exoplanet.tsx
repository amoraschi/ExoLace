import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ListedExoplanetProps {
  name: string
}

export default function ListedExoplanet ({
  name
}: ListedExoplanetProps) {
  return (
    <Button
      variant='outline'
      className='flex items-center justify-between'
      asChild
    >
      <Link
        href={`/exoplanet/${name}`}
        target='_blank'
      >
        {name}
      </Link>
    </Button>
  )
}
