// import { StudentModel } from '../models/local/students.js' // LOCAL
import { StudentModel } from '../models/mysql/students.js'
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
    if (!student) res.status(404).send({ message: 'El alumno no existe' })
    res.json(student)
  }

  static async create (req, res) {
    const result = validateStudent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const response = await StudentModel.create({ input: result.data })
    res.send(response.student)
  }

  static async update (req, res) {
    const result = validateModificationStudent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const { id } = req.params
    const updatedStudent = await StudentModel.update({ id, input: result.data })
    return res.json(updatedStudent.student)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await StudentModel.delete({ id })
    if (result.affectedRows === 0) return res.status(400).json({ error: 'El alumno no existe' })
    return res.json({ message: `Alumno con el ID ${id} eliminado` })
  }

  static async changeActivitie (req, res) {
    const { id } = req.params
    const result = await StudentModel.changeActivitie({ id })
    if (result.student === undefined) return res.status(400).json({ error: 'El alumno no existe' })
    return res.json(result.student)
  }
}
