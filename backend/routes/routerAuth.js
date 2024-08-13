import express from 'express'
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js';
import { check } from 'express-validator'
const routerAuth = express.Router()

routerAuth.post('/', 
    [
        check('email', 'por favor digite un email valido').isEmail(),
        check('contraseña', 'por favor ingrese una contraseña con mas de 8 caracteres').isLength({ min: 8})
        
    ],createUser)

routerAuth.get('/verify', verifyToken)
routerAuth.post('/login', logInUser)
routerAuth.post('/request-password-reset', getResetPassword)
routerAuth.post('/reset-password', setNewPassword)

export default routerAuth