import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormCosecha = ({ buttonForm, cosecha, URI, updateTextButton, getAllCosechas }) => {
    const [Fec_Cosecha, setFec_Cosecha] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Pes_Eviscerado, setPes_Eviscerado] = useState('');
    const [Pes_Viscerado, setPes_Viscerado] = useState('');
    const [Por_Visceras, setPor_Visceras] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Hor_Cosecha, setHor_Cosecha] = useState('');
    const [Vlr_Cosecha, setVlr_Cosecha] = useState('');
    const [Obs_Cosecha, setObs_Cosecha] = useState('');

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

            getAllCosechas(); // Refrescar la lista después de la operación
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar la cosecha.',
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
        setHor_Cosecha(cosecha.Hor_Cosecha);
        setVlr_Cosecha(cosecha.Vlr_Cosecha);
        setObs_Cosecha(cosecha.Obs_Cosecha);
    };

    useEffect(() => {
        if (cosecha) {
            setData();
        }
    }, [cosecha]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Cosecha</h1>
            <form id="cosechaForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Fec_Cosecha" className="m-2">Fecha de Cosecha:</label>
                <input type="date" id="Fec_Cosecha" value={Fec_Cosecha} onChange={(e) => setFec_Cosecha(e.target.value)} />
                <br />
                <label htmlFor="Can_Peces" className="m-2">Cantidad de Peces:</label>
                <input type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} />
                <br />
                <label htmlFor="Pes_Eviscerado" className="m-2">Peso Eviscerado:</label>
                <input type="number" id="Pes_Eviscerado" value={Pes_Eviscerado} onChange={(e) => setPes_Eviscerado(e.target.value)} />
                <br />
                <label htmlFor="Pes_Viscerado" className="m-2">Peso Viscerado:</label>
                <input type="number" id="Pes_Viscerado" value={Pes_Viscerado} onChange={(e) => setPes_Viscerado(e.target.value)} />
                <br />
                <label htmlFor="Por_Visceras" className="m-2">Porcentaje de Vísceras:</label>
                <input type="number" id="Por_Visceras" value={Por_Visceras} onChange={(e) => setPor_Visceras(e.target.value)} />
                <br />
                <label htmlFor="Id_Responsable" className="m-2">ID Responsable:</label>
                <input type="text" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} />
                <br />
                <label htmlFor="Hor_Cosecha" className="m-2">Hora de Cosecha:</label>
                <input type="time" id="Hor_Cosecha" value={Hor_Cosecha} onChange={(e) => setHor_Cosecha(e.target.value)} />
                <br />
                <label htmlFor="Vlr_Cosecha" className="m-2">Valor de la Cosecha:</label>
                <input type="number" id="Vlr_Cosecha" value={Vlr_Cosecha} onChange={(e) => setVlr_Cosecha(e.target.value)} />
                <br />
                <label htmlFor="Obs_Cosecha" className="m-2">Observaciones:</label>
                <input type="text" id="Obs_Cosecha" value={Obs_Cosecha} onChange={(e) => setObs_Cosecha(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormCosecha;