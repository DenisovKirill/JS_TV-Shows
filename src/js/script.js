import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './cards.js';
import { modalInit } from './modal.js';
import { favouriteInit } from './favourite.js';

export const searchInput = document.getElementById('inp');
export const tabsContent = document.querySelectorAll('.tabsContent');
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


tabsInit();
modalInit();
favouriteInit()

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
};

const loadFilms = async (films, genre, language, number, attr) => {
    films = await getData(attr);
    const filtered = films.length ? chooseFilms(films,  genre, language, number) : [];
    if(filtered.length) {
        handleLoad(filtered, filmContainer);
    }
};

//Filters

langSelection.addEventListener('change', () => {
    language = langSelection.value;
});

genreSelection.addEventListener('change', async () => {
    genre = genreSelection.value;
});

itemsPerPage.addEventListener('change', () => {
    qty = itemsPerPage.value;
    films = getData();
    loadFilms(films, genre, language, qty);
});


const clearFilters = () => {
    genreSelection.value = 'All';
    langSelection.value = 'All';
    itemsPerPage.value = 8;
    qty = 8;
    searchInput.value = '';
    loadFilms(films, genre, language, qty);
};

window.onload = function() {
    clearFilters();
  };

loadFilms(films, genre, language, qty);

serverBtn.addEventListener('click', () => {
    loadFilms(films, genre, language, qty, searchInput.value);
    pagination.style.display = 'none';
});



//Pagination

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    pagination.append(item);
};

const renderPaginationItems = () => {
    clearContainer(pagination);
        for(let i = 1; i <= 15; i++) {
        createPaginationItems(i);
    }
};

renderPaginationItems();
// itemsPerPage.addEventListener('change', renderPaginationItems);


pagination.addEventListener('click', (event) => {
    const t = event.target;
    if (t && t.classList.contains('pagination__item')) {
        page = t.innerText;
        loadFilms(films, genre, language, qty);
    }
});
