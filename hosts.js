import { readFileSync, writeFileSync } from 'fs';

const file = readFileSync('exoplanets.csv', 'utf8')

const lines = file.split('\n')

const hosts = []
for (const line of lines.slice(1)) {
  const [,host] = line.split(',')
  console.log(host)
  hosts.push(host)
}

writeFileSync('hosts.json', JSON.stringify(hosts, null, 2))
