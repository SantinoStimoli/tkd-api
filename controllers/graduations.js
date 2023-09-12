import { GraduationsModel } from '../models/mysql/graduations.js'
import { validateGraduation, validateGraduationModification } from '../schemas/graduations.js'

export class GraduationsController {
  static async getAll (req, res) {
    const graduations = await GraduationsModel.getAll()
    if (graduations === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(graduations)
  }

  static async getById (req, res) {
    const { id } = req.params
    const graduation = await GraduationsModel.getById({ id })
    if (!graduation) res.status(404).send({ message: 'La graduación no existe' })
    res.json(graduation)
  }

  static async create (req, res) {
    const result = validateGraduation(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const response = await GraduationsModel.create({ input: result.data })
    res.send(response.graduation)
  }

  static async update (req, res) {
    try {
      const result = validateGraduationModification(req.body)
      if (result.error) return res.status(400).json({ error: result.error.message })
      const { id } = req.params
      const updatedGraduation = await GraduationsModel.update({ id, input: result.data })
      return res.json(updatedGraduation.graduation)
    } catch (e) {
      return res.status(400).json({ message: 'La graduación está relacionada con algún alumno, no puede ser modificada' })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const result = await GraduationsModel.delete({ id })
      if (result.affectedRows === 0) return res.status(400).json({ error: 'La graduación no existe' })
      return res.json({ message: `Graduación con el ID ${id} eliminado` })
    } catch (e) {
      return res.status(400).json({ message: 'La graduación está relacionada con algún alumno, no puede ser eliminada' })
    }
  }
}
