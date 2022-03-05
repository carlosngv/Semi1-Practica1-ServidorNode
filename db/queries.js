const pool = require("./db");

const findUser = ( usuario ) => {
    return new Promise( (resolve, reject) => {
        let query = `select * from Usuario
        where usuario = '${usuario}';`;

        pool.query(query, (err, res) => {
            if(err) reject(err);
            return resolve(res);
        });
    });
}


const createUser = ( userBody ) => {
    let { usuario, nombreUsuario, claveUsuario, fotoPerfil } = userBody;
    return new Promise(( resolve, reject ) => {
        let query = `insert into Usuario(nombreUsuario, usuario, claveUsuario, fotoPerfil)
        values ('${nombreUsuario}', '${usuario}', '${claveUsuario}', '${fotoPerfil}');`;
        pool.query( query, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

const login = ( userBody ) => {
    let { usuario } = userBody;

    return new Promise( ( resolve, reject ) => {
        let query = `SELECT * from Usuario where usuario = '${usuario}';`
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );
}

const createAlbum = ( tituloAlbum ) => {

    return new Promise( ( resolve, reject ) => {
        let query = `INSERT INTO Album (tituloAlbum) VALUES('${tituloAlbum}');`
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );
}

const createUserAlbum = ( body ) => {
    let { idAlbum, idUsuario } = body;

    return new Promise( ( resolve, reject ) => {
        let query = `INSERT INTO AlbumUsuario (idAlbum, idUsuario) VALUES(${idAlbum}, ${idUsuario});`
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const findUserAlbums = ( idUsuario ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
            SELECT tituloAlbum, A.idAlbum FROM
            AlbumUsuario JOIN Usuario U on U.idUsuario = AlbumUsuario.idUsuario
            JOIN Album A on A.idAlbum = AlbumUsuario.idAlbum
            WHERE U.idUsuario = ${idUsuario};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );
}

const findAlbumImages = ( idAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
            select Imagen.idImagen, keyImagen, nombreImagen from Imagen
            join ImagenAlbum IA on Imagen.idImagen = IA.idImagen
            where IA.idAlbum = ${ idAlbum };
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );
}

const createImage = ( url, nombreImagen ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
            INSERT INTO Imagen (keyImagen, nombreImagen) values ('${url}', '${nombreImagen}');
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const createAlbumImage = ( idImagen, idAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
            INSERT INTO ImagenAlbum (idImagen, idAlbum) VALUES(${idImagen}, ${idAlbum});
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

// Eliminar Album

const deleteAlbumImage = ( idAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        delete from ImagenAlbum where idAlbum = ${idAlbum};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const deleteUserAlbum = ( idAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        delete from AlbumUsuario where idAlbum = ${idAlbum};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const deleteAlbum = ( idAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        delete from Album where idAlbum = ${idAlbum};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const updateAlbum = ( idAlbum, tituloAlbum ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        UPDATE Album SET tituloAlbum = '${tituloAlbum}' where idAlbum = ${idAlbum};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const updateUserWithPhoto = ( usuario, file, uid ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        UPDATE Usuario SET usuario = '${ usuario }', fotoPerfil = '${ file }' where idUsuario = ${uid};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const updateUser = ( usuario, uid ) => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        UPDATE Usuario SET usuario = '${ usuario }' where idUsuario = ${uid};
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

const getUsers = () => {

    return new Promise( ( resolve, reject ) => {

        let query = `
        Select * from Usuario
        `
        pool.query( query, (err, res) => {

            if(err) reject(err);
            resolve(res);
        });
    } );

}

var queries = {
    findUser,
    createUser,
    login,
    createAlbum,
    createUserAlbum,
    findUserAlbums,
    findAlbumImages,
    createImage,
    createAlbumImage,
    deleteAlbumImage,
    deleteUserAlbum,
    deleteAlbum,
    updateAlbum,
    updateUserWithPhoto,
    updateUser,
    getUsers,
}

module.exports = {
    queries
}
