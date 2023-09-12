import express, { json } from 'express'
import pc from 'picocolors'
import { StudentsRouter } from './routes/students.js'
import { GraduationsRouter } from './routes/graduations.js'
import { corsMiddleware } from './middleware/cors.js'
import { ParentsRouter } from './routes/parents.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/students', StudentsRouter)
app.use('/graduations', GraduationsRouter)
app.use('/parents', ParentsRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found</h1>')
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server started on ${pc.cyan(`http://localhost:${PORT}`)}`)
})

// !IMPORTANTE HACER TODAS LAS VALIDACIONES DE CANTIDADES DE CARACTERES Y CONSUMIR LOS DATOS DE LA TABLA
// ! HACER VARIABLES GLOBALES!!!!
