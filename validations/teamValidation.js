const { check } = require('express-validator');

exports.createTeamValidation = [
  check('name', 'Team name is required').not().isEmpty()
];
