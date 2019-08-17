import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createSortingTemplate} from './components/sorting';
import {createTaskEditTemplate} from './components/task-edit';
import {createTaskTemplate} from './components/task';
import {createLoadMoreButtonTemplate} from './components/load-more-button';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteMainElement = document.querySelector(`.js-main`);

render(siteMainElement.querySelector(`.js-main-control`), createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSearchTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = document.querySelector(`.js-board-container`);
const taskListElement = boardElement.querySelector(`.js-board-tasks-container`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(), `beforeend`);

new Array(3).fill(``).forEach(() => render(taskListElement, createTaskTemplate(), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
