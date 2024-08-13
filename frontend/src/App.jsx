<<<<<<< HEAD
import { useState } from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'

import Home from './home/Home.jsx'
import CrudAlimento from './Alimento/crudALimento'
import CrudResponsable from './Responsables/CrudResponsable'
import CrudEstanque from './Estanque/crudEstanque.jsx'
import CrudActividad from './Actividad/crudActividad.jsx'
// import Responsable from './home/Responsable'

import imagen_logo from './IMG/LOGO_GESTIFISH.png'
import "../src/App.css"

const App = () => {
  return (
    <>
      {/* <body className='bs-body-color-red'></body> */}
      <nav className='navbar navbar-expand-lg navbar-light bg-primary py-3 shadow-sm' data-bs-theme="dark">
        <ul className='nav'>
          <li className="navbar-brand">
            <img src={imagen_logo} alt="" style={{ width: '95px', height: '50px' }} />
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/" end>
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Inicio</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Alimentacion">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Alimentacion</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Responsable">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Responsables</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Traslados">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Traslados</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Estanque">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Estanque</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Actividad">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Actividad</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Alimentacion' element={<CrudAlimento />} />
        <Route path='/Responsable' element={<CrudResponsable/>}/>
        <Route path='/Estanque' element={<CrudEstanque/>}/>
        <Route path='/Actividad' element={<CrudActividad/>}/>
      </Routes>
    </>
  );
};

export default App;
=======
import { useEffect ,useState } from 'react'
import {Routes, Route, NavLink, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
//import dotenv from 'dotenv'

import Home from './home/Home.jsx'
import CrudAlimento from './Alimento/crudALimento'
import CrudResponsable from './Responsables/CrudResponsable'
import CrudEstanque from './Estanque/crudEstanque.jsx'
import CrudEspecie from './Especie/CrudEspecie.jsx'
import CrudTraslado from './Traslado/CrudTraslado.jsx'

import Auth from './Auth/auth.jsx'
import ResetPassword from './Auth/resetPassword.jsx'

import imagen_logo from './IMG/LOGO_GESTIFISH.png'
import "../src/App.css"

const URL_AUTH = process.env.ROUTER_PRINCIPAL + '/auth/'

//dotenv.config()

function App () {
  const [isAuth, setIsAuth ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'))

    if (!user){
      setIsAuth(false)
    }else{

      axios.get(URL_AUTH + 'verify', {
        headers : { Authorization: `Bearer ${user.tokenUser}`}

      }).then(response => {
        if (response.status === 200){
          setIsAuth(true)
        }

      }).catch(() => {
        setIsAuth(false)
      })
    }
  }, [])

  const logOutUser = () => {
    localStorage.removeItem('usuario')
    setIsAuth(false)
    navigate("/auth")
  }

  return (
    <>
      {/* <body className='bs-body-color-red'></body> */}
      <nav className='navbar navbar-expand-lg navbar-light bg-primary py-3 shadow-sm' data-bs-theme="dark">
        <ul className='nav'>
          <li className="navbar-brand">
            <img src={imagen_logo} alt="" style={{ width: '95px', height: '50px' }} />
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/" end>
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Inicio</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Alimentacion">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Alimentacion</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Responsable">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Responsables</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Traslado">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Traslado</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Estanque">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Estanque</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Especie">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Especie</span>
              )}
            </NavLink>
          </li>

          {!isAuth ?  
            <li className='nav-item'>
              <NavLink className='nav-link fs-5' to="/Auth">
                {({ isActive }) => (
                  <span className={isActive ? 'active' : ''}>Inicio De Sesion</span>
                )}
              </NavLink>
             </li>
             : ''
          }

          {isAuth ?
            <li>
              <button onClick={() => logOutUser()} className='btn btn-secondary'><i className='fa-solid fa-door-closed'></i>Cerrar Sesion</button>
            </li>: ''
          }

        </ul>
      </nav>

    <Routes>
      {isAuth ?
        <>  
          <Route path='/' element={<Home />} />
          <Route path='/Alimentacion' element={<CrudAlimento />} />
          <Route path='/Responsable' element={<CrudResponsable/>}/>
          <Route path='/Estanque' element={<CrudEstanque/>}/>
          <Route path='/Especie' element={<CrudEspecie/>}/>
          <Route path='/Traslado' element={<CrudTraslado/>}/>
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
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
