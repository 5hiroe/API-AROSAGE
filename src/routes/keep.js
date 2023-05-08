import express from 'express'
import * as keep from '../controllers/keep.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/', jwt.verify, keep.createKeep)
router.get('/all', jwt.verify, keep.getKeepByUser)

export default router
