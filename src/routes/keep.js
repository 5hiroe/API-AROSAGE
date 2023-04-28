import express from 'express'
import * as keep from '../controllers/keep.js'

const router = express.Router()

router.post('/', keep.createKeep)

export default router
