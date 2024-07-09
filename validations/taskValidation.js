const { check } = require('express-validator');

exports.createTaskValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('dueDate', 'Due date must be a valid date').optional().isISO8601(),
];
