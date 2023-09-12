import { ParentsModel } from '../models/mysql/parents.js'
import { validateParent, validateParentModification } from '../schemas/parents.js'

export class ParentsController {
  static async getAll (req, res) {
    const parents = await ParentsModel.getAll()
    if (parents === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(parents)
  }

  static async getById (req, res) {
    const { id } = req.params
    const parent = await ParentsModel.getById({ id })
    if (!parent) res.status(404).send({ message: 'El padre no existe' })
    res.json(parent)
  }

  static async create (req, res) {
    const result = validateParent(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const response = await ParentsModel.create({ input: result.data })
    res.send(response.parent)
  }

  static async update (req, res) {
    const result = validateParentModification(req.body)
    if (result.error) return res.status(400).json({ error: result.error.message })
    const { id } = req.params
    const updatedStudent = await ParentsModel.update({ id, input: result.data })
    return res.json(updatedStudent.parent)
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const result = await ParentsModel.delete({ id })
      if (result.affectedRows === 0) return res.status(400).json({ error: 'El padre no existe' })
      return res.json({ message: `Padre con ID ${id} eliminado` })
    } catch (e) {}
  }
}
