// Herramientas
const express = require('express')
const pc = require('picocolors')
const crypto = require('node:crypto')

// Data
const students = require('./students.json')
const { validateStudent, validateModificationStudent } = require('./schemas/movies')
const { log } = require('node:console')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 1234

// <------- GET ------->
// Inicio
app.get('/', (req, res) => {
  res.send({ message: 'home' })
})

// Obtener todos los alumnos
app.get('/students', (req, res) => {
  const { graduation } = req.query
  let filteredStudents = students

  if (graduation) filteredStudents = students.filter(student => student.graduation === graduation)

  res.json(filteredStudents)
})

// Obtener alumno por id
app.get('/students/:id', (req, res) => {
  const { id } = req.params
  const student = students.find(student => student.id === parseInt(id))
  if (student) res.json(student)

  res.status(404).send({ message: 'Student not found' })
})

// <------- POST ------->
// Crear alumno
app.post('/students', (req, res) => {
  const result = validateStudent(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }

  const newStudent = {
    id: crypto.randomUUID(),
    graduation: 'Blanco',
    ...result.data
  }
  students.push(newStudent)
  res.send(newStudent)
})

// <------- PATCH ------->
// Crear alumno
app.patch('/students/:id', (req, res) => {
  const { id } = req.params
  const result = validateModificationStudent(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }

  const studentIndex = students.findIndex(student => student.id === parseInt(id))

  if (studentIndex === -1) {
    return res.status(400).json({ error: 'Student not found' })
  }

  const updatedStudent = {
    ...students[studentIndex],
    ...result.data
  }

  students[studentIndex] = updatedStudent

  return res.json(students[studentIndex])
})

// Not Found Page
app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found</h1>')
})

// Subir el servidor
app.listen(PORT, () => {
  console.log(`server started on ${pc.cyan(`http://localhost:${PORT}`)}`)
})
