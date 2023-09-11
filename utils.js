import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readStudentsJSON = () => require('./students.json')

export const parseBoolean = string => {
  if (string === 'true') return true
  else if (string === 'false') return false
  return undefined
}
