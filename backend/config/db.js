const mongoose = require('mongoose');

let databaseStatus = 'not-configured';

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    console.log('MONGODB_URI is not set; running without database connection.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    databaseStatus = 'connected';
    console.log('MongoDB connected.');
  } catch (error) {
    databaseStatus = 'error';
    console.error(`MongoDB connection failed: ${error.message}`);
  }
}

connectDB.getStatus = () => databaseStatus;

module.exports = connectDB;
