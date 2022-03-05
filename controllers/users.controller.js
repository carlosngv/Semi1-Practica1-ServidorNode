const { response, json } = require("express")
const bcrypt = require('bcryptjs');
const { queries } = require("../db/queries");


const getUsers = async ( req, res = response ) => {

    try {

        let users = await queries.getUsers();

        res.status(200).json({
            users,
            correcto: true,
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en el servidor. Contacte con el administrador.',
            correcto: false,
        });
    }
}

const signup = async ( req, res = response ) => {
    const { nombreUsuario, usuario, claveUsuario, fotoPerfil } = req.body;
    try {
        // Consulta para validar existencia del usuario
        let userExists = await queries.findUser( usuario );
        if(userExists.length !== 0) {
            return res.status(400).json({
                mensaje: 'El usuario ya se encuentra en uso.',
                correcto: false,
            })
        }

        // Encriptar contraseña
        // const salt = bcrypt.genSaltSync(10);
        // hashedPassword = bcrypt.hashSync( claveUsuario, salt );
        // console.log(hashedPassword);

        let userBody = { nombreUsuario, usuario, claveUsuario, fotoPerfil };

        let results = await queries.createUser( userBody );

        res.status(200).json({
            mensaje: 'Usuario registrado.',
            correcto: true,
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en el servidor. Contacte con el administrador.',
            correcto: false,
        });
    }





}

const login = async ( req, res = response ) => {

    const { usuario, claveUsuario } =  req.body;

    try {

        // Consulta para validar existencia del usuario
        let userExists = await queries.findUser( usuario );

        if(userExists.length === 0) {
            return res.status(400).json({
                mensaje: 'Usuario incorrecto.',
                status_login: false
            });
        }

        // Consulta login usuario
        let userBody = { usuario, claveUsuario };

        let loggedUser = await queries.login( userBody );

        let claveDB = loggedUser[0].claveUsuario;

        if( claveDB !== claveUsuario ) {
            return res.status(400).json({
                mensaje: 'Credenciales incorrectas',
                status_login: false
            });
        }

        //Verificar contraseña
        // const validPassword = bcrypt.compareSync( claveUsuario, claveDB );
        // if( !validPassword ) {
        //     return res.status(400).json({
        //         mensaje: 'Credenciales incorrectas',
        //         status_login: false
        //     });
        // }

        res.status(200).json({
            mensaje: 'Login correcto',
            status_login: true,
        });



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Error en el servidor. Contacte con el administrador.',
            correcto: false,
        });
    }

}

const editUser = async ( req, res = response ) => {

    const { uid, usuario, file } =  req.body;

    try {

        if(!file || file.length !== 0) {
            await queries.updateUserWithPhoto( usuario, file, uid);
        } else {
            await queries.updateUser( usuario, uid );
        }

        res.status(200).json({
            mensaje: 'Usuario actualizado.',
            status_login: true,
        });



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Error en el servidor. Contacte con el administrador.',
            correcto: false,
        });
    }

}






module.exports = {
    getUsers,
    login,
    signup,
    editUser
}
