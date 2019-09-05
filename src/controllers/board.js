import Board from "../components/board";
import TaskList from "../components/task-list";
import {Key, Position, render} from "../utils";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import LoadMoreButton from "../components/load-more-button";
import Sorting from "../components/sorting";

const TASKS_PER_PAGE = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList(this._tasks.length);
    this._loadMoreButton = null;
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (this._tasks.length) {
      render(this._board.getElement(), new Sorting().getElement(), Position.AFTERBEGIN);

      this._loadMoreButton = new LoadMoreButton();
      render(this._board.getElement(), this._loadMoreButton.getElement(), Position.BEFOREEND);

      this._loadMoreButton.getElement().addEventListener(`click`, () => {
        this._showMoreTasks();
      });

      this._showMoreTasks();
    }
  }

  _showMoreTasks() {
    this._tasks.splice(0, TASKS_PER_PAGE).forEach((task) => this._renderTask(task));

    if (!this._tasks.length) {
      this._loadMoreButton.hide();
    }
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.js-card-edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.js-card-save`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }
}
