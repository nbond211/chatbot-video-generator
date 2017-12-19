import audioconcat from 'audioconcat';
import fs from 'fs-extra';

async function getAudioFiles() {
    const files = await fs.readdir('job/audio');
    const filteredFiles = files.filter(filename => filename.includes('.mp3'));
    return filteredFiles.map(filename => `job/audio/${filename}`);
}

export default async function() {
    const audioFiles = await getAudioFiles();

    await audioconcat(audioFiles)
        .concat('job/audio/conversation.mp3')
        .on('start', function (command) {
            console.log('Combining audio process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('Combining audio stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Audio created in:', output)
        });
}