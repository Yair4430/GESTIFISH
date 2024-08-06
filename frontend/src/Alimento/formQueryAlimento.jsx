import axios from "axios";
import { useEffect , useState } from "react";

const FormQueryAlimento = ({ URI,getAlimento,deleteAlimento,buttonForm}) => { 
    const [AlimentoQuery, setAlimentoQuery] = useState([])
    const [fec_alimento, setfec_alimento] = useState('')


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
            <div className="d-flex flex-column align-items-center">
                <h1 className="fs-1 fw-bold d-flex">Consultar Alimentacion</h1>
            <br />
            <form className="fw-bold m-2" id="queryForm">
                <div className="d-flex flex-column align-items-center me-4">
                    <label className="m-2" htmlFor="fechaQuery">Fecha Inicial</label>
                    <input className="form-control w-100" type="date" id="fechaQuery" value={fec_alimento} onChange={(e)=>{ 
                        sendFormQuery(e.target.value); 
                        setfec_alimento(e.target.value) 
                    }} />
                </div>
            </form>    
            </div>

            {
                AlimentoQuery.length > 0 ? <table className='table table-bordered border-info text-center' style={{ border: "3px solid" }}>
                <thead>
                    <tr>
                        <th className='border-info' style={{ border: "3px solid" }}>Fecha</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Cantidad</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Tipo</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>hora</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>valor</th>
                        <th className='border-info align-middle' style={{ border: "3px solid" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {AlimentoQuery.map((alimentacion) => (
                                <tr key={alimentacion.id} className='border-info align-middle font-monospace' style={{ border: "3px solid" }}>
                                    <td className='border-info align-middle text-center' style={{ border: "3px solid" }}>{alimentacion.fec_alimento}</td>
                                    <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.cant_racionkg}</td>
                                    <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.tipo_alimento}</td>
                                    <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.hor_alimento}</td>
                                    <td className='border-info align-middle' style={{ border: "3px solid" }}>{alimentacion.vlr_alimento}</td>
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