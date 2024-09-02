import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormMortalidad = ({ buttonForm, mortalidad, URI, updateTextButton, getAllMortalidad }) => {
    const [Fec_Mortalidad, setFec_Mortalidad] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Mot_Mortalidad, setMot_Mortalidad] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Fec_Mortalidad,
                Can_Peces,
                Mot_Mortalidad,
                Id_Siembra,
                Id_Responsable
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${mortalidad.Id_Mortalidad}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                updateTextButton('Enviar');
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

            getAllMortalidad(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de mortalidad.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Mortalidad('');
        setCan_Peces('');
        setMot_Mortalidad('');
        setId_Siembra('');
        setId_Responsable('');
    };

    const setData = () => {
        setFec_Mortalidad(mortalidad.Fec_Mortalidad);
        setCan_Peces(mortalidad.Can_Peces);
        setMot_Mortalidad(mortalidad.Mot_Mortalidad);
        setId_Siembra(mortalidad.Id_Siembra);
        setId_Responsable(mortalidad.Id_Responsable);
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
        if (mortalidad) {
            setData();
        }
    }, [mortalidad]);

    return (
        <>
        {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '400px', paddingTop: '70px' }}>

            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h1 className="text-center">Registrar Mortalidad</h1>
                </div>
                <div className="card-body">
                    <form id="mortalidadForm" onSubmit={sendForm} className="fw-bold m-2">
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Fec_Mortalidad" className="col-sm-5 col-form-label text-end">Fecha de Mortalidad:</label>
                            <div className="col-sm-4">
                                <input className="form-control" type="date" id="Fec_Mortalidad" value={Fec_Mortalidad} onChange={(e) => setFec_Mortalidad(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Can_Peces" className="col-sm-5 col-form-label text-end">Cantidad de Peces:</label>
                            <div className="col-sm-4">
                                <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Mot_Mortalidad" className="col-sm-5 col-form-label text-end">Motivo de Mortalidad:</label>
                            <div className="col-sm-4">
                                <input className="form-control" type="text" id="Mot_Mortalidad" value={Mot_Mortalidad} onChange={(e) => setMot_Mortalidad(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Id_SiembraSelect" className="col-sm-5 col-form-label text-end">Fecha Siembra:</label>
                            <div className="col-sm-4">
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
                        <div className="form-group row mb-3 gap-1 align-items-center">
                            <label htmlFor="Id_ResponsableSelect" className="col-sm-5 col-form-label text-end">Nombre Responsable:</label>
                            <div className="col-sm-4">
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
                        <div className="text-center">
                            <button type="submit" id="boton" className="btn btn-success btn-block m-2">
                                {buttonForm}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

);
};

export default FormMortalidad;