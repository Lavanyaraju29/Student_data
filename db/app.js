const mongoose = require('mongoose');
const connectDB = async() => {
   try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('mongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:',err);
        throw err;
    }
}

module.exports = connectDB;