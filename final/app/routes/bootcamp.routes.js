const express = require('express');
const router = express.Router();
const { findAll, createBootcamp, addUser, findById } = require('../controllers/bootcamp.controller');
const { verificaToken } = require('../middleware');

router.get('/bootcamp', findAll);
router.get('/bootcamp/:id', verificaToken, findById);
router.post('/bootcamp', verificaToken, createBootcamp);
router.post('/bootcamp/adduser', verificaToken, addUser)

module.exports = router;