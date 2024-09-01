import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormEstanque = ({ buttonForm, estanque, URI, updateTextButton, getAllEstanques }) => {
    const [Id_Estanque, setId_Estanque] = useState('');
    const [Nom_Estanque, setNom_Estanque] = useState('');
    const [Esp_Agua, setEsp_Agua] = useState('');
    const [Tip_Estanque, setTip_Estanque] = useState('');
    const [Lar_Estanque, setLar_Estanque] = useState('');
    const [Anc_Estanque, setAnc_Estanque] = useState('');
    const [Des_Estanque, setDes_Estanque] = useState('');
    const [Img_Estanque, setImg_Estanque] = useState(null);
    const [Rec_Agua, setRec_Agua] = useState('');

    const inputFoto = useRef(null);

    const sendForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Id_Estanque', Id_Estanque);
        formData.append('Nom_Estanque', Nom_Estanque);
        formData.append('Esp_Agua', Esp_Agua);
        formData.append('Tip_Estanque', Tip_Estanque);
        formData.append('Lar_Estanque', Lar_Estanque);
        formData.append('Anc_Estanque', Anc_Estanque);
        formData.append('Des_Estanque', Des_Estanque);
        formData.append('Img_Estanque', Img_Estanque);
        formData.append('Rec_Agua', Rec_Agua);

        try {
            if (buttonForm === 'Actualizar') {
                const respuesta = await axios.put(`${URI}${estanque.Id_Estanque}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (respuesta.status === 200) {
                    Swal.fire({
                        title: 'Actualizado',
                        text: '¡Registro actualizado exitosamente!',
                        icon: 'success'
                    });
                    updateTextButton('Enviar');
                    clearForm();
                    getAllEstanques();
                } else {
                    console.warn('HTTP Status:', respuesta.status);
                }
            } else if (buttonForm === 'Enviar') {
                const respuestaApi = await axios.post(URI, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (respuestaApi.status === 201) {
                    Swal.fire({
                        title: 'Guardado',
                        text: '¡Registro guardado exitosamente!',
                        icon: 'success'
                    });
                    clearForm();
                    getAllEstanques();
                } else {
                    console.warn('HTTP Status:', respuestaApi.status);
                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error.response?.status || error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo guardar el estanque.',
                icon: 'error'
            });
        }
    };

    const clearForm = () => {
        setId_Estanque('');
        setNom_Estanque('');
        setEsp_Agua('');
        setTip_Estanque('');
        setLar_Estanque('');
        setAnc_Estanque('');
        setDes_Estanque('');
        setImg_Estanque(null);
        if (inputFoto.current) {
            inputFoto.current.value = '';
        }
        setRec_Agua('');
    };

    const setData = () => {
        setId_Estanque(estanque.Id_Estanque);
        setNom_Estanque(estanque.Nom_Estanque);
        setEsp_Agua(estanque.Esp_Agua);
        setTip_Estanque(estanque.Tip_Estanque);
        setLar_Estanque(estanque.Lar_Estanque);
        setAnc_Estanque(estanque.Anc_Estanque);
        setDes_Estanque(estanque.Des_Estanque);
        setImg_Estanque(estanque.Img_Estanque);
        setRec_Agua(estanque.Rec_Agua);
    };

    useEffect(() => {
        if (estanque) {
            setData();
        }
    }, [estanque]);

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1 className="text-center">Registrar Estanques</h1>
                    </div>
                    <div className="card-body">
                        <form id="estanqueForm" onSubmit={sendForm} className="fw-bold m-2 form-no-hover">
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Id_Estanque" className="col-sm-5 col-form-label text-end">Número del Estanque:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Id_Estanque" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Nom_Estanque" className="col-sm-5 col-form-label text-end">Nombre del Estanque:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="text" id="Nom_Estanque" value={Nom_Estanque} onChange={(e) => setNom_Estanque(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Esp_Agua" className="col-sm-5 col-form-label text-end">Espejo de Agua:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Esp_Agua" value={Esp_Agua} onChange={(e) => setEsp_Agua(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Tip_Estanque" className="col-sm-5 col-form-label text-end">Tipo de Estanque:</label>
                                <div className="col-sm-4">
                                    <select className="form-control" id="Tip_Estanque" value={Tip_Estanque} onChange={(e) => setTip_Estanque(e.target.value)} required>
                                        <option value="">Selecciona uno...</option>
                                        <option value="Estanque">Estanque</option>
                                        <option value="Lago">Lago</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Lar_Estanque" className="col-sm-5 col-form-label text-end">Largo:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Lar_Estanque" value={Lar_Estanque} onChange={(e) => setLar_Estanque(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Anc_Estanque" className="col-sm-5 col-form-label text-end">Ancho:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Anc_Estanque" value={Anc_Estanque} onChange={(e) => setAnc_Estanque(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Des_Estanque" className="col-sm-5 col-form-label text-end">Descripción:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="text" id="Des_Estanque" value={Des_Estanque} onChange={(e) => setDes_Estanque(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Img_Estanque" className="col-sm-5 col-form-label text-end">Imagen:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="file" id="Img_Estanque" onChange={(e) => setImg_Estanque(e.target.files[0])} ref={inputFoto} />
                                </div>
                            </div>
                            <div className="form-group row mb-3 gap-1 align-items-center">
                                <label htmlFor="Rec_Agua" className="col-sm-5 col-form-label text-end">Recambio de Agua:</label>
                                <div className="col-sm-4">
                                    <input className="form-control" type="number" id="Rec_Agua" value={Rec_Agua} onChange={(e) => setRec_Agua(e.target.value)} required />
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
            </div>

        </>
    );
};

export default FormEstanque;
