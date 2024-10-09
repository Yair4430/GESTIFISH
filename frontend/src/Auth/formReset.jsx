import { useState } from 'react';
import axios from 'axios';

const URI = import.meta.env.VITE_ROUTER_PRINCIPAL || 'http://localhost:3001/auth/';

const FormReset = () => {
    const [Cor_Usuario, setCor_Usuario] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendFormResetRequest = async (e) => {
        e.preventDefault();

        if (!isValidEmail(Cor_Usuario)) {
            setMessageType('error');
            setMessage('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        try {
            const response = await axios.post(`${URI}forgot-password`, { Cor_Usuario });

            // Verifica si el correo no está registrado o si hay otro error
            if (response.data.success === false) {
                setMessageType('error');
                setMessage(response.data.message || 'El correo electrónico no está registrado en nuestra base de datos.');
            } else {
                setMessageType('success');
                setMessage('Se ha enviado un correo para restablecer la contraseña.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 8000);
            }
        } catch (error) {
            // Si el error proviene del servidor o no hay conexión
            if (error.response && error.response.data && error.response.data.message) {
                setMessageType('error');
                setMessage(error.response.data.message);
            } else {
                setMessageType('error');
                setMessage('Hubo un error al intentar enviar el correo de restablecimiento.');
            }
        }
    };
    return (
        <>
                <div style={styles.authContainer}>
                <h3 style={styles.authTitle}>Restablecer Contraseña</h3>
                {message &&( 
                <div style={messageType === 'success' ? styles.alertSuccess : styles.alertError}>
                    {message}
                </div>
            )}
            <br />
                <form onSubmit={sendFormResetRequest} style={styles.authForm}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="form-control"
                            style={{ width: '300px' }} // Cambia 300
                            value={Cor_Usuario}
                            onChange={(e) => setCor_Usuario(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary">Enviar</button>
                </form>
            </div>
        </>
    )
}
// Estilos en línea
const styles = {
    authContainer: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centra el contenido horizontalmente
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', // Centra el contenedor tanto horizontal como verticalmente
    },
    authTitle: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    authForm: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
    formGroup: {
      marginBottom: '15px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    formInput: {
      width: '100%',
      maxWidth: '350px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    btnSubmit: {
      width: 'auto',
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#6c757d',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    alertSuccess: {
      color: '#155724',
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      padding: '10px',
      borderRadius: '5px',
      textAlign: 'center',
      marginTop: '0px',
    },
    alertError: {
      color: '#721c24',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      padding: '10px',
      borderRadius: '5px',
      textAlign: 'center',
      marginTop: '15px',
    },
  };

export default FormReset;