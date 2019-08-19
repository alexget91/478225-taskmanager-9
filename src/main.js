import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {getTask, getFilters} from './data';

const TASKS_PER_PAGE = 8;
const MIN_TASK_COUNT = 0;
const MAX_TASK_COUNT = 30;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const showTasks = (tasks, count, buttonLoadMore) => {
  tasks.splice(0, count).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (!tasks.length) {
    buttonLoadMore.style.display = `none`;
  }
};


const tasks = new Array(Math.floor(Math.random() * (MAX_TASK_COUNT + 1 - MIN_TASK_COUNT)) + MIN_TASK_COUNT).fill(``).map(() => getTask());

const siteMainElement = document.querySelector(`.js-main`);

render(siteMainElement.querySelector(`.js-main-control`), createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(getFilters(tasks)), `beforeend`);
render(siteMainElement, createBoardTemplate(tasks.length), `beforeend`);

const boardElement = document.querySelector(`.js-board-container`);
const taskListElement = boardElement.querySelector(`.js-board-tasks-container`);

if (tasks.length) {
  render(boardElement, createSortingTemplate(), `afterbegin`);
  render(taskListElement, createTaskEditTemplate(tasks.shift()), `beforeend`);
  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const buttonLoadMore = document.querySelector(`.js-load-more`);

  document.querySelector(`.js-load-more`).addEventListener(`click`, () => {
    showTasks(tasks, TASKS_PER_PAGE, buttonLoadMore);
  });

  showTasks(tasks, TASKS_PER_PAGE - 1, buttonLoadMore);
}
