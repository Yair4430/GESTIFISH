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

    const effectRan = useRef(false)
    

    const params = useParams()
    const { token } = params
    console.log(token);
    
    useEffect(() => {
        if (effectRan.current) {
            return
        }
        effectRan.current = true
        const verificarToken = async () => {
            try {
                const response = await axios.get(`${URI_AUTH}reset-password/${token}`)
                setTokenValido(true)
                alert(response.data.message) //Alertaaaaaaaaaaaaaaaaaaaaaaa
            } catch (error) {
               alert(error.response.data.message) //Alertaaaaaaaaaaaaaaaaaaaaaaa
            }
        }
        verificarToken()
    } )

    // Función para manejar la actualización de la contraseña
    const updatePassword = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            setMessageType('error');
            return;
        }

        try {
            console.log(`${URI_AUTH}reset-password`);

            // Enviar la solicitud POST para actualizar la contraseña
            const response = await axios.post(`${URI_AUTH}reset-password/${token}`, {
                newPassword
            });

            // Mensaje de éxito
            setMessage(response.data.message);
            setMessageType('success');

            // Reiniciar los campos
            setNewPassword('');
            setConfirmPassword('');

            // Redirigir a la página de inicio de sesión después de un breve tiempo
            // setTimeout(() => {
            //     navigate('/auth');
            // }, 2000);

        } catch (error) {
            console.error('Error:', error);
            // Mostrar el mensaje de error apropiado
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