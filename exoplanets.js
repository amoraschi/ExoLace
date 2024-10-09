import { readFileSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';

const labels = [
  'pl_name', 'hostname', 'default_flag',
  'sy_snum', 'sy_pnum', 'discoverymethod',
  'disc_year', 'pl_orbper', 'pl_orbpererr1',
  'pl_orbpererr2', 'pl_orbperlim', 'pl_orbsmax',
  'pl_orbsmaxerr1', 'pl_orbsmaxerr2', 'pl_orbsmaxlim',
  'pl_orbeccen', 'pl_orbeccenerr1', 'pl_orbeccenerr2',
  'pl_orbeccenlim', 'pl_eqt', 'pl_eqterr1',
  'pl_eqterr2', 'pl_eqtlim', 'st_spectype',
  'st_teff', 'st_tefferr1', 'st_tefferr2',
  'st_tefflim', 'st_rad', 'st_raderr1',
  'st_raderr2', 'st_radlim', 'rastr',
  'ra', 'decstr', 'dec',
  'sy_dist', 'sy_disterr1', 'sy_disterr2',
  'sy_vmag', 'sy_vmagerr1', 'sy_vmagerr2',
  'releasedate'
]

const query =
  `SELECT ${labels.join(',')} FROM ps WHERE pl_name='11 Com b' AND default_flag=1`

;(async () => {
  const res = await fetch(
    `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`
  )

  const data = await res.json()
  // console.log(data)
  writeFileSync('exoplanet.json', JSON.stringify(data, null, 2))

  const { ra, dec } = data[0]
  const rad = 0.1
  const max = 10

  // const starRes = await fetch(
  //   `https://simbad.cds.unistra.fr/cone/?RA=${ra}&DEC=${dec}&SR=${rad}&ORDER_BY=distance&MAXREC=${max}&RESPONSEFORMAT=json&VERB=1`
  // )

  const adqlQuery = `
    SELECT main_id, ra, dec, otype,
    DISTANCE(POINT('ICRS', ${ra}, ${dec}), POINT('ICRS', ra, dec)) AS "distance" 
    FROM basic 
    WHERE CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', ${ra}, ${dec}, ${rad})) = 1
    AND otype != 'pl'
    ORDER BY "distance"
  `;

  const encodedQuery = encodeURIComponent(adqlQuery);
  const simbadTapUrl = `https://simbad.u-strasbg.fr/simbad/sim-tap/sync?request=doQuery&lang=adql&query=${encodedQuery}&format=json`;
  const starRes = await fetch(simbadTapUrl);

  const starData = await starRes.json()
  // console.log(starData)
  writeFileSync('star.json', JSON.stringify(starData, null, 2))

  const exoplanetNames = readFileSync('exoplanets.csv', 'utf8')
  const lines = exoplanetNames.split('\n')
  const parsedNames = lines.slice(1).map(line => line.split(',')[0].trim())

  writeFileSync('names.json', JSON.stringify(parsedNames, null, 2))
})()
