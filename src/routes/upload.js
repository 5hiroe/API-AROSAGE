import express from 'express'
import * as controllers from '../controllers/upload.js'
import * as jwt from '../middlewares/jwt.js'
const router = express.Router()

router.post('/user', jwt.verify, controllers.uploadUserPicture)
router.post('/plant/:plantId', jwt.verify, controllers.uploadPlantPicture)

export default router