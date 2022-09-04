import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Container} from 'react-bootstrap';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import FormInput from "../components/form/FormInput";
import VerticalForm from "../components/form/VerticalForm";

import useAuth from '../hooks/useAuth';

import './auth.css';

const schemaResolver = yupResolver(
    yup.object().shape({
        email: yup.string().required('Please enter Email').email('Please enter Email'),
        password: yup.string().required('Please enter Password')
    })
);

function Login() {
    const {login, isAuthenticated, loading, errors} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        await login(formData);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Container className='container-auth'>
                <h4 className="mt-0">'Sign In'</h4>
                <p className="text-muted mb-4">
                    Default User:
                </p>
                <p>
                    Email: frodo@mail.com
                </p>
                <p>
                    Password: 123qwe
                </p>

                {errors && (
                    <Alert variant="danger" className="my-2">
                        {errors.message}
                    </Alert>
                )}

                <VerticalForm
                    formClass='mt-4'
                    onSubmit={handleSubmit}
                    resolver={schemaResolver}
                >
                    <FormInput
                        type="email"
                        name="email"
                        label={'Email address'}
                        placeholder={'Email address'}
                        containerClass={'mb-2'}
                    />
                    <FormInput
                        label={'Password'}
                        type="password"
                        name="password"
                        placeholder={'Enter your password'}
                        containerClass={'mb-2'}
                    />
                    <FormInput label="Remember me" type="checkbox" name="checkbox" containerClass={'mb-3'}/>

                    <div className="d-grid text-center">
                        <Button type="submit" disabled={loading}>
                            {'Log In'}
                        </Button>
                    </div>
                </VerticalForm>
            </Container>
        </>
    );
}

export default Login;