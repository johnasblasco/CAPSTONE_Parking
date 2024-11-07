import mongoose from 'mongoose';

// Import database connection details
import { DATABASE } from '../config.js';

// Track connection status
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    // If already connected, reuse the connection
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;  // Set the connection flag to true
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
