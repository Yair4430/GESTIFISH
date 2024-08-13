import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const Auth = () => {

    const [Nom_Usuario, setNom_Usuario] = useState("");
    const [Ape_Usuario, setApe_Usuario] = useState("");
    const [Cor_Usuario, setCor_Usuario] = useState("");
    const [Con_Usuario, setCon_Usuario] = useState("");

    const [buttonForm, setbuttonForm] = useState('Registrar');
    const [singnInOrLogIn, setSingnInOrLogIn] = useState('signIn');
    const [resetPass, setResetPass] = useState(false);

    const sendForm = async (e) => {
        e.preventDefault();

        if (buttonForm === 'Registrar') {
            console.log('Preparado para enviar la solicitud...');
            await axios.post(URI, {
                Nom_Usuario: Nom_Usuario,
                Ape_Usuario: Ape_Usuario,
                Cor_Usuario: Cor_Usuario,
                Con_Usuario: Con_Usuario
            }).then(response => {
                if (response.data.tokenUser) {
                    localStorage.setItem('usuario', JSON.stringify(response.data));
                }
            });

        }else if (buttonForm === 'Iniciar Sesion') {
                console.log('Iniciando sesión...');
                await axios.post(URI + 'login', {
                    Cor_Usuario: Cor_Usuario,
                    Con_Usuario: Con_Usuario
                }).then(response => {
                    if (response.data.tokenUser) {
                        localStorage.setItem('usuario', JSON.stringify(response.data));
                        let miHost = window.location.host;
                        console.log(miHost);
                        // Redirige con el esquema adecuado
                        window.location.href = process.env.ROUTER_WINDOW + miHost;
                    }
                });
            }
            
    };

    const switchForm = (opcion) => {
        setSingnInOrLogIn(opcion);
    };

    return (
        <>
            {resetPass === false ?
                singnInOrLogIn === 'signIn'
                    ? <button className="btn btn-primary" onClick={() => { switchForm('logIn'); setbuttonForm('Iniciar Sesion') }}>Iniciar Sesion</button>
                    : <span className="btn btn-primary" onClick={() => { switchForm('signIn'); setbuttonForm('Registrar') }}>Registrarse</span>
                : ''}
            {resetPass === false ?
                <>
                    <form onSubmit={sendForm}>
                        {singnInOrLogIn === 'signIn'
                            ? <>
                                <label htmlFor="Nom_Usuario"> Nombres completos: </label>
                                <input type="text" id="Nom_Usuario" value={Nom_Usuario} onChange={(e) => setNom_Usuario(e.target.value)} />
                                <br />
                                <label htmlFor="Ape_Usuario"> Apellidos completos: </label>
                                <input type="text" id="Ape_Usuario" value={Ape_Usuario} onChange={(e) => setApe_Usuario(e.target.value)} />
                                <br />
                            </>
                            : ''}
                        <label htmlFor="Cor_Usuario"> Correo electrónico: </label>
                        <input type="text" id="Cor_Usuario" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} />
                        <br />
                        <label htmlFor="Con_Usuario"> Contraseña: </label>
                        <input type="password" id="Con_Usuario" value={Con_Usuario} onChange={(e) => setCon_Usuario(e.target.value)} />
                        <br />
                        <input type="submit" value={buttonForm} className="btn btn-success" />
                    </form>
                    <Link to="#" onClick={() => { setResetPass(!resetPass) }}>Restablecer Contraseña</Link>
                </>
                :
                <>
                    <form>
                        <label htmlFor="Cor_Usuario"> Correo electrónico: </label>
                        <input type="text" id="Cor_Usuario" value={Cor_Usuario} onChange={(e) => setCor_Usuario(e.target.value)} />
                        <br />
                        <input type="submit" value="Enviar" />
                    </form>
                    <Link to="#" onClick={() => { setResetPass(!resetPass) }}>Volver</Link>
                </>
            }
        </>
    );
};

export default Auth;
