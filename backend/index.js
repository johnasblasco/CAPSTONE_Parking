import { PORT, DATABASE } from './config.js';
import axios from 'axios';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';  // Import path for absolute directory
import dotenv from 'dotenv';
dotenv.config();

// import routes
import userR from './routes/userR.js';
import adminR from './routes/adminR.js';
import vehicleR, { vehicleInit } from './routes/vehicleR.js';
import earningsR, { earningsInit } from './routes/earningsR.js';
import settingsR from './routes/settingsR.js';
import uploadR from './routes/uploadR.js';
import latestimageroute from './routes/latestImageRoute.js';

// use express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend/public/uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

// Routes
app.use('/admin', adminR);
app.use('/user', userR);
app.use('/vehicle', vehicleR);
app.use('/earnings', earningsR);
app.use('/settings', settingsR);
app.use('/upload', uploadR);
app.use('/latest-image', latestimageroute);

// Database/Mongo connection
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

  // Send this to all kupal
  const initialData = async () => {
    const vehicle = await axios.get('https://capstone-parking.onrender.com/vehicle');
    socket.emit('vehicles', vehicle.data);
  };
  initialData();
});

vehicleInit(io);
earningsInit(io);
