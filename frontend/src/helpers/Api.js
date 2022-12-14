import axios from "axios";
import {LOCAL_STORAGE_KEY} from "../hooks/useAuthProvider";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const BASE_API_URL = 'http://localhost:8080'
const LOGIN_URL = `${BASE_API_URL}/api/auth/login`;
const REGISTER_URL = `${BASE_API_URL}/api/auth/register`;

const CATEGORIES_URL = `${BASE_API_URL}/api/categories`
const CATEGORY_URL = (id) => `${BASE_API_URL}/api/categories/${id}`

const PRODUCTS_URL = `${BASE_API_URL}/api/products`
const PRODUCT_URL = (id) => `${BASE_API_URL}/api/products/${id}`

axios.interceptors.request.use(
    async config => {
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    error => error
    );

const Api = {
    get: async (url, params) => {
        return await axios.get(`${url}`, params);
    },
    post: async (url, data) => {
        return await axios.post(url, data);
    },
    put: async (url, data) => {
        return await axios.put(url, data);
    },
    delete: async (url) => {
        return await axios.delete(url);
    }
}

export {
    LOGIN_URL,
    REGISTER_URL,
    CATEGORY_URL,
    CATEGORIES_URL,
    PRODUCT_URL,
    PRODUCTS_URL
}
export default Api;