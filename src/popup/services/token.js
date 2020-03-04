import Cookie from "json-cookie";

const TOKEN_KEY = 'token';

const tokenService = {
    getToken() {
        return Cookie.get(TOKEN_KEY);
    },
    setToken(token) {
        Cookie.set(TOKEN_KEY, token);
    },
    deleteToken() {
        Cookie.delete(TOKEN_KEY);
    }
};

export default tokenService;