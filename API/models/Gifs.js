const mongoose = require('mongoose');

const gifSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gifUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Gif = mongoose.model('Gif', gifSchema);

module.exports = Gif;
