import fs from 'fs-extra';

export default async function() {
    await fs.remove('job');
    await fs.ensureDir('job');
    await fs.ensureDir('job/audio');
    await fs.ensureDir('job/images');
    await fs.ensureDir('job/images/frames');
}