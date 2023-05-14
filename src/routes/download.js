import express from 'express'
import * as download from '../controllers/download.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/user/:id', jwt.verify, download.userPicture)
router.get('/plant/:id', jwt.verify, download.plantPicture)

export default router
