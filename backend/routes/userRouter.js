import { Router } from 'express'
import {getCurrentUser, updateUser} from '../controllers/userController.js'
const router = Router()

router.get('/current-user', getCurrentUser)
router.patch('/update-profile', updateUser)

export default router