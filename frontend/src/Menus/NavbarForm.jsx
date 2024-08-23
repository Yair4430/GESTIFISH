import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarAdmin from "./NavbarAdmin";
import imagen_logo from '../IMG/GESTIFISH-.png';
import Navbar from './Navbar';
import RegistrosMenu from './RegistrosMenu';

function NavbarForm() {
    return (

        <>        
        <nav className="navbar navbar-expand-lg navbar-light bg-primary py-3 shadow-sm">
            <a className="navbar-brand" href="/">
            <img src={imagen_logo} alt="Logo" className="Logo" />
            <span className="brand-name">GestiFish</span>
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <NavLink className="nav-link" to="/auth" end>
                    <i className="fas fa-home"></i>
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" end>
                    <i className="fas fa-clipboard-list"></i>
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/simulador" end>
                    <i className="fas fa-chart-line"></i>
                </NavLink>
                </li>
            </ul>
            </div>
        </nav>
        
        </>
    );
  }
  
  export default NavbarForm;