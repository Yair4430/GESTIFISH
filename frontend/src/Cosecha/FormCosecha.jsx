import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormCosecha = ({ buttonForm, cosecha, URI, updateTextButton, getAllCosecha }) => {
    const [Fec_Cosecha, setFec_Cosecha] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Pes_Eviscerado, setPes_Eviscerado] = useState('');
    const [Pes_Viscerado, setPes_Viscerado] = useState('');
    const [Por_Visceras, setPor_Visceras] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Hor_Cosecha, setHor_Cosecha] = useState('');
    const [Vlr_Cosecha, setVlr_Cosecha] = useState('');
    const [Obs_Cosecha, setObs_Cosecha] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosSiembra, setDatosSiembra] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Fec_Cosecha,
                Can_Peces,
                Pes_Eviscerado,
                Pes_Viscerado,
                Por_Visceras,
                Id_Responsable,
                Id_Siembra,
                Hor_Cosecha,
                Vlr_Cosecha,
                Obs_Cosecha
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${cosecha.Id_Cosecha}`, data);
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

            getAllCosecha(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de cosecha.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Cosecha('');
        setCan_Peces('');
        setPes_Eviscerado('');
        setPes_Viscerado('');
        setPor_Visceras('');
        setId_Responsable('');
        setId_Siembra('');
        setHor_Cosecha('');
        setVlr_Cosecha('');
        setObs_Cosecha('');
    };

    const setData = () => {
        setFec_Cosecha(cosecha.Fec_Cosecha);
        setCan_Peces(cosecha.Can_Peces);
        setPes_Eviscerado(cosecha.Pes_Eviscerado);
        setPes_Viscerado(cosecha.Pes_Viscerado);
        setPor_Visceras(cosecha.Por_Visceras);
        setId_Responsable(cosecha.Id_Responsable);
        setId_Siembra(cosecha.Id_Siembra);
        setHor_Cosecha(cosecha.Hor_Cosecha);
        setVlr_Cosecha(cosecha.Vlr_Cosecha);
        setObs_Cosecha(cosecha.Obs_Cosecha);
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
        if (cosecha) {
            setData();
        }
    }, [cosecha]);

    return (
        <>
            {/* <div className="container mt-5"> */}
        <div style={{ marginLeft: '400px', paddingTop: '70px' }}>

                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Registrar Cosecha</h1>
                    </div>
                    <div className="card-body">
                        <form id="cosechaForm" onSubmit={sendForm} className="fw-bold m-2">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Fec_Cosecha" className="col-sm-5 col-form-label text-end">Fecha de Cosecha:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="date" id="Fec_Cosecha" value={Fec_Cosecha} onChange={(e) => setFec_Cosecha(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Can_Peces" className="col-sm-5 col-form-label text-end">Cantidad de Peces:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Pes_Eviscerado" className="col-sm-5 col-form-label text-end">Peso Eviscerado:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Pes_Eviscerado" value={Pes_Eviscerado} onChange={(e) => setPes_Eviscerado(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Pes_Viscerado" className="col-sm-5 col-form-label text-end">Peso Viscerado:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Pes_Viscerado" value={Pes_Viscerado} onChange={(e) => setPes_Viscerado(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Por_Visceras" className="col-sm-5 col-form-label text-end">Porcentaje de Vísceras:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Por_Visceras" value={Por_Visceras} onChange={(e) => setPor_Visceras(e.target.value)} required />
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
                                <label htmlFor="Hor_Cosecha" className="col-sm-5 col-form-label text-end">Hora de Cosecha:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="time" id="Hor_Cosecha" value={Hor_Cosecha} onChange={(e) => setHor_Cosecha(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Vlr_Cosecha" className="col-sm-5 col-form-label text-end">Valor de Cosecha:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Vlr_Cosecha" value={Vlr_Cosecha} onChange={(e) => setVlr_Cosecha(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Obs_Cosecha" className="col-sm-5 col-form-label text-end">Observaciones:</label>
                                <div className="col-sm-4">
                                    <textarea className="form-control" id="Obs_Cosecha" value={Obs_Cosecha} onChange={(e) => setObs_Cosecha(e.target.value)} />
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

export default FormCosecha;