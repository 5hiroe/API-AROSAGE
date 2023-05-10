import express from 'express'
import * as download from '../controllers/download.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/user/:id', jwt.verify, download.userPicture)
router.post('/plant/:id', jwt.verify, download.plantPicture)

export default router
