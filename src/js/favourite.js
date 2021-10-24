import { getData } from './getData.js';
import { handleLoad, clearContainer } from './cards.js';
import { chooseFilmsParams, searchInput, loadFilms } from './script.js';

export const favouriteInit = () => {
    const favouriteContainer = document.getElementById('favouriteContainer');
    const main = document.getElementById('main');

    if (!localStorage.getItem('favoriteInStorage')) {
        localStorage.setItem('favoriteInStorage', JSON.stringify([]));
    };

    main.addEventListener('click', ({ target }) => {
        if (target && target.classList.contains('icon-heart')) {
            const filmId = +target.parentElement.getAttribute('data-id');
            if (!target.classList.contains('icon-active')) {
                addToFavourite(target, filmId);
                spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
                target.classList.add('icon-active');
            } else {
                removeFromFavourite(filmId);
                target.classList.remove('icon-active');
                loadFilms(chooseFilmsParams, searchInput.value);
            }
        }
    });

    const addToFavourite = async (elem, id) => {
        const film = await getData(id);
        const storageFilms = localStorage.getItem('favoriteInStorage');
        let fav = [...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
        const elemId = film?.id;
            if (elemId === +elem.parentElement.getAttribute('data-id')) {
                const exist = fav.find(item => +item === elemId);
                if (!exist)  {
                    fav = [...fav, film.id];
                }
            }
        localStorage.setItem('favoriteInStorage', JSON.stringify(fav));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };

    const removeFromFavourite = (id) => {
        const storageFilms = localStorage.getItem('favoriteInStorage');
        let fav = [...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
        const index = fav.findIndex(item => item === id);
        fav.splice(index, 1);
        localStorage.setItem('favoriteInStorage', JSON.stringify(fav));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };

    const spawnFavourite = async (data) => {
        let arr = [];

        for (const id of data) {
            const film = await getData(id);
            arr = [...arr, film];
        }
        clearContainer(favouriteContainer);
        handleLoad(arr, favouriteContainer);
    };

    spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
}

export function checkFavourite(id, elem) {
    if (localStorage.getItem('favoriteInStorage')) {
        const favourites = JSON.parse(localStorage.getItem('favoriteInStorage'));
        if (favourites.some((el) => el === id)) {
            elem.classList.add('icon-active');
        }
    }
}