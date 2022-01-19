import { logout } from './api/api.js';
import {page} from './lib.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';

document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page('/', homeView);
page('/home', homeView);
page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/edit/:id', editView);
page('/details/:id', detailsView);

page.start();
updateNavbar();


async function onLogout(e){
    await logout();
    updateNavbar();
    page.redirect('/home');
}

export function updateNavbar(){
    const userData = getUserData();
    if(userData){
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else{
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}