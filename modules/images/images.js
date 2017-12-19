import downloadImages from './download-images';
import resizeImages from './resize-images';

export default async function() {
    await downloadImages();
    await resizeImages();
}