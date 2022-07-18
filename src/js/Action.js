import Textarea from './Textarea';
import Task from './Task';

export default class Action {
  constructor() {
    this.addButtonArr = Array.from(document.querySelectorAll('.section__button'));
  }

  /*
  * Метод инициализации. Добавляет обработчики событий click,
  * mouseover/mouseout на кнопку добавления новых задач
  */
  init() {
    this.addListenerArr(this.addButtonArr, 'click', this.addButtonHandler);
    this.addListenerArr(this.addButtonArr, 'mouseover', this.addButtonHandlerOver);
    this.addListenerArr(this.addButtonArr, 'mouseout', this.addButtonHandlerOut);
  }

  /*
  * Метод добавления обработчика события на элемент
  * Optional - свойство, которое может и не передаваться
  * Предназначено для передачи элементов, если это необходимо
  */
  addListener(el, type, func, optional = null) {
    el.addEventListener(type, (event) => {
      event.preventDefault();
      const boundFunc = func.bind(this);

      if (optional !== null) {
        boundFunc(event, optional);
      } else {
        boundFunc(event);
      }
    });
  }

  /*
  * Добавление обработчика событий на элементы в массиве
  */
  addListenerArr(arr, type, func, optional = null) {
    arr.forEach((el) => {
      this.addListener(el, type, func, optional);
    });
  }

  /*
  * Метод обработки клика по кнопке добавления новых задач
  * Создаем блок с полем ввода, скрываем кнопку добавления
  * новых задач, добавляем обработчик на кнопек закрытия
  * блока с полем ввода
  */
  addButtonHandler(event) {
    const textarea = new Textarea();
    const textareaBlock = textarea.init();

    const addButton = event.target;

    const section = addButton.closest('.section');
    section.append(textareaBlock);
    addButton.classList.add('hidden');

    const closeButton = section.querySelector('.new-task__close-button');
    const addTaskButton = section.querySelector('.new-task__add-button');

    this.addListener(closeButton, 'click', this.closeButtonHandler);
    this.addListener(addTaskButton, 'click', this.addTaskButtonHandler);
  }

  /*
  * Метод обработки события mouseover на кнопке добавления
  * новых задач
  */
  addButtonHandlerOver(event) {
    this.name = 'addButtonHandlerOver';
    const addButton = event.target;
    addButton.classList.add('section__button_active');
  }

  /*
  * Метод обработки события mouseout на кнопке добавления
  * новых задач
  */
  addButtonHandlerOut(event) {
    this.name = 'addButtonHandlerOut';
    const addButton = event.target;
    addButton.classList.remove('section__button_active');
  }

  /*
  * Метод обработки клика по кнопке закрытия блока текстового поля
  * Удаляем блок с текстовым полем и возвращаем кнопку добавления
  * новых задач
  */
  closeButtonHandler(event) {
    this.name = 'closeButtonHandler';
    const textarea = event.target.closest('.new-task');
    const addButton = event.target.closest('.section').querySelector('.section__button');
    textarea.remove();

    addButton.classList.remove('hidden');
  }

  /*
  * Метод обработки клика по кнопке создания новой задачи
  * Запускает проверку на пустоту в текстовом поле. Если пусто,
  * то меняет текст в текстовом поле на текст ошибки, а если
  * не пусто, то запускаем метод добавления новой задачи в секцию
  * и удаляем блок с текстовым полем и показываем снова кнопку
  * добавления новых задач
  */
  addTaskButtonHandler(event) {
    const section = event.target.closest('.section');
    const textareaBlock = event.target.closest('.new-task');
    const textarea = textareaBlock.querySelector('.new-task__textarea');
    const { value } = textarea;

    if (value.length !== 0) {
      this.createNewTask(section, value);
      const addButton = section.querySelector('.section__button');
      addButton.classList.remove('hidden');
      textareaBlock.remove();
    } else {
      textarea.placeholder = 'Task cannot be empty!';
    }
  }

  /*
  * Метод добавления новой задачи в секцию.
  * Создает новую задачу и добавляет ее в секцию. Назначаем
  * обработчики события наведения/ухода указателя мыши на
  * задаче
  */
  createNewTask(section, value) {
    const taskContainer = section.querySelector('.task-container');

    const task = new Task(value);
    const newTask = task.init();

    taskContainer.append(newTask);

    this.addListener(newTask, 'mouseover', this.taskCloseHandlerOver);
    this.addListener(newTask, 'mouseout', this.taskCloseHandlerOut);
  }

  /*
  * Метод обработки события mouseover на задаче
  */
  taskCloseHandlerOver(event) {
    const task = event.target.closest('.task');

    const close = task.querySelector('.task__button-remove');
    close.classList.remove('hidden');

    this.addListener(close, 'click', this.removeTask);
  }

  /*
  * Метод обработки события mouseout на задаче
  */
  taskCloseHandlerOut(event) {
    this.name = ' taskCloseHandlerOut';
    const task = event.target.closest('.task');

    const close = task.querySelector('.task__button-remove');
    close.classList.add('hidden');
  }

  /*
  * Метод обработки события click по кнопке удаления
  * задачи. Удаляет задачу из секции
  */
  removeTask(event) {
    this.name = 'removeTask';
    const task = event.target.closest('.task');
    task.remove();
  }
}
