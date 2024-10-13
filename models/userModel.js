import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  socialMediaHandle: {
    type: String,
    reqired: true,
  },
  images: {
    type: [String], // Array of image paths
    required: true,
  },
});

export const User = model('User', userSchema);
