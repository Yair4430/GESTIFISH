import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormMuestreo = ({ buttonForm, muestreo, URI, updateTextButton, getAllMuestreo }) => {
    const [Fec_Muestreo, setFec_Muestreo] = useState('');
    const [Num_Peces, setNum_Peces] = useState('');
    const [Obs_Muestreo, setObs_Muestreo] = useState('');
    const [Pes_Esperado, setPes_Esperado] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Hor_Muestreo, setHor_Muestreo] = useState('');
    const [Pes_Promedio, setPes_Promedio] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Fec_Muestreo,
                Num_Peces,
                Obs_Muestreo,
                Pes_Esperado,
                Id_Siembra,
                Id_Responsable,
                Hor_Muestreo,
                Pes_Promedio
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${muestreo.Id_Muestreo}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                // updateTextButton('Enviar');
                getAllMuestreo()
                clearForm(); // Limpiar el formulario después de actualizar
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

            getAllMuestreo(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de muestreo.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Muestreo('');
        setNum_Peces('');
        setObs_Muestreo('');
        setPes_Esperado('');
        setId_Siembra('');
        setId_Responsable('');
        setHor_Muestreo('');
        setPes_Promedio('');
    };

    const setData = () => {
        setFec_Muestreo(muestreo.Fec_Muestreo);
        setNum_Peces(muestreo.Num_Peces);
        setObs_Muestreo(muestreo.Obs_Muestreo);
        setPes_Esperado(muestreo.Pes_Esperado);
        setId_Siembra(muestreo.Id_Siembra);
        setId_Responsable(muestreo.Id_Responsable);
        setHor_Muestreo(muestreo.Hor_Muestreo);
        setPes_Promedio(muestreo.Pes_Promedio);
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
        if (muestreo) {
            setData();
        }
    }, [muestreo]);

    return (
        <>
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Muestreo' : 'Registrar Muestreo'}
                    </h1>
                </div>
                <div className="card-body">
                    <form id="muestreoForm" onSubmit={sendForm} className="fw-bold m-2">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Fec_Muestreo" className="form-label">Fecha de Muestreo:</label>
                                    <input className="form-control" type="date" id="Fec_Muestreo" value={Fec_Muestreo} onChange={(e) => setFec_Muestreo(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Num_Peces" className="form-label">Número de Peces:</label>
                                    <input className="form-control" type="number" id="Num_Peces" value={Num_Peces} onChange={(e) => setNum_Peces(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Obs_Muestreo" className="form-label">Observaciones:</label>
                                    <input className="form-control" type="text" id="Obs_Muestreo" value={Obs_Muestreo} onChange={(e) => setObs_Muestreo(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Pes_Esperado" className="form-label">Peso Esperado:</label>
                                    <input className="form-control" type="number" id="Pes_Esperado" value={Pes_Esperado} onChange={(e) => setPes_Esperado(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Id_SiembraSelect" className="form-label">Fecha Siembra:</label>
                                    <select className="form-control" id="Id_SiembraSelect" value={Id_Siembra} onChange={(e) => setId_Siembra(e.target.value)} required>
                                        <option value="">Selecciona uno...</option>
                                        {DatosSiembra.map((siembra) => (
                                            <option key={siembra.Id_Siembra} value={siembra.Id_Siembra}>
                                                {siembra.Fec_Siembra}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
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
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Hor_Muestreo" className="form-label">Hora de Muestreo:</label>
                                    <input className="form-control" type="time" id="Hor_Muestreo" value={Hor_Muestreo} onChange={(e) => setHor_Muestreo(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Pes_Promedio" className="form-label">Peso Promedio:</label>
                                    <input className="form-control" type="number" id="Pes_Promedio" value={Pes_Promedio} onChange={(e) => setPes_Promedio(e.target.value)} />
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

export default FormMuestreo;