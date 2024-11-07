import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import userR from '../routes/userR.js';
import adminR from '../routes/adminR.js';
import vehicleR from '../routes/vehicleR.js';
import earningsR from '../routes/earningsR.js';
import settingsR from '../routes/settingsR.js';
import uploadR from '../routes/uploadR.js';

// Import database connection details
import { DATABASE } from '../config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/admin', adminR);
app.use('/user', userR);
app.use('/vehicle', vehicleR);
app.use('/earnings', earningsR);
app.use('/settings', settingsR);
app.use('/upload', uploadR);

// MongoDB connection (used per request for serverless)
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

// Serverless function handler
const handler = async (req, res) => {
  // Ensure MongoDB connection per request
  await Connection();

  // Express request handler
  app(req, res);
};

export default handler;
