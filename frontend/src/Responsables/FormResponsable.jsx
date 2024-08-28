import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton, getAllResponsable }) => {
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Nom_Responsable, setNom_Responsable] = useState('');
    const [Ape_Responsable, setApe_Responsable] = useState('');
    const [Doc_Responsable, setDoc_Responsable] = useState('');
    const [Tip_Responsable, setTip_Responsable] = useState('');
    const [Cor_Responsable, setCor_Responsable] = useState('');
    const [Num_Responsable, setNum_Responsable] = useState('');

    const sendFormR = async (e) => {
        e.preventDefault();

        try {
            if (buttonForm === 'Actualizar') {
                const respuesta = await axios.put(`${URI}${responsable.Id_Responsable}`, {
                    Id_Responsable,
                    Nom_Responsable,
                    Ape_Responsable,
                    Doc_Responsable,
                    Tip_Responsable,
                    Cor_Responsable,
                    Num_Responsable
                });

                if (respuesta.status >= 200 && respuesta.status < 300) {
                    Swal.fire({
                        title: 'Actualizado',
                        text: '¡Registro actualizado exitosamente!',
                        icon: 'success'
                    });
                    updateTextButton('Enviar');
                    clearFormR();
                    getAllResponsable();
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }

            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, {
                    Nom_Responsable,
                    Ape_Responsable,
                    Doc_Responsable,
                    Tip_Responsable,
                    Cor_Responsable,
                    Num_Responsable
                });

                if (respuestaApi.status === 201) {
                    Swal.fire({
                        title: 'Guardado',
                        text: '¡Registro guardado exitosamente!',
                        icon: 'success'
                    });
                    clearFormR();
                    getAllResponsable();
                } else {
                    console.warn('HTTP Status:', respuestaApi.status);
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error.response?.status || error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el responsable.',
                icon: 'error'
            });
        }
    };

    const clearFormR = () => {
        setId_Responsable('');
        setNom_Responsable('');
        setApe_Responsable('');
        setDoc_Responsable('');
        setTip_Responsable('');
        setCor_Responsable('');
        setNum_Responsable('');
    };

    const setDataR = () => {
        setId_Responsable(responsable.Id_Responsable);
        setNom_Responsable(responsable.Nom_Responsable);
        setApe_Responsable(responsable.Ape_Responsable);
        setDoc_Responsable(responsable.Doc_Responsable);
        setTip_Responsable(responsable.Tip_Responsable);
        setCor_Responsable(responsable.Cor_Responsable);
        setNum_Responsable(responsable.Num_Responsable);
    };

    useEffect(() => {
        if (responsable) {
            setDataR();
        }
    }, [responsable]);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Registrar Responsables</h1>
                <form id="responsableForm" onSubmit={sendFormR} className="fw-bold m-2">
                    <label htmlFor="Nom_Responsable" className="m-2">Nombre del Responsable:</label>
                    <input type="text" id="Nom_Responsable" value={Nom_Responsable} onChange={(e) => setNom_Responsable(e.target.value)} />
                    <br />
                    <label htmlFor="Ape_Responsable" className="m-2">Apellidos del Responsable:</label>
                    <input type="text" id="Ape_Responsable" value={Ape_Responsable} onChange={(e) => setApe_Responsable(e.target.value)} />
                    <br />
                    <label htmlFor="Doc_Responsable" className="m-2">Documento de Identificación:</label>
                    <input type="text" id="Doc_Responsable" value={Doc_Responsable} onChange={(e) => setDoc_Responsable(e.target.value)} />
                    <br />
                    <label htmlFor="Tip_Responsable" className="m-2">Tipo de Responsable:</label>
                    <select id="Tip_Responsable" value={Tip_Responsable} onChange={(e) => setTip_Responsable(e.target.value)}>
                        <option value="">Selecciones uno...</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Pasante">Pasante</option>
                        <option value="Encargado de la Unidad">Encargado de la Unidad</option>
                    </select>
                    <br />
                    <label htmlFor="Cor_Responsable" className="m-2">Correo del Responsable:</label>
                    <input type="text" id="Cor_Responsable" value={Cor_Responsable} onChange={(e) => setCor_Responsable(e.target.value)} />
                    <br />
                    <label htmlFor="Num_Responsable" className="m-2">Número de Telefono:</label>
                    <input type="number" id="Num_Responsable" value={Num_Responsable} onChange={(e) => setNum_Responsable(e.target.value)} />
                    <br />
                    <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
                </form>
            </div>
        </>
    );
};

export default FormResponsable;
