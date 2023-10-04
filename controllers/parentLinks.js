import { validateParentLink, validateParentLinkModification } from '../schemas/parentLinks.js'

export class ParentLinksController {
  constructor ({ parentLinksModel }) {
    this.parentLinksModel = parentLinksModel
  }

  getAll = async (req, res) => {
    const parents = await this.parentLinksModel.getAll()
    if (parents === null) res.status(400).json({ message: 'La busqueda no tiene coincidencias' })
    else res.json(parents)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const parent = await this.parentLinksModel.getById({ id })
    if (!parent) res.status(404).send({ message: 'El link de padre no existe' })
    res.json(parent)
  }

  create = async (req, res) => {
    const result = validateParentLink(req.body)
    if (result.error) return res.status(400).json({ message: result.error.message })
    console.log(result.data)
    const response = await this.parentLinksModel.create({ input: result.data })
    res.send(response.parent)
  }

  update = async (req, res) => {
    const result = validateParentLinkModification(req.body)
    if (result.error) return res.status(400).json({ message: result.error.message })
    const { id } = req.params
    const updatedStudent = await this.parentLinksModel.update({ id, input: result.data })
    return res.json(updatedStudent.parent)
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params
      const result = await this.parentLinksModel.delete({ id })
      if (result.affectedRows === 0) return res.status(400).json({ message: 'El link de padre no existe' })
      return res.json({ message: `Link de padre con ID ${id} eliminado` })
    } catch (e) {}
  }
}
