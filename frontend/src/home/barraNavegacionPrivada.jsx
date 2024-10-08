import React from "react";
import { NavLink } from 'react-router-dom'; // Importa NavLink
import Logo from '/Imagenes/LogoBlanco.jpeg'; // Asegúrate de reemplazar esta línea con el logo que quieres usar

// Definición del componente de barra de navegación privada
function barraNavegacionPrivada({ logOutUser }) {

  console.log(logOutUser);
  // Estilos en línea para la barra de navegación
  const styles = {
    navbar: {
      padding: '5px 30px',
      height: '80px',
      backgroundColor: '#007bff',
    },
    navbarTitle: {
      fontSize: '2rem', 
      color: 'white', 
      fontWeight: 'bold', 
      marginLeft: '10px', 
    },
    navLink: {
      marginLeft: '30px', 
      fontSize: '0rem', 
      display: 'inline-block', 
      transition: 'transform 0.3s ease, opacity 0.3s ease', 
      textAlign: 'center', 
    },
    navbarBrandImg: {
      borderRadius: '50%', 
      width: '70px', 
      height: '70px', 
      border: '3px solid white', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
    },
    icon: {
      fontSize: '1.8rem', 
    },
    iconText: {
      color: 'white', 
      display: 'block', 
      fontSize: '1rem', 
      marginTop: '2px', 
    },
  };

  return (
    <>
      {/* Enlace a la hoja de estilos de Font Awesome para los íconos */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      {/* Barra de navegación con clases de Bootstrap */}
      <nav className="navbar navbar-expand-lg shadow-sm" style={styles.navbar}>
        <div className="container-fluid">
          {/* Enlace a la marca (logo y título) */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            {/* Imagen del logo */}
            <img
              src={Logo}
              alt="Logo"
              className="d-inline-block align-top me-2" // Estilos para el logo
              style={styles.navbarBrandImg}
            />
            {/* Título de la barra de navegación */}
            <span className="navbar-title" style={styles.navbarTitle}>GestiFish</span>
          </a>
          {/* Botón para el menú desplegable en dispositivos móviles */}
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
          {/* Menú desplegable colapsable */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {/* Elemento de la lista de navegación para el ícono de inicio */}
              {/*<li className="nav-item">
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
              </li> */}
              {/* Elemento de la lista de navegación para el ícono de formularios */}
              <li className="nav-item">
                <NavLink
                  to="/Dashboard"
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
                  <i className="fas fa-file-alt" style={styles.icon}></i> {/* Ícono de formularios */}
                  <span style={styles.iconText}>Registros</span>
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de simulador */}
              <li className="nav-item">
                <NavLink
                  to="/Simulador"
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
                  <i className="fas fa-chart-line" style={styles.icon}></i> {/* Ícono de simulador */}
                  <span style={styles.iconText}>Simulador</span>
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de cerrar sesión */}
              <li className="nav-item">
                <NavLink
                  to="#"
                  className="nav-link text-white"
                  style={styles.navLink}
                  onClick={logOutUser}  // Llamar a logOutUser directamente
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <i className="fas fa-sign-out-alt" style={styles.icon}></i> {/* Ícono de cerrar sesión */}
                  <span style={styles.iconText}>Cerrar Sesión</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default barraNavegacionPrivada;
