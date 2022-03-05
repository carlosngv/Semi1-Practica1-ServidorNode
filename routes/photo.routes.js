const { Router } = require('express');const multer  = require('multer');
const { uploadPhoto, getPhoto } = require('../controllers/photo.controller');
const upload = multer({ dest: 'uploads/' });
const photoRouter = Router();


//photoRouter.get('/:imgKey', getPhoto);
photoRouter.get('/:username/:imgKey', getPhoto);
photoRouter.post('/', upload.single('photo'), uploadPhoto);

module.exports = photoRouter;
