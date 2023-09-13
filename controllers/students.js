import { validateStudentModification, validateStudent } from '../schemas/students.js'

export class StudentsController {
  constructor ({ studentsModel }) {
    this.studentsModel = studentsModel
  }

  getAll = async (req, res) => {
    const { graduation, actives } = req.query
    const students = await this.studentsModel.getAll({ graduation, actives })
    if (students === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(students)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const student = await this.studentsModel.getById({ id })
    if (!student) res.status(404).send({ message: 'El alumno no existe' })
    res.json(student)
  }

  create = async (req, res) => {
    const result = validateStudent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const response = await this.studentsModel.create({ input: result.data })
    res.send(response.student)
  }

  update = async (req, res) => {
    const result = validateStudentModification(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const { id } = req.params
    const updatedStudent = await this.studentsModel.update({ id, input: result.data })
    return res.json(updatedStudent.student)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.studentsModel.delete({ id })
    if (result.affectedRows === 0) return res.status(400).json({ error: 'El alumno no existe' })
    return res.json({ message: `Alumno con ID ${id} eliminado` })
  }

  changeActivitie = async (req, res) => {
    const { id } = req.params
    const result = await this.studentsModel.changeActivitie({ id })
    if (result.student === undefined) return res.status(400).json({ error: 'El alumno no existe' })
    return res.json(result.student)
  }
}
