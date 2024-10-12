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
  pl_orbper?: number
  pl_orbpererr1?: number
  pl_orbpererr2: number
  pl_orbperlim: number
  pl_orbsmax?: number
  pl_orbsmaxerr1?: number
  pl_orbsmaxerr2: number
  pl_orbsmaxlim: number
  pl_orbeccen?: number
  pl_orbeccenerr1?: number
  pl_orbeccenerr2: number
  pl_orbeccenlim: number
  pl_eqt?: number
  pl_eqterr1?: number
  pl_eqterr2: number
  pl_eqtlim: number
  st_spectype?: string
  st_teff?: number
  st_tefferr1: number
  st_tefferr2: number
  st_tefflim: number
  st_rad?: number
  st_raderr1: number
  st_raderr2: number
  st_radlim: number
  rastr: string
  ra: number
  decstr: string
  dec: number
  sy_dist?: number
  sy_disterr1?: number
  sy_disterr2: number
  sy_vmag?: number
  sy_vmagerr1: number
  sy_vmagerr2: number
  releasedate: number
}
