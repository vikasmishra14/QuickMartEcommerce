const express = require('express');
const { SignUp, SignIn, DeleteUser, UpdateUser } = require('../controllers/UserController');
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.delete('/:id', DeleteUser);
router.put('/:id', UpdateUser);

module.exports = router;
