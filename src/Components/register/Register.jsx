import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://whatsapp-clone-backend-liiz.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso. Revisa tu correo para verificar tu cuenta ');

            } else {
                setError(data.message || 'Error al registrar el usuario.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al conectar con el servidor.');
        }
    };
    return (
        <div className="register-container">
            <div className="register-form-wrapper">
                <h2>Registro de Usuario</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="register-button" type="submit">Registrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="login-redirect">¿Ya tienes una cuenta?
                    <Link to="/login" className="login-link">
                        <br /> Presione aqui
                    </Link>

                </p>
            </div>
        </div>
    );

};

export default Register;
