import {useEffect, useState} from "react";
import Api, {LOGIN_URL, REGISTER_URL} from "../helpers/Api";

const LOCAL_STORAGE_KEY = 'user';

const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const login = async (username, password) => {
        setErrors(null);
        setLoading(true);
        try {
            const response = await Api.post(LOGIN_URL, {
                email: username,
                password: password
            });
            if (response.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
                setUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            setErrors(error.response.data);
        }
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setUser(null);
        setIsAuthenticated(false);
    }

    const register = async ({email, password}) => {
        setErrors(null);
        setLoading(true);
        try {
            const response = await Api.post(REGISTER_URL, {
                email,
                password,
            });
            if (response.status === 200) {
                setRegistrationSuccessful(true);
            }
        } catch (error) {
            setErrors(error.response.data);
        }
        setLoading(false);
    }

    const getCurrentUser = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUser(user);
            setIsAuthenticated(true);
        }
    }, [])

    return {
        user,
        isAuthenticated,
        registrationSuccessful,
        loading,
        errors,
        login,
        logout,
        register
    };
}

export default useAuthProvider;