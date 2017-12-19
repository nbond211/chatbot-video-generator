import chooseConversation from './choose-conversation';
import generateAudioFiles from './generate-audio-files';
import combineAudioFiles from './combine-audio-files';

export default async function() {
    //const conversation = await chooseConversation();
    //console.log(conversation);

    //await generateAudioFiles(conversation);
    await combineAudioFiles();

}