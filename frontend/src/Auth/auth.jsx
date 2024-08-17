import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const Auth = () => {
    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");

    const [isRegistering, setIsRegistering] = useState(true);
    const [resetPass, setResetPass] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, {
                Nom_Usuario,
                Ape_Usuario,
                Cor_Usuario,
                Con_Usuario
            });

            if (response.data.tokenUser) {
                localStorage.setItem('usuario', JSON.stringify(response.data));
                alert('User registered successfully');

            }
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(URI + 'login', {
            Cor_Usuario,
            Con_Usuario
        });

        if (response.data.tokenUser) {
            localStorage.setItem('token', response.data.tokenUser);
            window.location.href = process.env.ROUTER_WINDOW + window.location.host;
            alert('Login successful');
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
};

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    

    return (
        <>
            {!resetPass ? (
                <>
                    <button 
                        className="btn btn-primary" 
                        onClick={toggleForm}>
                        {isRegistering ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering && (
                            <>
                                <label htmlFor="Nom_Usuario"> Nombres completos: </label>
                                <input 
                                    type="text" 
                                    id="Nom_Usuario" 
                                    value={Nom_Usuario} 
                                    onChange={(e) => setNom_Usuario(e.target.value)} 
                                />
                                <br />
                                <label htmlFor="Ape_Usuario"> Apellidos completos: </label>
                                <input 
                                    type="text" 
                                    id="Ape_Usuario" 
                                    value={Ape_Usuario} 
                                    onChange={(e) => setApe_Usuario(e.target.value)} 
                                />
                                <br />
                            </>
                        )}
                        <label htmlFor="Cor_Usuario"> Correo electrónico: </label>
                        <input 
                            type="text" 
                            id="Cor_Usuario" 
                            value={Cor_Usuario} 
                            onChange={(e) => setCor_Usuario(e.target.value)} 
                        />
                        <br />
                        <label htmlFor="Con_Usuario"> Contraseña: </label>
                        <input 
                            type="password" 
                            id="Con_Usuario" 
                            value={Con_Usuario} 
                            onChange={(e) => setCon_Usuario(e.target.value)} 
                        />
                        <br />


                        
                        <button 
                            
                            value={isRegistering ? "Registrar" : "Iniciar Sesión"} 
                            className="btn btn-success" 
                        ></button>
                    </form>
                    <Link to="#" onClick={() => setResetPass(true)}>Restablecer Contraseña</Link>
                </>
            ) : (
                <>
                    <form>
                        <label htmlFor="Cor_Usuario"> Correo electrónico: </label>
                        <input 
                            type="text" 
                            id="Cor_Usuario" 
                            value={Cor_Usuario} 
                            onChange={(e) => setCor_Usuario(e.target.value)} 
                        />
                        <br />
                        <input type="submit" value="Enviar" />
                    </form>
                    <Link to="#" onClick={() => setResetPass(false)}>Volver</Link>
                </>
            )}
        </>
    );
};

export default Auth;
