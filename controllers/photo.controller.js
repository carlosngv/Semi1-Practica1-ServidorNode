const { response } = require("express");
const { uploadFile, getFileStream } = require("../helpers/s3");
const { queries } = require("../db/queries");




const uploadPhoto = async ( req, res = response) => {

    let file = req.file;

    console.log(file);

    try {
        let { key } = await uploadFile(file);
        res.status(200).json({
            img_url: `${process.env.BUCKET_PATH}${key}`
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Error con el servicio. Contacte al administrador.',
            correcto: false
        });
    }

}

const getPhoto = ( req, res = response ) => {
    let key = req.params.imgKey;
    console.log(key);
    let readStream = getFileStream(key);
    readStream.pipe(res);
}

const createAlbum = async ( req, res = response ) => {

    let { idUsuario, tituloAlbum } = req.body;

    try {

        let albumCreated = await queries.createAlbum( tituloAlbum );
        let idAlbum = albumCreated.insertId
        console.log(idAlbum);


        let body = { idUsuario, idAlbum};
        console.log(body);
        let userAlbumCreated = await queries.createUserAlbum( body );

        res.status(200).json({
            mensaje: 'Album creado.',
            correcto: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un error al crear el album',
            correcto: false
        });
    }

}

const getUserAlbums = async ( req, res = response ) => {
    let { idUsuario } = req.params;

    try {

        let albumsDB = await queries.findUserAlbums( idUsuario );



        res.status(200).json({
            user_albums: { albums: albumsDB },
            correcto: true,
        })

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Hubo un error al obtener los albumes.',
            correcto: false
        });
    }
}

const getAlbumImages = async ( req, res = response ) => {
    let { idAlbum } = req.params;

    try {

        let imagenes = await queries.findAlbumImages( idAlbum );

        res.status(200).json({
            fotos_album: { imagenes },
            correcto: true,
        })

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Hubo un error al obtener los albumes.',
            correcto: false
        });
    }
}

const uploadPhotoAlbum = async ( req, res = response ) => {
    let { nombreImagen, file, idAlbum } = req.body;

    try {

        let imagenDB = await queries.createImage( file, nombreImagen );
        let idImagen = imagenDB.insertId;
        console.log(idImagen);

        await queries.createAlbumImage( idImagen, idAlbum );


        res.status(200).json({
            mensaje: "Imagen guardada.",
            correcto: true,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Hubo un error al subir imagen al album.',
            correcto: false
        });
    }
}
const deleteAlbum = async ( req, res = response ) => {

    let { idAlbum } = req.params;

    try {

        await queries.deleteAlbumImage( idAlbum );
        await queries.deleteUserAlbum( idAlbum );
        await queries.deleteAlbum( idAlbum );


        res.status(200).json({
            mensaje: "El album ha sido borrado.",
            correcto: true,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Hubo un error intentar borrar el album. Contacte al administrador.',
            correcto: false
        });
    }

}

const editAlbum = async ( req, res = response ) => {

    let { idAlbum, tituloAlbum } = req.body;

    try {

        await queries.updateAlbum(idAlbum, tituloAlbum);


        res.status(200).json({
            mensaje: "Album actualizado.",
            correcto: true,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Hubo un error intentar editar el album. Contacte al administrador.',
            correcto: false
        });
    }

}


module.exports = {
    uploadPhoto,
    getPhoto,
    createAlbum,
    getUserAlbums,
    getAlbumImages,
    uploadPhotoAlbum,
    deleteAlbum,
    editAlbum
}
