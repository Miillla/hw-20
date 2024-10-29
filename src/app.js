import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

$(document).ready(function () {
  const lists = $("#todoList");
  const todos = JSON.parse(localStorage.getItem("todo-items")) || [];

  todos.forEach((todo) => {
    lists.append(`<p>${todo.text}</p>`);
  });
  $("#add-todo").on("click", function () {
    const inputValue = $("#todo-input").val();

    todos.push({ text: inputValue, completed: false });
    localStorage.setItem("todo-items", JSON.stringify(todos));

    lists.append(`<p>${inputValue}</p>`);
    $("#todo-input").val("");
  });
  console.log("ready!");
});
