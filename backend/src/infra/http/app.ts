import 'express-async-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from './middlewares/error-handler'
import { usersRouter } from './routes/users-routes'
import { projectsRouter } from './routes/projects-routes'
import { tasksRouter } from './routes/tasks-routes'

const app = express()

app.use(helmet())

app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(usersRouter)
app.use(projectsRouter)
app.use(tasksRouter)

app.use(errorHandler)

export { app }
