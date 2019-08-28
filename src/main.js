import SiteMenu from './components/site-menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import Sorting from './components/sorting';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadMoreButton from './components/load-more-button';
import {getTask, getFilters} from './data';
import {Position, render} from "./utils";

const TASKS_PER_PAGE = 8;
const MIN_TASK_COUNT = 0;
const MAX_TASK_COUNT = 30;


const showMoreTasks = (tasks) => {
  tasks.splice(0, TASKS_PER_PAGE).forEach((task) => renderTask(task));

  if (!tasks.length) {
    buttonLoadMore.style.display = `none`;
  }
};

const renderTask = (taskData) => {
  const task = new Task(taskData);
  const taskEdit = new TaskEdit(taskData);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.js-card-edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.js-card-save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};


const tasks = new Array(Math.floor(Math.random() * (MAX_TASK_COUNT + 1 - MIN_TASK_COUNT)) + MIN_TASK_COUNT)
  .fill(``).map(getTask);

const siteMainElement = document.querySelector(`.js-main`);
let buttonLoadMore;

render(siteMainElement.querySelector(`.js-main-control`), new SiteMenu().getElement(), Position.BEFOREEND);
render(siteMainElement, new Search().getElement(), Position.BEFOREEND);
render(siteMainElement, new Filter(getFilters(tasks)).getElement(), Position.BEFOREEND);
render(siteMainElement, new Board(tasks.length).getElement(), Position.BEFOREEND);

const boardElement = document.querySelector(`.js-board-container`);
const tasksContainer = boardElement.querySelector(`.js-board-tasks-container`);

if (tasks.length) {
  render(boardElement, new Sorting().getElement(), Position.AFTERBEGIN);
  render(boardElement, new LoadMoreButton().getElement(), Position.BEFOREEND);

  buttonLoadMore = document.querySelector(`.js-load-more`);

  document.querySelector(`.js-load-more`).addEventListener(`click`, () => {
    showMoreTasks(tasks);
  });

  showMoreTasks(tasks);
}
