import chooseConversation from './modules/speech/choose-conversation';

export default async function() {
    const conversation = await chooseConversation();

    console.log(conversation);
}