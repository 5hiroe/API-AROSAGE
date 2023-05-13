import express from 'express'
import * as profile from '../controllers/profile.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt.verify, profile.getProfileById)
router.put('/', jwt.verify, profile.putProfileById)
router.delete('/:id', jwt.verify, profile.deleteProfileById)

export default router
