import { StudentModel } from '../models/students.js'
import { validateModificationStudent, validateStudent } from '../schemas/students.js'

export class StudentsController {
  static async getAll (req, res) {
    const { graduation, actives } = req.query
    const students = await StudentModel.getAll({ graduation, actives })
    if (students === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(students)
  }

  static async getById (req, res) {
    const { id } = req.params
    const student = await StudentModel.getById({ id })
    if (!student) res.status(404).send({ message: 'Alumno no encontrado' })
    res.json(student)
  }

  static async create (req, res) {
    const result = validateStudent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const newStudent = await StudentModel.create({ input: result.data })
    res.send(newStudent)
  }

  static async update (req, res) {
    const result = validateModificationStudent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const { id } = req.params
    const updatedStudent = await StudentModel.update({ id, input: result.data })
    return res.json(updatedStudent)
  }

  static async delete (req, res) {
    const { id } = req.params
    const student = await StudentModel.delete({ id })
    if (student === null) return res.status(400).json({ error: 'Alumno no encontrado' })
    return res.json({ message: 'Alumno eliminado', data: student })
  }

  static async changeActivitie (req, res) {
    const { id } = req.params
    const student = await StudentModel.changeActivitie({ id })
    if (student === null) return res.status(400).json({ error: 'Alumno no encontrado' })
    return res.json(student)
  }
}
