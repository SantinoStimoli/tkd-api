import { Router } from 'express'
import { GraduationsController } from '../controllers/graduations.js'

export const GraduationsRouter = Router()

GraduationsRouter.get('/', GraduationsController.getAll)

GraduationsRouter.get('/:id', GraduationsController.getById)

GraduationsRouter.post('/', GraduationsController.create)

GraduationsRouter.patch('/:id', GraduationsController.update)

GraduationsRouter.delete('/:id', GraduationsController.delete)
