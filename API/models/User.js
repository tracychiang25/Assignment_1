const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a schema for the User collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gifHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gif' }],
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
