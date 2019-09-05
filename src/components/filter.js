import AbstractComponent from "./abstract-component";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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
