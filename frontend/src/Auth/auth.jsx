import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
import './auth.css';

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const Auth = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");
    const [buttonForm, setButtonForm] = useState('Iniciar Sesion');
    const [singnInOrLogIn, setSingnInOrLogIn] = useState('logIn');
    const [resetPass, setResetPass] = useState(false);
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|soy\.sena\.edu\.co)$/;
        return regex.test(email);
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            if (!validateName(Nom_Usuario) || !validateName(Ape_Usuario)) {
                setMessageType('error');
                setMessage('El nombre y los apellidos solo pueden contener letras y espacios');
                return;
            }

            if (!validateEmail(Cor_Usuario)) {
                setMessageType('error');
                setMessage('Por favor ingrese un correo válido de los siguientes dominios: @gmail.com, @outlook.com, @hotmail.com, @soy.sena.edu.co');
                return;
            }

            try {
                const response = await axios.post(URI, { Nom_Usuario, Ape_Usuario, Cor_Usuario, Con_Usuario });

                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    setMessageType('success');
                    setMessage('Cuenta creada con éxito');
                    setNom_Usuario('');
                    setApe_Usuario('');
                    setCor_Usuario('');
                    setCon_Usuario('');
                    setTimeout(() => { setMessage(''); }, 3000);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setMessageType('error');
                    setMessage('Ese correo ya está registrado en la base de datos');
                } else {
                    setMessageType('error');
                    setMessage('Hubo un error, por favor intenta nuevamente');
                }
            }
        } else if (buttonForm === 'Iniciar Sesion') {
            try {
                const response = await axios.post(URI + 'login', { Cor_Usuario, Con_Usuario });
                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    setMessageType('success');
                    setMessage('Inicio de sesión exitoso');
                    window.location.href = process.env.ROUTER_WINDOW + window.location.host;
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Las credenciales son incorrectas. Por favor, intenta nuevamente.');
            }
        }
    };

    const sendResetPasswordRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URI}forgot-password`, { Cor_Usuario });
            setMessageType('success');
            setMessage('Se ha enviado un correo para restablecer la contraseña si el correo está registrado.');
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error.response ? error.response.data : error.message);
            setMessageType('error');
            setMessage('Hubo un error al intentar enviar el correo de restablecimiento.');
        }
    };
    

    const switchForm = (opcion) => {
        setSingnInOrLogIn(opcion);
        setButtonForm(opcion === 'signIn' ? 'Registrar' : 'Iniciar Sesion');
        setIsSignUpActive(opcion === 'signIn');
    };

    return (
        <>
            <div className="auth-container">
                <div className={`auth-content ${isSignUpActive ? 'sign-up-mode' : ''}`}>
                    <div className="auth-left">
                        <h3 className="bold-highlight">{singnInOrLogIn === 'signIn' ? 'Registrar' : 'Iniciar Sesión'}</h3>
                        {message && (
                            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                {message}
                            </div>
                        )}
                        {resetPass === false ? (
                            <>
                                <form onSubmit={sendForm}>
                                    {singnInOrLogIn === 'signIn' && (
                                        <>
                                            <div className="form-group">
                                                <input type="text" placeholder="Nombres completos" value={Nom_Usuario} onChange={(e) => setNom_Usuario(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Apellidos completos" value={Ape_Usuario} onChange={(e) => setApe_Usuario(e.target.value)} required />
                                            </div>
                                        </>
                                    )}
                                    <div className="form-group">
                                        <input type="email" placeholder="example@gmail.com" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" value={Con_Usuario} onChange={(e) => setCon_Usuario(e.target.value)} required />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn-primary">{buttonForm}</button>
                                    </div>
                                </form>
                                {singnInOrLogIn === 'logIn' && (
                                    <div className="text-center mt-3">
                                        <Link to="#" onClick={() => setResetPass(!resetPass)}>¿Olvidaste tu contraseña?</Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <form onSubmit={sendResetPasswordRequest}>
                                    <div className="form-group">
                                        <input type="email" placeholder="Correo electrónico" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} required />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn-primary">Enviar</button>
                                    </div>
                                </form>
                                <div className="text-center mt-3">
                                    <Link to="#" onClick={() => setResetPass(!resetPass)}>Volver</Link>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="auth-right">
                        {singnInOrLogIn === 'signIn' ? (
                            <>
                                <h2>¡Bienvenido de nuevo a GestiFish!</h2>
                                <p>Inicia sesión con tu cuenta para continuar</p>
                                <button className="btn-signup" onClick={() => switchForm('logIn')}>INICIAR SESIÓN</button>
                            </>
                        ) : (
                            <>
                                <h2>¡Hola, Bienvenido a GestiFish!</h2>
                                <p>Regístrate para comenzar</p>
                                <button className="btn-signup" onClick={() => switchForm('signIn')}>REGISTRAR</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
