const express = require('express');
const router = express.Router();
const { findAll, findUserById, createUser, deleteUserById, updateUserById, signUser } = require('../controllers/user.controller');
const { verificaToken, verificaCorreo } = require('../middleware')

router.post('/signin', signUser);
router.post('/signup', verificaCorreo, createUser);
router.get('/user/:id', verificaToken, findUserById);
router.get('/user', verificaToken, findAll);
router.put('/user/:id', verificaToken, updateUserById);
router.delete('/user/:id', verificaToken, deleteUserById);

module.exports = router;