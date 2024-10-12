interface ListedExoplanetDataProps {
  name: string
  value: string
  color: string
}

export default function ListedExoplanetData ({
  name,
  value,
  color
}: ListedExoplanetDataProps) {
  return (
    <div
      className='flex justify-between'
    >
      <span>
        {name}
      </span>
      <span
        style={{
          color: value == null ? 'red' : color
        }}
      >
        {value ?? 'N/A'}
      </span>
    </div>
  )
}
