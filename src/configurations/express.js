import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorHandler from '../helpers/error_handler.js'
import authRoutes from '../routes/auth.js'
import plantRoutes from '../routes/plant.js'
import uploadRoutes from '../routes/upload.js'
import downloadRoutes from '../routes/download.js'
import profileRoutes from '../routes/profile.js'
import keepRoutes from '../routes/keep.js'
import feedbackRoutes from '../routes/feedback.js'
import botanistRoutes from '../routes/botanist.js'
import adviceRoutes from '../routes/advice.js'
import expressRateLimit from 'express-rate-limit'
import helmet from 'helmet'

export async function configure (app) {
  app.use(cors())
  app.use(express.static('public'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(expressRateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'You exceed 100 requests in 15 minutes',
    headers: true // limit each IP to 100 requests per windowMs
  }))
  // app.use(helmet())
  // app.use(helmet.hsts({
  //   maxAge: 31536000,
  //   includeSubDomains: true,
  //   preload: true
  // }))
  // app.use(helmet.frameguard({
  //   action: 'deny'
  // }))
  // app.use(helmet.xssFilter())
  // app.use(helmet.noSniff())
  // app.use(helmet.contentSecurityPolicy({
  //   directives: {
  //     defaultSrc: ["'self'"],
  //     styleSrc: ["'self'", ''],
  //     fontSrc: ["'self'", ''],
  //     scriptSrc: ["'self'", ''],
  //     imgSrc: ["'self'"]
  //   }
  // }))
  app.use('/', authRoutes)
  app.use('/plant/', plantRoutes)
  app.use('/upload/', uploadRoutes)
  app.use('/download/', downloadRoutes)
  app.use('/profile/', profileRoutes)
  app.use('/keep/', keepRoutes)
  app.use('/feedback/', feedbackRoutes)
  app.use('/botanist/', botanistRoutes)
  app.use('/advice/', adviceRoutes)

  app.use(errorHandler)
}
