import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Home from './home/Home.jsx';
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

import Navbar from "./Menus/Navbar.jsx";
import RegistrosMenu from "./Menus/RegistrosMenu.jsx";

import Auth from './Auth/auth.jsx';
import ResetPassword from './Auth/resetPassword.jsx';

import Simulador from './Simulador/Simulador.jsx';

import imagen_logo from './IMG/GESTIFISH-.png';
import "../src/App.css";

const URL_AUTH = process.env.ROUTER_PRINCIPAL + '/auth/';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'));

    if (!user) {
      setIsAuth(false);
    } else {
      axios.get(URL_AUTH + 'verify', {
        headers: { Authorization: `Bearer ${user.tokenUser}` }
      }).then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        }
      }).catch(() => {
        setIsAuth(false);
      });
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('usuario');
    setIsAuth(false);
    navigate("/auth");
  };

  const handleRecordsClick = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    setShowRecords(!showRecords); // Alterna la visibilidad de la sección de registros
  };
  return (
    <>
      
      
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<RegistrosMenu />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </>
  );
};

export default App;