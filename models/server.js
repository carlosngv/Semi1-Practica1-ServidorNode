const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const appRouter = require('../routes/routes');

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
        this.app.use(bodyParser.json())

    }

    routes() {
        this.app.use('/', appRouter);
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
}

module.exports = Server;
