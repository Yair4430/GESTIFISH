import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const Auth = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Para manejar el tipo de mensaje
    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");

    const [buttonForm, setbuttonForm] = useState('Registrar');
    const [singnInOrLogIn, setSingnInOrLogIn] = useState('signIn');
    const [resetPass, setResetPass] = useState(false);

    const validateName = (name) => {
        return /^[a-zA-Z\s]+$/.test(name);
    };

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            if (!validateName(Nom_Usuario) || !validateName(Ape_Usuario)) {
                setMessageType('error');
                setMessage('El nombre y los apellidos solo pueden contener letras y espacios');
                return;
            }

            try {
                const response = await axios.post(URI, {
                    Nom_Usuario,
                    Ape_Usuario,
                    Cor_Usuario,
                    Con_Usuario
                });
                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    setMessageType('success');
                    setMessage('Cuenta creada con éxito');
                    
                    // Limpiar campos después de registro exitoso
                    setNom_Usuario('');
                    setApe_Usuario('');
                    setCor_Usuario('');
                    setCon_Usuario('');
                    
                    // Ocultar mensaje después de 8 segundos
                    setTimeout(() => {
                        setMessage('');
                    }, 8000);
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Hubo un error, por favor intenta nuevamente');
            }
        } else if (buttonForm === 'Iniciar Sesion') {
            try {
                const response = await axios.post(URI + 'login', {
                    Cor_Usuario,
                    Con_Usuario
                });
                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                    setMessageType('success');
                    setMessage('Inicio de sesión exitoso');
                    window.location.href = process.env.ROUTER_WINDOW + window.location.host;
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Hubo un error, por favor intenta nuevamente');
            }
        }
    };

    const switchForm = (opcion) => {
        setSingnInOrLogIn(opcion);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">{singnInOrLogIn === 'signIn' ? 'Registrar' : 'Iniciar Sesión'}</h3>
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
                                                <div className="form-group mb-3">
                                                    <label htmlFor="Nom_Usuario">Nombres completos:</label>
                                                    <input type="text" className="form-control" id="Nom_Usuario" value={Nom_Usuario} onChange={(e) => setNom_Usuario(e.target.value)} required />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="Ape_Usuario">Apellidos completos:</label>
                                                    <input type="text" className="form-control" id="Ape_Usuario" value={Ape_Usuario} onChange={(e) => setApe_Usuario(e.target.value)} required />
                                                </div>
                                            </>
                                        )}
                                        <div className="form-group mb-3">
                                            <label htmlFor="Cor_Usuario">Correo electrónico:</label>
                                            <input type="email" className="form-control" id="Cor_Usuario" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="Con_Usuario">Contraseña:</label>
                                            <input type="password" className="form-control" id="Con_Usuario" value={Con_Usuario} onChange={(e) => setCon_Usuario(e.target.value)} required />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-success">{buttonForm}</button>
                                        </div>
                                    </form>
                                    <div className="text-center mt-3">
                                        <Link to="#" onClick={() => { setResetPass(!resetPass) }}>Restablecer Contraseña</Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="Cor_Usuario">Correo electrónico:</label>
                                            <input type="email" className="form-control" id="Cor_Usuario" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} required />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">Enviar</button>
                                        </div>
                                    </form>
                                    <div className="text-center mt-3">
                                        <Link to="#" onClick={() => { setResetPass(!resetPass) }}>Volver</Link>
                                    </div>
                                </>
                            )}
                            <div className="text-center mt-3">
                                {singnInOrLogIn === 'signIn' ? (
                                    <button className="btn btn-link" onClick={() => { switchForm('logIn'); setbuttonForm('Iniciar Sesion') }}>¿Ya tienes cuenta? Iniciar Sesión</button>
                                ) : (
                                    <button className="btn btn-link" onClick={() => { switchForm('signIn'); setbuttonForm('Registrar') }}>¿No tienes cuenta? Registrarse</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
