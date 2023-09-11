import { Router } from 'express'
import { StudentsController } from '../controllers/students.js'

export const studentsRouter = Router()

studentsRouter.get('/', StudentsController.getAll)

studentsRouter.get('/:id', StudentsController.getById)

studentsRouter.post('/', StudentsController.create)

studentsRouter.patch('/:id', StudentsController.update)

studentsRouter.patch('/changeActivitie/:id', StudentsController.changeActivitie)

studentsRouter.delete('/:id', StudentsController.delete)
