import {Key, Position, render} from "../utils";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import Hashtag from "../components/hashtag";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

const MAX_HASHTAG_COUNT = 5;

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView, elementToReplace) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);
    this._hashtagContainer = null;
    this._hashtagInput = null;
    this._elementToReplace = elementToReplace;
  }

  _checkTagsLimit() {
    this._hashtagInput.toggleAttribute(`disabled`, this._hashtagContainer.childNodes.length >= MAX_HASHTAG_COUNT);
  }

  _renderTag(container, tag) {
    const tagElement = new Hashtag(tag).getElement();

    render(container, tagElement, Position.BEFOREEND);
    this._checkTagsLimit();

    tagElement.querySelector(`.js-hashtag-delete`)
      .addEventListener(`click`, (evt) => {
        evt.target.parentNode.remove();
        this._checkTagsLimit();
      });
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  init() {
    flatpickr(this._taskEdit.getElement().querySelector(`.js-card-date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.dueDate,
      altFormat: `j F h:i K`,
      enableTime: true,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        if (this._container.getElement().contains(this._taskEdit.getElement())) {
          this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskView.getElement()
      .querySelector(`.js-card-edit`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskView.getElement()
      .querySelector(`.js-card-favorites`)
      .addEventListener(`click`, () => {
        const entry = this._data;
        entry.isFavorite = !this._data.isFavorite;
        this._onDataChange(entry, this._data, this._taskView.getElement());
      });

    this._taskView.getElement()
      .querySelector(`.js-card-archive`)
      .addEventListener(`click`, () => {
        const entry = this._data;
        entry.isArchive = !this._data.isArchive;
        this._onDataChange(entry, this._data, this._taskView.getElement());
      });

    this._hashtagContainer = this._taskEdit.getElement().querySelector(`.js-hashtag-list`);
    this._hashtagInput = this._taskEdit.getElement().querySelector(`.js-hashtag-input`);

    this._data.tags.forEach((tag) => this._renderTag(this._hashtagContainer, tag));

    this._taskEdit.getElement()
      .querySelector(`.js-card-favorites`)
      .addEventListener(`click`, (evt) => {
        evt.target.classList.toggle(`card__btn--disabled`);
      });

    this._taskEdit.getElement()
      .querySelector(`.js-card-archive`)
      .addEventListener(`click`, (evt) => {
        evt.target.classList.toggle(`card__btn--disabled`);
      });

    this._taskEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`.js-date-deadline-toggle`)
      .addEventListener(`click`, () => {
        const fieldset = this._taskEdit.getElement().querySelector(`.js-date-deadline-fieldset`);
        const status = this._taskEdit.getElement().querySelector(`.js-date-deadline-status`);

        status.textContent = fieldset.hasAttribute(`disabled`) ? status.dataset.yes : status.dataset.no;
        fieldset.toggleAttribute(`disabled`);
      });

    this._taskEdit.getElement()
      .querySelector(`.js-repeat-toggle`)
      .addEventListener(`click`, () => {
        const fieldset = this._taskEdit.getElement().querySelector(`.js-repeat-fieldset`);
        const status = this._taskEdit.getElement().querySelector(`.js-repeat-status`);

        status.textContent = fieldset.hasAttribute(`disabled`) ? status.dataset.yes : status.dataset.no;
        fieldset.toggleAttribute(`disabled`);

        this._taskEdit.getElement().classList.toggle(`card--repeat`);
      });

    this._taskEdit.getElement()
      .querySelectorAll(`.js-color-input`).forEach((colorInput) => {
        colorInput.addEventListener(`change`, (evt) => {
          const repeatClass = this._taskEdit.getElement().querySelector(`.js-repeat-fieldset`)
            .hasAttribute(`disabled`) ? `` : ` card--repeat`;

          this._taskEdit.getElement().classList = `card card--edit card--${evt.target.value}${repeatClass}`;
        });
      });

    this._hashtagInput.addEventListener(`keydown`, (evt) => {
      if (evt.key === Key.ENTER || evt.key === Key.SPACE) {
        evt.preventDefault();

        if (this._hashtagInput.value.length >= this._hashtagInput.minLength) {
          this._renderTag(this._hashtagContainer, this._hashtagInput.value);
          this._hashtagInput.value = ``;
        }
      }
    });

    this._taskEdit.getElement()
      .querySelector(`.js-card-save`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(this._taskEdit.getElement().querySelector(`.js-card-form`));
        const dueDate = formData.get(`date`);
        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: dueDate ? new Date(dueDate) : null,
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            'mo': false,
            'tu': false,
            'we': false,
            'th': false,
            'fr': false,
            'sa': false,
            'su': false,
          }),
          isArchive: this._taskEdit.getElement().querySelector(`.js-card-archive`).classList.contains(`card__btn--disabled`),
          isFavorite: this._taskEdit.getElement().querySelector(`.js-card-favorites`).classList.contains(`card__btn--disabled`)
        };

        this._onDataChange(entry, this._data, this._taskEdit.getElement());

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    if (this._elementToReplace) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._elementToReplace);

    } else {
      render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
    }
  }
}
