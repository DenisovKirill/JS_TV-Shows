import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './cards.js';
import { modalInit } from './modal.js';
import { favouriteInit } from './favourite.js';

export const searchInput = document.getElementById('inp');
export const tabsContent = document.querySelectorAll('.tabsContent');
const serverBtn = document.getElementById('serverButton');
const filmContainer = document.getElementById('filmContainer');
const paginationList = document.getElementById('pagination');
const genreSelection = document.getElementById('genre');
const langSelection = document.getElementById('language');
const itemsPerPage = document.getElementById('itemsPerPage');
const backToMain = document.querySelector('.search__return-btn');
const paginationBlock = document.querySelector('.pagination')
const filterHolder = document.querySelector('.filter__holder');
const paginationDrop = document.querySelector('.pagination__drop');
const paginationHolder = document.querySelector('.pagination__holder')
const paginationPrev = document.querySelector('.pagination__prev-btn');
const paginationNext = document.querySelector('.pagination__next-btn');
const paginationCurrent = document.querySelector('.pagination__current');
const paginationMaximum = document.querySelector('.pagination__maximum');

export let paginationPage = 1;
let paginationItemsOnPage = 10;
let initialFilmsOnPage = 12;
let genre = genreSelection.value;
let language = langSelection.value;
let filmsOnPage = itemsPerPage.value;
let films = [];


tabsInit();
modalInit();
favouriteInit();


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
    } else {
        clearContainer(filmContainer);
        const noFilmsMessage = createElement('div', 'no-films-msg');
        noFilmsMessage.innerText = 'No films was found'
        filmContainer.append(noFilmsMessage);
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
    filmsOnPage = itemsPerPage.value;
    films = getData();
    loadFilms(films, genre, language, filmsOnPage);
});


const resetPage = () => {
    genreSelection.value = 'All';
    langSelection.value = 'All';
    genre = 'All';
    language = 'All';
    itemsPerPage.value = initialFilmsOnPage;
    filmsOnPage = initialFilmsOnPage;
    // paginationPage = 1;
    paginationCurrent.innerText = paginationPage;
    searchInput.value = '';
    loadFilms(films, genre, language, filmsOnPage);
};

window.onload = function() {
    resetPage();
  };

// loadFilms(films, genre, language, filmsOnPage); !!!

serverBtn.addEventListener('click', () => {
    loadFilms(films, genre, language, filmsOnPage, searchInput.value);
    paginationBlock.style.display = 'none';
    filterHolder.style.display = 'none';
    backToMain.style.display = 'block';
});

backToMain.addEventListener('click', ()=> {
    resetPage();
    paginationBlock.style.display = 'block';
    filterHolder.style.display = 'flex';
    backToMain.style.display = 'none';
});

//pagination

const createPaginationItems = (number) => {
    const item = createElement('li', 'pagination__item');
    item.innerText = number;
    paginationList.append(item);
};

const renderPaginationItems = () => {
    clearContainer(paginationList);
        for(let i = 1; i <= paginationItemsOnPage; i++) {
        createPaginationItems(i);
    }
};

paginationDrop.addEventListener('click', ()=> {
    paginationHolder.classList.toggle('hidden')
});

renderPaginationItems();
// itemsPerPage.addEventListener('change', renderPaginationItems);

paginationPrev.addEventListener('click', ()=> {
    if (paginationPage > 1) {
        paginationPage -= 1;
        paginationCurrent.innerText = paginationPage;
        loadFilms(films, genre, language, filmsOnPage);
    }
})

paginationNext.addEventListener('click', ()=> {
    if (paginationPage < paginationItemsOnPage) {
        paginationPage += 1;
        paginationCurrent.innerText = paginationPage;
        loadFilms(films, genre, language, filmsOnPage);
    }
})

paginationMaximum.addEventListener('click', ()=> {
    paginationPage = paginationItemsOnPage;
    paginationCurrent.innerText = paginationPage;
    loadFilms(films, genre, language, filmsOnPage);
})

paginationList.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('pagination__item')) {
        paginationPage = +target.innerText;
        paginationCurrent.innerText = paginationPage;
        loadFilms(films, genre, language, filmsOnPage);
    }
});
