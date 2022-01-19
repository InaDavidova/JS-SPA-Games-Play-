import { deleteGame, getComments, getGameById, postComment } from '../api/data.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';


const detailsPage = (data, isOwner, onDelete, comments, onSubmit, userData) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${data.imageUrl}" />
            <h1>${data.title}</h1>
            <span class="levels">MaxLevel: ${data.maxLevel}</span>
            <p class="type">${data.category}</p>
        </div>

        <p class="text">${data.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">

            ${comments.length>0
                ? html`
                    <h2>Comments:</h2>
                    <ul>
                        ${comments.map(el=>commentTemplate(el))}
                    </ul>`
                : html`<p class="no-comment">No comments.</p>`}
            
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner 
        ? html`
            <div class="buttons">
                <a href="/edit/${data._id}" class="button">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
            </div>`
        : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${userData && !isOwner
    ?html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onSubmit} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
                </form>
        </article>`
    :null}

</section>
`;

const commentTemplate = (data)=>html`
<li class="comment">
    <p>Content: ${data.comment}</p>
</li>`;

                        
export async function detailsView(ctx) {

    try{

        const root = document.querySelector('#main-content');
        const gameId = ctx.params.id;
        const userData = getUserData();
        const data = await getGameById(gameId);
        const comments = await getComments(gameId);
        const isOwner = userData && userData.userId == data._ownerId ? true : false;

        render(detailsPage(data, isOwner, onDelete, comments,onSubmit, userData), root);
        
        async function onDelete(e){
            
            await deleteGame(gameId);
            page.redirect('/home');
        }

        async function onSubmit(e){
            e.preventDefault();
            const formData = new FormData(e.target);
            const comment = formData.get('comment').trim();

            if(comment){
                await postComment({gameId, comment});
                page.redirect(`/details/${gameId}`);
                e.target.reset();
            }
        }

    }catch(err){
        alert(err.message);
    }
}