import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton, getAllResponsable, closeModal }) => {
    const [Id_Responsable, setId_Responsable] = useState('');
    const [Nom_Responsable, setNom_Responsable] = useState('');
    const [Ape_Responsable, setApe_Responsable] = useState('');
    const [Doc_Responsable, setDoc_Responsable] = useState('');
    const [Tip_Responsable, setTip_Responsable] = useState('');
    const [Cor_Responsable, setCor_Responsable] = useState('');
    const [Num_Responsable, setNum_Responsable] = useState('');

    // Validar campos antes de enviar el formulario
    const validateForm = () => {
        if (!Nom_Responsable.trim()) {
            Swal.fire('Error', 'El nombre del responsable es obligatorio', 'error');
            return false;
        }
        if (!Ape_Responsable.trim()) {
            Swal.fire('Error', 'Los apellidos del responsable son obligatorios', 'error');
            return false;
        }
        if (!Doc_Responsable.toString().trim()) {
            Swal.fire('Error', 'El documento de identificación es obligatorio', 'error');
            return false;
        }
        if (!Tip_Responsable) {
            Swal.fire('Error', 'Debe seleccionar el tipo de responsable', 'error');
            return false;
        }
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(Cor_Responsable)) {
            Swal.fire('Error', 'Debe ingresar un correo electrónico válido', 'error');
            return false;
        }
        // Validar que el número de teléfono tenga exactamente 10 dígitos
        const phonePattern = /^[0-9]{10}$/; // Acepta exactamente 10 dígitos
        if (!phonePattern.test(Num_Responsable)) {
            Swal.fire('Error', 'El número de teléfono debe tener exactamente 10 dígitos', 'error');
            return false;
        }
        return true;
    };

    const sendFormR = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (
            Nom_Responsable === responsable.Nom_Responsable &&
            Ape_Responsable === responsable.Ape_Responsable &&
            Doc_Responsable === responsable.Doc_Responsable &&
            Tip_Responsable === responsable.Tip_Responsable &&
            Cor_Responsable === responsable.Cor_Responsable &&
            Num_Responsable === responsable.Num_Responsable
        ) {
            Swal.fire({
                title: 'Sin cambios',
                text: 'No ha realizado ningún cambio.',
                icon: 'info'
            });
            return;
        }

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
                    clearFormR();
                    getAllResponsable();
                    closeModal()
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
                }
            }
        } catch (error) {
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

        // Función para evitar la entrada de caracteres inválidos
    const handleKeyDown = (e) => {
        if (["e", "E", "+", "-", ","].includes(e.key)) {
        e.preventDefault();  // Evita que el carácter sea ingresado
        }
    };
    
    // Función para validar que solo números sean permitidos
    const handleNumericInput = (e, setValue) => {
        const value = e.target.value;
    
        // Solo permite dígitos y puntos decimales
        if (!isNaN(value) && !value.includes("e")) {
        setValue(value);  // Actualiza el estado si es un número válido
        }
    };

      // Función para manejar cambios en los campos de texto
      const handleInputChange = (e) => {
        const { name, value, maxLength } = e.target;
      
        if (value.length <= maxLength) {
          if (name === 'Nom_Responsable') {
            setNom_Responsable(value);
          } else if (name === 'Ape_Responsable') {
            setApe_Responsable(value);
          } else if (name === 'Cor_Responsable') {
            setCor_Responsable(value);
          }
        }
      };

    useEffect(() => {
        if (responsable) {
            setDataR();
        }
    }, [responsable]);

    return (
        <>
                {/*<div className="card-header text-dark" style={{ backgroundColor: '#adaca9' }}>
                    <h1 className="text-center">
                        {buttonForm === 'Actualizar' ? 'Actualizar Responsables' : 'Registrar Responsables'}
                    </h1>
                </div>*/}
                <div className="card-body">
                    <form id="responsableForm" onSubmit={sendFormR} className="fw-bold m-2 form-no-hover">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Nom_Responsable" className="form-label">Nombres:</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id="Nom_Responsable" 
                                        name="Nom_Responsable"
                                        value={Nom_Responsable} 
                                        onChange={handleInputChange}
                                        maxLength={25}
                                        required 
                                        />
                                    {Nom_Responsable.length === 25 && (
                                        <span className="text-danger">¡Has alcanzado el límite de 25 caracteres!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Ape_Responsable" className="form-label">Apellidos:</label>
                                    <input className="form-control" type="text" id="Ape_Responsable" name="Ape_Responsable" value={Ape_Responsable} onChange={handleInputChange} maxLength={25} required />
                                    {Ape_Responsable.length === 25 && (
                                        <span className="text-danger">¡Has alcanzado el límite de 25 caracteres!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Doc_Responsable" className="form-label">Documento Identificación:</label>
                                    <input className="form-control" type="number" id="Doc_Responsable" value={Doc_Responsable} onChange={(e) => handleNumericInput (e, setDoc_Responsable)} onKeyDown={handleKeyDown}  required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Tip_Responsable" className="form-label">Cargo:</label>
                                    <select className="form-control" id="Tip_Responsable" value={Tip_Responsable} onChange={(e) => setTip_Responsable(e.target.value)} required>
                                        <option value="">Seleccione uno...</option>
                                        <option value="Instructor">Instructor</option>
                                        <option value="Pasante">Pasante</option>
                                        <option value="Encargado de la Unidad">Encargado de la Unidad</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="Cor_Responsable" className="form-label">Correo:</label>
                                <input 
                                    className="form-control" 
                                    type="email" 
                                    id="Cor_Responsable" 
                                    name="Cor_Responsable"
                                    value={Cor_Responsable} 
                                    onChange={handleInputChange}
                                    maxLength={25}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="El correo debe tener un formato válido"

                                    required 
                                />
                                    {Cor_Responsable.length === 25 && (
                                        <span className="text-danger">¡Has alcanzado el límite de 25 caracteres!</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Num_Responsable" className="form-label">Número Teléfono:</label>
                                    <input className="form-control" type="number" id="Num_Responsable" value={Num_Responsable} onChange={(e) => handleNumericInput (e, setNum_Responsable)} onKeyDown={handleKeyDown}  required />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                id="boton"
                                className={`btn btn-block m-2 ${buttonForm === 'Actualizar' ? 'btn-success' : 'btn-primary'}`}
                            >
                                {buttonForm === 'Actualizar' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                                    </svg>
                                )}
                                {buttonForm === 'Enviar' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                    </svg>
                                )}
                                {buttonForm}
                            </button>
                        </div>
                    </form>
                </div>
        </>
    );
  
  };

  
  export default FormResponsable;