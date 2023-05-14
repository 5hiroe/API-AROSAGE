import express from 'express'
import * as auth from '../controllers/botanist.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.get('/botanist', jwt.verify, auth.getBotanist)
router.get('/locations', jwt.verify, auth.getLocations)

export default router
