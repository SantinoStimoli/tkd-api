import { Router } from 'express'
import { ParentsController } from '../controllers/parents.js'

export const ParentsRouter = Router()

ParentsRouter.get('/', ParentsController.getAll)

ParentsRouter.get('/:id', ParentsController.getById)

ParentsRouter.post('/', ParentsController.create)

ParentsRouter.patch('/:id', ParentsController.update)

ParentsRouter.delete('/:id', ParentsController.delete)
