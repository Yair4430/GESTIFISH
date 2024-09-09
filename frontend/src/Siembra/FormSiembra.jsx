import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormSiembra = ({ buttonForm, siembra, URI, updateTextButton, getAllSiembra, closeModal }) => {
    const [Fec_Siembra, setFec_Siembra] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Fec_PosibleCosecha, setFec_PosibleCosecha] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Id_Especie, setId_Especie] = useState('');
    const [Id_Estanque, setId_Estanque] = useState('');
    const [Obs_Siembra, setObs_Siembra] = useState('');
    const [Pes_Actual, setPes_Actual] = useState('');
    const [Hor_Siembra, setHor_Siembra] = useState('');
    const [Gan_Peso, setGan_Peso] = useState('');
    const [Vlr_Siembra, setVlr_Siembra] = useState('');
    const [DatosResponsable, setDatosResponsable] = useState([]);
    const [DatosEspecie, setDatosEspecie] = useState([]);
    const [DatosEstanque, setDatosEstanque] = useState([]);

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Fec_Siembra,
                Can_Peces,
                Fec_PosibleCosecha,
                Id_Responsable,
                Id_Especie,
                Id_Estanque,
                Obs_Siembra,
                Pes_Actual,
                Hor_Siembra,
                Gan_Peso,
                Vlr_Siembra
            };

            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${siembra.Id_Siembra}`, data);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                }).then(() => {
                // updateTextButton('Enviar');
                clearForm(); 
                getAllSiembra()
                $('#modalForm').modal('hide');
                });
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, data);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                    getAllSiembra()
                }
            }

            // getAllSiembra(); 
            // closeModal();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el registro de siembra.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setFec_Siembra('');
        setCan_Peces('');
        setFec_PosibleCosecha('');
        setId_Responsable('');
        setId_Especie('');
        setId_Estanque('');
        setObs_Siembra('');
        setPes_Actual('');
        setHor_Siembra('');
        setGan_Peso('');
        setVlr_Siembra('');
    };

    const setData = () => {
        setFec_Siembra(siembra.Fec_Siembra);
        setCan_Peces(siembra.Can_Peces);
        setFec_PosibleCosecha(siembra.Fec_PosibleCosecha);
        setId_Responsable(siembra.Id_Responsable);
        setId_Especie(siembra.Id_Especie);
        setId_Estanque(siembra.Id_Estanque);
        setObs_Siembra(siembra.Obs_Siembra);
        setPes_Actual(siembra.Pes_Actual);
        setHor_Siembra(siembra.Hor_Siembra);
        setGan_Peso(siembra.Gan_Peso);
        setVlr_Siembra(siembra.Vlr_Siembra);
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

        const getEspecies = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/especie/');
                setDatosEspecie(response.data);
            } catch (error) {
                console.error('Error al obtener especies:', error);
            }
        };

        const getEstanques = async () => {
            try {
                const response = await axios.get(process.env.ROUTER_PRINCIPAL + '/estanque/');
                setDatosEstanque(response.data);
            } catch (error) {
                console.error('Error al obtener estanques:', error);
            }
        };

        getResponsable();
        getEspecies();
        getEstanques();
    }, []);

    useEffect(() => {
        if (siembra) {
            setData();
        }
    }, [siembra]);

    return (
        <div className="card">
            <div className="card-header bg-primary text-white">
                <h1 className="text-center">
                    {buttonForm === 'Actualizar' ? 'Actualizar Siembra' : 'Registrar Siembra'}
                </h1>
            </div>
            <div className="card-body">
                <form id="siembraForm" onSubmit={sendForm} className="fw-bold m-2">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Fec_Siembra" className="form-label">Fecha de Siembra:</label>
                                <input className="form-control" type="date" id="Fec_Siembra" value={Fec_Siembra} onChange={(e) => setFec_Siembra(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Can_Peces" className="form-label">Cantidad de Peces:</label>
                                <input className="form-control" type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Fec_PosibleCosecha" className="form-label">Fecha Posible Cosecha:</label>
                                <input className="form-control" type="date" id="Fec_PosibleCosecha" value={Fec_PosibleCosecha} onChange={(e) => setFec_PosibleCosecha(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Id_ResponsableSelect" className="form-label">Responsable:</label>
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
                                <label htmlFor="Id_EspecieSelect" className="form-label">Especie:</label>
                                <select className="form-control" id="Id_EspecieSelect" value={Id_Especie} onChange={(e) => setId_Especie(e.target.value)} required>
                                    <option value="">Selecciona una...</option>
                                    {DatosEspecie.map((especie) => (
                                        <option key={especie.Id_Especie} value={especie.Id_Especie}>
                                            {especie.Nom_Especie}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Id_EstanqueSelect" className="form-label">Estanque:</label>
                                <select className="form-control" id="Id_EstanqueSelect" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} required>
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
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Pes_Actual" className="form-label">Peso Actual:</label>
                                <input className="form-control" type="number" id="Pes_Actual" value={Pes_Actual} onChange={(e) => setPes_Actual(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Hor_Siembra" className="form-label">Hora de Siembra:</label>
                                <input className="form-control" type="time" id="Hor_Siembra" value={Hor_Siembra} onChange={(e) => setHor_Siembra(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Gan_Peso" className="form-label">Ganancia de Peso:</label>
                                <input className="form-control" type="number" id="Gan_Peso" value={Gan_Peso} onChange={(e) => setGan_Peso(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Vlr_Siembra" className="form-label">Valor de Siembra:</label>
                                <input className="form-control" type="number" id="Vlr_Siembra" value={Vlr_Siembra} onChange={(e) => setVlr_Siembra(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="Obs_Siembra" className="form-label">Observaciones:</label>
                                <textarea className="form-control" id="Obs_Siembra" value={Obs_Siembra} onChange={(e) => setObs_Siembra(e.target.value)} rows="3" required />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">{buttonForm}</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default FormSiembra;
