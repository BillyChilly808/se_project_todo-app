import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (addTodoForm.checkValidity()) {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, completed: false, id };
    const todo = new Todo(values, "#todo-template");
    todosList.append(todo.getView());
    closeModal(addTodoPopup);
    addTodoForm.reset();
  } else {
    newFormValidator._inputList.forEach((input) => {
      newFormValidator.checkInputValidity(input);
    });
  }
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
});
