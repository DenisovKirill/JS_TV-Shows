import { getData } from './getData.js';
import { createElement, clearContainer } from './cards.js';
import { tabsContent } from './script.js'

export const modalInit = () => {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    const descrLength = 600;

    tabsContent.forEach(item => {
        item.addEventListener('click', async ({ target }) => {
            if (target && target.classList.contains('films__img')) {
                modal.classList.remove('hidden');
                modal.classList.add('visible');
                const id = +target.parentNode.getAttribute('data-id');
                const film = await getData(id);
                buildModal(film);
            }
        });
    });

    const  closeModal = () => {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('visible')){
            closeModal();
        }
    });

    const buildModal = (item) => {
        clearContainer(modalContent);

        const modalTitle = createElement('div', 'modal__title');
        const modalMain = createElement('div', 'modal__main');
        modalContent.append(modalTitle, modalMain);

        const modalImage = createElement('img', 'modal__img');
        const modalInfo = createElement('div', 'modal__info');
        const modalDescr = createElement('div', 'modal__descr');
        const modalGenre  = createElement('div', 'modal__genre');
        const modalPremiere = createElement('div', 'modal__premiere');
        const modalRating  = createElement('div', 'modal__rating');

        modalTitle.innerText = item?.name;
        modalImage.setAttribute('src', item?.image?.medium || '../img/no-img.jpg');
        if (item.summary) {
            modalDescr.innerHTML = `${item?.summary.slice(0, descrLength)}...`;
        } else {
            modalDescr.innerHTML = 'Unknown';
        }

        modalGenre.innerText = `Genres: ${item?.genres.join(', ') || 'Unknown'}`;
        modalPremiere.innerText = `Premiere: ${item?.premiered || 'Unknown'}`;
        modalRating.innerText = `Average rating: ${item?.rating?.average || 'Unknown'}`

        modalMain.append(modalImage, modalInfo);
        modalInfo.append(modalDescr, modalGenre, modalPremiere, modalRating);
    };
};
