var express = require('express');
var router = express.Router();

// DB
const todos = [{ id: 1, name: 'wash dishes', completed: false }];

router.get('/', function (req, res, next) {
  return res.status(200).json(todos);
});

router.get('/:id', function (req, res, next) {
  const todo = todos.find(todo => todo.id == req.params.id);
  if (todo) return res.status(200).json(todo);
  return res.status(404).json({});
});

router.post('/', function (req, res, next) {
  const data = req.body;

  if (typeof data.name !== "string") {
    return res.status(422).json({});
  }

  const newTodo = {
    id: todos.length + 1,
    name: data.name,
    completed: false
  }
  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

module.exports = router;