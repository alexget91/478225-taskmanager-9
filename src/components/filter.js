export const createFilterTemplate = (filters) => {
  return `
      <section class="main__filter filter container">
        ${filters.map(({title, count}, index) => `<input
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
};
