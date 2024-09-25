import { PORT, DATABASE } from './config.js';
import axios from 'axios';
// server imports
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

// database imports
import mongoose from 'mongoose';

// import routes
import userR from './routes/userR.js';
import adminR from './routes/adminR.js';
import vehicleR, { vehicleInit } from './routes/vehicleR.js';
import earningsR, { earningsInit } from './routes/earningsR.js';
import settingsR from './routes/settingsR.js';

// Multer for handling file uploads
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// use express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for serving uploaded files
app.use(express.static('public'));


// Routes
app.use('/admin', adminR);
app.use('/user', userR);
app.use('/vehicle', vehicleR);
app.use('/earnings', earningsR);
app.use('/settings', settingsR);

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
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original file extension
  }
});

// Multer middleware
const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Send back the file path to the client
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ message: 'File uploaded successfully', filePath });
});

// Database/Mongo
const Connection = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log("boss running na ang ating database");
  } catch (error) {
    console.log("boss hindi tayo maka connect kase baka mali link mo or IP address", error);
    return;
  }
};
Connection();

// ExpressServer (HTTP)
const expressServer = app.listen(PORT, () => {
  console.log(`boss running na backend port ${PORT} tayo`);
});

// use my ExpressServer to SocketIO server
const io = new Server(expressServer, { cors: { origin: '*' } });

// socket ON connection
io.on('connection', socket => {
  console.log(`User ${socket.id} connected boss`);

  // Send this to all
  const initialData = async () => {
    const vehicle = await axios.get('http://localhost:8000/vehicle');
    socket.emit('vehicles', vehicle.data);
  };
  initialData();
});

vehicleInit(io);
earningsInit(io);
