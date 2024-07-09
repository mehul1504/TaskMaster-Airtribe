const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} = require('../controllers/authController'); // Ensure this path is correct
const { registerValidation, loginValidation, updateProfileValidation } = require('../validations/authValidation');
const validate = require('../middleware/validationMiddleware');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfileValidation, validate, updateProfile);
router.post('/logout', auth, logout);

module.exports = router;
