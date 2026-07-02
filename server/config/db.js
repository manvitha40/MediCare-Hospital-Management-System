const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare';
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000 // Quick timeout to fallback fast
    });
    console.log('MongoDB Connected Successfully.');
    process.env.USE_MOCK_DB = 'false';
  } catch (err) {
    console.warn('\n=============================================================');
    console.warn('WARNING: Could not connect to MongoDB:');
    console.warn(err.message);
    console.warn('FALLING BACK TO LOCAL FILE-BASED DATABASE (server/data/*.json)');
    console.warn('The system will be fully functional and persist data locally!');
    console.warn('=============================================================\n');
    process.env.USE_MOCK_DB = 'true';
  }
};

module.exports = connectDB;
