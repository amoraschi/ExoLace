import { Loader2 } from 'lucide-react'

interface LoaderProps {
  isVisible: boolean
}

export default function Loader ({
  isVisible
}: LoaderProps) {
  return isVisible ? (
    <Loader2
      strokeWidth={1.5}
      className='animate-spin w-6 h-6'
    />
  ) : (
    <Loader2
      className='opacity-0'
    />
  )
}
