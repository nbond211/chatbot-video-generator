import rp from 'request-promise';
import download from 'image-downloader';
import pickOne from 'pick-one';

const queries = [
    'afraid',
    'angry',
    'calm',
    'cheerful',
    'crabby',
    'crazy',
    'cross',
    'excited',
    'frigid',
    'furious',
    'glad',
    'glum',
    'happy',
    'icy',
    'jolly',
    'jovial',
    'kind',
    'livid',
    'mad',
    'ornery',
    'rosy',
    'sad',
    'scared',
    'shy',
    'sunny',
    'tense',
    'tranquil',
    'upbeat',
    'wary',
    'weary',
    'worried'
];

async function getImageUrl(query) {
    const options = {
        uri: 'https://api.shutterstock.com/v2/images/search',
        qs: {
            category: '13',
            'people_number': '1',
            query
        },
        auth: {
            'user': 'f7f79-a040a-e9209-4fbdf-7622b-9dd8b',
            'pass': '8514f-689c0-096f5-3fde6-89944-2928c'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    const result = await rp(options);
    const item = pickOne(result.data);
    return item.assets.preview.url;
}

export default async function() {
    const imageOneUrl = await getImageUrl(pickOne(queries));
    const imageTwoUrl = await getImageUrl(pickOne(queries));

    await download.image({url: imageOneUrl, dest: 'job/images/one.jpg'});
    await download.image({url: imageTwoUrl, dest: 'job/images/two.jpg'});
}