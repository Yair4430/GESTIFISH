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
                });
                updateTextButton('Enviar');
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
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Alimentación</h1>
            <form id="alimentacionForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Fec_Alimentacion" className="m-2">Fecha de Alimentación:</label>
                <input type="date" id="Fec_Alimentacion" value={Fec_Alimentacion} onChange={(e) => setFec_Alimentacion(e.target.value)} />
                <br />
                <label htmlFor="Can_RacionKg" className="m-2">Cantidad de Ración (Kg):</label>
                <input type="number" id="Can_RacionKg" value={Can_RacionKg} onChange={(e) => setCan_RacionKg(e.target.value)} />
                <br />
                <label htmlFor="Tip_Alimento" className="m-2">Tipo de Alimento:</label>
                <select id="Tip_Alimento" value={Tip_Alimento} onChange={(e) => setTip_Alimento(e.target.value)}>
                    <option value="">Selecciona uno...</option>
                    <option value="Concentrado">Concentrado</option>
                    <option value="Sal">Sal</option>
                </select>
                <br />
                <label htmlFor="Hor_Alimentacion" className="m-2">Hora de Alimentación:</label>
                <input type="time" id="Hor_Alimentacion" value={Hor_Alimentacion} onChange={(e) => setHor_Alimentacion(e.target.value)} />
                <br />
                <label htmlFor="Vlr_Alimentacion" className="m-2">Valor de Alimentación:</label>
                <input type="number" id="Vlr_Alimentacion" value={Vlr_Alimentacion} onChange={(e) => setVlr_Alimentacion(e.target.value)} />
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
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormAlimentacion;
