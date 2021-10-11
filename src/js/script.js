import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './cards.js';
import { modalOperating } from './modal.js'

tabsInit();
modalOperating();


export const searchInput = document.getElementById('inp');
const serverBtn = document.getElementById('serverButton');
const filmContainer = document.getElementById('filmContainer');
const genreSelection = document.getElementById('genre');
const langSelection = document.getElementById('language');

let genre = genreSelection.value;
let language = langSelection.value;

let films = [];

/**
 * 1.Collect filters
 * 2.get films using search filter
 * 3.filter films by genre and language
 */


//Filters

langSelection.addEventListener('change', () => {
    language = langSelection.value;
    // loadFilms(films, genre, language);
})

genreSelection.addEventListener('change', async () => {
    // films = await getData();
    genre = genreSelection.value;
})

//Search and load

const chooseFilms = (films, genre, language) => {
    const chosen = films.map((item) => (item.show ? item.show : item));

    if (genre === 'All' && language === 'All') {
        return chosen;
    }

    if (genre !== 'All' && language !== 'All') {
        return chosen.filter((film) => film.genres.includes(genre) && film.language === language);
    }

    if (genre === 'All' && language !== 'All') {
        return chosen.filter((film) => film.language === language);
    }

    if (genre !== 'All' && language === 'All') {
        return chosen.filter((film) => film.genres.includes(genre));
    }
}

const loadFilms = async (films, genre, language) => {
    films = await getData();
    const filtered = films.length ? chooseFilms(films,  genre, language) : [];

    if(filtered.length) {
        handleLoad(filtered, filmContainer);
    }
}

serverBtn.addEventListener('click', async () => {
    films = await getData();
    loadFilms(films, genre, language);
});



//Favourite
const favouriteContainer = document.getElementById('favouriteContainer');
// let selected = [];
if (!localStorage.getItem('favoriteInStorage')) localStorage.setItem('favoriteInStorage', JSON.stringify([]));

filmContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('icon-circle-right')) {
        // console.log(event.target.parentElement.getAttribute('data-id'));
        addToFavourite(event.target);
        spawnFavourite(); //Почему последний добавляется через итерацию?
    }
})

const addToFavourite = async (elem) => {
    films = await getData();
    const storageFilms = localStorage.getItem('favoriteInStorage');
    const a = [ ...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
    films.forEach(item => {
        const elemId = +item?.show?.id || +item?.id;
        if (elemId === +elem.parentElement.getAttribute('data-id')) {
            const exist = a.find(item => elemId === item?.id);
            if (!exist)  a.push(item);
        }
    });
    localStorage.setItem('favoriteInStorage', JSON.stringify(a));
    spawnFavourite();
}

// let favoriteInStorage = [];


const spawnFavourite = () => {
    const data = localStorage.getItem('favoriteInStorage');
    handleLoad(data ? JSON.parse(data) : [], favouriteContainer);
}

// const spawnFavourite = () => {
//     let arr = [];
//     for (let i = 0, length = localStorage.length; i < length; i++) {
//         console.log(localStorage.length);
//         let item = localStorage.getItem(localStorage.key(i));
//         console.log('localStorage', localStorage.key(i))
//         arr = [...arr, JSON.parse(item)];
//     }
//     handleLoad(arr, favouriteContainer);
// }


spawnFavourite();
// localStorage.clear();


//Pagination

const pagination = document.getElementById('pagination');
const itemsPerPage = document.getElementById('itemsPerPage')

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    pagination.append(item);
}

const foo = async (arg) => {
    let itemsOnPage  = +itemsPerPage.value || 8;
    let pageNum = +arg.innerText || 1;
    let start = (pageNum - 1) * itemsOnPage;
    let end = start + itemsOnPage;

    films = await getData();
    handleLoad(films.slice(start, end), filmContainer);
}

const renderPaginationItems = () => {
    clearContainer(pagination);

        for(let i = 1; i <= 15; i++) {
        createPaginationItems(i);
        foo(itemsPerPage.value);//разобраться, что передаем!!!
    }
}

renderPaginationItems();
itemsPerPage.addEventListener('change', renderPaginationItems);

pagination.addEventListener('click', (event) => {
    const t = event.target;
    if (t && t.classList.contains('pagination__item')) {
        foo(t)
    }
})

/************************************************************** */
let page = 1;