const { Router } = require('express');
const { getUsers } = require('../controllers/users.controller');
const usersRouter = Router();

usersRouter.get('/', getUsers);


module.exports = usersRouter;
