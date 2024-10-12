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

export {
  labels,
  spectralTypes
}
