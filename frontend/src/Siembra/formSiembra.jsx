import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormSiembra = ({ buttonForm, siembra, URI, updateTextButton, getAllSiembras, responsables, especies, estanques }) => {
    const [Can_Peces, setCan_Peces] = useState('');
    const [Fec_Siembra, setFec_Siembra] = useState('');
    const [Fec_PosibleCosecha, setFec_PosibleCosecha] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Id_Especie, setId_Especie] = useState('');
    const [Id_Estanque, setId_Estanque] = useState('');
    const [Pes_Actual, setPes_Actual] = useState('');
    const [Obs_Siembra, setObs_Siembra] = useState('');
    const [Hor_Siembra, setHor_Siembra] = useState('');
    const [Gan_Peso, setGan_Peso] = useState('');
    const [Vlr_Siembra, setVlr_Siembra] = useState('');

    const sendForm = async (e) => {
        e.preventDefault();
        const formData = {
            Can_Peces,
            Fec_Siembra,
            Fec_PosibleCosecha,
            Id_Responsable,
            Id_Especie,
            Id_Estanque,
            Pes_Actual,
            Obs_Siembra,
            Hor_Siembra,
            Gan_Peso,
            Vlr_Siembra
        };
    
        try {
            if (buttonForm === 'Actualizar') {
                await axios.put(`${URI}${siembra.Id_Siembra}`, formData);
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                updateTextButton('Enviar');
                clearForm();
                getAllSiembras();
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, formData);
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                    getAllSiembras();
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar la siembra.',
                icon: 'error'
            });
        }
    };
    

    const clearForm = () => {
        setCan_Peces('');
        setFec_Siembra('');
        setFec_PosibleCosecha('');
        setId_Responsable('');
        setId_Especie('');
        setId_Estanque('');
        setPes_Actual('');
        setObs_Siembra('');
        setHor_Siembra('');
        setGan_Peso('');
        setVlr_Siembra('');
    };

    const setData = () => {
        setCan_Peces(siembra.Can_Peces);
        setFec_Siembra(siembra.Fec_Siembra);
        setFec_PosibleCosecha(siembra.Fec_PosibleCosecha);
        setId_Responsable(siembra.Id_Responsable);
        setId_Especie(siembra.Id_Especie);
        setId_Estanque(siembra.Id_Estanque);
        setPes_Actual(siembra.Pes_Actual);
        setObs_Siembra(siembra.Obs_Siembra);
        setHor_Siembra(siembra.Hor_Siembra);
        setGan_Peso(siembra.Gan_Peso);
        setVlr_Siembra(siembra.Vlr_Siembra);
    };

    useEffect(() => {
        if (siembra) {
            setData();
        }
    }, [siembra]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Siembra</h1>
            <form id="siembraForm" onSubmit={sendForm} className="fw-bold m-2">
                {/* <label htmlFor="Can_Peces" className="m-2">Numero de Siembra</label>
                <input type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                <br /> */}
                <label htmlFor="Can_Peces" className="m-2">Cantidad de Peces:</label>
                <input type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} required />
                <br />
                <label htmlFor="Fec_Siembra" className="m-2">Fecha de Siembra:</label>
                <input type="date" id="Fec_Siembra" value={Fec_Siembra} onChange={(e) => setFec_Siembra(e.target.value)} required />
                <br />
                <label htmlFor="Fec_PosibleCosecha" className="m-2">Fecha Posible de Cosecha:</label>
                <input type="date" id="Fec_PosibleCosecha" value={Fec_PosibleCosecha} onChange={(e) => setFec_PosibleCosecha(e.target.value)} required />
                <br />
                <label htmlFor="Id_Responsable" className="m-2">Responsable:</label>
                <select id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} required>
                    <option value="">Seleccione Responsable</option>
                    {responsables.map((responsable) => (
                        <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                            {responsable.Nom_Responsable}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="Id_Especie" className="m-2">Especie:</label>
                <select id="Id_Especie" value={Id_Especie} onChange={(e) => setId_Especie(e.target.value)} required>
                    <option value="">Seleccione Especie</option>
                    {especies.map((especie) => (
                        <option key={especie.Id_Especie} value={especie.Id_Especie}>
                            {especie.Nom_Especie}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="Id_Estanque" className="m-2">Estanque:</label>
                <select id="Id_Estanque" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} required>
                    <option value="">Seleccione Estanque</option>
                    {estanques.map((estanque) => (
                        <option key={estanque.Id_Estanque} value={estanque.Id_Estanque}>
                            {estanque.Nom_Estanque}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="Pes_Actual" className="m-2">Peso Actual:</label>
                <input type="number" id="Pes_Actual" value={Pes_Actual} onChange={(e) => setPes_Actual(e.target.value)} required />
                <br />
                <label htmlFor="Obs_Siembra" className="m-2">Observaciones:</label>
                <input type="text" id="Obs_Siembra" value={Obs_Siembra} onChange={(e) => setObs_Siembra(e.target.value)} />
                <br />
                <label htmlFor="Hor_Siembra" className="m-2">Hora de Siembra:</label>
                <input type="time" id="Hor_Siembra" value={Hor_Siembra} onChange={(e) => setHor_Siembra(e.target.value)} />
                <br />
                <label htmlFor="Gan_Peso" className="m-2">Ganancia de Peso:</label>
                <input type="number" id="Gan_Peso" value={Gan_Peso} onChange={(e) => setGan_Peso(e.target.value)} />
                <br />
                <label htmlFor="Vlr_Siembra" className="m-2">Valor de Siembra:</label>
                <input type="number" id="Vlr_Siembra" value={Vlr_Siembra} onChange={(e) => setVlr_Siembra(e.target.value)} required />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormSiembra;
