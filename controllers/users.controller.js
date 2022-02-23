const { response } = require("express")



const getUsers = ( req, res = response ) => {
    res.status(200).json({
        data: ['Juan', 'Pedro', 'Luis'],
    });
}

module.exports = {
    getUsers
}
