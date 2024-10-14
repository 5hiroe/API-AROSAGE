import express from 'express'
import * as auth from '../controllers/auth.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.get('/user', jwt.verify, auth.getUser)
router.get('/locations', jwt.verify, auth.getLocations)
router.post('/logout', jwt.verify, auth.logout)

export default router
