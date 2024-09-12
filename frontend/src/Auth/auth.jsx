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

    // Validar que el nombre y apellido solo contengan letras y espacios
    const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

    // Validar que el correo tenga un formato válido y que pertenezca a un dominio permitido
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|soy\.sena\.edu\.co)$/;
        return regex.test(email);
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            // Validación del nombre y apellido
            if (!validateName(Nom_Usuario) || !validateName(Ape_Usuario)) {
                setMessageType('error');
                setMessage('El nombre y los apellidos solo pueden contener letras y espacios');
                return;
            }

            // Validación del correo electrónico
            if (!validateEmail(Cor_Usuario)) {
                setMessageType('error');
            setMessage('Ingrese un correo válido de los siguientes dominios: @gmail.com, @outlook.com, @hotmail.com, @soy.sena.edu.co');
            setTimeout(() => { setMessage(''); }, 3000); // Ocultar después de 5 segundos
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
                    setMessage('Ese correo que está registrando ya existe registrado en la base de datos');
                    setTimeout(() => { setMessage(''); }, 3000);

                } else {
                    setMessageType('error');
                    setMessage('Ese correo ya existe, intenta con otro.');
                    setTimeout(() => { setMessage(''); }, 3000);
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
                setTimeout(() => { setMessage(''); }, 3000);
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
        setMessage('');  // Ocultar las alertas al cambiar de formulario
        setMessageType('');  // Opcional, restablece el tipo de mensaje si es necesario
    };
    
    return (
        <>
            {/* <BarraNavegacionPublica /> */}
            <br />
            <div className="auth-container">
                <br />
                <div className={`auth-content ${isSignUpActive ? 'sign-up-mode' : ''}`}>
                    <br />
                    <br />
                    <div className="auth-left">
                        <h3 className="bold-highlight">{singnInOrLogIn === 'signIn' ? 'Registrar' : 'Iniciar Sesión'}</h3>
                        {message && (
                            <div 
                            className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}
                            style={{ width: '330px', margin: '15px auto', padding: '0px', textAlign: 'center' }}>
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
                                <p>Regístrate con tus datos personales para usar todas las funcionalidades de esta maravillosa herramienta digital</p>
                                <button className="btn-signup" onClick={() => switchForm('signIn')}>REGÍSTRATE</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;