import Jimp from 'jimp';
import { promisify } from 'util';
const sizeOf = promisify(require('image-size'));
import caption from 'caption';
const exportCaption = promisify(caption.path);

async function resizeImage(line, index) {
    try {
        const filename = `job/images/${index % 2 == 0 ? 'one' : 'two'}.jpg`;
        const image = await new Jimp(640, 480, 0xFFFFFFFF);
        const dimensions = await sizeOf(filename);
        const stockPhoto = await Jimp.read(filename);
        await stockPhoto.scale(2);
        await image.composite(stockPhoto, 320 - (dimensions.width), 240 - (dimensions.height));
        await image.write(`job/images/frames/${index}.jpg`);
        await exportCaption(`job/images/frames/${index}.jpg`,
            {
            caption : line,
            outputFile : `job/images/frames/${index}.jpg`
            }
        );
    } catch (error) {
        console.log(error);
    }

}

export default async function(conversation) {
    await Promise.all(conversation.map(async (line, index) => {
        await resizeImage(line, index);
    }));
}