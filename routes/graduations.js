import { Router } from 'express'
import { GraduationsController } from '../controllers/graduations.js'

export const createGraduationsRouter = ({ graduationsModel }) => {
  const GraduationsRouter = Router()
  const graduationsController = new GraduationsController({ graduationsModel })

  GraduationsRouter.get('/', graduationsController.getAll)

  GraduationsRouter.get('/:id', graduationsController.getById)

  GraduationsRouter.post('/', graduationsController.create)

  GraduationsRouter.patch('/:id', graduationsController.update)

  GraduationsRouter.delete('/:id', graduationsController.delete)

  return GraduationsRouter
}
