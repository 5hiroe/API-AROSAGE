import express from 'express'
import * as controllers from '../controllers/auth.js'
const router = express.Router()

router.post('/signup', controllers.signup)
router.post('/login', controllers.login)

export default router