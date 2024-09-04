import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importaciones Formularios
import CrudAlimentacion from './Alimento/CrudAlimentacion.jsx';
import CrudResponsable from './Responsables/CrudResponsable.jsx';
import CrudEstanque from './Estanque/crudEstanque.jsx';
import CrudActividad from './Actividad/crudActividad.jsx';
import CrudEspecie from './Especie/CrudEspecie.jsx';
import CrudTraslado from './Traslado/CrudTraslado.jsx';
import CrudMuestreo from './Muestreo/crudMuestreo.jsx';
import CrudCosecha from './Cosecha/CrudCosecha.jsx';
import CrudMortalidad from './Mortalidad/CrudMortalidad.jsx';
import CrudSiembra from './Siembra/CrudSiembra.jsx';

// Importación Simulador
import Simulador from './Simulador/Simulador.jsx';

// Importaciones Registro, inicio de sesión y recuperación de contraseña
import Auth from './Auth/auth.jsx';
import ResetPassword from './Auth/resetPassword.jsx';

// Importaciones de estructura del proyecto
import Home from './home/Home.jsx';
import BarraNavegacionPrivada from './home/barraNavegacionPrivada';
import BarraNavegacionPublica from './home/barraNavegacionPublica.jsx';
import HomePublico from './home/HomePublica.jsx';
import RegistrosMenu from './home/RegistrosMenu.jsx';
import CaruselContact from './Contact/Carusel-contact.jsx';

const URL_AUTH = process.env.ROUTER_PRINCIPAL + '/auth/';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));

    if (!user) {
      setIsAuth(false);
    } else {
      axios
        .get(URL_AUTH + 'verify', {
          headers: { Authorization: `Bearer ${user.tokenUser}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuth(true);
            const lastPath = localStorage.getItem('lastPath') || '/';
            if (lastPath === '/auth' || lastPath === '/') {
              navigate('/'); // Redirige al Home si la última ruta es /auth o /
            } else {
              navigate(lastPath); // Redirige a la última ruta guardada
            }
          }
        })
        .catch(() => {
          setIsAuth(false);
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuth]);

  const handleBeforeUnload = () => {
    localStorage.setItem('lastPath', window.location.pathname);
  };

  const logOutUser = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('lastPath');
    setIsAuth(false);
    navigate('/auth');
  };

  return (
    <>
      {isAuth && <BarraNavegacionPrivada logOutUser={logOutUser} />}

      <Routes>
        {isAuth ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/RegistrosMenu' element={<RegistrosMenu />} />
            <Route path='/Alimentacion' element={<CrudAlimentacion />} />
            <Route path='/Responsable' element={<CrudResponsable />} />
            <Route path='/Estanque' element={<CrudEstanque />} />
            <Route path='/Especie' element={<CrudEspecie />} />
            <Route path='/Traslado' element={<CrudTraslado />} />
            <Route path='/Actividad' element={<CrudActividad />} />
            <Route path='/Muestreo' element={<CrudMuestreo />} />
            <Route path='/Cosecha' element={<CrudCosecha />} />
            <Route path='/Mortalidad' element={<CrudMortalidad />} />
            <Route path='/Siembra' element={<CrudSiembra />} />
            <Route path='/Simulador' element={<Simulador />} />
          </>
        ) : (
          <Route path='*' element={<HomePublico />} />
        )}
        {!isAuth ? <Route path='/auth' element={<Auth />} /> : ''}
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/barraNavegacionPublica' element={<BarraNavegacionPublica />} />
        <Route path='/CaruselContact' element={<CaruselContact />} />
      </Routes>
    </>
  );
}

export default App;
