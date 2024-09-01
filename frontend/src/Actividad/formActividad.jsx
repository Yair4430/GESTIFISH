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
                });
                updateTextButton('Enviar');
                clearFormA();
                getAllActividad();
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
                    alert(respuestaApi.data.message);
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">{buttonForm === 'Actualizar' ? 'Actualizar Actividad' : 'Registrar Actividad'}</h1>
                    <form id="actividadForm" onSubmit={sendFormA} className="fw-bold">
                        <div className="form-group mb-3">
                            <label htmlFor="Nom_Actividad">Nombre de la Actividad:</label>
                            <input type="text" id="Nom_Actividad" className="form-control" value={Nom_Actividad} onChange={(e) => setNom_Actividad(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Des_Actividad">Descripción de la Actividad:</label>
                            <input type="text" id="Des_Actividad" className="form-control" value={Des_Actividad} onChange={(e) => setDes_Actividad(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Fec_Actividad">Fecha de la Actividad:</label>
                            <input type="date" id="Fec_Actividad" className="form-control" value={Fec_Actividad} onChange={(e) => setFec_Actividad(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Hor_Actividad">Duración de la Actividad:</label>
                            <input type="time" id="Hor_Actividad" className="form-control" value={Hor_Actividad} onChange={(e) => setHor_Actividad(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Fas_Produccion">Fase de Producción:</label>
                            <select id="Fas_Produccion" className="form-control" value={Fas_Produccion} onChange={(e) => setFas_Produccion(e.target.value)} required>
                                <option value="">-- Seleccione --</option>
                                <option value="Antes de la cosecha">Antes de la cosecha</option>
                                <option value="Despues de la cosecha">Después de la cosecha</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="Id_Responsable">Responsable de la Actividad:</label>
                            <select id="Id_Responsable" className="form-control" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                                <option value="">Selecciona uno...</option>
                                {DatosResponsable.map((responsable) =>
                                    <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                        {responsable.Nom_Responsable}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="Id_Estanque">Estanque:</label>
                            <select id="Id_Estanque" className="form-control" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} required>
                                <option value="">Selecciona uno...</option>
                                {DatosEstanque.map((estanque) =>
                                    <option key={estanque.Id_Estanque} value={estanque.Id_Estanque}>
                                        {estanque.Nom_Estanque}
                                    </option>
                                )}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{buttonForm}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormActividad;
