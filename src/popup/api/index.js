import axios from "axios";
import router from "../router";

let baseUrl,
    env = process.env.NODE_ENV;

if (env === 'development') {
    baseUrl = 'http://lyst.loc/api/v1/';
} else if (env === 'production') {
    baseUrl = 'http://joinlyst.com/api/v1/';
}

const UNAUTHORISED = 401;

// create an instance of axios
export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// intercept 401s (unauthorised) and redirect to login
api.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === UNAUTHORISED) {
            router.push('/login').catch(err => {
            })
        }
        return Promise.reject(error);
    }
);

// sets the Authorization Bearer header with token
export const setAuthHeader = function (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// reset the headers, removing Bearer token (logout)
export const removeHeaders = function () {
    api.defaults.headers.common = {};
};
