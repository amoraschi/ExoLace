
const ra = 185.179
const dec = 17.7928
const rad = 1
const max = 100

export async function GET () {
  const response = await fetch(
    `https://simbad.cds.unistra.fr/cone/?RA=${ra}&DEC=${dec}&SR=${rad}&ORDER_BY=distance&MAXREC=${max}&RESPONSEFORMAT=json&VERB=1`
  )

  if (!response.ok) {
    return Response.json({
      error: true
    })
  }

  const data = await response.json()
  return Response.json(data)
}
