import { Color } from 'three'

const labels: {
  [key: string]: string
} = {
  'pl_name': 'Planet Name',
  'hostname': 'Host Name',
  'default_flag': 'Default Parameter Set',
  'sy_snum': 'Number of Stars',
  'sy_pnum': 'Number of Planets',
  'discoverymethod': 'Discovery Method',
  'disc_year': 'Discovery Year',
  'pl_orbper': 'Orbital Period [days]',
  'pl_orbsmax': 'Orbit Semi-Major Axis [au]',
  'pl_orbeccen': 'Eccentricity',
  'pl_eqt': 'Equilibrium Temperature [K]',
  'pl_orbincl': 'Inclination [deg]',
  'st_spectype': 'Spectral Type',
  'st_teff': 'Stellar Effective Temperature [K]',
  'st_rad': 'Stellar Radius [Solar Radius]',
  'st_age': 'Stellar Age [Gyr]',
  'st_vsin': 'Stellar Rotational Velocity [km/s]',
  'rastr': 'RA [sexagesimal]',
  'ra': 'RA [deg]',
  'decstr': 'Dec [sexagesimal]',
  'dec': 'Dec [deg]',
  'sy_dist': 'Distance [pc]',
  'sy_vmag': 'V (Johnson) Magnitude'
}

const starColors: {
  [key: string]: {
    color: string
    temperatureRange: number[]
  }
} = {
  O: {
    color: 'blue',
    temperatureRange: [30000, 50000],
  },
  B: {
    color: 'lightblue',
    temperatureRange: [10000, 30000],
  },
  A: {
    color: 'white',
    temperatureRange: [7500, 10000],
  },
  F: {
    color: 'lightyellow',
    temperatureRange: [6000, 7500],
  },
  G: {
    color: 'palegoldenrod',
    temperatureRange: [5200, 6000],
  },
  K: {
    color: 'orange',
    temperatureRange: [3700, 5200],
  },
  M: {
    color: 'red',
    temperatureRange: [2400, 3700],
  },
}

function getStarColor (spectralType?: string, temperature?: number) {
  console.log(spectralType, temperature)
  if (spectralType != null && starColors[spectralType.charAt(0)] != null) {
    return starColors[spectralType.charAt(0)].color
  }

  if (temperature != null) {
    const color = Object.entries(starColors).find(([type, { temperatureRange }]) => {
      const [minTemp, maxTemp] = temperatureRange
      return temperature >= minTemp && temperature <= maxTemp
    })

    if (color != null) {
      return color[1].color
    }
  }

  return 'white'
}

export {
  labels,
  starColors,
  getStarColor
}
