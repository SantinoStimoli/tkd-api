import { validateGraduation, validateGraduationModification } from '../schemas/graduations.js'

export class GraduationsController {
  constructor ({ graduationsModel }) {
    this.graduationsModel = graduationsModel
  }

  getAll = async (req, res) => {
    const graduations = await this.graduationsModel.getAll()
    if (graduations === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(graduations)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const graduation = await this.graduationsModel.getById({ id })
    if (!graduation) res.status(404).send({ message: 'La graduación no existe' })
    res.json(graduation)
  }

  create = async (req, res) => {
    const result = validateGraduation(req.body)
    if (result.error) return res.status(400).json({ message: result.error.message })
    const response = await this.graduationsModel.create({ input: result.data })
    res.send(response.graduation)
  }

  update = async (req, res) => {
    try {
      const result = validateGraduationModification(req.body)
      if (result.error) return res.status(400).json({ message: result.error.message })
      const { id } = req.params
      const updatedGraduation = await this.graduationsModel.update({ id, input: result.data })
      return res.json(updatedGraduation.graduation)
    } catch (e) {
      return res.status(400).json({ message: 'La graduación está relacionada con algún alumno, no puede ser modificada' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      const result = await this.graduationsModel.delete({ id })
      if (result.affectedRows === 0) return res.status(400).json({ message: 'La graduación no existe' })
      return res.json({ message: `Graduación con ID ${id} eliminado` })
    } catch (e) {
      return res.status(400).json({ message: 'La graduación está relacionada con algún alumno, no puede ser eliminada' })
    }
  }
}
