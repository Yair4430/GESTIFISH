import React from "react";
import { NavLink } from 'react-router-dom'; // Importa NavLink
import Logo from '../IMG/Logo_FondoBlanco.jpeg'; // Asegúrate de reemplazar esta línea con el logo que quieres usar

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
      marginLeft: '30px', // Espacio a la izquierda de cada enlace
      fontSize: '1.5rem', // Tamaño del texto de los enlaces
      display: 'inline-block', // Asegura que el hover se aplique correctamente
      transition: 'transform 0.3s ease, opacity 0.3s ease', // Transición para escala y opacidad
      textAlign: 'center', // Centra el texto debajo del ícono
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
    iconText: {
      color: 'white', // Color del texto debajo del ícono
      display: 'block', // Hace que el texto esté en una línea separada
      fontSize: '1rem', // Tamaño del texto
      marginTop: '5px', // Espacio encima del texto
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
                  to="/" // Cambia esto si el enlace de inicio es diferente
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
                  <i className="fas fa-home" style={styles.icon}></i> {/* Ícono de inicio */}
                  <span style={styles.iconText}>Inicio</span>
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de contactos */}
              <li className="nav-item">
                <NavLink
                  to="/CaruselContact" // Cambia esto si el enlace para contactos es diferente
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
                  <i className="fas fa-address-book" style={styles.icon}></i> {/* Ícono de contactos */}
                  <span style={styles.iconText}>Creadores</span>
                </NavLink>
              </li>
              {/* Elemento de la lista de navegación para el ícono de login */}
              <li className="nav-item">
                <NavLink
                  to="/auth" // Cambia esto si el enlace de login es diferente
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
                  <i className="fas fa-user" style={styles.icon}></i> {/* Ícono de usuario */}
                  <span style={styles.iconText}>Login</span>
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
