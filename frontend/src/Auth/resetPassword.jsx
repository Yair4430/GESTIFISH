import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = `${process.env.ROUTER_PRINCIPAL}/resetPassword/`; // Asegúrate de que la URI esté correcta

const ResetPassword = () => {
    const [userId, setUserId] = useState(''); // Estado para el ID del usuario
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const navigate = useNavigate();

    // Obtiene el token de la URL
    const tokenForPassword = new URLSearchParams(window.location.search).get('llave');

    // Función para manejar la actualización de la contraseña
    const updatePassword = async (e) => {
        e.preventDefault();

        // Verificar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageType('error');
            return;
        }

        try {
            const response = await axios.post(URI, { id: userId, newPassword });

            setMessage(response.data.message);
            setMessageType('success');
            setUserId('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                navigate('/auth');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
                setMessageType('error');
            } else {
                setMessage('Ocurrió un error al intentar restablecer la contraseña.');
                setMessageType('error');
            }
        }
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth-content">
                    <div className="auth-left">
                        <h3 className="bold-highlight">Restablecer Contraseña</h3>
                        <form onSubmit={updatePassword}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="ID del Usuario"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Nueva Contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Confirmar Contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn-primary">Restablecer Contraseña</button>
                            </div>
                            {message && (
                                <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="auth-right">
                        <h2>¡Bienvenido de nuevo a GestiFish!</h2>
                        <p>Inicia sesión con tu cuenta para continuar</p>
                        <button className="btn-signup" onClick={() => navigate('/auth')}>INICIAR SESIÓN</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;