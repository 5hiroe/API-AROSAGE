import express from 'express'
import * as plant from '../controllers/plant.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/', jwt.verify, plant.createPlant)
router.get('/:id', jwt.verify, plant.getPlantById)
router.put('/update/:id', jwt.verify, plant.putPlantById)
router.delete('/delete/:id', jwt.verify, plant.deletePlantById)

export default router
