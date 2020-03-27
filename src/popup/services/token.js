import Cookie from "json-cookie";

const TOKEN_KEY = 'token';

/**
 * tokenService is a wrapper around json-cookie for accessing and setting the auth token
 * @type {{setToken(*=): void, getToken(): *, deleteToken(): void}}
 */
const tokenService = {
    // returns token from cookie
    getToken() {
        return Cookie.get(TOKEN_KEY);
    },
    // store the token in cookie (login, register)
    setToken(token) {
        Cookie.set(TOKEN_KEY, token);
    },
    // delete the token cookie (logout)
    deleteToken() {
        Cookie.delete(TOKEN_KEY);
    }
};

export default tokenService;
