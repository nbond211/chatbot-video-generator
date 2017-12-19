import Jimp from 'jimp';
import { promisify } from 'util';
const sizeOf = promisify(require('image-size'));

async function resizeImage(filename) {
    const image = await new Jimp(640, 480, 0xFFFFFFFF);
    const dimensions = await sizeOf(filename);
    const stockPhoto = await Jimp.read(filename);
    await stockPhoto.scale(2);
    await image.composite(stockPhoto, 320 - (dimensions.width), 240 - (dimensions.height));
    await image.write(filename);
}

export default async function() {
    await resizeImage('job/images/one.jpg');
    await resizeImage('job/images/two.jpg');
}