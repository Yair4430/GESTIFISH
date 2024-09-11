import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormTraslado = ({ buttonForm, traslado, URI, updateTextButton, getAllTraslados }) => {
    const [Fec_Traslado, setFec_Traslado] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Obs_Traslado, setObs_Traslado] = useState('');
    const [Hor_Traslado, setHor_Traslado] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Fec_Traslado,
                Can_Peces,
                Id_Responsable,
                Obs_Traslado,
                Hor_Traslado
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${traslado.Id_Traslado}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                // updateTextButton('Enviar');
                getAllTraslados();
                clearForm(); // Limpiar el formulario después de la actualización
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, data);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                }
            }

            getAllTraslados(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el traslado.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Traslado('');
        setCan_Peces('');
        setId_Responsable('');
        setObs_Traslado('');
        setHor_Traslado('');
    };

    const setData = () => {
        setFec_Traslado(traslado.Fec_Traslado);
        setCan_Peces(traslado.Can_Peces);
        setId_Responsable(traslado.Id_Responsable);
        setObs_Traslado(traslado.Obs_Traslado);
        setHor_Traslado(traslado.Hor_Traslado);
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

        getResponsable();
    }, []);

    useEffect(() => {
        if (traslado) {
            setData();
        }
    }, [traslado]);

    return (
        <>
            <div className="card">
                <div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Traslado' : 'Registrar Traslado'}
                    </h1>
                </div>
                <div className="card-body">
                    <form id="trasladoForm" onSubmit={sendForm} className="fw-bold m-2">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="Fec_Traslado" className="form-label">Fecha de Traslado:</label>
                                    <input className="form-control" type="date" id="Fec_Traslado" value={Fec_Traslado} onChange={(e) => setFec_Traslado(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="Can_Peces" className="form-label">Cantidad de Peces:</label>
                                    <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="Id_Responsable" className="form-label">Responsable:</label>
                                    <select className="form-control" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                                        <option value="">Seleccione Responsable</option>
                                        {DatosResponsable.map((responsable) => (
                                            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                                                {responsable.Nom_Responsable}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="Hor_Traslado" className="form-label">Hora de Traslado:</label>
                                    <input className="form-control" type="time" id="Hor_Traslado" value={Hor_Traslado} onChange={(e) => setHor_Traslado(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="Obs_Traslado" className="form-label">Observaciones:</label>
                                    <textarea className="form-control" id="Obs_Traslado" value={Obs_Traslado} onChange={(e) => setObs_Traslado(e.target.value)} rows="4" />
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

export default FormTraslado;