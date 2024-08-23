import { useState } from "react";
import axios from "axios"

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const tokenForPassword = new URLSearchParams(location.search).get('llave');
    const updatePassword = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${URI}reset-password`, {tokenForPassword, newPassword} )
            setMessage(response.data.message)
            setNewPassword('')

        }catch (error){
            setMessage(error)
        }
    }

    return (
        <>
            <form onSubmit={updatePassword}>
                <label>Nueva Contraseña</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                <button type="submit">Reset Password</button>
                {message && <p className="bg-info">{message}, por favor vuelva al inicio de sesion</p>}
            </form>
        </>
    )
}

export default ResetPassword