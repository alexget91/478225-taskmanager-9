import AbstractComponent from "./abstract-component";

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return `
      <button class="load-more js-load-more" type="button">load more</button>
    `.trim();
  }

  hide() {
    this._element.style.display = `none`;
  }
}
