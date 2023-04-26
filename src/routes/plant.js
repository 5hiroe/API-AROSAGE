import express from 'express'
import * as plant from '../controllers/plant.js'

const router = express.Router()

router.post('/', plant.createPlant)

export default router
