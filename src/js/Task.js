export default class Task {
  constructor(content) {
    this.content = content;
  }

  init() {
    const task = this.createTask();
    return task;
  }

  /*
  * Метод создания HTML-элемента
  */
  createElement(type, classEl, content = null) {
    this.name = 'createElement';
    const el = document.createElement(type);
    el.className = classEl;

    if (content) {
      el.textContent = content;
    }

    return el;
  }

  /*
  * Метод создания пункта меню - иконки
  */
  createIconItem(iconName) {
    const liIcon = this.createElement('li', 'task__icons-item');
    const divIcon = this.createElement('div', `task__icon task__icon_${iconName}`);
    const spanIcon = this.createElement('span', 'task__icon-text');

    liIcon.append(divIcon);
    liIcon.append(spanIcon);

    return liIcon;
  }

  /*
  * Метод создания блока контента задачи
  */
  createContentBlock(content) {
    const divContent = this.createElement('div', 'task__content');
    const pContent = this.createElement('p', 'task__text', content);

    divContent.append(pContent);

    return divContent;
  }

  /*
  * Метод создания блока иконок
  */
  createIconBlock() {
    const block = this.createElement('div', 'task__icons');
    const listIcons = this.createElement('ul', 'task__icons-list');

    block.append(listIcons);

    return block;
  }

  /*
  * Метод создания задачи
  */
  createTask() {
    const task = this.createElement('li', 'task');
    const taskContent = this.createContentBlock(this.content);
    const taskIcons = this.createIconBlock();
    const taskButton = this.createElement('button', 'task__button-remove hidden', 'x');

    task.append(taskContent);
    task.append(taskIcons);
    task.append(taskButton);
    return task;
  }
}
