import axios from 'axios'
import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import FormAlimento from './formALimento.jsx'
// import '../estilo.css';

import Swal from 'sweetalert2'
import FormQueryAlimento from './formQueryAlimento.jsx'


const URI = 'http://localhost:8000/alimentacion/'

const CrudAlimento = () => {
        //Uso del hook useState
        const [alimentoList, setalimentoList] = useState([])

        const [buttonForm, setbuttonForm] = useState('Enviar')
        
        const[Alimento, setAlimento] = useState({
            id: "",
            fec_alimento: "",
            cant_racionkg:"",
            tipo_alimento: "",
            hor_alimento:"",
            vlr_alimento:"",
        }) 
        const getAlimento = async(idAlimento) =>{
        
            setbuttonForm('Enviar')
            console.log('hola' + idAlimento)
    
            const respuesta = await axios.get(URI+ idAlimento)
    
            setbuttonForm('Actualizar')
            setAlimento({
                ...respuesta.data
            })
        }
        const UpdateTextButton = (texto) => {
            setbuttonForm(texto)
        }

        const deleteAlimento = (idAlimento)=>{
            Swal.fire({
                title: "Estás Seguro?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar!"
              }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axios.delete(URI + idAlimento)
                        Swal.fire({
                            title: "Borrado!",
                            text: "El registro ha sido borrado.",
                            icon: "success"
                        });
                    }
                });
            }

        useEffect(() => {
            getAllAlimento() //Ejecuta la función getAllPlayers
        }, [alimentoList])

        const getAllAlimento = async () =>{
            const respuesta = await axios.get(URI)
            setalimentoList(respuesta.data)
        }

    
    return(
        <>
        <h1 className='text-bg-success d-flex justify-content-center p-3'>CRUD TABLA DE ALIMENTACION GESTI-FISH </h1>
        <table className='mx-auto text-center p-3 table table-striped' style={{ maxWidth: '99.1%' }}>
            <thead>
                <tr className='table-secondary'>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    <th>Tipo</th>
                    <th>hora</th>
                    <th>valor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className='mx-auto text-center p-5 table-group-divider'>
                {alimentoList.map((alimentacion)=>(
                    <tr className='table-Success' key={alimentacion.id}>
                        <td>{alimentacion.fec_alimento}</td>
                        <td>{alimentacion.cant_racionkg}</td>
                        <td>{alimentacion.tipo_alimento}</td>
                        <td>{alimentacion.hor_alimento}</td> 
                        <td>{alimentacion.vlr_alimento}</td> 
                        <td>
                            <button onClick={() => getAlimento(alimentacion.id)} value="Actualizar" title='Actualizar' className='btn btn-primary'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg></button>
                            <button onClick={() => deleteAlimento(alimentacion.id)} className='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <hr/>
        <FormAlimento buttonForm={buttonForm} Alimento={Alimento} URI={URI} UpdateTextButton={UpdateTextButton} />
        <FormQueryAlimento URI={URI} getAlimento={getAlimento} deleteAlimento={deleteAlimento} buttonForm={buttonForm}/>
        </>
    )
}

export  default CrudAlimento