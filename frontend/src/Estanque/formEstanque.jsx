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
                await axios.put(`${URI}${estanque.Id_Estanque}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                Swal.fire({
                    title: 'Actualizado',
                    text: '¡Registro actualizado exitosamente!',
                    icon: 'success'
                });
                updateTextButton('Enviar');
                clearForm();
                getAllEstanques()
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
                    alert(respuestaApi.data.message);
                    clearForm();
                    getAllEstanques()

                }
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
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
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Registrar Estanques</h1>
                <form id="estanqueForm" onSubmit={sendForm} className="fw-bold m-2">
                    <label htmlFor="Id_Estanque" className="m-2">Número del Estanque:</label>
                    <input type="number" id="Id_Estanque" value={Id_Estanque} onChange={(e) => setId_Estanque(e.target.value)} />
                    <br />
                    <label htmlFor="Nom_Estanque" className="m-2">Nombre del Estanque:</label>
                    <input type="text" id="Nom_Estanque" value={Nom_Estanque} onChange={(e) => setNom_Estanque(e.target.value)} />
                    <br />
                    <label htmlFor="Esp_Agua" className="m-2">Espejo de Agua:</label>
                    <input type="number" id="Esp_Agua" value={Esp_Agua} onChange={(e) => setEsp_Agua(e.target.value)} />
                    <br />
                    <label htmlFor="Tip_Estanque" className="m-2">Tipo de Estanque:</label>
                    <select id="Tip_Estanque" value={Tip_Estanque} onChange={(e) => setTip_Estanque(e.target.value)}>
                        <option value="">Selecciona uno...</option>
                        <option value="Estanque">Estanque</option>
                        <option value="Lago">Lago</option>
                    </select>
                    <br />
                    <label htmlFor="Lar_Estanque" className="m-2">Largo:</label>
                    <input type="number" id="Lar_Estanque" value={Lar_Estanque} onChange={(e) => setLar_Estanque(e.target.value)} />
                    <br />
                    <label htmlFor="Anc_Estanque" className="m-2">Ancho:</label>
                    <input type="number" id="Anc_Estanque" value={Anc_Estanque} onChange={(e) => setAnc_Estanque(e.target.value)} />
                    <br />
                    <label htmlFor="Des_Estanque" className="m-2">Descripción:</label>
                    <input type="text" id="Des_Estanque" value={Des_Estanque} onChange={(e) => setDes_Estanque(e.target.value)} />
                    <br />
                    <label htmlFor="Img_Estanque" className="m-2">Imagen:</label>
                    <input type="file" id="Img_Estanque" onChange={(e) => setImg_Estanque(e.target.files[0])} ref={inputFoto} />
                    <br />
                    <label htmlFor="Rec_Agua" className="m-2">Recambio de Agua:</label>
                    <input type="number" id="Rec_Agua" value={Rec_Agua} onChange={(e) => setRec_Agua(e.target.value)} />
                    <br />
                    <input type="submit" id="boton" value={buttonForm} className="btn btn-success m-2" />
                </form>
            </div>
        </>
    );
};

export default FormEstanque;
