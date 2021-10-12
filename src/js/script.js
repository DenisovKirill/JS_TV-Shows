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
const itemsPerPage = document.getElementById('itemsPerPage');
const pagination = document.getElementById('pagination');

export let page = 1;
let genre = genreSelection.value;
let language = langSelection.value;
let qty = itemsPerPage.value;
let films = [];


//Search and load

const chooseFilms = (films, genre, language, number) => {
    const chosen = films.map((item) => (item.show ? item.show : item));

    if (genre === 'All' && language === 'All') {
        return chosen.slice(0, number);
    }

    if (genre !== 'All' && language !== 'All') {
        return chosen.filter((film) => film.genres.includes(genre) && film.language === language).slice(0, number);
    }

    if (genre === 'All' && language !== 'All') {
        return chosen.filter((film) => film.language === language).slice(0, number);
    }

    if (genre !== 'All' && language === 'All') {
        return chosen.filter((film) => film.genres.includes(genre)).slice(0, number);
    }
}

const loadFilms = async (films, genre, language, number) => {
    films = await getData();
    const filtered = films.length ? chooseFilms(films,  genre, language, number) : [];
    if(filtered.length) {
        handleLoad(filtered, filmContainer);
    }
}

const initialLoad = async () => {
    films = await getData();
    loadFilms(films, genre, language, qty);
}


//Filters

langSelection.addEventListener('change', () => {
    language = langSelection.value;
})

genreSelection.addEventListener('change', async () => {
    genre = genreSelection.value;
})

itemsPerPage.addEventListener('change', () => {
    qty = itemsPerPage.value;
    films = getData();
    initialLoad();
})


const clearFilters = () => {
    genreSelection.value = 'All';
    langSelection.value = 'All';
    itemsPerPage.value = 8;
    qty = 8;
    searchInput.value = '';
    initialLoad();
}

window.onload = function() {
    clearFilters();
  };

initialLoad();

serverBtn.addEventListener('click', () => {
    initialLoad();
    pagination.style.display = 'none';
});


//Favourite
const favouriteContainer = document.getElementById('favouriteContainer');
if (!localStorage.getItem('favoriteInStorage')) localStorage.setItem('favoriteInStorage', JSON.stringify([]));

filmContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('icon-circle-right')) {
        // console.log(event.target.parentElement.getAttribute('data-id'));
        addToFavourite(event.target);
        spawnFavourite();
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


const spawnFavourite = () => {
    const data = localStorage.getItem('favoriteInStorage');
    handleLoad(data ? JSON.parse(data) : [], favouriteContainer);
}

spawnFavourite();
// localStorage.clear();


//Pagination

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    pagination.append(item);
}

const renderPaginationItems = () => {
    clearContainer(pagination);
        for(let i = 1; i <= 15; i++) {
        createPaginationItems(i);
    }
}

renderPaginationItems();
// itemsPerPage.addEventListener('change', renderPaginationItems);


pagination.addEventListener('click', (event) => {
    const t = event.target;
    if (t && t.classList.contains('pagination__item')) {
        page = t.innerText;
        initialLoad();
    }
})
