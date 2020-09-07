"use strict";

let todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

  let todoDataJson = localStorage.getItem('todoDataStorage');
  let todoData = [];
  if (todoDataJson) {
    todoData = JSON.parse(todoDataJson);
  }

// let todoData = [{
//     value: "Сварить кофе",
//     completed: false,
//   },
//   {
//     value: "Помыть посуду",
//     completed: true,
//   },
// ];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";
  todoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const btnTodoCompleted = li.querySelector(".todo-complete");
    btnTodoCompleted.addEventListener("click", function (event) {
      item.completed = !item.completed;
      localStorage.setItem('todoDataStorage', JSON.stringify(todoData));
      render();
    });
    const todoRemove = li.querySelector(".todo-remove");
    todoRemove.addEventListener("click", function () {
      todoData = todoData.filter(function (elem) {
        if (elem.value !== item.value) {
          return elem;
        }
      });
      localStorage.setItem('todoDataStorage', JSON.stringify(todoData));
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value == "") {
    return;
  }
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  headerInput.value = "";
  todoData.push(newTodo);
  localStorage.setItem('todoDataStorage', JSON.stringify(todoData));
  render();
});
render();