const { response } = require("express");
const { uploadFile, getFileStream } = require("../helpers/s3");





const uploadPhoto = async ( req, res = response) => {
    let file = req.file;
    console.log(file);
    try {
        let result = await uploadFile(file);
        console.log(result)
        res.status(200).json({
            msg: 'photo uploaded',
            photoPath: result.key
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Error con el servicio. Contacte al administrador.'
        })
    }
}

const getPhoto = ( req, res = response ) => {
    let key = req.params.key;
    let readStream = getFileStream(key);
    readStream.pipe(res);
}



module.exports = {
    uploadPhoto,
    getPhoto
}
