import multer from 'multer';
import path from 'path';
import { ensureDirectoryExistence } from '../utils/fileUtils.js';

const uploadDir = 'uploads'
ensureDirectoryExistence(uploadDir); 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // const fileName = file.originalname;
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

export default upload;