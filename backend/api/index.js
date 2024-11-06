import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import path from 'path';

// Import routes
import userR from '../routes/userR.js';
import adminR from '../routes/adminR.js';
import vehicleR from '../routes/vehicleR.js';
import earningsR from '../routes/earningsR.js';
import settingsR from '../routes/settingsR.js';
import uploadR from '../routes/uploadR.js';

// Import database connection details
import { DATABASE, PORT } from '../config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (adjust this based on your frontend setup)
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

// Routes
app.use('/admin', adminR);
app.use('/user', userR);
app.use('/vehicle', vehicleR);
app.use('/earnings', earningsR);
app.use('/settings', settingsR);
app.use('/upload', uploadR);

// MongoDB connection (use each time for serverless)
const Connection = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB connection failed', error);
  }
};

// WebSocket setup (Vercel's serverless functions aren't ideal for WebSockets, so this part may need an external service)
const serverlessHandler = (req, res) => {
  // Initialize MongoDB connection per request (not persistent)
  Connection();

  // Handle Express requests
  app(req, res);

  // WebSocket setup (may not work on Vercel, consider using Heroku/AWS for WebSocket handling)
  const expressServer = app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
  });

  const io = new Server(expressServer, {
    cors: { origin: '*' },
  });

  io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);
    const initialData = async () => {
      const vehicle = await axios.get('http://localhost:8000/vehicle'); // Adjust endpoint
      socket.emit('vehicles', vehicle.data);
    };
    initialData();
  });

  // Handle other socket events
  // vehicleInit(io);
  // earningsInit(io);
};

export default serverlessHandler;
