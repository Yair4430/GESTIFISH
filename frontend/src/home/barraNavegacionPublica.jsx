import React from "react";
import { NavLink } from 'react-router-dom'; // Importa NavLink
import Logo from '../IMG/Logo_FondoBlanco.jpeg';

// Definición del componente de barra de navegación pública
function barraNavegacionPublica() {
  // Estilos en línea para la barra de navegación
  const styles = {
    navbar: {
      padding: '15px 30px', // Espaciado interno de la barra
      backgroundColor: '#007bff', // Color de fondo azul más llamativo
    },
    navbarTitle: {
      fontSize: '3rem', // Tamaño del texto del título
      color: 'white', // Color del texto del título
      fontWeight: 'bold', // Grosor del texto del título
      marginLeft: '10px', // Espacio a la izquierda del título
    },
    navLink: {
      marginLeft: '20px', // Espacio a la izquierda de cada enlace
      fontSize: '1.5rem', // Tamaño del texto de los enlaces
      display: 'inline-block', // Asegura que el hover se aplique correctamente
      transition: 'transform 0.3s ease, opacity 0.3s ease', // Transición para escala y opacidad
    },
    navbarBrandImg: {
      borderRadius: '50%', // Imagen redonda (círculo)
      width: '80px', // Ancho de la imagen
      height: '80px', // Alto de la imagen
      border: '3px solid white', // Borde blanco alrededor de la imagen
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Sombra para destacar la imagen
    },
    icon: {
      fontSize: '2.5rem', // Tamaño de los íconos en la barra de navegación
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
              <li className="nav-item">
                <NavLink
                  to="*" // Cambia esto si el enlace de inicio es diferente
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
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de registro */}
              <li className="nav-item">
                <NavLink
                  to="/auth" // Cambia esto si el enlace de registro es diferente
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
                  <i className="fas fa-user-plus" style={styles.icon}></i>
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de personas */}
              <li className="nav-item">
                <NavLink
                  to="/Usuarios" // Cambia esto si el enlace para los usuarios es diferente
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
                  <i className="fas fa-users" style={styles.icon}></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default barraNavegacionPublica;
