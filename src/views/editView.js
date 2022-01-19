import { editGame, getGameById } from '../api/data.js';
import { html, render, page } from '../lib.js';


const editPage = (data, onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${data.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${data.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="${data.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${data.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${data.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const root = document.querySelector('#main-content');
    const gameId = ctx.params.id;
    const data = await getGameById(gameId);
    render(editPage(data, onEdit), root);

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const maxLevel = formData.get('maxLevel').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const summary = formData.get('summary').trim();

        try {

            if (title && category && maxLevel && imageUrl && summary) {
                await editGame(gameId, { title, category, maxLevel, imageUrl, summary });
                page.redirect(`/details/${gameId}`);

            } else {
                throw new Error('All fields are required!');
            }

        } catch (err) {
            alert(err.message);
        }
    }
}