import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormTraslado = ({ buttonForm, traslado, URI, updateTextButton, getAllTraslados }) => {
    const [Fec_Traslado, setFec_Traslado] = useState('');
    const [Can_Peces, setCan_Peces] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Obs_Traslado, setObs_Traslado] = useState('');
    const [Hor_Traslado, setHor_Traslado] = useState('');

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
        if (traslado) {
            setData();
        }
    }, [traslado]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Traslado</h1>
            <form id="trasladoForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Fec_Traslado" className="m-2">Fecha de Traslado:</label>
                <input type="date" id="Fec_Traslado" value={Fec_Traslado} onChange={(e) => setFec_Traslado(e.target.value)} />
                <br />
                <label htmlFor="Can_Peces" className="m-2">Cantidad de Peces:</label>
                <input type="number" id="Can_Peces" value={Can_Peces} onChange={(e) => setCan_Peces(e.target.value)} />
                <br />
                <label htmlFor="Id_Responsable" className="m-2">ID Responsable:</label>
                <input type="text" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} />
                <br />
                <label htmlFor="Obs_Traslado" className="m-2">Observaciones:</label>
                <input type="text" id="Obs_Traslado" value={Obs_Traslado} onChange={(e) => setObs_Traslado(e.target.value)} />
                <br />
                <label htmlFor="Hor_Traslado" className="m-2">Hora de Traslado:</label>
                <input type="time" id="Hor_Traslado" value={Hor_Traslado} onChange={(e) => setHor_Traslado(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormTraslado;
