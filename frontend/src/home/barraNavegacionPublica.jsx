import React from "react";
import { NavLink } from 'react-router-dom'; 
import Logo from '../IMG/LogoBlanco.jpeg'; 

function BarraNavegacionPublica() {
  const styles = {
    navbar: {
      padding: '5px 30px', 
      backgroundColor: '#007bff', 
    },
    navbarTitle: {
      fontSize: '3rem', 
      color: 'white', 
      fontWeight: 'bold', 
      marginLeft: '10px', 
    },
    navLink: {
      marginLeft: '30px', 
      fontSize: '1.5rem', 
      display: 'inline-block', 
      transition: 'transform 0.3s ease, opacity 0.3s ease', 
      textAlign: 'center', 
    },
    navbarBrandImg: {
      borderRadius: '50%', 
      width: '80px', 
      height: '80px', 
      border: '3px solid white', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
    },
    icon: {
      fontSize: '2.5rem', 
    },
    iconText: {
      color: 'white', 
      display: 'block', 
      fontSize: '1rem', 
      marginTop: '5px', 
    },
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <nav className="navbar navbar-expand-lg shadow-sm" style={styles.navbar}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={Logo}
              alt="Logo"
              className="d-inline-block align-top me-2"
              style={styles.navbarBrandImg}
            />
            <span className="navbar-title" style={styles.navbarTitle}>GestiFish</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link text-white"
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <i className="fas fa-home" style={styles.icon}></i>
                  <span style={styles.iconText}>Inicio</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/CaruselContact"
                  className="nav-link text-white"
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <i className="fas fa-address-book" style={styles.icon}></i>
                  <span style={styles.iconText}>Creadores</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/SimuladorPublico"
                  className="nav-link text-white"
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <i className="fas fa-chart-line" style={styles.icon}></i>
                  <span style={styles.iconText}>Simulador</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/auth"
                  className="nav-link text-white"
                  style={styles.navLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <i className="fas fa-user" style={styles.icon}></i>
                  <span style={styles.iconText}>Ingresar</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default BarraNavegacionPublica;