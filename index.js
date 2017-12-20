import speech from './modules/speech/speech';
import images from './modules/images/images';
import video from './modules/video/video';

export default async function() {
    const conversation = await speech();
    await images(conversation);
    await video(conversation);
}