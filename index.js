import speech from './modules/speech/speech';
import images from './modules/images/images';
import video from './modules/video/video';
import clean from './modules/clean/clean';

export default async function() {
    try {
        const conversation = await speech();
        await images(conversation);
        await video(conversation);
        await clean();
    } catch (error) {
        await clean();
    }
    console.log('done :)');
}