const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res, next) => {
  const { name, members } = req.body;
  try {
    const team = new Team({ name, members, createdBy: req.user.id });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

exports.inviteMembers = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    const team = await Team.findById(req.params.id);
    if (!team) {
      res.status(404);
      throw new Error('Team not found');
    }
    if (team.members.includes(user._id)) {
      res.status(400);
      throw new Error('User is already a member of the team');
    }
    team.members.push(user._id);
    await team.save();
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({ members: req.user.id });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

exports.joinTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      res.status(404);
      throw new Error('Team not found');
    }
    if (!team.members.includes(req.user.id)) {
      team.members.push(req.user.id);
      await team.save();
    }
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
