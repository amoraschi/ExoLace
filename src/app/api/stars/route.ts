// import { starsDataIndex } from '@/lib/data'

export async function GET (Request: Request) {
  const params = new URL(Request.url).searchParams
  const ra = params.get('RA')
  const dec = params.get('DEC')
  const parsecs = params.get('PARSECS')
  const rad = params.get('SR') ?? 1
  const max = params.get('MAXREC') ?? 100

  if (ra == null || dec == null || parsecs == null) {
    return Response.json({
      result: []
    })
  }

  const response = await fetch(
    `https://simbad.cds.unistra.fr/cone/?RA=${ra}&DEC=${dec}&SR=${rad}&ORDER_BY=distance&MAXREC=${max}&RESPONSEFORMAT=json&VERB=1`
  )

  if (!response.ok) {
    return Response.json({
      result: []
    })
  }

  const data = await response.json()

  return Response.json({
    result: data,
  })
}
