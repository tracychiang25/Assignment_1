const gifProcessor = require('../services/gifProcessor');
const Gif = require('../models/Gifs');
const path = require('path');
const User = require('../models/User');

// Map(): Key-pair value, stores the taskName and progress
const tasks = new Map(); // It will be updated when converting to gif (ref: gifProcessor)


// localhost/upload
exports.uploadVideo = async (req, res) =>{
    try{
        // Ensure req.file contains the uploaded fie
        if(!req.file){
            return res.status(400).json({ error: 'No video file provided'});
        }
        const taskName = Date.now();
        // Transforming the video to GIF and get the URL
        const gifFileName = await gifProcessor.transformToGif(req.file.path, tasks, taskName);
        const gifUrl = `/gifs/${gifFileName}`;
        // Create a new GIF record associated with the user
        const newGif = {
            userId: req.user.id,
            gifUrl,
            createdAt: new Date(),
        }
        console.log('Created GIF:', newGif);

        // Save the new GIF record to the database
        const gif = await Gif.create(newGif);
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.gifHistory.push(gif._id); // Push the new GIF to the user's history
        await user.save(); // Save the user with the updated gifHistory

        res.status(201).json({ gifUrl, taskName });
      } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// localhost/download/:filename
exports.getHistory = async (req, res) => {
    try{
        const user = await User.findOne({ username: req.user.username }).populate('gifHistory');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.gifHistory)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};
// localhost/history/:username
exports.downloadGif = (req, res) =>{
    const gifFileName = req.params.filename;
    const filePath = path.join(process.cwd(), 'public', 'gifs', gifFileName);

    res.download(filePath, err =>{
        if(err){
            console.error('Error downloading file:', err);
            res.status(500).json({error: 'Error downloading file'});
        }
    });
};

exports.displayProgress = (req, res) => {
    const taskName = Number(req.params.taskname);
    console.log('Requested taskName:', taskName);
    console.log('Current tasks map:', tasks);

    if (!tasks.has(taskName)){
        return res.status(404).json({ error: "The compression task does not exist" });
    }
    const progress = tasks.get(taskName);
    if (progress >= 100){
        tasks.delete(taskName);
    } 
    return res.json({ progress: progress });
  };

  