import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
import BarraNavegacionPublica from "../home/barraNavegacionPublica";
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

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            if (!validateName(Nom_Usuario) || !validateName(Ape_Usuario)) {
                setMessageType('error');
                setMessage('El nombre y los apellidos solo pueden contener letras y espacios');
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
                setMessageType('error');
                setMessage('Hubo un error, por favor intenta nuevamente');
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

    const switchForm = (opcion) => {
        setSingnInOrLogIn(opcion);
        setButtonForm(opcion === 'signIn' ? 'Registrar' : 'Iniciar Sesion');
        setIsSignUpActive(opcion === 'signIn');
    };

    return (
        <>
            <BarraNavegacionPublica />
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
                                <div className="text-center mt-3">
                                    <Link to="#" onClick={() => setResetPass(!resetPass)}>¿Olvidaste tu contraseña?</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <form>
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
                                <h2>¡Bienvenido de nuevo a Gestifish!</h2>
                                <p>Inicia sesión con tu cuenta para continuar</p>
                                <button className="btn-signup" onClick={() => switchForm('logIn')}>INICIAR SESIÓN</button>
                            </>
                        ) : (
                            <>
                                <h2>¡Hola, Bienvenido a GestiFish !</h2>
                                <p>Regístrate con tus datos personales para usar todas las funcionalidades de esta maravillosa herramienta digital</p>
                                <button className="btn-signup" onClick={() => switchForm('signIn')}>REGÍSTRATE</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="auth-right">
                    <h2>Hello, Friend!</h2>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="btn-signup" onClick={() => { switchForm('signIn'); setButtonForm('Registrar') }}>SIGN UP</button>
                </div>
            </div>
        </>
    );
}

export default Auth;
