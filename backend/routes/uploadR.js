import express from 'express';
import cloudinary from 'cloudinary';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store the latest uploaded image URL in memory
let latestUploadedImageUrl = null;

// POST route to upload to Cloudinary and save the URL
router.post('/', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No file provided' });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'uploads',
      public_id: 'uploaded-image',
      overwrite: true,
    });
    
    latestUploadedImageUrl = result.secure_url; // Store the Cloudinary URL
    res.json({ message: 'File uploaded successfully', filePath: latestUploadedImageUrl });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// GET route to retrieve the latest uploaded image URL
router.get('/', (req, res) => {
  if (!latestUploadedImageUrl) {
    return res.status(404).json({ message: 'No uploaded image found' });
  }
  res.json(latestUploadedImageUrl); // Return the Cloudinary URL
});

export default router;
