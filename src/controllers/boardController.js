import Board from "../components/board";
import TaskList from "../components/task-list";
import {Position, render} from "../utils";
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

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
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

  _renderTask(task, elementToReplace) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView, elementToReplace);

    taskController.init();
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData, elementToReplace) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._tasksDefault[this._tasksDefault.findIndex((it) => it === oldData)] = newData;
    this._renderTask(newData, elementToReplace);
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
