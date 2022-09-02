import {useState} from "react";
import Api, {LOGIN_URL, REGISTER_URL} from "../helpers/Api";

const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await Api.post(LOGIN_URL, {
                email: username,
                password: password
            });
            console.log(response);
            if (response.status === 200) {
                setUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            setErrors(error.response.data);
        }
        setLoading(false);
    };

    const register = async ({email, password}) => {
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

    return {
        user,
        isAuthenticated,
        registrationSuccessful,
        loading,
        errors,
        login,
        register
    };
}

export default useAuthProvider;