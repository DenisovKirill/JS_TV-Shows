import { API_URL } from './constants.js';
import { paginationPage } from './script.js'

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);
}

export const getData = async (param) => {
    try {
        if (param !== undefined && typeof param === 'number') {
            const getData = await fetch(`${API_URL}/shows/${param}`);
            return await getData.json();
        } else if (param !== '' && typeof param === 'string') {
            const getData = await fetch(`${API_URL}/search/shows?q=${param}`);
            return await getData.json();
        } else {
            const getData = await fetch(`${API_URL}/shows?page=${paginationPage}`);
            return await getData.json();
        }
    } catch (err) {
        handleError (promise.status);
    }
};