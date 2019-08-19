export const createBoardTemplate = (notEmpty) => {
  return `
      <section class="board container js-board-container">
        ${notEmpty ? `<div class="board__tasks js-board-tasks-container"></div>` : `<p class="board__no-tasks">
          Click ADD NEW TASK in menu to create your first task
        </p>`}
      </section>
  `.trim();
};
