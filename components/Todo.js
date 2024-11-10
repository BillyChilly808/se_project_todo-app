class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._element = document.querySelector(selector); // This refers to the template
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    // Set event listener for the checkbox
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed); // Pass completion status
    });

    // Ensure the delete button is selected correctly
    this._deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this._completed); // Pass completion status for handling
      this._remove(); // Remove the todo from the DOM
    });
  }

  _toggleCompletion = () => {
    this._completed = !this._completed; // Toggle completion status
  };

  _remove = () => {
    this._todoElement.remove(); // This removes the todo element from the DOM
  };

  _setDate() {
    const date = new Date(this._data.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const todoDateEl = this._todoElement.querySelector(".todo__date");
    todoDateEl.textContent = `Due ${date.toLocaleDateString()}`;
  }

  getView() {
    // Clone the template content and add data to it
    this._todoElement = this._element.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;

    const todoLabel = this._todoElement.querySelector(".todo__label");
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._setDate(); // Set the date for the todo
    this._setEventListeners(); // Set event listeners for the todo

    return this._todoElement; // Return the rendered todo element
  }
}

export default Todo;
