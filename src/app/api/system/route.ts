import { writeFileSync } from 'fs'

const labels = [
  'pl_name',
  'hostname',
  // 'default_flag',
  'sy_snum',
  'sy_pnum',
  'discoverymethod',
  'disc_year',
  'pl_orbper',
  'pl_orbsmax',
  'pl_orbeccen',
  'pl_eqt',
  'pl_orbincl',
  'st_spectype',
  'st_teff',
  'st_rad',
  'st_age',
  'st_vsin',
  'rastr',
  'ra',
  'decstr',
  'dec',
  'sy_dist',
  'sy_vmag'
]

export async function GET (Request: Request) {
  const params = new URL(Request.url).searchParams
  const name = params.get('name')

  if (name == null || name === '') {
    return Response.json({
      result: null
    })
  }

  const query = `SELECT ${labels.join(',')} FROM pscomppars WHERE hostname='${name}'`
  const res = await fetch(
    `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`
  )

  const data = await res.json()
  console.log(data)
  return Response.json({
    result: data
  })
}
