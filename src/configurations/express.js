import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorHandler from '../helpers/error_handler.js'
import authRoutes from '../routes/auth.js'
import plantRoutes from '../routes/plant.js'
import uploadRoutes from '../routes/upload.js'
import downloadRoutes from '../routes/download.js'
import keepRoutes from '../routes/keep.js'
import feedbackRoutes from '../routes/feedback.js'

export async function configure (app) {
  app.use(cors())
  app.use(express.static('public'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', authRoutes)
  app.use('/plant/', plantRoutes)
  app.use('/upload/', uploadRoutes)
  app.use('/download/', downloadRoutes)
  app.use('/keep/', keepRoutes)
  app.use('/feedback/', feedbackRoutes)

  app.use(errorHandler)
  console.log('Express Initialized.')
}
