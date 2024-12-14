import React, { useEffect } from 'react'
import Login from '../../Components/login/Login'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const isVerified = localStorage.getItem('isVerified');

        if (isVerified === "true") {

            navigate("/login");
        }
        else {

        }
    }, [navigate]);

    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage
