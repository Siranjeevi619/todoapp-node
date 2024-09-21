const express = require("express");
const {
  AddTask,
  ReadTask,
  UpdateTask,
  DeleteTask,
} = require("../controllers/task.controller.js");
const router = express.Router();

console.log(AddTask);

//create an task
router.post("/", AddTask);

//read an task
router.get("/", ReadTask);

//update the task
router.put("/:id", UpdateTask);

//delete the task
router.delete("/:id", DeleteTask);

module.exports = router;
