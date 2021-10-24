 export const tabsInit = () => {
    const tabsParent = document.getElementById('tabParent');
    const tabs = document.querySelectorAll('.header__link');
    const tabsContent = document.getElementsByClassName('tabsContent');

    const hideTabsContent = () => {
        for (let item of tabsContent) {
            item.classList.remove('visible', 'fade');
            item.classList.add('hidden');
        };

        tabs.forEach(item => {
            item.classList.remove('header__link_active', 'fade');
        });
    };

    const showTabsContent = (i = 1) => {
        tabsContent[i].classList.remove('hidden');
        tabsContent[i].classList.add('visible', 'fade');
        tabs[i].classList.add('header__link_active', 'fade');
    };

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('header__link')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })
        }
    });
}