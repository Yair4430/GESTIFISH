// import axios from "axios"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const FormAlimento = ({ buttonForm, Alimento, URI, UpdateTextButton })=>{ // Agregar como parámetro el boton que llega desde el componente
    // Hooks para cada uno de los campos del formulario
    const [fec_alimento, setFec_alimento] = useState('')
    const [cant_racionkg, setCant_racionkg] = useState('')
    const [tipo_alimento, setTipo_alimento] = useState('')
    const [hor_alimento, setHor_alimento] = useState('')
    const [vlr_alimento, setVlr_alimento] = useState('')

    const sendForm = (e) => {

        e.preventDefault();
    
        if (buttonForm === 'Actualizar') {
            console.log('actualizando ando...');

            axios.put(URI + Alimento.id, {
                fec_alimento: fec_alimento,
                cant_racionkg: cant_racionkg,
                tipo_alimento: tipo_alimento,
                hor_alimento: hor_alimento,
                vlr_alimento: vlr_alimento
            }).then(response => {
                UpdateTextButton('Enviar');
                clearForm();
            }).catch(error => {
                console.error('Error al guardar:', error);
                // Manejo de errores si el guardado falla
            });
            
    
        } else if (buttonForm === 'Enviar') {
            console.log('guardando ando...');
            axios.post(URI, {
                fec_alimento: fec_alimento,
                cant_racionkg: cant_racionkg,
                tipo_alimento: tipo_alimento,
                hor_alimento: hor_alimento,
                vlr_alimento: vlr_alimento
            }).then(response => {
                clearForm();
            }).catch(error => {
                console.error('Error al guardar:', error);
                // Manejo de errores si el guardado falla
            });
        }   
    };
    
    const clearForm = ()=>{
        setFec_alimento('')
        setCant_racionkg('')
        setTipo_alimento('')
        setHor_alimento('')
        setVlr_alimento('')
    }
    const setData = () => { // Función que establece
       
        setFec_alimento(Alimento.fec_alimento)
        setCant_racionkg(Alimento.cant_racionkg)
        setTipo_alimento(Alimento.tipo_alimento)
        setHor_alimento(Alimento.hor_alimento)
        setVlr_alimento(Alimento.vlr_alimento)
    }
    useEffect(() => { // useEffect escucha los cambios  en el objeto 'player' y se ejecuta la funcion 'setData'
        setData() 
    }, [Alimento])

    useEffect(() => { // useEffect escucha los cambios  en el objeto 'player' y se ejecuta la funcion 'setData'
        if (Alimento) {
            setFec_alimento(Alimento.fec_alimento || '');
            setCant_racionkg(Alimento.cant_racionkg || '');
            setTipo_alimento(Alimento.tipo_alimento || '');
            setHor_alimento(Alimento.hor_alimento || '');
            setVlr_alimento(Alimento.vlr_alimento || '');
        }
    }, [Alimento]);
    
    
    return(
        <>
        <div className="row">
            <center>
          <h1 className="text-bg-success d-flex justify-content-center p-1" style={{ maxWidth: '99.5%' }}>
          Registrar Y Actualizar
          </h1>
          </center>
        </div>
        
        <form className="d-flex align-items-center flex-column" id="alimentoForm" action="" onSubmit={sendForm}>
            <label className="form-label" htmlFor="Fecha">Fecha</label>
            <input className="form-control w-25" type="date" id="Fecha" value={fec_alimento} onChange={(e) => setFec_alimento (e.target.value)} />
            <br />
            <label htmlFor="Cantidad">Cantidad</label>
            <input className="form-control w-25" type="text" id="Cantidad" value={cant_racionkg} onChange={(e) => setCant_racionkg (e.target.value)} />
            <br />
            <label htmlFor="Tipo">Tipo</label>
            <input className="form-control w-25" type="text" id="Tipo" value={tipo_alimento} onChange={(e) => setTipo_alimento(e.target.value)} />           
            <br />
            <label htmlFor="hora">hora</label>
            <input className="form-control w-25" type="time" id="hora" value={hor_alimento} onChange={(e) => setHor_alimento(e.target.value)} />           
            <br />
            <label htmlFor="valor">valor</label>
            <input className="form-control w-25" type="text" id="valor" value={vlr_alimento} onChange={(e) => setVlr_alimento(e.target.value)} />           
            
            <br />
            
            <input type="submit" id="boton" value={buttonForm} className="btn btn-success" />
        </form>
        </>

    )

}
export default FormAlimento