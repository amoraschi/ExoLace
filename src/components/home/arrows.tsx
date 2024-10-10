import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { CSSProperties } from 'react'

interface ArrowProps {
  direction: boolean
  onClick: () => void
  onClickLimit: () => void
  styles: CSSProperties
}

export default function Arrows ({
  direction,
  onClick,
  onClickLimit,
  styles
}: ArrowProps) {
  return direction ? (
    <>
      <ChevronsLeft
        className='w-6 h-6'
        strokeWidth={1.5}
        onClick={onClickLimit}
        style={styles}
      />
      <ChevronLeft
        className='w-6 h-6'
        strokeWidth={1.5}
        onClick={onClick}
        style={styles}
      />
    </>
  ) : (
    <>
      <ChevronRight
        className='w-6 h-6'
        strokeWidth={1.5}
        onClick={onClick}
        style={styles}
      />
      <ChevronsRight
        className='w-6 h-6'
        strokeWidth={1.5}
        onClick={onClickLimit}
        style={styles}
      />
    </>
  )
}
