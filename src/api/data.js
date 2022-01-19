import {get,post,put,del} from './api.js';

export async function getAllGames(){
    return get('/data/games?sortBy=_createdOn%20desc');
}

export async function getLatestGames(){
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createGame(data){
    return post('/data/games', data);
}

export async function getGameById(id){
    return get(`/data/games/${id}`);
}

export async function deleteGame(id){
    return del(`/data/games/${id}`);
}

export async function editGame(id, data){
    return put(`/data/games/${id}`, data);
}

export async function getComments(gameId){
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function postComment(data){
    return post(`/data/comments`, data);
}