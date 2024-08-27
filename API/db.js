const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const dbName = 'mydatabase'
const mongoURI = `mongodb://localhost:27017/${dbName}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    const username = '2';
    const password = '2';
    const hashedPassword = await bcrypt.hash(password, 10);
    const gifHistory = [];
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const user = new User({ username, password: hashedPassword, gifHistory });
      await user.save();
      console.log('Test user created successfully');
    } else {
      console.log('Test user already exists');
    }


  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

