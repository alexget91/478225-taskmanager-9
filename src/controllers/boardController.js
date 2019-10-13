import Board from "../components/board";
import TaskList from "../components/task-list";
import {Position, render, unrender} from "../utils";
import LoadMoreButton from "../components/load-more-button";
import Sort from "../components/sort";
import TaskController from "./taskController";

const TASKS_PER_PAGE = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasksDefault = tasks;
    this._tasks = tasks;
    this._firstTask = 0;
    this._board = new Board();
    this._taskList = new TaskList(this._tasks.length);
    this._sort = new Sort();
    this._loadMoreButton = null;

    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (this._tasks.length) {
      render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);

      this._loadMoreButton = new LoadMoreButton();
      render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

      this._loadMoreButton.getElement().addEventListener(`click`, () => this._showMoreTasks());
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

      this._showMoreTasks();
    }
  }

  _showMoreTasks() {
    this._tasks.slice(this._firstTask, this._firstTask += TASKS_PER_PAGE).forEach((task) => this._renderTask(task));
    this._loadMoreButton.toggleShow(this._firstTask < this._tasks.length);
  }

  _renderBoard() {
    unrender(this._taskList.getElement());
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    this._tasks.forEach((task) => this._renderTask(task));
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange);

    taskController.init();
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._tasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._tasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._tasks = this._tasksDefault;
        break;
    }

    this._firstTask = 0;
    this._showMoreTasks();
  }
}
