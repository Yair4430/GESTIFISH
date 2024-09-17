import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormAlimentacion = ({ buttonForm, alimentacion, URI, updateTextButton, getAllAlimentacion }) => {
    const [Fec_Alimentacion, setFec_Alimentacion] = useState('');
    const [Can_RacionKg, setCan_RacionKg] = useState('');
    const [Tip_Alimento, setTip_Alimento] = useState('');
    const [Hor_Alimentacion, setHor_Alimentacion] = useState('');
    const [Vlr_Alimentacion, setVlr_Alimentacion] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();

        if (
            Fec_Alimentacion === alimentacion.Fec_Alimentacion &&
            Can_RacionKg === alimentacion.Can_RacionKg &&
            Id_Siembra === alimentacion.Id_Siembra &&
            Id_Responsable === alimentacion.Id_Responsable &&
            Tip_Alimento === alimentacion.Tip_Alimento &&
            Hor_Alimentacion === alimentacion.Hor_Alimentacion &&
            Vlr_Alimentacion === alimentacion.Vlr_Alimentacion
        ) {
            Swal.fire({
                title: 'Sin cambios',
                text: 'No ha realizado ningún cambio.',
                icon: 'info'
            });
            return; // Salir de la función sin hacer la solicitud
        }
        
        try {
            const data = {
                Fec_Alimentacion,
                Can_RacionKg,
                Tip_Alimento,
                Hor_Alimentacion,
                Vlr_Alimentacion,
                Id_Siembra,
                Id_Responsable
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${alimentacion.Id_Alimentacion}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                }).then(() => {
                // updateTextButton('Enviar');
                clearForm(); // Limpiar el formulario después de actualizar
                $('#modalForm').modal('hide');
                })
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, data);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm(); // Limpiar el formulario después de guardar
                }
            }

            getAllAlimentacion(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de alimentación.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Alimentacion('');
        setCan_RacionKg('');
        setTip_Alimento('');
        setHor_Alimentacion('');
        setVlr_Alimentacion('');
        setId_Siembra('');
        setId_Responsable('');
    };

    const setData = () => {
        setFec_Alimentacion(alimentacion.Fec_Alimentacion);
        setCan_RacionKg(alimentacion.Can_RacionKg);
        setTip_Alimento(alimentacion.Tip_Alimento);
        setHor_Alimentacion(alimentacion.Hor_Alimentacion);
        setVlr_Alimentacion(alimentacion.Vlr_Alimentacion);
        setId_Siembra(alimentacion.Id_Siembra);
        setId_Responsable(alimentacion.Id_Responsable);
    };

    // Función para evitar la entrada de caracteres inválidos
    const handleKeyDown = (e) => {
        if (["e", "E", "+", "-", ","].includes(e.key)) {
        e.preventDefault();  // Evita que el carácter sea ingresado
        }
    };
    
    // Función para validar que solo números sean permitidos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
    
        // Solo permite dígitos y puntos decimales
        if (!isNaN(value) && !value.includes("e")) {
        setValue(value);  // Actualiza el estado si es un número válido
        }
    };
  

    useEffect(() => {
        const getResponsable = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/responsable/');
                setDatosResponsable(response.data);
            } catch (error) {
                console.error('Error al obtener responsables:', error);
            }
        };

        const getSiembras = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/siembra/');
                setDatosSiembra(response.data);
            } catch (error) {
                console.error('Error al obtener siembras:', error);
            }
        };

        getResponsable();
        getSiembras();
    }, []);

    useEffect(() => {
        if (alimentacion) {
            setData();
        }
    }, [alimentacion]);

    return (
        <>
              {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                  <h1 className="text-center">
                      {buttonForm === 'Actualizar' ? 'Actualizar Alimentación' : 'Registrar Alimentación'}
                  </h1>
              </div>*/}
              <div className="card-body">
                  <form id="alimentacionForm" onSubmit={sendForm} className="fw-bold m-2">
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Fec_Alimentacion" className="form-label">Fecha Alimentación:</label>
                                  <input className="form-control" type="date" id="Fec_Alimentacion" value={Fec_Alimentacion} onChange={(e) => setFec_Alimentacion(e.target.value)} required />
                              </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="Can_RacionKg" className="form-label">Cantidad Ración (Kg):</label>
                                <input 
                                className="form-control" 
                                type="number" 
                                id="Can_RacionKg" 
                                value={Can_RacionKg} 
                                onChange={(e) => handleNumericInput(e, setCan_RacionKg)} 
                                onKeyDown={handleKeyDown} 
                                required 
                                />
                            </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Tip_Alimento" className="form-label">Tipo Alimento:</label>
                                  <select className="form-control" id="Tip_Alimento" value={Tip_Alimento} onChange={(e) => setTip_Alimento(e.target.value)} required>
                                      <option value="">Selecciona uno...</option>
                                      <option value="Concentrado">Concentrado</option>
                                      <option value="Sal">Sal</option>
                                  </select>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Hor_Alimentacion" className="form-label">Hora Alimentación:</label>
                                  <input className="form-control" type="time" id="Hor_Alimentacion" value={Hor_Alimentacion} onChange={(e) => setHor_Alimentacion(e.target.value)} required />
                              </div>
                          </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Vlr_Alimentacion" className="form-label">Valor Alimentación ($):</label>
                                  <input className="form-control" type="number" id="Vlr_Alimentacion" value={Vlr_Alimentacion} onChange={(e) => handleNumericInput (e, setVlr_Alimentacion)} onKeyDown={handleKeyDown}  required />
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Id_SiembraSelect" className="form-label">Fecha Siembra:</label>
                                  <select className="form-control" id="Id_SiembraSelect" value={Id_Siembra} onChange={(e) => setId_Siembra(e.target.value)} required>
                                      <option value="">Selecciona uno...</option>
                                      {DatosSiembra.map((siembra) => (
                                          <option key={siembra.Id_Siembra} value={siembra.Id_Siembra}> {siembra.Fec_Siembra}</option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Id_ResponsableSelect" className="form-label">Nombre Responsable:</label>
                                  <select className="form-control" id="Id_ResponsableSelect" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                                      <option value="">Selecciona uno...</option>
                                      {DatosResponsable.map((responsable) => (
                                          <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                              {responsable.Nom_Responsable}
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

export default FormAlimentacion;