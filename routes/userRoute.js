import { Router } from 'express';
import {
  getPosts,
  handleUpload,
  upload,
} from '../controllers/userController.js';

const userRoute = Router();

userRoute.post('/create', upload.array('images', 10), handleUpload);
userRoute.get('/posts', getPosts);

export { userRoute };
