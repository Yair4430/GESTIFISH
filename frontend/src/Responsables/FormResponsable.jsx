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
        {/* <div className="container mt-5">
        <div style={{ marginLeft: '300px', paddingTop: '70px' }}> */}

          <div className="card">
            <div className="card-header bg-primary text-white">
              <h1 className="text-center">Registro de Responsables</h1>
            </div>
            <div className="card-body">
              <form id="responsableForm" onSubmit={sendFormR} className="fw-bold m-2 form-no-hover" >
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Nom_Responsable" className="col-sm-5 col-form-label text-end">Nombre del Responsable:</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" id="Nom_Responsable" value={Nom_Responsable} onChange={(e) => setNom_Responsable(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Ape_Responsable"className="col-sm-5 col-form-label text-end">Apellidos del Responsable:</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" id="Ape_Responsable" value={Ape_Responsable} onChange={(e) => setApe_Responsable(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Doc_Responsable" className="col-sm-5 col-form-label text-end">Documento de Identificación:</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" id="Doc_Responsable" value={Doc_Responsable} onChange={(e) => setDoc_Responsable(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Tip_Responsable" className="col-sm-5 col-form-label text-end">Tipo de Responsable:
                  </label>
                  <div className="col-sm-4">
                    <select className="form-control" id="Tip_Responsable" value={Tip_Responsable} onChange={(e) => setTip_Responsable(e.target.value)} required >
                      <option value="">Seleccione uno...</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Pasante">Pasante</option>
                      <option value="Encargado de la Unidad">Encargado de la Unidad</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Cor_Responsable" className="col-sm-5 col-form-label text-end">Correo del Responsable:</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="email" id="Cor_Responsable" value={Cor_Responsable} onChange={(e) => setCor_Responsable(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group row mb-3 gap-1 align-items-center">
                  <label htmlFor="Num_Responsable" className="col-sm-5 col-form-label text-end">Número de Teléfono:</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="number" id="Num_Responsable" value={Num_Responsable} onChange={(e) => setNum_Responsable(e.target.value)} required />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" id="boton" className="btn btn-primary btn-block m-2"
                  >{buttonForm} </button>
                </div>
              </form>
            </div>
          </div>
        {/* </div> */}
      </>
    );
  };
  
  export default FormResponsable;