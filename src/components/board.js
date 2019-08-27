import {createElement} from "../utils";

export default class Board {
  constructor(notEmpty) {
    this._element = null;
    this._notEmpty = notEmpty;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="board container js-board-container">
        ${this._notEmpty ? `<div class="board__tasks js-board-tasks-container"></div>` : `<p class="board__no-tasks">
          Click ADD NEW TASK in menu to create your first task
        </p>`}
      </section>
    `.trim();
  }
}
