const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// GET USER TODOS
router.get("/:userId", async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });
  res.json(todos);
});

// ADD TODO
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// UPDATE TODO
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
