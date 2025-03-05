import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://whatsapp-clone-backend-production-ab27.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('token', data.token);
                navigate('/home');

            } else if (response.status === 403) {
                setError("Tu cuenta no está verificada. Revisa tu correo para activarla.");
            } else {
                setError(data.message || 'Error al iniciar sesión.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <h2 className="login-title">Inicio de Sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='label'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='label-password'>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="login-button" type="submit">
                        Iniciar Sesión
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}

                <p className="register-redirect">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="register-link">
                        Regístrate aquí
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
