import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readStudentsJSON = () => require('./students.json')
