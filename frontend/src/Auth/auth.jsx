import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../Menus/Navbar.jsx';


const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const Auth = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Para manejar el tipo de mensaje
    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");

    const [buttonForm, setButtonForm] = useState("Registrar");
    const [signInOrLogIn, setSignInOrLogIn] = useState("signIn");
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
                    window.location.href = 
                        process.env.ROUTER_WINDOW + window.location.host + '/dashboard';
                }
            } catch (error) {
                setMessageType('error');
                setMessage('Hubo un error, por favor intenta nuevamente');
            }
        }
    };

    const switchForm = (option) => {
        setSignInOrLogIn(option);
        setButtonForm(option === "signIn" ? "Registrar" : "Iniciar Sesion");
    };
    


    return (
        <>
    <Navbar/>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6">
                <div className="card border-0 shadow-lg p-4">
                  <div className="card-body">
                    <h3 className="card-title text-center mb-4">
                      {signInOrLogIn === "signIn"
                        ? "Crea tu cuenta"
                        : "Iniciar Sesión"}
                    </h3>
                    {message && (
                      <div
                        className={`alert ${
                          messageType === "success"
                            ? "alert-success"
                            : "alert-danger"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                    {!resetPass ? (
                      <>
                        <form onSubmit={sendForm}>
                          {signInOrLogIn === "signIn" && (
                            <>
                              <div className="input-group mb-3">
                                <span className="input-group-text">
                                  <i className="bi bi-person"></i>
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nombres completos"
                                  value={Nom_Usuario}
                                  onChange={(e) => setNom_Usuario(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="input-group mb-3">
                                <span className="input-group-text">
                                  <i className="bi bi-person"></i>
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Apellidos completos"
                                  value={Ape_Usuario}
                                  onChange={(e) => setApe_Usuario(e.target.value)}
                                  required
                                />
                              </div>
                            </>
                          )}
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Correo electrónico"
                              value={Cor_Usuario}
                              onChange={(e) => setCor_Usuario(e.target.value)}
                              required
                            />
                          </div>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="bi bi-lock"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña"
                              value={Con_Usuario}
                              onChange={(e) => setCon_Usuario(e.target.value)}
                              required
                            />
                          </div>
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              {buttonForm}
                            </button>
                          </div>
                        </form>
                        <div className="text-center mt-3">
                          <Link to="#" onClick={() => setResetPass(!resetPass)}>
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <form>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Correo electrónico"
                              value={Cor_Usuario}
                              onChange={(e) => setCor_Usuario(e.target.value)}
                              required
                            />
                          </div>
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-warning btn-block"
                            >
                              Enviar
                            </button>
                          </div>
                        </form>
                        <div className="text-center mt-3">
                          <Link to="#" onClick={() => setResetPass(!resetPass)}>
                            Volver
                          </Link>
                        </div>
                      </>
                    )}
                    <div className="text-center mt-4">
                      {signInOrLogIn === "signIn" ? (
                        <button
                          className="btn btn-link"
                          onClick={() => switchForm("logIn")}
                        >
                          ¿Ya tienes cuenta? Iniciar Sesión
                        </button>
                      ) : (
                        <button
                          className="btn btn-link"
                          onClick={() => switchForm("signIn")}
                        >
                          ¿No tienes cuenta? Registrarse
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Auth;