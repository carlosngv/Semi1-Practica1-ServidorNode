const express = require('express');
const cors = require('cors');
const usersRouter = require('../routes/users.routes');
const photoRouter = require('../routes/photo.routes');

class Server {
    constructor() {
        this.port = process.env.PORT
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/photos', photoRouter);
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
}

module.exports = Server;
