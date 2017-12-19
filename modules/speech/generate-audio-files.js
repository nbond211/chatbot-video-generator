import assignVoices from './assign-voices';
import { promisify } from 'util';

const { one, two } = assignVoices();
const voiceOne = require('node-gtts')(one);
const voiceTwo = require('node-gtts')(two);
const saveVoiceOne = promisify(voiceOne.save);
const saveVoiceTwo = promisify(voiceTwo.save);

export default async function(conversation) {
    await Promise.all(conversation.map(async (line, index) => {
        if (index % 2 === 0) {
            return await saveVoiceOne(`job/audio/${index}.mp3`, line);
        } else {
            return await saveVoiceTwo(`job/audio/${index}.mp3`, line);
        }
    }));
}
