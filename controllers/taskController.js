const Task = require('../models/Task');
const User = require('../models/User');

exports.createTask = async (req, res, next) => {
  const { title, description, dueDate, assignedTo, team } = req.body;
  try {
    const task = new Task({ title, description, dueDate, assignedTo, createdBy: req.user.id, team });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  const { status, search } = req.query;
  try {
    let query = { assignedTo: req.user.id };
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  const { title, description, dueDate, status, assignedTo } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, status, assignedTo },
      { new: true }
    );
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  const { text } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    const comment = { user: req.user.id, text };
    task.comments.push(comment);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.addAttachment = async (req, res, next) => {
  const { filename, contentType, data } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    const attachment = { filename, contentType, data: Buffer.from(data, 'base64') };
    task.attachments.push(attachment);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
