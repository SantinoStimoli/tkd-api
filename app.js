import express, { json } from 'express'
import pc from 'picocolors'
import 'dotenv/config'
import { corsMiddleware } from './middleware/cors.js'
import { createStudentsRouter } from './routes/students.js'
import { createGraduationsRouter } from './routes/graduations.js'
import { createParentsRouter } from './routes/parents.js'
import { StudentsModel } from './models/students.js'
import { GraduationsModel } from './models/graduations.js'
import { ParentsModel } from './models/parents.js'
import { ParentLinksModel } from './models/parentLinks.js'
import { createParentLinksRouter } from './routes/parentLinks.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/students', createStudentsRouter({ studentsModel: StudentsModel }))
app.use('/graduations', createGraduationsRouter({ graduationsModel: GraduationsModel }))
app.use('/parents', createParentsRouter({ parentsModel: ParentsModel }))
app.use('/parent-link', createParentLinksRouter({ parentLinksModel: ParentLinksModel }))

app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found</h1>')
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server started on ${pc.cyan(`http://localhost:${PORT}`)}`)
})

// !IMPORTANTE HACER TODAS LAS VALIDACIONES DE CANTIDADES DE CARACTERES Y CONSUMIR LOS DATOS DE LA TABLA
