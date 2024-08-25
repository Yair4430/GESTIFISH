import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

//Importaciones Formularios
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

//Importacion Simulador
import Simulador from './Simulador/Simulador.jsx';

//Importaciones Registro, inicio de sesion e recuperar contraseña
import Auth from './Auth/auth.jsx';
import ResetPassword from './Auth/resetPassword.jsx';

//Importaciones de estructura del proyecto
import Home from './home/Home.jsx';
import BarraNavegacionPrivada from './home/barraNavegacionPrivada';
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

  return (
    <> 
    <Routes>
      {isAuth ?
        <>  
          {/*Routes de estructura del proyecto */}
          <Route path='/' element={<Home />} />
          <Route path='/barraNavegacionPrivada' element={<BarraNavegacionPrivada/>}/>
          <Route path='/RegistrosMenu' element={<RegistrosMenu/>}/>
          <Route path='/logOutUser' element={<logOutUser/>}/>

          {/*Routes de componentes formularios y simulador */}
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
        <Route path='*' element={<Navigate to="/" />} />
      }

      {!isAuth ?
        <Route path='/auth' element={<Auth/>} />
        :''
      }

      <Route path='/reset-password' element={<ResetPassword/>}/>

     </Routes>
    </>
  );
};

export default App;