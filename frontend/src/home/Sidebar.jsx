import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaFish, FaWater, FaUser, FaSkullCrossbones, 
  FaSeedling, FaUtensils, FaExchangeAlt, FaClipboardList,
  FaRuler
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const sidebarStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    height: 'calc(115vh - 0px)', // Resta la altura de la barra de navegación
    position: 'absolute', 
    top: '122px', // Ajusta para que comience después de la barra de navegación
    left: '0',
    width: '250px',
    boxShadow: '4px 0 5px rgba(0, 0, 0, 0.1)',
    // zIndex: 1000, // Asegura que el sidebar se superponga sobre otros elementos
    overflowY: '10px', // Permite scroll en el sidebar si el contenido es largo
    paddingTop: '10px'
  };

  const sidebarMenuStyle = {
    padding: '2px 0'
  };

  const navItemStyle = {
    margin: '3px 0'
  };

  const getNavLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '22px',
    color: '#000000',
  });

  const iconStyle = {
    marginRight: '15px',
    fontSize: '30px',
    color: '#007bff'
  };

  return (
    <>
      <div style={sidebarStyle} className="sidebar">
        <ul style={sidebarMenuStyle} className="nav flex-column">
          {[
            { to: "/Actividad", icon: <FaClipboardList />, text: "Actividades" },
            { to: "/Alimentacion", icon: <FaUtensils />, text: "Alimentación" },
            { to: "/Cosecha", icon: <FaFish />, text: "Cosecha" },
            { to: "/Especie", icon: <FaFish />, text: "Especie" },
            { to: "/Estanque", icon: <FaWater />, text: "Estanque" },
            { to: "/Mortalidad", icon: <FaSkullCrossbones />, text: "Mortalidad" },
            { to: "/Muestreo", icon: <FaRuler />, text: "Muestreo" },
            { to: "/Responsable", icon: <FaUser />, text: "Responsable" },
            { to: "/Siembra", icon: <FaSeedling />, text: "Siembra" },
            { to: "/Traslado", icon: <FaExchangeAlt />, text: "Traslado" }
           
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
    </>
  );
}

export default Sidebar;