'use strict';

module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
  .get(todoList.list_all_tasks)
  .post(todoList.create_a_task);

  app.route('/tasks/:taskId')
  .get(todoList.read_a_task)
  .put(todoList.update_a_task)
  .delete(todoList.delete_a_task);

  app.route('/names')
  .get(todoList.list_all_names)
  .post(todoList.create_a_name);
  
  app.route('/die')
  .get((req, res) => { process.exit(); })
  .post((req, res) => { process.exit(); });
  
  app.route('/sleep')
  .get(todoList.mysleep);
  
  app.route('/jwt/:jwt')
  .get(todoList.jwt);
};
