const router = require('express').Router();

const controller = require('./controler');

router.get('/', controller.fillData);

module.exports = router;
