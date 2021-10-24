import { logInit } from './login.js';
import { getData } from './getData.js';
import { tabsInit } from './tabs.js';
import { createElement, handleLoad, clearContainer } from './cards.js';
import { modalInit } from './modal.js';
import { favouriteInit } from './favourite.js';
import { initPagination } from './pagination.js';

export const searchInput = document.getElementById('inp');
export const tabsContent = document.querySelectorAll('.tabsContent');
export const filmContainer = document.getElementById('filmContainer');
export const paginationCurrent = document.querySelector('.pagination__current');
const serverBtn = document.getElementById('serverButton');
const genreSelection = document.getElementById('genre');
const langSelection = document.getElementById('language');
const itemsPerPage = document.getElementById('itemsPerPage');
const filterHolder = document.querySelector('.filter__holder');
const backToMain = document.querySelector('.search__return-btn');
const paginationBlock = document.querySelector('.pagination');

let paginationPage = 1;
let genre = genreSelection.value;
let language = langSelection.value;
let filmsOnPage = itemsPerPage.value;
let films = [];

initPagination();
logInit();
tabsInit();
modalInit();
favouriteInit();

//Search and load

export const chooseFilmsParams = {
    films: films,
    genre: genre,
    language: language,
    number: filmsOnPage
};

const chooseFilms = (args) => {
    const chosen = args.films.map((item) => (item.show ? item.show : item));
    if (args.genre === 'All' && args.language === 'All') {
        return chosen.slice(0, args.number);
    }

    if (args.genre !== 'All' && args.language !== 'All') {
        return chosen.filter((film) => film.genres.includes(args.genre) && film.language === args.language)
        .slice(0, args.number);
    }

    if (args.genre === 'All' && args.language !== 'All') {
        return chosen.filter((film) => film.language === args.language)
        .slice(0, args.number);
    }

    if (args.genre !== 'All' && args.language === 'All') {
        return chosen.filter((film) => film.genres.includes(args.genre))
        .slice(0, args.number);
    }
};

export const loadFilms = async (args, attr) => {
    args.films = await getData(attr);
    // const filtered = args.films.length ? chooseFilms(args) : [];
    let filtered;
    if (args.films.length) {
        filtered = chooseFilms(args)
    } else {
        filtered = []};

    if (filtered.length) {
        handleLoad(filtered, filmContainer);
    } else {
        clearContainer(filmContainer);
        const noFilmsMessage = createElement('div', 'no-films-msg');
        noFilmsMessage.innerText = 'No films were found'
        filmContainer.append(noFilmsMessage);
    }
};


serverBtn.addEventListener('click', () => {
    loadFilms(chooseFilmsParams, searchInput.value);
    changeOnSearch();
    filterHolder.style.display = 'none';
});

//Filters

const changeOnSearch = () => {
    paginationBlock.style.display = 'none';
    backToMain.style.display = 'block';
}

langSelection.addEventListener('change', () => {
    chooseFilmsParams.language = langSelection.value;
    loadFilms(chooseFilmsParams, searchInput.value);
    changeOnSearch();
});

genreSelection.addEventListener('change', async () => {
    chooseFilmsParams.genre = genreSelection.value;
    loadFilms(chooseFilmsParams, searchInput.value);
    changeOnSearch();
});

itemsPerPage.addEventListener('change', () => {
    chooseFilmsParams.number = itemsPerPage.value;
    loadFilms(chooseFilmsParams, searchInput.value);
});

export const resetPage = () => {
    genreSelection.value = 'All';
    langSelection.value = 'All';
    chooseFilmsParams.genre = 'All';
    chooseFilmsParams.language = 'All';
    paginationCurrent.innerText = paginationPage;
    searchInput.value = '';
    loadFilms(chooseFilmsParams);
};

backToMain.addEventListener('click', ()=> {
    resetPage();
    itemsPerPage.style.display = 'block';
    paginationBlock.style.display = 'block';
    filterHolder.style.display = 'flex';
    backToMain.style.display = 'none';
});
