import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const URI_AUTH =  process.env.ROUTER_PRINCIPAL + '/auth/'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const navigate = useNavigate(); // Añadir useNavigate para redireccionar después de restablecer la contraseña
    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const verificarToken = async () => {
            try {
                const response = await axios.get(`${URI_AUTH}reset-password/${token}`);
                setTokenValido(true);
                alert(response.data.message);
            } catch (error) {
               alert(error.response.data.message);
            }
        }
        verificarToken();
    }, [token]); // Solo ejecuta el efecto cuando cambia el token

    const updatePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageType('error');
            return;
        }

        try {
            const response = await axios.post(`${URI_AUTH}reset-password/${token}`, {
                newPassword
            });

            setMessage(response.data.message);
            setMessageType('success');

            setNewPassword('');
            setConfirmPassword('');

            // Redirigir al login después de un breve tiempo
            setTimeout(() => {
                navigate('/login'); // Aquí rediriges al login
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
        <div className="auth-container">
            <div className="auth-content">
                <h3 className="bold-highlight">Restablecer Contraseña</h3>
                <form onSubmit={updatePassword}>
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
        </div>
    );
};


export default ResetPassword;