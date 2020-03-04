import axios from "axios";
import router from "../router";
import {BASE_URL} from "../config";

const UNAUTHORISED = 401;

// create an instance of axios
export const api = axios.create({
    baseURL: BASE_URL,
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
