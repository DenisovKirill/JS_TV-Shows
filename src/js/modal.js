//Modal
import { getData } from './getData.js';
import { createElement, clearContainer } from './cards.js'

export const modalInit = () => {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');

    filmContainer.addEventListener('click', async (event) => {
        const target = event.target
        if (target && target.classList.contains('films__img')) {
            modal.classList.remove('hidden');
            modal.classList.add('visible');
            const id = +target.parentNode.getAttribute('data-id');
            const film = await getData(id);
            setModal(film);
        }
    })

    modalClose.addEventListener('click', () => {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    })

    const buildModal = () => {
        const modalContent = document.getElementById('modalContent');
        clearContainer(modalContent);
        const modalHeader = createElement('div');
        const modalMain = createElement('div', 'modal__main');
    }

    const cutString = (str) => {
        if(str.length > 600) {
            return str.slice(0, 600) + '...'
        } else {
            return str
        }
    }

    const setModal = (item) => {
        const modalContent = document.getElementById('modalContent');
        clearContainer(modalContent);
        const modalHeader = createElement('div');
        const modalMain = createElement('div', 'modal__main');
        modalContent.append(modalHeader);
        modalContent.append(modalMain);

        const modalTitle = createElement('div', 'modal__title');
        const modalImage = createElement('img', 'modal__img');
        const modalDescr = createElement('div', 'modal__descr');

        modalTitle.innerText = item?.name;
        modalImage.setAttribute('src', item?.image?.medium);
        modalDescr.innerHTML = cutString(item?.summary);

        modalHeader.append(modalTitle);
        modalMain.append(modalImage);
        modalMain.append(modalDescr);
    }
}
