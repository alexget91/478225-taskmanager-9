import AbstractComponent from "./abstract-component";

export default class TaskEdit extends AbstractComponent {
  constructor({description, dueDate, color, repeatingDays, isArchive, isFavorite}) {
    super();
    this._description = description;
    this._dueDate = dueDate ? new Date(dueDate) : null;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    const isRepeat = Object.values(this._repeatingDays).some((it) => it === true);

    return `
      <article class="card card--edit card--${this._color} ${isRepeat ? `card--repeat` : ``}">
        <form class="card__form js-card-form" method="get">
          <div class="card__inner">
            <div class="card__control">
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
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>
  
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle js-date-deadline-toggle" type="button">
                    date: <span class="card__date-status js-date-deadline-status" data-yes="yes" data-no="no">
                        ${this._dueDate ? `yes` : `no`}
                    </span>
                  </button>
  
                   <fieldset class="card__date-deadline js-date-deadline-fieldset" ${this._dueDate ? `` : `disabled`}> 
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${this._dueDate ? new Date(this._dueDate).toDateString() : ``}"
                      />
                    </label>
                  </fieldset>
  
                  <button class="card__repeat-toggle js-repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status js-repeat-status" data-yes="yes" data-no="no">
                        ${isRepeat ? `yes` : `no`}
                    </span>
                  </button>
  
                  <fieldset class="card__repeat-days js-repeat-fieldset" ${isRepeat ? `` : `disabled`}>
                    <div class="card__repeat-days-inner">
                      ${Object.entries(this._repeatingDays).map(([name, repeat]) => `<input
                          class="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id="repeat-${name}-1"
                          name="repeat"
                          value="${name}"
                          ${repeat ? `checked` : ``}
                        />
                        <label class="card__repeat-day" for="repeat-${name}-1"
                          >${name}</label
                        >`).join(``)}
                    </div>
                  </fieldset>
                </div>
  
                <div class="card__hashtag">
                  <div class="card__hashtag-list js-hashtag-list"></div>
  
                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input js-hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
  
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-1"
                    class="card__color-input card__color-input--black visually-hidden js-color-input"
                    name="color"
                    value="black"
                    ${this._color === `black` ? `checked` : ``}
                  />
                  <label
                    for="color-black-1"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-1"
                    class="card__color-input card__color-input--yellow visually-hidden js-color-input"
                    name="color"
                    value="yellow"
                    ${this._color === `yellow` ? `checked` : ``}
                  />
                  <label
                    for="color-yellow-1"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-1"
                    class="card__color-input card__color-input--blue visually-hidden js-color-input"
                    name="color"
                    value="blue"
                    ${this._color === `blue` ? `checked` : ``}
                  />
                  <label
                    for="color-blue-1"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-1"
                    class="card__color-input card__color-input--green visually-hidden js-color-input"
                    name="color"
                    value="green"
                    ${this._color === `green` ? `checked` : ``}
                  />
                  <label
                    for="color-green-1"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-1"
                    class="card__color-input card__color-input--pink visually-hidden js-color-input"
                    name="color"
                    value="pink"
                    ${this._color === `pink` ? `checked` : ``}
                  />
                  <label
                    for="color-pink-1"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
              </div>
            </div>
  
            <div class="card__status-btns">
              <button class="card__save js-card-save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `.trim();
  }
}
