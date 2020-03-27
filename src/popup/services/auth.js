import tokenService from "./token";
import {api, setAuthHeader, removeHeaders} from "../api";

/**
 * authService is responsible for log in and registration
 * @type {{logout(): *, isLoggedIn(): *, login(*=): *, user(): *, token(): *, register(*=): *}}
 */
const authService = {
    // retrieve token from token service
    token() {
        return tokenService.getToken();
    },
    // Checks that a token cookie exists, sets Bearer header
    isLoggedIn() {
        return new Promise((resolve, reject) => {
            // retrieve token from token service
            const token = authService.token();
            if (token !== "") {
                // make a call to setAuthHeader in api and set token
                setAuthHeader(token);
                resolve();
            }
            // couldn't find token return reject
            reject();
        });
    },
    // retrieves the user object from the api
    user() {
        return new Promise((resolve, reject) => {
            api.get('user')
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data.user);
                    }
                }).catch(e => {
                reject(e);
            })
        });
    },
    // logs the user in
    login(loginDetails) {
        return new Promise((resolve, reject) => {
            api.post('login', loginDetails)
                .then(response => {
                    if (response.status === 200) {
                        // set the Bearer header with the token
                        setAuthHeader(response.data.token);
                        // store the token in cookie
                        tokenService.setToken(response.data.token);
                        resolve(response.data);
                    }
                }).catch(e => {
                    // login failed return reject
                reject(e);
            })
        })
    },
    // logs the user out
    logout() {
        return new Promise((resolve, reject) => {
            api.get('logout')
                .then(response => {
                    if (response.status === 200) {
                        // reset the headers on the api instance
                        removeHeaders();
                        // delete the token stored in cookie
                        tokenService.deleteToken();
                        resolve();
                    }
                }).catch(e => {
                reject(e);
            })
        });
    },
    // register the user
    register(registerDetails) {
        return new Promise((resolve, reject) => {
            api.post('register', registerDetails)
                .then(response => {
                    if (response.status === 200) {
                        // similar to login above, set the bearer header with token
                        setAuthHeader(response.data.token);
                        // store the token in cookie
                        tokenService.setToken(response.data.token);
                        resolve(response.data);
                    }
                }).catch(e => {
                reject(e);
            })
        });
    }
};

export default authService;
