import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Constantes
const URI_AUTH = process.env.ROUTER_PRINCIPAL + '/auth/';

// Componente de restablecimiento de contraseña
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [tokenValido, setTokenValido] = useState(false);

  const navigate = useNavigate();
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
    };
    verificarToken();
  }, [token]);

  const updatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setTimeout(() => { setMessage(''); }, 4000);
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(`${URI_AUTH}reset-password/${token}`, { newPassword });
      setMessage(response.data.message);
      setMessageType('success');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/');
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
    
    <div style={styles.authContainer}>
      <h3 style={styles.authTitle}>Cambiar Contraseña</h3>
      <span>Ingresa la nueva contraseña para actualizarla.</span>
      {message && (
          <div style={messageType === 'success' ? styles.alertSuccess : styles.alertError}>
            {message}
          </div>
        )}
        <br />
      <form onSubmit={updatePassword} style={styles.authForm}>

        <div className="input-group mb-3">
          <input
            type={showNewPassword ? "text" : "password"}
            // style={styles.formInput} 
            className="form-control"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <a 
            className="btn btn-outline-secondary" 
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>}
          </a>
        </div>

        <div className="input-group mb-3">
          <input
            type={showConfirmPassword ? "text" : "password"}
            // style={styles.formInput} 
            className="form-control"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <a 
            className="btn btn-outline-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>}
          </a>
        </div>

        <div style={styles.formGroup}>
          <button type="submit" style={styles.btnSubmit}>Cambiar Contraseña</button>
        </div>
      </form>
    </div>
  );
};

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
    marginTop: '15px',
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

export default ResetPassword;
