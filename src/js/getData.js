import { API_URL } from './constants.js';
import { searchInput } from './script.js'

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);
}

const sendAction = () => { //Переписать валидацию.
    if (searchInput.value.length > 2) {
        //Как блокировать fetch?
        searchInput.style.border = '1px solid grey';
    } else {
        searchInput.style.border = '1px solid red';
    }
}

export const getData = async () => {
    let url;
    if(searchInput.value) {
        url = `${API_URL}/search/shows?q=${searchInput.value}`;
    } else {
        url = `${API_URL}/shows?page=1`;
    }

    const promise = await fetch(url);
    try {
        const data = await promise.json();
        return data.slice(0, 40);
    } catch {
        handleError (promise.status);
    }
}