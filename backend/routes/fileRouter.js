import { Router } from 'express'
const router = Router()
import {editStatusFile, getAllFile, uploadFile, updateFileStatusAndComment, comment} from "../controllers/fileController.js";
import upload from '../middleware/multerMiddleware.js';

router.post('/', upload.single('filename'), uploadFile)
router.get('/get-files', getAllFile)
router.patch('/:id', editStatusFile)
router.patch('/action/:id', updateFileStatusAndComment)
router.get('/comments/:id', comment)


export default router