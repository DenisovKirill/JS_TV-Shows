import { API_URL } from './constants.js';
import { searchInput, page } from './script.js'

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);
}


export const getData = async () => {
    let url;
    if(searchInput.value) {
        url = `${API_URL}/search/shows?q=${searchInput.value}`;
    } else {
        url = `${API_URL}/shows?page=${page}`;
    }

    const promise = await fetch(url);
    try {
        const data = await promise.json();
        return data.slice(0, 140);
    } catch {
        handleError (promise.status);
    }
}

// else if (attr === 'number') {
//     url = `http://api.tvmaze.com/shows/${param}`
// }