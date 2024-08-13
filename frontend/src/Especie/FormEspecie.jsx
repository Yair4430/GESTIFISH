import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormEspecie = ({ buttonForm, especie, URI, updateTextButton, getAllEspecies }) => {
    const [Nom_Especie, setNom_Especie] = useState('');
    const [Car_Especie, setCar_Especie] = useState('');
    const [Img_Especie, setImg_Especie] = useState(null);
    const [Tam_Promedio, setTam_Promedio] = useState('');
    const [Den_Especie, setDen_Especie] = useState('');

    const inputFoto = useRef(null);

    const sendForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Nom_Especie', Nom_Especie);
        formData.append('Car_Especie', Car_Especie);
        formData.append('Tam_Promedio', Tam_Promedio);
        formData.append('Den_Especie', Den_Especie);
        if (Img_Especie) {
            formData.append('Img_Especie', Img_Especie);
        }

        // Verificar el contenido de FormData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            let respuestaApi;
            if (buttonForm === 'Actualizar') {
                respuestaApi = await axios.put(`${URI}${especie.Id_Especie}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else if (buttonForm === 'Enviar') {
                respuestaApi = await axios.post(URI, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            if (respuestaApi && respuestaApi.status >= 200 && respuestaApi.status < 300) {
                Swal.fire({
                    title: buttonForm === 'Actualizar' ? 'Actualizado' : 'Guardado',
                    text: `¡Registro ${buttonForm === 'Actualizar' ? 'actualizado' : 'guardado'} exitosamente!`,
                    icon: 'success'
                });
            } else {
                console.warn('HTTP Status:', respuestaApi?.status);
            }

            clearForm();
            getAllEspecies();
            updateTextButton('Enviar');
        } catch (error) {
            console.error('Error al enviar el formulario:', error.response?.status || error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar la especie.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setNom_Especie('');
        setCar_Especie('');
        setImg_Especie(null);
        if (inputFoto.current) {
            inputFoto.current.value = '';
        }
        setTam_Promedio('');
        setDen_Especie('');
    };

    const setData = () => {
        setNom_Especie(especie.Nom_Especie || '');
        setCar_Especie(especie.Car_Especie || '');
        setTam_Promedio(especie.Tam_Promedio || '');
        setDen_Especie(especie.Den_Especie || '');
    };

    useEffect(() => {
        if (especie) {
            setData();
        }
    }, [especie]);

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="fs-1 fw-bold d-flex">Registrar Especies</h1>
            <form id="especieForm" onSubmit={sendForm} className="fw-bold m-2">
                <label htmlFor="Nom_Especie" className="m-2">Nombre de la Especie:</label>
                <input type="text" id="Nom_Especie" value={Nom_Especie} onChange={(e) => setNom_Especie(e.target.value)} />
                <br />
                <label htmlFor="Car_Especie" className="m-2">Características de la Especie:</label>
                <input type="text" id="Car_Especie" value={Car_Especie} onChange={(e) => setCar_Especie(e.target.value)} />
                <br />
                <label htmlFor="Img_Especie" className="m-2">Imagen:</label>
                <input type="file" id="Img_Especie" onChange={(e) => setImg_Especie(e.target.files[0])} ref={inputFoto} />
                <br />
                <label htmlFor="Tam_Promedio" className="m-2">Tamaño Promedio:</label>
                <input type="number" id="Tam_Promedio" value={Tam_Promedio} onChange={(e) => setTam_Promedio(e.target.value)} />
                <br />
                <label htmlFor="Den_Especie" className="m-2">Densidad de la Especie:</label>
                <input type="text" id="Den_Especie" value={Den_Especie} onChange={(e) => setDen_Especie(e.target.value)} />
                <br />
                <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
            </form>
        </div>
    );
};

export default FormEspecie;
