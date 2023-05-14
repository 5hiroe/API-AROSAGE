import express from 'express'
import * as feedback from '../controllers/feedback.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/', jwt.verify, feedback.createFeedback)
router.get('/keep/:id', jwt.verify, feedback.getFeedbacksByKeep)

export default router
