const taskModel = require("../model/task.model.js");

const AddTask = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }
    const taskToAdd = new taskModel({
      taskName: name,
      taskDescription: description,
    });

    const newTask = await taskToAdd.save();
    console.log(newTask);

    return res.status(201).json(newTask);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Error adding task" });
  }
};

const ReadTask = async (req, res) => {
  const allTask = await taskModel.find();
  try {
    console.log(allTask);
    return res.status(200).json({ allTask });
  } catch (e) {
    console.log(e.message);
    return res.status(404).json({ message: e.message });
  }
};

const UpdateTask = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const taskToUpdate = await taskModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        taskName: req.body.name,
        taskDescription: req.body.description,
      },
      { new: true, upsert: true }
    );

    if (!taskToUpdate) {
      return res.status(404).json({ message: e.message });
    }

    console.log(taskToUpdate);
    return res.status(200).json({ taskToUpdate });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { AddTask, ReadTask, UpdateTask };
