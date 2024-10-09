import { Button } from '@/components/ui/button'

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
    >
      {name}
    </Button>
  )
}
