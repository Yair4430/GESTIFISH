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
        <div className="card">
            <div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                <h1 className="text-center">
                    {buttonForm === 'Actualizar' ? 'Actualizar Especies' : 'Registrar Especies'}
                </h1>
            </div>
            <div className="card-body">
                <form id="especieForm" onSubmit={sendForm} className="fw-bold m-2 form-no-hover">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Nom_Especie" className="form-label">Nombre de la Especie:</label>
                                <input className="form-control" type="text" id="Nom_Especie" value={Nom_Especie} onChange={(e) => setNom_Especie(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Car_Especie" className="form-label">Características de la Especie:</label>
                                <input className="form-control" type="text" id="Car_Especie" value={Car_Especie} onChange={(e) => setCar_Especie(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Img_Especie" className="form-label">Imagen:</label>
                                <input className="form-control" type="file" id="Img_Especie" onChange={(e) => setImg_Especie(e.target.files[0])} ref={inputFoto} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Tam_Promedio" className="form-label">Tamaño Promedio:</label>
                                <input className="form-control" type="number" id="Tam_Promedio" value={Tam_Promedio} onChange={(e) => setTam_Promedio(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Den_Especie" className="form-label">Densidad de la Especie:</label>
                                <input className="form-control" type="text" id="Den_Especie" value={Den_Especie} onChange={(e) => setDen_Especie(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" id="boton" className="btn btn-success btn-block m-2">
                            {buttonForm}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
};

export default FormEspecie;