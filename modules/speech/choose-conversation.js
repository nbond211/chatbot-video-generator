import fs from 'fs-extra';
import pickOne from 'pick-one';

async function chooseConversationFile() {
    const files = await fs.readdir('data');
    return pickOne(files);
}

async function readConversationFile(file) {
    const conversation = await fs.readJson(`data/${file}`);
    return conversation;
}

export default async function() {
    const conversationFile = await chooseConversationFile();
    return await readConversationFile(conversationFile);
}