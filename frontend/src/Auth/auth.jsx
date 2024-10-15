import axios from "axios";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './auth.css';

const URI = import.meta.env.VITE_ROUTER_PRINCIPAL || 'http://localhost:3001/auth/';

const Auth = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");
    const [buttonForm, setButtonForm] = useState('Iniciar Sesion');
    const [showPassword, setShowPassword] = useState(false);
    const [singnInOrLogIn, setSingnInOrLogIn] = useState('logIn');
    const [resetPass, setResetPass] = useState(false);
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    // const navigate = useNavigate();

    // Validar que el nombre y apellido solo contengan letras y espacios
    const validateName = (name) => {
        // Verificar que el nombre contenga solo letras y espacios, y que no haya más de un espacio consecutivo
        const regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        if (!regex.test(name)) {
            return false;
        }
        // Verificar que no haya más de un espacio consecutivo
        if (/\s{2,}/.test(name)) {
            return false;
        }
        return true;
    };

    // Validar que el correo tenga un formato válido y que pertenezca a un dominio permitido
    const validateEmail = (email) => {
        // Verificar que la parte local (antes del @) comience con letra o número y que solo tenga caracteres válidos
        const localPartRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*$/;
        const domainRegex = /@(gmail\.com|outlook\.com|hotmail\.com|soy\.sena\.edu\.co)$/;

        if (!localPartRegex.test(email.split('@')[0])) {
            setMessageType('error');
            setMessage('La parte local del correo (antes del @) debe comenzar con una letra o número y solo puede contener letras, números, puntos, guiones y subrayados.');
            return false;
        }

        if (!domainRegex.test(email)) {
            setMessageType('error');
            setMessage('El correo debe pertenecer a uno de los siguientes dominios: @gmail.com, @outlook.com, @hotmail.com, @soy.sena.edu.co');
            return false;
        }
        return true;
    };
    // Validar que la contraseña tenga al menos 8 caracteres y contenga al menos un carácter especial
    const validatePassword = (password) => {
        const regex = /^(?=.*[.!@#$%^&])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
        if (!regex.test(password)) {
            setMessageType('error');
            setMessage('La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial.');
            return false;
        }
        return true;
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            // Validación del nombre
            if (!validateName(Nom_Usuario)) {
                setMessageType('error');
                setMessage('El nombre solo puede contener letras y no más de un espacio entre palabras.');
                setTimeout(() => { setMessage(''); }, 4000);
                return;
            }

            // Validación del apellido
            if (!validateName(Ape_Usuario)) {
                setMessageType('error');
                setMessage('El apellido solo puede contener letras y no más de un espacio entre palabras.');
                setTimeout(() => { setMessage(''); }, 5000);
                return;
            }

            // Validación del correo electrónico
            if (!validateEmail(Cor_Usuario)) {
                setTimeout(() => { setMessage(''); }, 5000);
                return;
            }
            // Validar la contraseña
            if (!validatePassword(Con_Usuario)) {
                setTimeout(() => { setMessage(''); }, 5000);
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
                    setTimeout(() => { setMessage(''); }, 5000);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setMessageType('error');
                    setMessage('Ese correo que está registrando ya existe registrado en la base de datos');
                    setTimeout(() => { setMessage(''); }, 5000);

                } else {
                    setMessageType('error');
                    setMessage('Ese correo ya existe, intenta con otro.');
                    setTimeout(() => { setMessage(''); }, 5000);
                }
            }
        } else if (buttonForm === 'Iniciar Sesion') {
            try {
                const response = await axios.post(URI + 'login', { Cor_Usuario, Con_Usuario });
                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    setMessageType('success');
                    setMessage('Inicio de sesión exitoso');
                    // window.location.href = process.env.ROUTER_WINDOW + window.location.host;
                    window.location.href = import.meta.env.VITE_ROUTER_WINDOW + '/Dashboard';

                    // navigate('/ruta-protegida');
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Las credenciales son incorrectas. Por favor, intenta nuevamente.');
                setTimeout(() => { setMessage(''); }, 5000);
            }
        }
    };

    const sendResetPasswordRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URI}forgot-password`, { Cor_Usuario });
            setMessageType('success');
            setMessage('Se ha enviado un correo para restablecer la contraseña si el correo está registrado.');
            console.log(response);

            // Redirigir a la página principal después de enviar el correo
            setTimeout(() => {
                window.location.href = '/';
            }, 3000); // Espera 3 segundos antes de redirigir

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
        setMessage('');
        setMessageType('');
    };

    return (
        <>
            {/* <BarraNavegacionPublica /> */}
            <br />
            <div className="auth-container">
                <br />
                <div className={`auth-content ${isSignUpActive ? 'sign-up-mode' : ''} ${resetPass ? 'no-box' : ''}`}>
                    <br />
                    <br />
                    <div className="auth-left">
                        <h3 className="bold-highlight">{resetPass ? 'Restablecer Contraseña' : (singnInOrLogIn === 'signIn' ? 'Registrar' : 'Iniciar Sesión')}</h3>
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
                                    <div className="input-group mb-3">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Password"
                                            value={Con_Usuario}
                                            onChange={(e) => setCon_Usuario(e.target.value)}
                                            required
                                        />
                                        <a
                                            type=""
                                            className="btn btn-outline-secondary"
                                            id="button-addon2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>}
                                        </a>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn-primary">{buttonForm}</button>
                                    </div>
                                </form>
                                {singnInOrLogIn === 'logIn' && (
                                    <div className="text-center mt-3">
                                        {/* <Link to="#" onClick={() => { setResetPass(!resetPass); switchForm('logIn'); }}>¿Olvidaste tu contraseña?</Link> */}
                                        <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    {!resetPass && (
                        <div className={`auth-right ${resetPass ? 'hidden' : ''}`}>
                            {singnInOrLogIn === 'signIn' ? (
                                <>
                                    <h2>¡Bienvenido de nuevo a GestiFish!</h2>
                                    <p>Inicia sesión con tu cuenta para continuar</p>
                                    <button className="btn-signup" onClick={() => switchForm('logIn')}>INICIAR SESIÓN</button>
                                </>
                            ) : (
                                <>

                                    <div className="welcome-box">
                                        <h2>¡Hola, Bienvenido a GestiFish!</h2>
                                        <p>Regístrate con tus datos personales para usar todas las funcionalidades de esta maravillosa herramienta digital</p>
                                        <button className="btn-signup" onClick={() => switchForm('signIn')}>REGÍSTRATE</button>
                                    </div>

                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
    
}
export default Auth;