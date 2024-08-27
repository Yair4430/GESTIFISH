import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
          navigate('/'); // Redirigir a Home después de autenticarse
        }
      }).catch(() => {
        setIsAuth(false);
      });
    }
  }, []);

  const logOutUser = () => {
    localStorage.removeItem('usuario');
    setIsAuth(false);
    navigate("/auth"); // Redirigir después de cerrar sesión
  };

  return (
    <> 
      {isAuth && <BarraNavegacionPrivada logOutUser={logOutUser} />} {/* Barra de navegación siempre visible */}
      <Routes>
        {isAuth ?
          <>  
            {/* Routes de estructura del proyecto */}
            <Route path='/' element={<Home />} />
            <Route path='/RegistrosMenu' element={<RegistrosMenu/>}/>

            {/* Routes de componentes formularios y simulador */}
            <Route path='/Alimentacion' element={<CrudAlimentacion />} />
            <Route path='/Responsable' element={<CrudResponsable/>}/>
            <Route path='/Estanque' element={<CrudEstanque/>}/>
            <Route path='/Especie' element={<CrudEspecie/>}/>
            <Route path='/Traslado' element={<CrudTraslado/>}/>
            <Route path='/Actividad' element={<CrudActividad/>}/>
            <Route path='/Muestreo' element={<CrudMuestreo/>}/>
            <Route path='/Cosecha' element={<CrudCosecha/>}/>
            <Route path='/Mortalidad' element={<CrudMortalidad/>}/>
            <Route path='/Siembra' element={<CrudSiembra/>}/>
            <Route path='/Simulador' element={<Simulador/>}/>

          </>
          :
          <Route path='*' element={<HomePublico/>} />
        } 
        { !isAuth ?

          <Route path='/auth' element={<Auth />} />
        :''
        }

        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/barraNavegacionPublica' element={<BarraNavegacionPublica/>}/>
        
      </Routes>
    </>
  );
};

export default App;

