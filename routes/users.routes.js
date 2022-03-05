const { Router } = require('express');
const { getUsers, signup, login } = require('../controllers/users.controller');
const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', login);
usersRouter.post('/signup', signup);
//usersRouter.get('/:username/:imgKey')


module.exports = usersRouter;
