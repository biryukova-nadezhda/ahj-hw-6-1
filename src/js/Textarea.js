export default class Textarea {
  init() {
    const textarea = this.createTextarea();
    return textarea;
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
  * Метод создания блока с кнопками для добавления задач
  * и закрытия блока с полем ввода
  */
  createButtonBlock() {
    const buttonBlock = this.createElement('div', 'new-task__button-container');
    const addButton = this.createElement('button', 'new-task__add-button', 'Add card');
    const closeButton = this.createElement('button', 'new-task__close-button', '&#215;');

    buttonBlock.append(addButton);
    buttonBlock.append(closeButton);

    return buttonBlock;
  }

  /*
  * Метод создания блока с полем ввода
  */
  createTextarea() {
    const textareaBlock = this.createElement('atricle', 'new-task');
    const textarea = this.createElement('textarea', 'new-task__textarea');
    textarea.placeholder = 'Enter a title for this card...';

    const buttonBlock = this.createButtonBlock();

    textareaBlock.append(textarea);
    textareaBlock.append(buttonBlock);

    return textareaBlock;
  }
}
