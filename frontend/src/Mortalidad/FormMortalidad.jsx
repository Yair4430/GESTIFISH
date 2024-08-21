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
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Mortalidad</h1>
            <form id="mortalidadForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Fec_Mortalidad" className="m-2">Fecha de Mortalidad:</label>
                <input type="date" id="Fec_Mortalidad" value={Fec_Mortalidad} onChange={(e) => setFec_Mortalidad(e.target.value)} />
                <br />
                <label htmlFor="Can_Peces" className="m-2">Cantidad de Peces:</label>
                <input type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} />
                <br />
                <label htmlFor="Mot_Mortalidad" className="m-2">Motivo de Mortalidad:</label>
                <input type="text" id="Mot_Mortalidad" value={Mot_Mortalidad} onChange={(e) => setMot_Mortalidad(e.target.value)} />
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

export default FormMortalidad;
