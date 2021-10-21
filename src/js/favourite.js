import { getData } from './getData.js';
import { handleLoad, clearContainer } from './cards.js';

export const favouriteInit = () => {
    const favouriteContainer = document.getElementById('favouriteContainer');

    if (!localStorage.getItem('favoriteInStorage')) {
        localStorage.setItem('favoriteInStorage', JSON.stringify([]));
    };

    filmContainer.addEventListener('click', ({ target }) => {
        if (target && target.classList.contains('icon-heart')) {
            const filmId = +target.parentElement.getAttribute('data-id');
            console.log(filmId);
            addToFavourite(target, filmId);
            spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
            target.classList.add('icon-active')
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
                    fav = [...fav, film.id]
                }
            }

        localStorage.setItem('favoriteInStorage', JSON.stringify(fav));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };

    const removeFromFavourite = (id) => {
        const storageFilms = localStorage.getItem('favoriteInStorage');
        // let fav = [...JSON.parse(storageFilms)];
        let fav = [...JSON.parse(storageFilms ?  storageFilms : JSON.stringify([]))];
        const index = fav.findIndex(item => item === id);
        console.log('index: ', index)
        fav.splice(index, 1);
        console.log('fav: ', fav)
        localStorage.setItem('favoriteInStorage', JSON.stringify(fav));
        spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
    };

    favouriteContainer.addEventListener('click', ({ target }) => {
        if (target && target.classList.contains('icon-heart')) {
            const filmId = +target.parentElement.getAttribute('data-id');
            removeFromFavourite(filmId);
            // addToFavourite(target, filmId);
            spawnFavourite(JSON.parse(localStorage.getItem('favoriteInStorage')));
            target.classList.remove('icon-active')
        }
    });

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
    // localStorage.clear();
}

export function checkFavourite(id, elem) {
    if (localStorage.getItem('favoriteInStorage')) {
        const favourites = JSON.parse(localStorage.getItem('favoriteInStorage'));
        favourites.forEach(item => {
        })
        if (favourites.some((el) => el === id)) {
            elem.classList.add('icon-active');
        }
    }
}