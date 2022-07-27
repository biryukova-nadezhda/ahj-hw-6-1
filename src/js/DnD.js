export default class DnD {
  constructor() {
    this.draggEl = null; // Исходный элемент для перетаскивания
    this.cloneEl = null; // Клон исходного элемента
    this.container = null; // Контейнер, в котором секции
    this.shiftX = null; // Позиция нажатия по Х
    this.shiftY = null; // Позиция нажатия по Y
    this.bellowEl = null; // Элемент под указателем мыши
    this.emptyLi = null; // Пустой пункт списка для выделения места для переноса
  }

  init() {
    this.container = document.querySelector('.main');

    this.container.addEventListener('mousedown', this.mouseDownHandler);
    this.container.addEventListener('mousemove', this.mouseMoveHandler);
    this.container.addEventListener('mouseup', this.mouseUpHandler);
    this.container.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  /*
  * Метод обработки нажатия мыши на задачу
  */
  mouseDownHandler(event) {
    // Выполняем проверку, если это не задача, то выходим
    if (!event.target.classList.contains('task') || !event.target.closest('.task')) {
      return;
    }

    // Отменяем действие по умолчанию
    event.preventDefault();

    // Сохраняем исходный элемент для перетаскивания и клонируем
    this.draggEl = event.target.closest('.task');
    this.cloneEl = this.draggEl.cloneNode(true);

    // Сохраняем позиции нажатия на карточке
    this.shiftX = event.clientX - this.draggEl.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.draggEl.getBoundingClientRect().top;

    // Устанавливаем копируемому элементу размеры исходного
    this.cloneEl.style.width = `${this.draggEl.offsetWidth}px`;

    // Добавляем класс с абсолютным позиционированием
    this.cloneEl.classList.add('dragged');

    // Переносим элемент в main
    document.querySelector('.main').appendChild(this.cloneEl);

    // Фиксируем карточку
    this.cloneEl.style.left = `${event.pageX - this.shiftX}px`;
    this.cloneEl.style.top = `${event.pageY - this.shiftY}px`;
    this.draggEl.style.opacity = 0;

    // Создаем пустой элемент списка
    this.emptyLi = document.createElement('li');
    this.emptyLi.classList.add('empty');
    this.emptyLi.style.height = `${this.draggEl.offsetHeight}px`;
  }

  /*
  * Метод обработки перемещения мыши
  */
  mouseMoveHandler(event) {
    // Отменяем действие по умолчанию
    event.preventDefault();

    // Выполняем проверку, если нет переносимого элемента, то выходим
    if (!this.draggEl) {
      return;
    }

    // Скрываем клон,находим элемент под указателем мышки и возвращаем обратно
    //
    this.cloneEl.classList.add('hidden');
    this.bellowEl = document.elementFromPoint(event.clientX, event.clientY);
    this.cloneEl.classList.remove('hidden');

    // Прикрепляем клонируемый элемент к указателю мыши
    this.cloneEl.style.left = `${event.pageX - this.shiftX}px`;
    this.cloneEl.style.top = `${event.pageY - this.shiftY}px`;

    // Если под курсором мыши секция, то ищем список задач в секции
    if (this.bellowEl.closest('.task-section')) {
      const parent = this.bellowEl.closest('.task-section').querySelector('.task-list');

      if (!parent.hasChildNodes()) {
        parent.append(this.emptyLi);
      } else if (this.bellowEl.closest('.task')) {
        parent.insertBefore(this.emptyLi, this.bellowEl.closest('.task'));
      }
    }
  }

  /*
  * Метод обработки отпускания клавиши мыши
  */
  mouseUpHandler(event) {
    // Отменяем действие по умолчанию
    event.preventDefault();

    // Выполняем проверку, если нет переносимого элемента, то выходим
    if (!this.draggEl) {
      return;
    }

    // Если элемент снизу не секция и не ее элемент, то удаляем
    // клонированный элемент и показываем изначальный
    if (!this.bellowEl.closest('.task-section')) {
      document.querySelector('.task-section').removeChild(this.cloneEl);
      document.querySelector('.empty').remove();
      this.draggEl.style.opacity = 100;
      this.cloneEl = null;
      this.draggEl = null;
      return;
    }

    // Находим контейнер задач
    const parentUl = this.bellowEl.closest('.task-section').querySelector('.task-list');

    if (this.bellowEl.closest('task-section__header')) {
      parentUl.prepend(this.draggEl);
    } else if (this.bellowEl.closest('.task-section__footer')) {
      parentUl.append(this.draggEl);
    } else {
      parentUl.insertBefore(this.draggEl, this.bellowEl.closest('.task'));
      // parentUl.insertBefore(this.dropItem, this.elemBellow.closest('li'));
    }

    if (document.querySelector('.empty')) {
      document.querySelector('.empty').remove();
    }

    this.cloneEl.remove();
    this.draggEl.style.opacity = 100;
    this.draggEl = null;
    this.cloneEl = null;
  }

  /*
  * Метод обработки события, когда перетаскиваем и выходим
  * за зону, в которой прослушиваем событие
  */
  mouseLeaveHandler(event) {
    // Отменяем действие по умолчанию
    event.preventDefault();

    // Если это не перетаскиваемый элемент, то выходим
    if (!this.draggEl) {
      return;
    }

    // Находим в main клон элемента и удаляем его
    // Также удаляем пустой элемент списка
    // Показываем обратно элемент, по которому был клик
    // обнуляем элементы
    document.querySelector('.main').removeChild(this.cloneEl);
    document.querySelector('.empty').remove();
    this.draggEl.style.opacity = 100;
    this.cloneEl = null;
    this.draggEl = null;
  }
}
