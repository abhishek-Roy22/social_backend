import { User } from '../models/userModel.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

async function handleUpload(req, res) {
  try {
    const { name, socialMediaHandle } = req.body;

    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const user = await User.create({
      name,
      socialMediaHandle,
      images,
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error('Error uploading data: ', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
}

async function getPosts(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching posts: ', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
}

export { handleUpload, getPosts };
