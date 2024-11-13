import express from 'express';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for ES module support

import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const router = express.Router();

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Placeholder for frontend public/uploads path (not used here but preserved for structure)
const frontendPublicDir = path.join(__dirname, '../../frontend/public/uploads');

// Route to get the latest uploaded file
router.get('/', (req, res) => {
  fs.readdir(frontendPublicDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading uploads directory' });
    }

    if (files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }

    // Sort files by modified time in descending order (newest first)
    const sortedFiles = files
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(frontendPublicDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    const latestFile = sortedFiles[0].name; // Get the most recent file name
    res.json(latestFile);
  });
});

// Updated route to handle file uploads with Cloudinary
router.post('/', async (req, res) => {
      console.log("Received file:", req.body); // Log the request body
  
      const { image } = req.body; // Ensure you're getting the image data correctly
  
      if (!image) {
          return res.status(400).json({ error: 'No file provided' });
      }
  
      try {
          const result = await cloudinary.uploader.upload(image, {
              folder: 'uploads',
              public_id: 'uploaded-image',
              overwrite: true,
          });
  
          res.json({ message: 'File uploaded successfully', filePath: result.secure_url });
      } catch (error) {
          console.error('Cloudinary upload error:', error);
          res.status(500).json({ error: 'Failed to upload image' });
      }
});

    

export default router;
