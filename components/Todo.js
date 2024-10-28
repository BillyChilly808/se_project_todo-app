class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    // Handle checkbox toggle for marking as completed
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    // Handle delete button
    const deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    deleteButton.addEventListener("click", () => {
      this._todoElement.remove(); // Remove the element from DOM
      // Optionally: you might also want to remove this item from an array
    });
  }

  _setDate() {
    const date = new Date(this._data.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Set the date with "Due" label
    const todoDateEl = this._todoElement.querySelector(".todo__date");
    todoDateEl.textContent = `Due ${date.toLocaleDateString()}`;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;

    const todoLabel = this._todoElement.querySelector(".todo__label");
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._setDate();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
