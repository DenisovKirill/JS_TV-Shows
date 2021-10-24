import { resetPage } from './script.js';

export const logInit = () => {
    const loginWindow = document.getElementById('login');
    const loginName = document.getElementById('userName');
    const loginPass = document.getElementById('userPass');
    const loginBtn = document.getElementById('loginBtn');
    const userLoggedName = document.getElementById('userLoggedName');
    const logoutBtn = document.getElementById('logoutBtn')

    document.addEventListener("DOMContentLoaded", () => {
        const isUser = localStorage.getItem("userName");
        if (isUser) {
            document.documentElement.style.overflow = 'auto';
            loginWindow.style.display = "none";
            const name = localStorage.getItem("userName");
            userLoggedName.innerText = JSON.parse(name);
            resetPage();
        } else {
            loginWindow.style.display = "block";
        }
    });

    loginBtn.addEventListener("click", () => {
        if (loginName.value.length > 2 && loginPass.value.length > 2) {
            localStorage.setItem("userName", JSON.stringify(loginName.value));
            window.location.reload();
            loginWindow.style.display = "none";
            resetPage();
        } else {
            e.preventDefault();
            loginName.value = "";
            loginPass.value = "";
        }
    });

    logoutBtn.addEventListener('click', () => {
        window.location.reload();
        document.documentElement.style.overflow = 'hidden';
        localStorage.removeItem("userName");
        loginWindow.style.display = "block";
        loginName.value = "";
        loginPass.value = "";
    })
}
