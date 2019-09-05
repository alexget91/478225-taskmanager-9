import AbstractComponent from "./abstract-component";

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return `
      <button class="load-more js-load-more" type="button">load more</button>
    `.trim();
  }

  toggleShow(show) {
    this._element.style.display = show ? `` : `none`;
  }
}
