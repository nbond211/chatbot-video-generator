import downloadImages from './download-images';
import resizeImages from './resize-images';

export default async function(conversation) {
    await downloadImages();
    await resizeImages(conversation);
}