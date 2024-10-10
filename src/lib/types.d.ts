interface Results {
  result: string[]
  pages: number
  current: number
}

interface ExoplanetQuery {
  result: ExoplanetData
}

interface ExoplanetData {
  pl_name: string
  hostname: string
  default_flag: number
  sy_snum: number
  sy_pnum: number
  discoverymethod: string
  disc_year: number
  pl_orbper: number
  pl_orbsmax: number
  pl_orbeccen: number
  pl_eqt: number
  st_spectype: string
  st_teff: number
  st_rad: number
  rastr: string
  ra: number
  decstr: string
  dec: number
  sy_dist: number
  sy_vmag: number
}

interface StarsQuery {
  result: StarData[]
}

interface StarData {
  main_id: string
  ra: number
  dec: number
  plx_value: number
  otype: string
  distance: number
  plx_diff: number
  x: number
  y: number
  z: number
}
