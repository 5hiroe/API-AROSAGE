import express from 'express'
import * as upload from '../controllers/upload.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/user/:id', jwt.verify, upload.userPicture)
router.post('/plant/:id', jwt.verify, upload.plantPicture)

export default router
