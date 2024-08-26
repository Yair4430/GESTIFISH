import React from 'react';
import { NavLink } from 'react-router-dom';
import './RegistrosMenu.css';  // Asegúrate de que este archivo CSS esté en la misma carpeta

function RegistrosMenu() {
  return (
    <>
      <div className="container mt-4">
        <h2 className="main-title">
          Formularios
         </h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Actividades del estanque</h3>
                <p className="card-text">Registros de todas las actividades realizadas en los estanques.</p>
                <p className="text-muted">"La constancia en las actividades asegura el bienestar de los peces."</p>
                <NavLink to="/Actividad" className="btn btn-primary custom-btn">Ir al Formulario de Actividades</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Alimentación</h3>
                <p className="card-text">Control y registro de la alimentación de los peces.</p>
                <p className="text-muted">"Una alimentación adecuada promueve un crecimiento saludable de los peces."</p>
                <NavLink to="/Alimentacion" className="btn btn-primary custom-btn">Ir al Formulario de Alimentación</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Cosecha</h3>
                <p className="card-text">Procesos y registros de la cosecha de peces.</p>
                <p className="text-muted">"Una buena cosecha es el resultado de un buen manejo."</p>
                <NavLink to="/Cosecha" className="btn btn-primary custom-btn">Ir al Formulario de Cosechas</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Estanque</h3>
                <p className="card-text">El hábitat donde se crían y cuidan los peces.</p>
                <p className="text-muted">"Un buen estanque asegura una producción saludable."</p>
                <NavLink to="/Estanque" className="btn btn-primary custom-btn">Ir al Formulario de Estanques</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Especie</h3>
                <p className="card-text">Información sobre las diferentes especies de peces manejadas en la unidad.</p>
                <p className="text-muted">"Conocer las especies de la unidad permite un manejo más eficiente."</p>
                <NavLink to="/Especie" className="btn btn-primary custom-btn">Ir al Formulario de Especies</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Mortalidad</h3>
                <p className="card-text">Registro de la mortalidad de los peces.</p>
                <p className="text-muted">"Controlar la mortalidad es crucial para la sostenibilidad."</p>
                <NavLink to="/Mortalidad" className="btn btn-primary custom-btn">Ir al Formulario de Mortalidad</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Muestreo</h3>
                <p className="card-text">Registros del muestreo de peces.</p>
                <p className="text-muted">"El muestreo regular ayuda a mantener la calidad del cultivo."</p>
                <NavLink to="/Muestreo" className="btn btn-primary custom-btn">Ir al Formulario de Muestreos</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Responsable</h3>
                <p className="card-text">La persona encargada de supervisar y gestionar la unidad.</p>
                <p className="text-muted">"El éxito de la unidad empieza con una buena gestión."</p>
                <NavLink to="/Responsable" className="btn btn-primary custom-btn">Ir al Formulario de Responsables</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Siembra</h3>
                <p className="card-text">El proceso de introducir los peces en los estanques.</p>
                <p className="text-muted">"La siembra es el primer paso hacia una cosecha exitosa."</p>
                <NavLink to="/Siembra" className="btn btn-primary custom-btn">Ir al Formulario de Siembras</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg border-primary h-100" style={{ borderWidth: '3px' }}>
              <div className="card-body">
                <h3 className="card-title text-dark font-weight-bold">Traslado</h3>
                <p className="card-text">Registros del traslado de peces entre estanques o sitios.</p>
                <p className="text-muted">"El traslado seguro garantiza la integridad del cultivo."</p>
                <NavLink to="/Traslado" className="btn btn-primary custom-btn">Ir al Formulario de Traslados</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrosMenu;
