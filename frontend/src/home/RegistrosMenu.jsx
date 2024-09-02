import React from 'react';
import Sidebar from './Sidebar.jsx'; // Asegúrate de usar la ruta correcta
import './RegistrosMenu.css';

import FormImage from '../IMG/Cachamas.jpeg';

function RegistrosMenu() {
  return (
    <>
    <Sidebar />
      <div style={{ marginLeft: '370px', paddingTop: '70px' }}>
        <div className="container mt-4">
          <div className="header-section">
            <h2 className="main-title">¡Conoce los Registros que Maneja la Unidad!</h2>
          </div>
          <br />
          <div className="content-section">
            <img src={FormImage} alt="Formularios" className="form-image" />
            <br />
            <p className="description-text">
              En la unidad de piscicultura, cada formulario juega un papel crucial para la gestión eficiente de los estanques y la
              monitorización de los procesos acuícolas.
              <br />
              <br />
              Con el sistema digital de <strong>Gestifish</strong>, puedes acceder a formularios que se adaptan a las
              necesidades específicas de la unidad. Desde el registro de siembras hasta la actualización de mortalidades, cada formulario está
              diseñado para optimizar el flujo de trabajo y asegurar una gestión precisa y efectiva en los datos importantes de la unidad.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrosMenu;
