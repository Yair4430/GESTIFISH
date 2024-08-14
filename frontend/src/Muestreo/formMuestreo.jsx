import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormMuestreo = ({ buttonForm, muestreo, URI, updateTextButton, getAllMuestreo }) => {
    const [Id_Muestreo, setId_Muestreo] = useState('');
    const [Fec_Muestreo, setFec_Muestreo] = useState('');
    const [Num_Peces, setNum_Peces] = useState('');
    const [Obs_Muestreo, setObs_Muestreo] = useState('');
    const [Pes_Esperado, setPes_Esperado] = useState('');
    const [Id_Siembra, setId_Siembra] = useState('');
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Hor_Muestreo, setHor_Muestreo] = useState('');
    const [Pes_Promedio, setPes_Promedio] = useState('');

    const sendFormM = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                const respuesta = await axios.put(`${URI}${muestreo.Id_Muestreo}`, {
                    Id_Muestreo,
                    Fec_Muestreo,
                    Num_Peces,
                    Obs_Muestreo,
                    Pes_Esperado,
                    Id_Siembra,
                    Id_Responsable,
                    Hor_Muestreo,
                    Pes_Promedio
                });

                if (respuesta.status >= 200 && respuesta.status < 300) {
                    Swal.fire({
                        title: 'Actualizado',
                        text: '¡Registro actualizado exitosamente!',
                        icon: 'success'
                    });
                    updateTextButton('Enviar');
                    clearFormM();
                    getAllMuestreo();
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }

            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, {
                    Fec_Muestreo,
                    Num_Peces,
                    Obs_Muestreo,
                    Pes_Esperado,
                    Id_Siembra,
                    Id_Responsable,
                    Hor_Muestreo,
                    Pes_Promedio
                });

                if (respuestaApi.status === 201) {
                    Swal.fire({
                        title: 'Guardado',
                        text: '¡Registro guardado exitosamente!',
                        icon: 'success'
                    });
                    clearFormM();
                    getAllMuestreo();
                } else {
                    console.warn('HTTP Status:', respuestaApi.status);
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error.response?.status || error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el muestreo.',
                icon: 'error'
            });
        }
    };

    const clearFormM = () => {
        setId_Muestreo('');
        setFec_Muestreo('');
        setNum_Peces('');
        setObs_Muestreo('');
        setPes_Esperado('');
        setId_Siembra('');
        setId_Responsable('');
        setHor_Muestreo('');
        setPes_Promedio('');
    };

    const setDataM = () => {
        setId_Muestreo(muestreo.Id_Muestreo);
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
        if (muestreo) {
            setDataM();
        }
    }, [muestreo]);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Registrar Muestreos</h1>
                <form id="muestreoForm" onSubmit={sendFormM} className="fw-bold m-2">
                    <label htmlFor="Fec_Muestreo" className="m-2">Fecha del Muestreo:</label>
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
                    <label htmlFor="Id_Siembra" className="m-2">ID de la Siembra:</label>
                    <input type="number" id="Id_Siembra" value={Id_Siembra} onChange={(e) => setId_Siembra(e.target.value)} />
                    <br />
                    <label htmlFor="Id_Responsable" className="m-2">ID del Responsable:</label>
                    <input type="number" id="Id_Responsable" value={Id_Responsable} onChange={(e) => setId_Responsable(e.target.value)} />
                    <br />
                    <label htmlFor="Hor_Muestreo" className="m-2">Hora del Muestreo:</label>
                    <input type="time" id="Hor_Muestreo" value={Hor_Muestreo} onChange={(e) => setHor_Muestreo(e.target.value)} />
                    <br />
                    <label htmlFor="Pes_Promedio" className="m-2">Peso Promedio:</label>
                    <input type="number" id="Pes_Promedio" value={Pes_Promedio} onChange={(e) => setPes_Promedio(e.target.value)} />
                    <br />
                    <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
                </form>
            </div>
        </>
    )
}

export default FormMuestreo;
