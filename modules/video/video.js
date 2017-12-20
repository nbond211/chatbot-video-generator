import getDuration from 'get-audio-duration';
import cmd from 'node-command-line';

async function getSpeechDuration(index) {
    const path = `job/audio/${index}.mp3`;
    return await getDuration(path);
}

// async function generateImagesArray(conversation) {
//     return Promise.all(conversation.map(async (line, index) => {
//         const path = `job/images/${index % 2 == 0 ? 'one' : 'two'}.jpg`;
//         const loop = await getSpeechDuration(index);
//         return {
//             path,
//             loop: loop,
//             caption: line,
//             captionDelay: 0,
//             captionStart: 0,
//             captionEnd: loop * 1000
//         };
//     }));
// }

export default async function(conversation) {
    // const images = await generateImagesArray(conversation);
    // console.log(images);
    // const options = {
    //     transition: false,
    //     transitionDuration: 0
    // };

    // await videoshow(images, options)
    //     .audio('job/audio/conversation.mp3')
    //     .save(`output/${'test'}.mp4`)
    //     .on('start', function (command) {
    //         console.log('Video process started:', command)
    //     })
    //     .on('error', function (err) {
    //         console.error('Error:', err)
    //     })
    //     .on('end', function (output) {
    //         console.log('Video created in:', output)
    //     });

    cmd.run('ffmpeg -f concat -i input.txt -i job/audio/conversation.mp3 output/output.mp4');

}