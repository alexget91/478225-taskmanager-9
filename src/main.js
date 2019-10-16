import SiteMenu from './components/site-menu';
import Search from './components/search';
import Filter from './components/filter';
import {getTask, getFilters} from './data';
import {Position, render} from "./utils";
import BoardController from "./controllers/boardController";

const MIN_TASK_COUNT = 0;
const MAX_TASK_COUNT = 30;


const tasks = new Array(Math.floor(Math.random() * (MAX_TASK_COUNT + 1 - MIN_TASK_COUNT)) + MIN_TASK_COUNT)
  .fill(``).map(getTask);

const siteMainElement = document.querySelector(`.js-main`);

render(siteMainElement.querySelector(`.js-main-control`), new SiteMenu().getElement(), Position.BEFOREEND);
render(siteMainElement, new Search().getElement(), Position.BEFOREEND);
render(siteMainElement, new Filter(getFilters(tasks)).getElement(), Position.BEFOREEND);

new BoardController(siteMainElement, tasks).init();
