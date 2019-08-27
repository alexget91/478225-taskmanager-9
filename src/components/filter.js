import {createElement} from "../utils";

export default class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
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
      <section class="main__filter filter container">
        ${this._filters.map(({title, count}, index) => `<input
            type="radio"
            id="filter__${title.toLowerCase()}"
            class="filter__input visually-hidden"
            name="filter"
            ${index ? `` : `checked`}
            ${count ? `` : `disabled`}
          />
          <label for="filter__${title.toLowerCase()}" class="filter__label">
            ${title} <span class="filter__all-count">${count}</span></label
          >`).join(``)}
      </section>
    `.trim();
  }
}
