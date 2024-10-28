"use strict";

$(document).ready(function () {
  var lists = $("#todoList");
  var todos = JSON.parse(localStorage.getItem("todo-items")) || [];
  todos.forEach(function (todo) {
    lists.append("<p>".concat(todo.text, "</p>"));
  });
  $("#add-todo").on("click", function () {
    var inputValue = $("#todo-input").val();
    todos.push({
      text: inputValue,
      completed: false
    });
    localStorage.setItem("todo-items", JSON.stringify(todos));
    lists.append("<p>".concat(inputValue, "</p>"));
    $("#todo-input").val("");
  });
  console.log("ready!");
});
