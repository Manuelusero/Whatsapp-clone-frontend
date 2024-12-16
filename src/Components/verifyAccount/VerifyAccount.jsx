import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
                const response = await fetch(`https://whatsapp-clone-backend-1-k6zk.onrender.com/api/auth/verify/${token}`, {
                    method: "GET",
                    credentials: 'include',
                });
                const data = await response.json();

                if (response.ok) {

                    setVerificationState({
                        status: 'success',
                        message: '¡Cuenta verificada exitosamente! Redirigiendo al login...'

                    })
                    setVerificationState({
                        status: 'success',
                        message: '¡Cuenta verificada exitosamente! Redirigiendo al login...'
                    });
                    navigate('/login');
                    setTimeout(() => {
                    }, 3000);

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
                <p>Cargando...</p>
            ) : (
                <div>
                    <p>{verificationState.message}</p>
                    {verificationState.status === "error" && (
                        <button onClick={() => navigate("/login")}>Ir al Login</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VerifyAccount;
