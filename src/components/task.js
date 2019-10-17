import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class Task extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isArchive, isFavorite}) {
    super();
    this._description = description;
    this._dueDate = dueDate ? new Date(dueDate) : null;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    const isRepeat = Object.values(this._repeatingDays).some((it) => it === true);

    return `
      <article 
        class="card card--${this._color} ${isRepeat ? `card--repeat` : `` }
            ${this._dueDate && (new Date().setHours(0, 0, 0, 0) > new Date(this._dueDate).setHours(0, 0, 0, 0)) ? `card--deadline` : ``}">
        <div class="card__form js-card-form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit js-card-edit">
                edit
              </button>
              <button
                type="button"
                class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``} js-card-archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``} js-card-favorites"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${this._description}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date js-card-date">${this._dueDate ? moment(this._dueDate).format(`D MMMM`) : ``}</span>
                      <span class="card__time">${this._dueDate ? moment(this._dueDate).format(`h:mm A`) : ``}</span>
                    </p>
                  </div>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                      <span class="card__hashtag-name">
                        #${tag}
                      </span>
                    </span>`).join(``)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `.trim();
  }
}
