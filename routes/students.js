import { Router } from 'express'
import { validateModificationStudent, validateStudent } from '../schemas/movies.js'
import { StudentModel } from '../models/students.js'

export const studentsRouter = Router()

studentsRouter.get('/', async (req, res) => {
  const { graduation } = req.query
  const students = await StudentModel.getAll({ graduation })
  res.json(students)
})

studentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const student = await StudentModel.getById({ id })

  if (!student) res.status(404).send({ message: 'Student not found' })

  res.json(student)
})

studentsRouter.post('/', async (req, res) => {
  const result = validateStudent(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }

  const newStudent = await StudentModel.create({ input: result.data })

  res.send(newStudent)
})

studentsRouter.patch('/:id', async (req, res) => {
  const result = validateModificationStudent(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error.message })
  }

  const { id } = req.params

  const updatedStudent = await StudentModel.update({ id, input: result.data })

  return res.json(updatedStudent)
})
