import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormEspecie = ({ buttonForm, especie, URI, updateTextButton, getAllEspecies }) => {
    const [Nom_Especie, setNom_Especie] = useState('');
    const [Car_Especie, setCar_Especie] = useState('');
    const [Img_Especie, setImg_Especie] = useState(null);
    const [Img_EspecieUrl, setImg_EspecieUrl] = useState(null); // Para almacenar la URL de la imagen existente
    const [Tam_Promedio, setTam_Promedio] = useState('');
    const [Den_Especie, setDen_Especie] = useState('');

    const inputFoto = useRef(null);

    const sendForm = async (e) => {
        e.preventDefault();
        console.log("antesd de useStatue")
        const [formData, setFormData] = useState({
            Nom_Especie: '',
            Car_Especie: '',
            Tam_Promedio: '',
            Den_Especie: '',
            Img_Especie: null
        });

        console.log("des de useStatue")

        try {
            console.log(buttonForm)
            if (buttonForm === 'Actualizar') {
                console.log(formData)
                const response = await axios.put(`${URI}${especie.Id_Especie}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log(response)
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                updateTextButton('Enviar');
                clearForm();
                getAllEspecies();
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                Swal.fire({
                    title: 'Guardado',
                    text: '¡Registro guardado exitosamente!',
                    icon: 'success'
                });
                if (respuestaApi.status === 201) {
                    clearForm();
                    getAllEspecies();
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
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
        setImg_EspecieUrl(null);
        if (inputFoto.current) {
            inputFoto.current.value = '';
        }
        setTam_Promedio('');
        setDen_Especie('');
    };
    
    const setData = () => {
        setNom_Especie(especie.Nom_Especie || ''); // Asegúrate de que nunca sea undefined
        setCar_Especie(especie.Car_Especie || '');
        // setImg_Especie(especie.Img_Especie || null); // Para la imagen, podría ser mejor mantenerlo como null
        setImg_EspecieUrl(especie.Img_Especie || null);
        setTam_Promedio(especie.Tam_Promedio || '');
        setDen_Especie(especie.Den_Especie || '');
    };    

    useEffect(() => {
        if (especie) {
            setData();
        } else {
            // Limpia el formulario si no hay especie
            clearForm();
        }
    }, [especie]);
    
    return (
        <>
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
        </>
    );
};

export default FormEspecie;