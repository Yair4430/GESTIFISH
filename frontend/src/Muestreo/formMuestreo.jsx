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
                updateTextButton('Enviar');
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
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Muestreo</h1>
            <form id="muestreoForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Fec_Muestreo" className="m-2">Fecha de Muestreo:</label>
                <input type="date" id="Fec_Muestreo" value={Fec_Muestreo} onChange={(e) => setFec_Muestreo(e.target.value)} />
                <br />
                <label htmlFor="Num_Peces" className="m-2">Número de Peces:</label>
                <input type="number" id="Num_Peces" value={Num_Peces} onChange={(e) => setNum_Peces(e.target.value)} />
                <br />
                <label htmlFor="Obs_Muestreo" className="m-2">Observaciones:</label>
                <input type="text" id="Obs_Muestreo" value={Obs_Muestreo} onChange={(e) => setObs_Muestreo(e.target.value)} />
                <br />
                <label htmlFor="Pes_Esperado" className="m-2">Peso Esperado:</label>
                <input type="number" id="Pes_Esperado" value={Pes_Esperado} onChange={(e) => setPes_Esperado(e.target.value)} />
                <br />
                <label htmlFor="Id_SiembraSelect" className="m-2">Fecha Siembra:</label>
                <select id="Id_SiembraSelect" value={Id_Siembra} onChange={(e) => setId_Siembra(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    {DatosSiembra.map((siembra) => (
                        <option key={siembra.Id_Siembra} value={siembra.Id_Siembra}>
                            {siembra.Fec_Siembra}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="Id_ResponsableSelect" className="m-2">Nombre Responsable:</label>
                <select id="Id_ResponsableSelect" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    {DatosResponsable.map((responsable) => (
                        <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                            {responsable.Nom_Responsable}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="Hor_Muestreo" className="m-2">Hora de Muestreo:</label>
                <input type="time" id="Hor_Muestreo" value={Hor_Muestreo} onChange={(e) => setHor_Muestreo(e.target.value)} />
                <br />
                <label htmlFor="Pes_Promedio" className="m-2">Peso Promedio:</label>
                <input type="number" id="Pes_Promedio" value={Pes_Promedio} onChange={(e) => setPes_Promedio(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormMuestreo;
