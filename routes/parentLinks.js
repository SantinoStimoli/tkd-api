import { Router } from 'express'
import { ParentLinksController } from '../controllers/parentLinks.js'

export const createParentLinksRouter = ({ parentLinksModel }) => {
  const ParentLinksRouter = Router()
  const parentsController = new ParentLinksController({ parentLinksModel })

  ParentLinksRouter.get('/', parentsController.getAll)

  ParentLinksRouter.get('/:id', parentsController.getById)

  ParentLinksRouter.post('/', parentsController.create)

  ParentLinksRouter.patch('/:id', parentsController.update)

  ParentLinksRouter.delete('/:id', parentsController.delete)

  return ParentLinksRouter
}
