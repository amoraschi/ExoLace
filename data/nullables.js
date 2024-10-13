import { readFileSync, writeFileSync } from 'fs';

const data = readFileSync('exoplanets.csv', 'utf8')

const lines = data.split('\n')

const head = lines[0].split(',')
// Create an object where keys are the column names and values are boolean
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
