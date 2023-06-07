import express from 'express'
import * as keep from '../controllers/keep.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.post('/', jwt.verify, keep.createKeep)
router.get('/user/all', jwt.verify, keep.getKeepByUser)
router.get('/all', jwt.verify, keep.getAllKeeps)
router.get('/applied', jwt.verify, keep.appliedKeeps)
router.put('/apply/:id', jwt.verify, keep.applyKeep)
router.get('/:id', jwt.verify, keep.getKeepById)
router.get('/all/except', jwt.verify, keep.getAllKeepsExceptUser)

export default router
