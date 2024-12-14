// src/hooks/useLogin.js
import { useState } from 'react';
import { loginUser } from '../auth/authService';
import { useNavigate } from 'react-router-dom';


const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(email, password);
            console.log('Login exitoso:', result);

            if (result.token) {
                localStorage.setItem('token', result.token);
                navigate('/home');
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    };
};

export default useLogin;
