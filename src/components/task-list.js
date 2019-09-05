import AbstractComponent from "./abstract-component";

export default class TaskList extends AbstractComponent {
  constructor(notEmpty) {
    super();
    this._notEmpty = notEmpty;
  }

  getTemplate() {
    return `
      ${this._notEmpty ? `<div class="board__tasks js-board-tasks-container"></div>` : `<p class="board__no-tasks">
          Click ADD NEW TASK in menu to create your first task
        </p>`}
    `.trim();
  }
}
