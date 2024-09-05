import axios from "axios";
import { useEffect , useState } from "react";

const FormQueryAlimento = ({ URI,getAlimento,deleteAlimento,buttonForm}) => { 
    const [AlimentoQuery, setAlimentoQuery] = useState([])
    const [fec_alimento, setfec_alimento] = useState('')
    const [fec_inicio, setfech_inicio]= useState('')
    const [fec_fin, setfech_fin]= useState('')

    const sendFormQuery = async(fec_alimento) =>{

        console.log(fec_alimento)

        if(fec_alimento){
            const respuesta = await axios.get(URI + '/fec_alimento/'+ fec_alimento)

            console.log(respuesta.data)
            setAlimentoQuery(
                respuesta.data
            )

        } else{
            setAlimentoQuery([])
        }
    }
    useEffect(()=>{
        setAlimentoQuery([])
        setfec_alimento('')
    }, [buttonForm])


    return (
        <>
            <br />
            <center>
                <h1 className="text-bg-success d-flex justify-content-center p-0" style={{ maxWidth: '99.5%' }}>
                    Consultar ALIMENTACION GESTI-FISH
                </h1>
            </center>
            <br />
            <form className="d-flex justify-content-center align-items-center" id="queryForm">
                <div className="d-flex flex-column align-items-center me-4">
                    <label htmlFor="fechaQuery">Fecha Inicial</label>
                    <input className="form-control w-100" type="date" id="fechaQuery" value={fec_alimento} onChange={(e)=>{ 
                        sendFormQuery(e.target.value); 
                        setfec_alimento(e.target.value) 
                    }} />
                </div>
            </form>    
            {
                AlimentoQuery.length > 0 ? <table className='table text-center p-3'>
                <thead>
                    <tr className='table-success' >
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Tipo</th>
                        <th>hora</th>
                        <th>valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                {AlimentoQuery.map((alimentacion) => (
                                <tr key={alimentacion.id}>
                                    <td>{alimentacion.fec_alimento}</td>
                                    <td>{alimentacion.cant_racionkg}</td>
                                    <td>{alimentacion.tipo_alimento}</td>
                                    <td>{alimentacion.hor_alimento}</td>
                                    <td>{alimentacion.vlr_alimento}</td>
                                        <td>
                                            <button onClick={()=> getAlimento(alimentacion.id)} value="Actualizar" title='Actualizar' className='btn btn-primary'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 .5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg></button>
                                            <button onClick={()=> deleteAlimento(alimentacion.id)} className='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
                                        </td>
                                        </tr>
                    ))}
            </tbody>
        </table> 
    :''
    }
            </>
)
}
export default FormQueryAlimento