import pickOne from 'pick-one';

const voices = [
    'af',
    'da',
    'de',
    'en',
    'es',
    'fr',
    'it',
    'pl',
    'pt',
    'ro',
    'sk',
    'id',
    'ja',
    'th',
    'ko',
    'hi'
];

export default function() {
    const one = pickOne(voices);
    const newVoices =  voices.filter(e => e !== one);
    const two = pickOne(newVoices);

    return {one, two};
}

