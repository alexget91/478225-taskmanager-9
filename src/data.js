export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000 * (Math.round(Math.random()) ? 1 : -1),
  tags: new Set(new Array(Math.floor(Math.random() * 4)).fill(``).map(() => [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ][Math.floor(Math.random() * 5)])),
  repeatingDays: {
    'mo': Boolean(Math.round(Math.random())),
    'tu': Boolean(Math.round(Math.random())),
    'we': Boolean(Math.round(Math.random())),
    'th': Boolean(Math.round(Math.random())),
    'fr': Boolean(Math.round(Math.random())),
    'sa': Boolean(Math.round(Math.random())),
    'su': Boolean(Math.round(Math.random())),
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const getFilters = (tasks) => [
  {
    title: `All`,
    count: tasks.reduce((count, {isArchive}) => count + !isArchive, 0)
  },
  {
    title: `Overdue`,
    count: tasks.reduce((count, {dueDate}) => count + (new Date().setHours(0, 0, 0, 0) > new Date(dueDate).setHours(0, 0, 0, 0)), 0)
  },
  {
    title: `Today`,
    count: tasks.reduce((count, {dueDate}) => count + (new Date().setHours(0, 0, 0, 0) === new Date(dueDate).setHours(0, 0, 0, 0)), 0)
  },
  {
    title: `Favorites`,
    count: tasks.reduce((count, {isFavorite}) => count + !isFavorite, 0)
  },
  {
    title: `Repeating`,
    count: tasks.reduce((count, {repeatingDays}) => count + Object.keys(repeatingDays).some((day) => repeatingDays[day]), 0)
  },
  {
    title: `Tags`,
    count: tasks.reduce((count, {tags}) => count + (tags.size > 0), 0)
  },
  {
    title: `Archive`,
    count: tasks.reduce((count, {isArchive}) => count + isArchive, 0)
  },
];
