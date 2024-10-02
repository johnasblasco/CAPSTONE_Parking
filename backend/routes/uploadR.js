import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Setup Multer for storing files in the public/uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './public/uploads';

    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir); // Files will be saved in 'public/uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'uploaded-image' + path.extname(file.originalname)); // Always overwrite with the same filename
  }
});

// Multer middleware
const upload = multer({ storage });

// File upload route
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Delete existing files in the uploads folder
  const dir = './public/uploads';
  fs.readdir(dir, (err, files) => {
    if (err) return console.error('Error reading uploads directory:', err);

    files.forEach(file => {
      // Delete each file except the newly uploaded one
      if (file !== 'uploaded-image' + path.extname(req.file.originalname)) {
        fs.unlink(path.join(dir, file), (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    });
  });

  // Send back the file path to the client
  const filePath = `/uploads/uploaded-image${path.extname(req.file.filename)}`;
  res.json({ message: 'File uploaded successfully', filePath });
});

export default router;
