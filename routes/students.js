import { Router } from 'express'
import { StudentsController } from '../controllers/students.js'

export const StudentsRouter = Router()

StudentsRouter.get('/', StudentsController.getAll)

StudentsRouter.get('/:id', StudentsController.getById)

StudentsRouter.post('/', StudentsController.create)

StudentsRouter.patch('/:id', StudentsController.update)

StudentsRouter.patch('/changeActivitie/:id', StudentsController.changeActivitie)

StudentsRouter.delete('/:id', StudentsController.delete)
