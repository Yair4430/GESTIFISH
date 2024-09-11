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
          <div className="card">
              <div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                  <h1 className="text-center">
                      {buttonForm === 'Actualizar' ? 'Actualizar Alimentación' : 'Registrar Alimentación'}
                  </h1>
              </div>
              <div className="card-body">
                  <form id="alimentacionForm" onSubmit={sendForm} className="fw-bold m-2">
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Fec_Alimentacion" className="form-label">Fecha de Alimentación:</label>
                                  <input className="form-control" type="date" id="Fec_Alimentacion" value={Fec_Alimentacion} onChange={(e) => setFec_Alimentacion(e.target.value)} required />
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Can_RacionKg" className="form-label">Cantidad de Ración (Kg):</label>
                                  <input className="form-control" type="number" id="Can_RacionKg" value={Can_RacionKg} onChange={(e) => setCan_RacionKg(e.target.value)} required />
                              </div>
                          </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Tip_Alimento" className="form-label">Tipo de Alimento:</label>
                                  <select className="form-control" id="Tip_Alimento" value={Tip_Alimento} onChange={(e) => setTip_Alimento(e.target.value)} required>
                                      <option value="">Selecciona uno...</option>
                                      <option value="Concentrado">Concentrado</option>
                                      <option value="Sal">Sal</option>
                                  </select>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Hor_Alimentacion" className="form-label">Hora de Alimentación:</label>
                                  <input className="form-control" type="time" id="Hor_Alimentacion" value={Hor_Alimentacion} onChange={(e) => setHor_Alimentacion(e.target.value)} required />
                              </div>
                          </div>
                      </div>
                      <div className="row mb-3">
                          <div className="col-md-6">
                              <div className="form-group mb-3">
                                  <label htmlFor="Vlr_Alimentacion" className="form-label">Valor de Alimentación:</label>
                                  <input className="form-control" type="number" id="Vlr_Alimentacion" value={Vlr_Alimentacion} onChange={(e) => setVlr_Alimentacion(e.target.value)} required />
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
                          <button type="submit" id="boton" className="btn btn-success btn-block m-2">
                              {buttonForm}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </>
  );
  
};

export default FormAlimentacion;