import express from 'express'
import * as advice from '../controllers/advice.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/', jwt.verify, advice.create)
router.get('/all/:id', jwt.verify, advice.findAllByPlant)

export default router
