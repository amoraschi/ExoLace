import stars from '@/app/api/exoplanets/stars.json'

const maxPerPage = 10

export async function GET (request: Request) {
  const params = new URL(request.url).searchParams
  const query = params.get('query')
  const page = parseInt(params.get('page') ?? '0')

  if (query == null) {
    return Response.json({
      result: []
    })
  }

  const filtered = stars.filter((star) => star.toLowerCase().includes(query.toLowerCase()))
  const start = page * maxPerPage
  const end = start + maxPerPage
  const result = filtered.slice(start, end)

  return Response.json({
    result,
    pages: Math.ceil(filtered.length / maxPerPage),
    current: page
  })
}
