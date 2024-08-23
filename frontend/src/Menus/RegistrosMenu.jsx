import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarAdmin from "./NavbarAdmin.jsx";


function RegistrosMenu() {
  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        <h2 className="display-4 text-center text-dark font-weight-bold mb-5">Registros</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Responsable</h3>
                <p className="card-text">La persona encargada de supervisar y gestionar la piscicultura.</p>
                <p className="text-muted">"El éxito de la piscicultura empieza con una buena gestión."</p>
                <NavLink to="/Responsable" className="btn btn-primary">Ir a la página de responsable</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Estanque</h3>
                <p className="card-text">El hábitat donde se crían y cuidan los peces.</p>
                <p className="text-muted">"Un buen estanque asegura una producción saludable."</p>
                <NavLink to="/Estanque" className="btn btn-primary">Ir a la página de estanques</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Siembra</h3>
                <p className="card-text">El proceso de introducir los peces en los estanques.</p>
                <p className="text-muted">"La siembra es el primer paso hacia una cosecha exitosa."</p>
                <NavLink to="/Siembra" className="btn btn-primary">Ir a la página de siembra</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Mortalidad</h3>
                <p className="card-text">Registro y análisis de la mortalidad de los peces.</p>
                <p className="text-muted">"Controlar la mortalidad es crucial para la sostenibilidad."</p>
                <NavLink to="/Mortalidad" className="btn btn-primary">Ir a la página de mortalidad</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Alimentación</h3>
                <p className="card-text">Control y registro de la alimentación de los peces.</p>
                <p className="text-muted">"Una alimentación adecuada promueve un crecimiento saludable."</p>
                <NavLink to="/Alimentacion" className="btn btn-primary">Ir a la página de alimentación</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Actividades del estanque</h3>
                <p className="card-text">Registros de todas las actividades realizadas en los estanques.</p>
                <p className="text-muted">"La constancia en las actividades asegura el bienestar de los peces."</p>
                <NavLink to="/Actividad" className="btn btn-primary">Ir a la página de actividades del estanque</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Muestreo</h3>
                <p className="card-text">Técnicas y registros del muestreo de peces.</p>
                <p className="text-muted">"El muestreo regular ayuda a mantener la calidad del cultivo."</p>
                <NavLink to="/Muestreo" className="btn btn-primary">Ir a la página de muestreo</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Cosecha</h3>
                <p className="card-text">Procesos y registros de la cosecha de peces.</p>
                <p className="text-muted">"Una buena cosecha es el resultado de un buen manejo."</p>
                <NavLink to="/Cosecha" className="btn btn-primary">Ir a la página de cosecha</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title text-primary font-weight-bold">Traslado</h3>
                <p className="card-text">Registros del traslado de peces entre estanques o sitios.</p>
                <p className="text-muted">"El traslado seguro garantiza la integridad del cultivo."</p>
                <NavLink to="/Traslado" className="btn btn-primary">Ir a la página de traslado</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default RegistrosMenu;
