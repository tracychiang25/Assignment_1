const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath('C:/Users/yy509/Downloads/ffmpeg/bin/ffmpeg.exe');
const path = require('path');

const transformToGif = (videoPath, tasks, taskName) => {
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}.gif`
    const outputFilePath = path.join('public', 'gifs', fileName);

    ffmpeg(videoPath)
      .outputOptions([
        '-vf', 'scale=640:-1:flags=lanczos', // Scale the video while maintaining the aspect ratio
        '-t', '20', // Limit to 20 seconds 
        '-r', '15', // Frame rate (15 frames per second)
        '-q:v', '3' // Lower the value for better quality (range is 1-31, lower is better)
      ])
      .on('start', () => {
        tasks.set(taskName, 0);
        resolve(fileName);
      })
      .on("progress", (progress) => {
        const prog = Math.ceil(progress.percent)
        console.log(prog)
        tasks.set(taskName, prog)
      })
      .on('end', () => {
        tasks.set(taskName, 100);
        console.log('Conversion finished successfully');
      })
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        reject(err);
      })
      .save(outputFilePath);
  });
};

module.exports = { transformToGif };
