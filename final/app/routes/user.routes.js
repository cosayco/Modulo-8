const express = require('express');
const router = express.Router();
const { findAll } = require('../controllers/user.controller');

router.get('/user', findById);
router.get('/user/:id', findAll);
router.post('/bootcamp', createBootcamp);
router.post('/bootcamp/adduser', addUser)

module.exports = router;