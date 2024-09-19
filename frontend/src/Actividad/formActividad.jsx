
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormActividad = ({ buttonForm, actividad, URI, updateTextButton, getAllActividad }) => {
    const [Id_Actividad, setId_Actividad] = useState('');
    const [Nom_Actividad, setNom_Actividad] = useState('');
    const [Des_Actividad, setDes_Actividad] = useState('');
    const [Fec_Actividad, setFec_Actividad] = useState('');
    const [Hor_Actividad, setHor_Actividad] = useState('');
    const [Fas_Produccion, setFas_Produccion] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Id_Estanque, setId_Estanque] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosEstanque, setDatosEstanque] = useState([]);

    const getResponsable = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
            setDatosResponsable(response.data);
        } catch (error) {
            console.error('Error al obtener responsables:', error);
        }
    };

    const getEstanque = async () => {
        try {
            const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/estanque/');
            setDatosEstanque(response.data);
        } catch (error) {
            console.error('Error al obtener estanques:', error);
        }
    };

    useEffect(() => {
        getResponsable();
        getEstanque();
    }, []);

    const sendFormA = async (e) => {
      e.preventDefault();
  
      if (
          Nom_Actividad === actividad.Nom_Actividad &&
          Des_Actividad === actividad.Des_Actividad &&
          Fec_Actividad === actividad.Fec_Actividad &&
          Hor_Actividad === actividad.Hor_Actividad &&
          Fas_Produccion === actividad.Fas_Produccion &&
          Id_Responsable === actividad.Id_Responsable &&
          Id_Estanque === actividad.Id_Estanque
      ) {
          Swal.fire({
              title: 'Sin cambios',
              text: 'No ha realizado ningún cambio.',
              icon: 'info'
          });
          return;
      }
  
      try {
        if (buttonForm === 'Actualizar') {
          await axios.put(`${URI}${actividad.Id_Actividad}`, {
              Id_Actividad,
              Nom_Actividad,
              Des_Actividad,
              Fec_Actividad,
              Hor_Actividad,
              Fas_Produccion,
              Id_Responsable,
              Id_Estanque
          }).then(() => {
              Swal.fire({
                  title: 'Actualizado',
                  text: '¡Registro actualizado exitosamente!',
                  icon: 'success'
              });
              clearFormA();
              getAllActividad();
          });

          } else if (buttonForm === 'Enviar') {
              const respuestaApi = await axios.post(URI, {
                  Nom_Actividad,
                  Des_Actividad,
                  Fec_Actividad,
                  Hor_Actividad,
                  Fas_Produccion,
                  Id_Responsable,
                  Id_Estanque
              });
              Swal.fire({
                  title: 'Guardado',
                  text: '¡Registro guardado exitosamente!',
                  icon: 'success'
              });
              if (respuestaApi.status === 201) {
                  clearFormA();
                  getAllActividad();
              }
          }
      } catch (error) {
          Swal.fire({
              title: 'Error',
              text: 'No se pudo guardar la actividad.',
              icon: 'error'
          });
      }
  };

    const clearFormA = () => {
        setId_Actividad('');
        setNom_Actividad('');
        setDes_Actividad('');
        setFec_Actividad('');
        setHor_Actividad('');
        setFas_Produccion('');
        setId_Responsable('');
        setId_Estanque('');
    };

    const setDataA = () => {
        setId_Actividad(actividad.Id_Actividad);
        setNom_Actividad(actividad.Nom_Actividad);
        setDes_Actividad(actividad.Des_Actividad);
        setFec_Actividad(actividad.Fec_Actividad);
        setHor_Actividad(actividad.Hor_Actividad);
        setFas_Produccion(actividad.Fas_Produccion);
        setId_Responsable(actividad.Id_Responsable);
        setId_Estanque(actividad.Id_Estanque);
    };

      // Función para manejar cambios en los campos de texto
      const handleInputChange = (e) => {
        const { name, value, maxLength } = e.target;

        if (value.length <= maxLength) {
          if (name === 'Nom_Actividad') {
            setNom_Actividad(value);
          } else if (name === 'Des_Actividad') {
            setDes_Actividad(value);
          }
        }
      };

    useEffect(() => {
        if (actividad) {
            setDataA();
        }
    }, [actividad]);

    return (
      <>
        
          {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
            <h1 className="text-center">
              {buttonForm === 'Actualizar' ? 'Actualizar Actividad' : 'Registrar Actividad'}
            </h1>
          </div>*/}
  
          <div className="card-body">
            <form id="actividadForm" onSubmit={sendFormA} className="fw-bold m-2">
              <div className="row">
                <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="Nom_Actividad" className="form-label">Nombre Actividad:</label>
                  <input
                    type="text"
                    id="Nom_Actividad"
                    name="Nom_Actividad" // Usamos name para distinguir el campo
                    className="form-control"
                    value={Nom_Actividad}
                    onChange={handleInputChange} // Usamos una sola función
                    maxLength={25} // Límite de caracteres
                    required
                  />
                  {Nom_Actividad.length === 25 && (
                    <span className="text-danger">¡Has alcanzado el límite de 25 caracteres!</span>
                  )}
                </div>

                  <div className="form-group mb-3">
                    <label htmlFor="Des_Actividad" className="form-label">Descripción:</label>
                    <input
                      type="text"
                      id="Des_Actividad"
                      name="Des_Actividad" // Usamos name para distinguir el campo
                      className="form-control"
                      value={Des_Actividad}
                      onChange={handleInputChange} // Usamos una sola función
                      maxLength={90} // Límite de caracteres
                      required
                    />
                    {Des_Actividad.length === 90 && (
                      <span className="text-danger">¡Has alcanzado el límite de 90 caracteres!</span>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="Fec_Actividad" className="form-label">Fecha Actividad:</label>
                    <input
                      type="date"
                      id="Fec_Actividad"
                      className="form-control"
                      value={Fec_Actividad}
                      onChange={(e) => setFec_Actividad(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="Hor_Actividad" className="form-label">Hora:</label>
                    <input
                      type="time"
                      id="Hor_Actividad"
                      className="form-control"
                      value={Hor_Actividad}
                      onChange={(e) => setHor_Actividad(e.target.value)}
                      required
                    />
                  </div>
                </div>
  
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="Fas_Produccion" className="form-label">Fase de Producción:</label>
                    <select
                      id="Fas_Produccion"
                      className="form-control"
                      value={Fas_Produccion}
                      onChange={(e) => setFas_Produccion(e.target.value)}
                      required
                    >
                      <option value="">Selecciona uno...</option>
                      <option value="Antes de la cosecha">Antes de la cosecha</option>
                      <option value="Despues de la cosecha">Después de la cosecha</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="Id_Responsable" className="form-label">Responsable de la Actividad:</label>
                    <select
                      id="Id_Responsable"
                      className="form-control"
                      value={Id_Responsable}
                      onChange={(e) => setId_Responsable(e.target.value)}
                      required
                    >
                      <option value="">Selecciona uno...</option>
                      {DatosResponsable.map((responsable) => (
                        <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                          {responsable.Nom_Responsable}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="Id_Estanque" className="form-label">Estanque:</label>
                    <select
                      id="Id_Estanque"
                      className="form-control"
                      value={Id_Estanque}
                      onChange={(e) => setId_Estanque(e.target.value)}
                      required
                    >
                      <option value="">Selecciona uno...</option>
                      {DatosEstanque.map((estanque) => (
                        <option key={estanque.Id_Estanque} value={estanque.Id_Estanque}>
                          {estanque.Nom_Estanque}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center">
                  <button
                      type="submit"
                      id="boton"
                      className={`btn btn-block m-2 ${buttonForm === 'Actualizar' ? 'btn-success' : 'btn-primary'}`}
                  >
                      {buttonForm === 'Actualizar' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                          </svg>
                      )}
                      {buttonForm === 'Enviar' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                          </svg>
                      )}
                      {buttonForm}
                  </button>
              </div>
            </form>
          </div>
      </>
    );
  
  };
  

export default FormActividad;