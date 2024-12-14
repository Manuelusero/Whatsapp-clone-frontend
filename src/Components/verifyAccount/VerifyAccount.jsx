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
                const response = await fetch(`https://whatsapp-clone-backend-xb6f.onrender.com/api/auth/verify/${token}`, {
                    method: "GET",
                });
                const data = await response.json();

                if (response.ok) {
                    setVerificationState({
                        status: 'success',
                        message: '¡Cuenta verificada exitosamente! Redirigiendo al login...'
                    });

                    setTimeout(() => {
                        navigate("/login");
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
            {loading ? <p>Cargando...</p> : <p>{message}</p>}
        </div>
    );
};

export default VerifyAccount;
