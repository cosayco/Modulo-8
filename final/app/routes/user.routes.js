const express = require('express');
const router = express.Router();
const { findAll, findUserById, createUser, deleteUserById, updateUserById, signUser } = require('../controllers/user.controller');

router.post('/signup', createUser);
router.post('/signin', signUser);
router.get('/user/:id', findUserById);
router.get('/user', findAll);
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

module.exports = router;