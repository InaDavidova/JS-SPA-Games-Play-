import { createGame } from '../api/data.js';
import { html, render, page } from '../lib.js';


const createPage = () => html`
<section id="create-page" class="auth">
    <form id="create" @submit=${onCreate}>
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
`;

export async function createView() {
    const root = document.querySelector('#main-content');
    render(createPage(), root);
}

async function onCreate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title').trim();
    const category = formData.get('category').trim();
    const maxLevel = formData.get('maxLevel').trim();
    const imageUrl = formData.get('imageUrl').trim();
    const summary = formData.get('summary').trim();

    try {

        if (title && category && maxLevel && imageUrl && summary) {
            await createGame({title, category, maxLevel, imageUrl, summary});
            page.redirect('/home');

        } else {
            throw new Error('All fields are required!');
        }
        
    } catch (err) {
        alert(err.message);
    }

}