import { Router } from 'express'
import { ParentsController } from '../controllers/parents.js'

export const createParentsRouter = ({ parentsModel }) => {
  const ParentsRouter = Router()
  const parentsController = new ParentsController({ parentsModel })

  ParentsRouter.get('/', parentsController.getAll)

  ParentsRouter.get('/:id', parentsController.getById)

  ParentsRouter.post('/', parentsController.create)

  ParentsRouter.patch('/:id', parentsController.update)

  ParentsRouter.delete('/:id', parentsController.delete)

  return ParentsRouter
}
