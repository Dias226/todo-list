'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoDataJson = localStorage.getItem('memory');
let todoData = [];
if (todoDataJson) {
  todoData = JSON.parse(todoDataJson);
}

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      ' <button class="todo-remove"></button>' +
      ' <button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');

    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('memory', JSON.stringify(todoData));
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener("click", function () {
      todoData = todoData.filter(function (elem) {
        if (elem.value !== item.value) {
          return elem;
        }
      });
      localStorage.setItem('memory', JSON.stringify(todoData));
      render();
    });


  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if (headerInput.value !== '' && headerInput.value.trim().length !== 0) {
    todoData.push(newTodo);
    headerInput.value = '';
    localStorage.setItem('memory', JSON.stringify(todoData));
  } else {
    alert('Введите новую задачу.');
  }
  render();
});

render();