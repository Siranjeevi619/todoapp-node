const Task = require("../model/task.model.js");
const taskModel = require("../model/task.model.js");
const mongoose = require("mongoose");

const AddTask = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { taskDescription, taskName } = req.body;
    if (!taskName || !taskDescription) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }
    const taskToAdd = new taskModel({
      taskName,
      taskDescription,
    });

    const newTask = await taskToAdd.save();
    return res.status(201).json(newTask);
  } catch (e) {
    return res.status(500).json({ message: "Error adding task" });
  }
};

const ReadTask = async (req, res) => {
  try {
    const allTask = await taskModel.find();
    return res.status(200).json({ allTask });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const UpdateTask = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Task ID:", req.params.id);

    const { taskName, taskDescription } = req.body;

    if (!taskName || !taskDescription) {
      return res
        .status(400)
        .json({ message: "Task name and description are required" });
    }

    const taskToUpdate = await taskModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        taskName,
        taskDescription,
      },
      { new: true }
    );

    if (!taskToUpdate) {
      console.log("Task not found");
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Updated task:", taskToUpdate);
    return res
      .status(200)
      .json({ message: "Task updated successfully", taskToUpdate });
  } catch (e) {
    console.error("Error updating task:", e.message);
    return res.status(500).json({ message: e.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const taskToDelete = await taskModel.findByIdAndDelete(id);
    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { AddTask, ReadTask, UpdateTask, DeleteTask };
