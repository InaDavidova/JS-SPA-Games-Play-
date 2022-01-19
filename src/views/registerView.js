import { register } from '../api/api.js';
import { updateNavbar } from '../app.js';
import { html, render, page } from '../lib.js';


const registerPage = () => html`
<section id="register-page" class="content auth">
    <form id="register" @submit=${onRegister}>
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export async function registerView() {
    const root = document.querySelector('#main-content');
    render(registerPage(), root);
}

async function onRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('confirm-password').trim();

    try {

        if (email && password && rePass) {

            if (password != rePass) {
                throw new Error('Passwords don\'t match!');
            }

            await register(email, password);
            updateNavbar();
            page.redirect('/home');

        } else {
            throw new Error('All fields are required!')
        }

    } catch (err) {
        alert(err.message);
    }
}