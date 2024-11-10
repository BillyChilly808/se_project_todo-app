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

// Initialize TodoCounter with initialTodos
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Popup for adding new todo
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    addTodoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const name = evt.target.name.value;
      const dateInput = evt.target.date.value;
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const values = { name, date, completed: false, id };

      // Generate and add the new todo to the section
      const todoElement = generateTodo(values);
      section.addItem(todoElement);

      // Update total number of tasks
      todoCounter.updateTotal(true); // Increment total tasks

      // Close the modal and reset form
      closeModal(addTodoPopupEl);
      addTodoForm.reset();
      newFormValidator.resetValidation();
      addTodoPopup.close();
    });
  },
});
addTodoPopup.setEventListeners();

// Open popup when clicking "Add Todo" button
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  document.addEventListener("keyup", handleEscClose);
});

// Function to close the popup
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

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

// Close popup on Escape key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      openPopup.classList.remove("popup_visible");
    }
  }
}

// Initialize form validation
const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
