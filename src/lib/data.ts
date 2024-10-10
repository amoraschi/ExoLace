const labels = {
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
  'st_spectype': 'Spectral Type',
  'st_teff': 'Stellar Effective Temperature [K]',
  'st_rad': 'Stellar Radius [Solar Radius]',
  'rastr': 'RA [sexagesimal]',
  'ra': 'RA [deg]',
  'decstr': 'Dec [sexagesimal]',
  'dec': 'Dec [deg]',
  'sy_dist': 'Distance [pc]',
  'sy_vmag': 'V (Johnson) Magnitude'
}

const colors: {
  [key: string]: string
} = {
  'pl_name': '#0FFFFF',
  'rastr': '#FFA500',
  'ra': '#FF4500',
  'decstr': '#FFA500',
  'dec': '#FF4500',
  'sy_dist': '#FFD700',
}

const spectralTypes: {
  [key: string]: string
} = {
  O: '#1E90FF',
  B: '#5F9EA0',
  A: '#FFFFFF',
  F: '#FFFFE0',
  G: '#FFD700',
  K: '#FFA500',
  M: '#FF4500'
}

const starsDataIndex = {
  0: {
    label: 'main_id',
    name: 'Main ID',
  },
  1: {
    label: 'ra',
    name: 'RA [deg]',
  },
  2: {
    label: 'dec',
    name: 'Dec [deg]',
  },
  3: {
    label: 'plx_value',
    name: 'Parallax Value [mas]',
  },
  4: {
    label: 'otype',
    name: 'Object Type',
  },
  5: {
    label: 'distance',
    name: 'Angular Distance [deg]',
  },
  6: {
    label: 'plx_diff',
    name: 'Parallax Difference [mas]',
  }
}

export {
  labels,
  colors,
  spectralTypes,
  starsDataIndex
}
