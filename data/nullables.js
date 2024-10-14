import { readFileSync, writeFileSync } from 'fs';

const data = readFileSync('exoplanets.csv', 'utf8')

const lines = data.split('\n')

const head = lines[0].split(',')
const headers = head.reduce((acc, header) => {
  acc[header] = ''
  return acc
}, {})

console.log(headers)

for (const line of lines) {
  const values = line.split(',')
  for (const value of values) {
    if (value === '') {
      headers[head[values.indexOf(value)]] = null
    }
  }
}

writeFileSync('nullables.json', JSON.stringify(headers, null, 2))
