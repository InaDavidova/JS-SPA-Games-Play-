import {getLatestGames } from '../api/data.js';
import { html, render } from '../lib.js';


const homePage = (arr) => html`
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        ${arr.length > 0
            ? arr.map(el => gameCard(el))
            : html`<p class="no-articles">No games yet</p>`}
    </div>

</section>`;

const gameCard = (data) => html`
<div class="game">
    <div class="image-wrap">
        <img src="${data.imageUrl}">
    </div>
    <h3>${data.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${data._id}" class="btn details-btn">Details</a>
    </div>
</div>`;

export async function homeView() {
    const root = document.querySelector('#main-content');
    const data = await getLatestGames();
    if(data.length>3){
        data.splice(3);
    }
    render(homePage(data), root);
}