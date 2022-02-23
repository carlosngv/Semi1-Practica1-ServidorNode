const { Router } = require('express');const multer  = require('multer');
const { uploadPhoto, getPhoto } = require('../controllers/photo.controller');
const upload = multer({ dest: 'uploads/' });
const photoRouter = Router();


photoRouter.get('/:key', getPhoto);
photoRouter.post('/', upload.single('photo'), uploadPhoto);

module.exports = photoRouter;
