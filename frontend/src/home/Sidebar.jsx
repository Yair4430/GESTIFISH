// Importa React para crear componentes.
import React from 'react';

// Importa NavLink de react-router-dom para crear enlaces de navegación que pueden ser estilizados según la ruta activa.
import { NavLink } from 'react-router-dom';

// Importa íconos de la biblioteca react-icons.
import { 
  FaHome, FaFish, FaWater, FaUser, FaSkullCrossbones, 
  FaSeedling, FaUtensils, FaExchangeAlt, FaClipboardList,
  FaRuler
} from 'react-icons/fa';

// Importa una imagen llamada LogoBlanco.jpeg desde la carpeta IMG.
import Logo from '../IMG/LogoBlanco.jpeg';

// Importa los estilos CSS para el sidebar.
import './Sidebar.css'; // Asegúrate de que la ruta sea correcta

// Define un componente funcional llamado Sidebar.
function Sidebar() {
  // Define el estilo para la barra lateral (Sidebar). 
  // Establece el color de fondo, altura, posición fija, ancho, sombra, etc.
  const sidebarStyle = {
    backgroundColor: '#ffffff', // Color de fondo blanco para la barra lateral.
    color: '#000000', // Color del texto negro.
    height: '100vh', // Altura completa de la ventana del navegador.
    position: 'fixed', // Fija la barra lateral en una posición fija.
    width: '370px', // Ancho de la barra lateral.
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Sombra sutil en el lado derecho de la barra lateral.
    paddingTop: '0px', // Sin padding en la parte superior.
    top: '0', // Posiciona la barra lateral en la parte superior de la página.
    left: '0', // Posiciona la barra lateral en el lado izquierdo de la página.
    overflowY: 'auto' // Permite el desplazamiento vertical si el contenido excede la altura.
  };

  // Define el estilo para el contenedor del logo dentro de la barra lateral.
  // Alinea el contenido, establece padding, borde inferior y color de fondo.
  const logoContainerStyle = {
    display: 'flex', // Usa flexbox para alinear los elementos.
    alignItems: 'center', // Alinea los elementos verticalmente en el centro.
    padding: '20px', // Padding de 20px alrededor del contenedor del logo.
    borderBottom: '1px solid #dee2e6', // Borde inferior para separar el logo del menú.
    textAlign: 'left', // Alinea el texto a la izquierda.
    backgroundColor: '#007bff', // Color de fondo azul para el contenedor del logo.
    color: '#ffffff' // Color del texto blanco.
  };

  // Define el estilo para la imagen del logo.
  // Establece el tamaño, forma y ajuste de la imagen.
  const logoStyle = {
    width: '100px', // Ancho de la imagen del logo.
    height: '100px', // Altura de la imagen del logo.
    borderRadius: '45%', // Redondea los bordes de la imagen para darle una forma circular.
    objectFit: 'cover' // Asegura que la imagen cubra el contenedor sin distorsión.
  };

  // Define el estilo para el texto que acompaña al logo.
  // Ajusta el margen, tamaño de fuente, peso y color del texto.
  const textStyle = {
    marginLeft: '20px', // Margen izquierdo para separar el texto del logo.
    fontSize: '40px', // Tamaño de fuente grande para el texto.
    fontWeight: 'bold', // Aplica un peso de fuente negrita.
    color: '#ffffff' // Color del texto blanco.
  };

  // Define el estilo para el contenedor del menú de la barra lateral.
  // Establece padding para el contenedor de los elementos del menú.
  const sidebarMenuStyle = {
    padding: '3px 0' // Padding vertical para los elementos del menú.
  };

  // Define el estilo para los elementos del menú dentro de la barra lateral.
  // Establece margen superior e inferior para separar los ítems del menú.
  const navItemStyle = {
    margin: '3px 0' // Margen vertical para cada ítem del menú.
  };

  // Define el estilo para los enlaces de navegación (NavLink) en la barra lateral.
  // Cambia el estilo basado en si el enlace está activo o no.
  const getNavLinkStyle = ({ isActive }) => ({
    display: 'flex', // Usa flexbox para alinear los elementos dentro del enlace.
    alignItems: 'center', // Alinea los elementos verticalmente en el centro.
    padding: '15px 20px', // Padding dentro del enlace.
    borderRadius: '6px', // Bordes redondeados para el enlace.
    textDecoration: 'none', // Sin subrayado en el texto del enlace.
    fontWeight: '600', // Peso de fuente seminegrita para el texto del enlace.
    fontSize: '22px', // Tamaño de fuente del texto del enlace.
    color: '#000000', // Color del texto negro por defecto.
  });

  // Define el estilo para los íconos dentro de los enlaces de navegación.
  // Ajusta el margen derecho, tamaño de fuente y color del ícono.
  const iconStyle = {
    marginRight: '15px', // Margen derecho para separar el ícono del texto.
    fontSize: '30px', // Tamaño de fuente grande para el ícono.
    color: '#007bff' // Color del ícono azul.
  };

  return (
      <div style={sidebarStyle} className="sidebar">
        <div style={logoContainerStyle}>
          <img src={Logo} alt="Logo" style={logoStyle} className="img-fluid" />
          <span style={textStyle}>Gestifish</span>
        </div>
        <ul style={sidebarMenuStyle} className="nav flex-column">
          {[
            { to: "/", icon: <FaHome />, text: "Inicio" },
            { to: "/Actividad", icon: <FaClipboardList />, text: "Actividades" },
            { to: "/Alimentacion", icon: <FaUtensils />, text: "Alimentación" },
            { to: "/Cosecha", icon: <FaFish />, text: "Cosecha" },
            { to: "/Especie", icon: <FaFish />, text: "Especie" },
            { to: "/Estanque", icon: <FaWater />, text: "Estanque" },
            { to: "/Mortalidad", icon: <FaSkullCrossbones />, text: "Mortalidad" },
            { to: "/Responsable", icon: <FaUser />, text: "Responsable" },
            { to: "/Siembra", icon: <FaSeedling />, text: "Siembra" },
            { to: "/Traslado", icon: <FaExchangeAlt />, text: "Traslado" },
            { to: "/Muestreo", icon: <FaRuler />, text: "Muestreo" }
          ].map(({ to, icon, text }, index) => (
            <li key={index} style={navItemStyle} className="nav-item">
              <NavLink
                to={to}
                className="nav-link"
                style={({ isActive }) => getNavLinkStyle({ isActive })}
              >
                {React.cloneElement(icon, { style: iconStyle })} {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
    
}

// Exporta el componente Sidebar para que pueda ser utilizado en otras partes de la aplicación.
export default Sidebar;