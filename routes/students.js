import { Router } from 'express'
import { StudentsController } from '../controllers/students.js'

export const createStudentsRouter = ({ studentsModel }) => {
  const StudentsRouter = Router()
  const studentsController = new StudentsController({ studentsModel })

  StudentsRouter.get('/', studentsController.getAll)

  StudentsRouter.get('/:id', studentsController.getById)

  StudentsRouter.post('/', studentsController.create)

  StudentsRouter.patch('/:id', studentsController.update)

  StudentsRouter.patch('/changeActivitie/:id', studentsController.changeActivitie)

  StudentsRouter.delete('/:id', studentsController.delete)

  return StudentsRouter
}
