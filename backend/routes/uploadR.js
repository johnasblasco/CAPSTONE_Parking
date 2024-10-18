import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; // Required for ES module support

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the absolute path to the frontend's public/uploads folder
const frontendPublicDir = path.join(__dirname, '../../frontend/public/uploads');

// Setup Multer for storing files in the frontend public/uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create the uploads folder in the frontend if it doesn't exist
    if (!fs.existsSync(frontendPublicDir)) {
      fs.mkdirSync(frontendPublicDir, { recursive: true });
    }

    cb(null, frontendPublicDir); // Files will be saved in 'frontend/public/uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'uploaded-image' + path.extname(file.originalname)); // Always overwrite with the same filename
  }
});

// Multer middleware
const upload = multer({ storage });

router.get('/', (req, res) => {
      fs.readdir(frontendPublicDir, (err, files) => {
        if (err) {
          return res.status(500).json({ error: 'Error reading uploads directory' });
        }
    
        // If there are no files, respond accordingly
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
    
        // Send the latest file name as the response
        res.json(latestFile);
      });
    });
    

// File upload route
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Delete existing files in the uploads folder in the frontend
  fs.readdir(frontendPublicDir, (err, files) => {
    if (err) return console.error('Error reading uploads directory:', err);

    files.forEach(file => {
      // Delete each file except the newly uploaded one
      if (file !== 'uploaded-image' + path.extname(req.file.originalname)) {
        fs.unlink(path.join(frontendPublicDir, file), (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    });
  });

  // Send back the file path relative to the frontend's public folder
  const filePath = `/uploads/uploaded-image${path.extname(req.file.filename)}`;
  res.json({ message: 'File uploaded successfully', filePath });
});


export default router;
