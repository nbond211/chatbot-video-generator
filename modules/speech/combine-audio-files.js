import audioconcat from 'audioconcat';
import fs from 'fs-extra';

async function getAudioFiles(conversation) {
    return conversation.map((line, index) => {
       return `job/audio/${index}.mp3`;
    });
}

export default async function(conversation) {
    const audioFiles = await getAudioFiles(conversation);
    console.log(audioFiles);

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