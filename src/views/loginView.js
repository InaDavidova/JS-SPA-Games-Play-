import { login } from '../api/api.js';
import { updateNavbar } from '../app.js';
import { html, render, page } from '../lib.js';


const loginPage = () => html`
<section id="login-page" class="auth">
    <form id="login" @submit=${onLogin}>

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export async function loginView() {
    const root = document.querySelector('#main-content');
    render(loginPage(), root);
}

async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {

        if (email && password) {
            await login(email, password);
            updateNavbar();
            page.redirect('/home');
            
        } else {
            throw new Error('All fields are required');
        }

    } catch (err) {
        alert(err.message);
    }
}