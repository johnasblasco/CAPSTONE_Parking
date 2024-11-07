import express from 'express';
import connectDB from './database.js';  // Import the singleton connection function
import cors from 'cors';

// Import routes
import userR from '../routes/userR.js';
import adminR from '../routes/adminR.js';
import vehicleR from '../routes/vehicleR.js';
import earningsR from '../routes/earningsR.js';
import settingsR from '../routes/settingsR.js';
import uploadR from '../routes/uploadR.js';

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

// Serverless function handler
const handler = async (req, res) => {
  // Ensure MongoDB connection per request
  await connectDB();

  // Express request handler
  app(req, res);
};

export default handler;
