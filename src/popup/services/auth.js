import tokenService from "./token";
import {api, setAuthHeader, removeHeaders} from "../api";

const authService = {
    token() {
        return tokenService.getToken();
    },
    isLoggedIn() {
        return new Promise((resolve, reject) => {
            const token = authService.token();
            if (token !== "") {
                setAuthHeader(token);
                resolve();
            }
            reject();
        });
    },
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
    login(loginDetails) {
        return new Promise((resolve, reject) => {
            api.post('login', loginDetails)
                .then(response => {
                    if (response.status === 200) {
                        setAuthHeader(response.data.token);
                        tokenService.setToken(response.data.token);
                        resolve(response.data);
                    }
                }).catch(e => {
                reject(e);
            })
        })
    },
    logout() {
        return new Promise((resolve, reject) => {
            api.get('logout')
                .then(response => {
                    if (response.status === 200) {
                        removeHeaders();
                        tokenService.deleteToken();
                        resolve();
                    }
                }).catch(e => {
                reject(e);
            })
        });
    },
    register(registerDetails) {
        return new Promise((resolve, reject) => {
            api.post('register', registerDetails)
                .then(response => {
                    if (response.status === 200) {
                        setAuthHeader(response.data.token);
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
