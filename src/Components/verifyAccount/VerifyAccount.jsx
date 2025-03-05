import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VerifyAccount.css";

const VerifyAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [verificationState, setVerificationState] = useState({
        status: 'verifying',
        message: '',
    });

    useEffect(() => {
        const verifyUser = async () => {

            if (!token) {
                setVerificationState({
                    status: 'error',
                    message: 'Token inválido o no presente'
                });
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify/${token}`, {
                    method: "GET",
                    credentials: 'include',
                });
                const data = await response.json();
                setLoading(false);
                if (response.ok) {

                    setVerificationState({
                        status: 'success',
                        message: '¡Cuenta verificada exitosamente! Redirigiendo al login...'

                    })
                    setVerificationState({
                        status: 'success',
                        message: '¡Cuenta verificada exitosamente! Redirigiendo al login...'
                    });
                    await new Promise(resolve => setTimeout(resolve, 250));
                    navigate('/');


                } else {
                    setVerificationState({
                        status: 'error',
                        message: data.message || 'Error al verificar la cuenta'
                    });
                }
            } catch (error) {
                setVerificationState({
                    status: 'error',
                    message: 'Hubo un error al conectar con el servidor'
                });

            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [token, navigate]);

    return (
        <div>
            <h2>Verificación de cuenta</h2>
            {loading ? (
                <p className="message">Cargando...</p>
            ) : (
                <div>
                    <p className="message">{verificationState.message}</p>
                    {verificationState.status === "success" && (
                        <button onClick={() => navigate("/")}>Ir al Login</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyAccount;
