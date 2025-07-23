const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


const {
  SignUpUser,
  LoginUser
} = require('../controllers/auth');


router.post('/signup',[
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),

    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      ],SignUpUser);

router.post('/login',[
          body('email')
         .trim()
         .notEmpty().withMessage('Email is required')
         .isEmail().withMessage('Must be a valid email'),

         body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        ], LoginUser);

module.exports = router