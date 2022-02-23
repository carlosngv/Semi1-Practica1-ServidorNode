const Server = require('./models/Server')

require('dotenv').config()

var server = new Server();
server.listen();
