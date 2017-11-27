const express = require('express');
const validator = require('validator');
const passport = require('passport');
const auth = require('../controllers/auth');
const router = new express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

module.exports = router;