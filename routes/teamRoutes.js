const express = require('express');
const {
  createTeam,
  inviteMembers,
  getTeams,
  joinTeam // Make sure this is defined and imported correctly
} = require('../controllers/teamController'); // Ensure the path is correct
const { createTeamValidation } = require('../validations/teamValidation');
const validate = require('../middleware/validationMiddleware');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createTeamValidation, validate, createTeam);
router.put('/invite/:id', auth, inviteMembers); // Ensure inviteMembers is defined in teamController
router.put('/join/:id', auth, joinTeam); // Ensure joinTeam is defined in teamController
router.get('/', auth, getTeams);

module.exports = router;
