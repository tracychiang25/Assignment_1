const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const dbName = 'mydatabase'
const mongoURI = `${process.env.MONGO_URI}/${dbName}`;
// const mongoURI= `mongodb://localhost:27017/${dbName}`

console.log('MONGO_URI:', mongoURI); 

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    //Define users
    const users = [
      { username: '1', password: '1' },
      { username: '2', password: '2' },
      { username: '3', password: '3' },
      { username: '4', password: '4' },
    ];

    for (const userData of users) {
      const { username, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const gifHistory = [];

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        const user = new User({ username, password: hashedPassword, gifHistory });
        await user.save();
        console.log(`Test user ${username} created successfully`);
      } else {
        console.log(`Test user ${username} already exists`);
      }
    }


  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

