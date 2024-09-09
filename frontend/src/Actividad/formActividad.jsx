import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";


const FormActividad = ({ buttonForm, actividad, URI, updateTextButton, getAllActividad, }) => {
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
            });
            Swal.fire({
              title: 'Actualizado',
              text: '¡Registro actualizado exitosamente!',
              icon: 'success'
            }).then(() => {
            //   updateTextButton('Enviar');
              clearFormA();
              getAllActividad();
              $('#modalForm').modal('hide');
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
                // alert(respuestaApi.data.message);
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

    useEffect(() => {
        if (actividad) {
            setDataA();
        }
    }, [actividad]);

    return (
        <>
            {/* <div className="container mt-5"> */}
         {/* <div style={{ marginLeft: '300px', paddingTop: '70px' }}> */}

                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">
                            {buttonForm === 'Actualizar' ? 'Actualizar Actividad' : 'Registrar Actividad'}
                        </h1>
                    </div>
                    <div className="card-body">
                        <form id="actividadForm" onSubmit={sendFormA} className="fw-bold m-2">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Nom_Actividad" className="col-sm-5 col-form-label text-end">Nombre de la Actividad:</label>
                                <div className="col-sm-4">
                                    <input type="text" id="Nom_Actividad" className="form-control" value={Nom_Actividad} onChange={(e) => setNom_Actividad(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Des_Actividad" className="col-sm-5 col-form-label text-end">Descripción de la Actividad:</label>
                                <div className="col-sm-4">
                                    <input type="text" id="Des_Actividad" className="form-control" value={Des_Actividad} onChange={(e) => setDes_Actividad(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_Actividad" className="col-sm-5 col-form-label text-end">Fecha de la Actividad:</label>
                                <div className="col-sm-4">
                                    <input type="date" id="Fec_Actividad" className="form-control" value={Fec_Actividad} onChange={(e) => setFec_Actividad(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Hor_Actividad" className="col-sm-5 col-form-label text-end">Duración de la Actividad:</label>
                                <div className="col-sm-4">
                                    <input type="time" id="Hor_Actividad" className="form-control" value={Hor_Actividad} onChange={(e) => setHor_Actividad(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fas_Produccion" className="col-sm-5 col-form-label text-end">Fase de Producción:</label>
                                <div className="col-sm-4">
                                    <select id="Fas_Produccion" className="form-control" value={Fas_Produccion} onChange={(e) => setFas_Produccion(e.target.value)} required >
                                        <option value="">-- Seleccione --</option>
                                        <option value="Antes de la cosecha">Antes de la cosecha</option>
                                        <option value="Despues de la cosecha">Después de la cosecha</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Id_Responsable" className="col-sm-5 col-form-label text-end">Responsable de la Actividad:</label>
                                <div className="col-sm-4">
                                    <select id="Id_Responsable" className="form-control" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required >
                                        <option value="">Selecciona uno...</option>
                                        {DatosResponsable.map((responsable) => (
                                            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                                {responsable.Nom_Responsable}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Id_Estanque" className="col-sm-5 col-form-label text-end">Estanque:</label>
                                <div className="col-sm-4">
                                    <select id="Id_Estanque" className="form-control" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} required >
                                        <option value="">Selecciona uno...</option>
                                        {DatosEstanque.map((estanque) => (
                                            <option key={estanque.Id_Estanque} value={estanque.Id_Estanque}>
                                                {estanque.Nom_Estanque}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" id="boton" className="btn btn-primary btn-block m-2">
                                    {buttonForm}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </>

    );
};

export default FormActividad;