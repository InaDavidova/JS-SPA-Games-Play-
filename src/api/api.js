import { clearUserData, getUserData, setUserData } from '../util.js';

const baseUrl = 'http://localhost:3030';

async function request(url, options) {
    try {

        const response = await fetch(url, options);

        if (response.status == '204') {
            return response;
        }

        if (response.ok != true) {
            if (response.status == '403') {
                clearUserData();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();

    } catch (err) {
        // alert(err.message);
        throw err;
    }
}

function createOptions(method, data) {
    const options = {
        method: method,
        headers: {}
    }

    if (data != undefined) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    return options;
}

export async function get(url, data) {
    return await request(baseUrl + url, createOptions('get', data));
}

export async function post(url, data) {
    return await request(baseUrl + url, createOptions('post', data));
}

export async function put(url, data) {
    return await request(baseUrl + url, createOptions('put', data));
}

export async function del(url) {
    return await request(baseUrl + url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', { email, password });

    setUserData({
        email: result.email,
        userId: result._id,
        accessToken: result.accessToken
    });

    return result;
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    setUserData({
        email: result.email,
        userId: result._id,
        accessToken: result.accessToken
    });

    return result;
}

export async function logout() {
    await get('/users/logout');
    clearUserData();
}