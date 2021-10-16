import { API_URL } from './constants.js';
import { searchInput, page } from './script.js'

const handleError = ({ status }) => {
    console.log('Ошибка соединения ', status);
}

// export const getData = async (attr) => {
//     let url;
//     if (typeof attr === 'number') {
//         url = `http://${API_URL}/shows/${attr}`;
//     } else if (typeof attr === 'string') {
//         url = `http://${API_URL}.com/search/shows?q=${attr}`
//     } else {
//         url = `http://${API_URL}.com/shows?page=${page}`
//     }

//     const promise = await fetch(url);
//     try {
//         const data = await promise.json();
//         return data.slice(0, 140);
//     } catch {
//         handleError (promise.status);
//     }
// }

// export const getData = async () => {
//     let url;
//     if(searchInput.value) {
//         url = `${API_URL}/search/shows?q=${searchInput.value}`;
//     } else {
//         url = `${API_URL}/shows?page=${page}`;
//     }

//     const promise = await fetch(url);
//     try {
//         const data = await promise.json();
//         return data.slice(0, 140);
//     } catch {
//         handleError (promise.status);
//     }
// }

// else if (attr === 'number') {
//     url = `http://api.tvmaze.com/shows/${param}`
// }

export const getData = async (param) => {
    try {
        if (param !== undefined && typeof param === 'number') {
            const getData = await fetch(`http://api.tvmaze.com/shows/${param}`);
            return await getData.json();
        } else if (param !== '' && typeof param === 'string') {
            const getData = await fetch(`http://api.tvmaze.com/search/shows?q=${param}`);
            return await getData.json();
        } else {
            const getData = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
            return await getData.json();
        }
    } catch (err) {
        handleError (promise.status);
    }
};