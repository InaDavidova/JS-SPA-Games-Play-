import { getAllGames } from '../api/data.js';
import { html, render } from '../lib.js';


const catalogPage = (arr) => html`
<section id="catalog-page">
    <h1>All Games</h1>

    ${arr.length > 0
            ? arr.map(el => gameCard(el))
            : html`<h3 class="no-articles">No articles yet</h3>`}

</section>`;

const gameCard = (data) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${data.imageUrl}">
        <h6>${data.category}</h6>
        <h2>${data.title}</h2>
        <a href="/details/${data._id}" class="details-button">Details</a>
    </div>

</div>`;

export async function catalogView() {
    const root = document.querySelector('#main-content');
    const data = await getAllGames();
    render(catalogPage(data), root);
}