import { validateParent, validateParentModification } from '../schemas/parents.js'

export class ParentsController {
  constructor ({ parentsModel }) {
    this.parentsModel = parentsModel
  }

  getAll = async (req, res) => {
    const parents = await this.parentsModel.getAll()
    if (parents === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(parents)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const parent = await this.parentsModel.getById({ id })
    if (!parent) res.status(404).send({ message: 'El padre no existe' })
    res.json(parent)
  }

  create = async (req, res) => {
    const result = validateParent(req.body)
    if (result.error) return res.status(400).json({ message: result.error.message })
    const response = await this.parentsModel.create({ input: result.data })
    res.send(response.parent)
  }

  update = async (req, res) => {
    const result = validateParentModification(req.body)
    if (result.error) return res.status(400).json({ message: result.error.message })
    const { id } = req.params
    const updatedStudent = await this.parentsModel.update({ id, input: result.data })
    return res.json(updatedStudent.parent)
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      const result = await this.parentsModel.delete({ id })
      if (result.affectedRows === 0) return res.status(400).json({ message: 'El padre no existe' })
      return res.json({ message: `Padre con ID ${id} eliminado` })
    } catch (e) {}
  }
}
