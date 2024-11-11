import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    event.preventDefault();

    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, completed: false, id };

    const todoElement = generateTodo(values);
    section.addItem(todoElement);

    todoCounter.updateTotal(true);

    addTodoForm.reset();
    newFormValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

// Open popup when clicking "Add Todo" button
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Function to handle completion toggle
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

// Function to handle deletion of a task
function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false); // Decrease completed count
  }
  todoCounter.updateTotal(false); // Decrease total count when task is deleted
}

// Function to generate a Todo
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// Section for rendering todos
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

// Initialize form validation
const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
