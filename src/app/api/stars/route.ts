import { starsDataIndex } from '@/lib/data'

// const ra = 185.179
// const dec = 17.7928
// const rad = 1
// const max = 100

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

  // const response = await fetch(
  //   `https://simbad.cds.unistra.fr/cone/?RA=${ra}&DEC=${dec}&SR=${rad}&ORDER_BY=distance&MAXREC=${max}&RESPONSEFORMAT=json&VERB=1`
  // )

  // [pc]
  const parsedParsecs = parseFloat(parsecs)
  // [mas]
  const exoplanetParallax = (1 / parsedParsecs) * 1000

  console.log(`RA: ${ra}, DEC: ${dec}, PARSECS: ${parsedParsecs}, PARALLAX: ${exoplanetParallax}, SR: ${rad}, MAXREC: ${max}`)
  const adqlQuery = `
    SELECT TOP ${max}
      main_id,
      ra,
      dec,
      plx_value,
      otype,
      DISTANCE (POINT('ICRS', ${ra}, ${dec}), POINT('ICRS', ra, dec)) AS "distance",
      ABS(plx_value - ${exoplanetParallax}) as "plx_diff"
    FROM
      basic
    WHERE
      CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', ${ra}, ${dec}, ${rad})) = 1
      AND otype != 'pl'
  `;

  // ORDER BY
  //     "distance" ASC,
  //     "plx_diff" ASC

  const encodedQuery = encodeURIComponent(adqlQuery)
  const simbadTapUrl = `https://simbad.u-strasbg.fr/simbad/sim-tap/sync?request=doQuery&lang=adql&query=${encodedQuery}&format=json`
  const response = await fetch(simbadTapUrl)

  if (!response.ok) {
    return Response.json({
      result: []
    })
  }

  const data = await response.json()

  const transformed = []
  for (const star of data.data) {
    const starDistanceParsecs = 1 / (star[3] / 1000)
    const starX = starDistanceParsecs * Math.cos(star[1] * Math.PI / 180) * Math.cos(star[2] * Math.PI / 180)
    const starY = starDistanceParsecs * Math.sin(star[1] * Math.PI / 180) * Math.cos(star[2] * Math.PI / 180)
    const starZ = starDistanceParsecs * Math.sin(star[2] * Math.PI / 180)

    const exoplanetX = parsedParsecs * Math.cos(parseFloat(ra) * Math.PI / 180) * Math.cos(parseFloat(dec) * Math.PI / 180)
    const exoplanetY = parsedParsecs * Math.sin(parseFloat(ra) * Math.PI / 180) * Math.cos(parseFloat(dec) * Math.PI / 180)
    const exoplanetZ = parsedParsecs * Math.sin(parseFloat(dec) * Math.PI / 180)

    // Subtract exoplanet position from star position
    const x = starX - exoplanetX
    const y = starY - exoplanetY
    const z = starZ - exoplanetZ

    transformed.push({
      main_id: star[0],
      ra: star[1],
      dec: star[2],
      plx_value: star[3],
      otype: star[4],
      distance: star[5],
      plx_diff: star[6],
      x,
      y,
      z
    })
  }

  return Response.json({
    result: transformed,
  })
}
