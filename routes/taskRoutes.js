const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  addComment,
  addAttachment
} = require('../controllers/taskController');
const { createTaskValidation } = require('../validations/taskValidation');
const validate = require('../middleware/validationMiddleware');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createTaskValidation, validate, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, createTaskValidation, validate, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/:id/comments', auth, addComment);
router.post('/:id/attachments', auth, addAttachment);

module.exports = router;
