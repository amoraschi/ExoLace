import { Button } from '@/components/ui/button'

interface ListedExoplanetProps {
  name: string
  setExoplanet: (exoplanet: string) => void
}

export default function ListedExoplanet ({
  name,
  setExoplanet
}: ListedExoplanetProps) {
  return (
    <Button
      variant='outline'
      className='flex items-center justify-between'
      onClick={() => setExoplanet(name)}
    >
      {name}
    </Button>
  )
}
