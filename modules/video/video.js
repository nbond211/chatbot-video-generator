import getDuration from 'get-audio-duration';
import { promisify } from 'util';
import cmd from 'node-cmd'
const getAsync = promisify(cmd.get);
const arrayToTextFile = promisify(require('array-to-txt-file'));
import fs from 'fs-extra';
import bbPromise from 'bluebird';

async function getSpeechDuration(index) {
    const path = `job/audio/${index}.mp3`;
    return await getDuration(path);
}

async function getSpeechDurations(conversation) {
    return await Promise.all(conversation.map(async (line, index) => {
        return await getSpeechDuration(index);
    }));
}

async function writeTextFile(durations) {
    const inputData = durations.map((duration, index) => {
       return `file 'images/frames/${index}.jpg'\nduration ${duration}`;
    });
    await arrayToTextFile(inputData, 'job/input.txt');

    // await Promise.all(durations.map(async (duration, index) => {
    //
    //     await fs.appendFile('job/input.txt', '\n' + `file 'images/frames/${index}.jpg'`);
    //     await fs.appendFile('job/input.txt', `\n duration ${duration}`);
    // }));
}

async function generateImagesArray(conversation) {
    return Promise.all(conversation.map(async (line, index) => {
        const path = `job/images/${index % 2 == 0 ? 'one' : 'two'}.jpg`;
        const loop = await getSpeechDuration(index);
        return {
            path,
            loop: loop,
            caption: line,
            captionDelay: 0,
            captionStart: 0,
            captionEnd: loop * 1000
        };
    }));
}

export default async function(conversation) {
    const durations = await getSpeechDurations(conversation);
    await writeTextFile(durations);
    await getAsync('ffmpeg -f concat -i job/input.txt -i job/audio/conversation.mp3 output/output.mp4');
}