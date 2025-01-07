const express = require('express');
const router = express.Router();
const { findAll, createBootcamp, addUser, findById } = require('../controllers/bootcamp.controller');

router.get('/bootcamp/:id', findById);
router.get('/bootcamp', findAll);
router.post('/bootcamp', createBootcamp);
router.post('/bootcamp/adduser', addUser)

module.exports = router;