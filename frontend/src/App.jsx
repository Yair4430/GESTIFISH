         import { useState } from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'

import Home from './home/Home.jsx'
import CrudAlimento from './Alimento/crudALimento'
import CrudResponsable from './Responsables/CrudResponsable'
import CrudEstanque from './Estanque/crudEstanque.jsx'
import CrudEspecie from './Especie/CrudEspecie.jsx'
// import Responsable from './home/Responsable'
import CrudSiembra from './Siembra/crudSiembra.jsx'

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
            <NavLink className='nav-link fs-5' to="/Especie">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Especie</span>
              )}
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link fs-5' to="/Siembra">
              {({ isActive }) => (
                <span className={isActive ? 'active' : ''}>Siembra</span>
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
        <Route path='/Especie' element={<CrudEspecie/>}/>
        <Route path='/Siembra' element={<CrudSiembra/>} />
      </Routes>
    </>
  );
};

export default App;
