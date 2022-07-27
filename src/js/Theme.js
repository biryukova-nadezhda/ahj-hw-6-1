export default class Theme {
  constructor() {
    this.buttons = Array.from(document.querySelectorAll('.theme-block__button'));
    this.link = document.querySelector('.theme__link');
  }

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        this.changeTheme(event);
      });
    });
  }

  firstInit() {
    this.buttons.forEach((button) => {
      if (button.className.includes('modern-theme')) {
        button.classList.add('active');
      }
    });
  }

  changeTheme(event) {
    const button = event.target;

    if (!button.className.includes('active')) {
      this.buttons.forEach((buttoN) => {
        buttoN.classList.remove('active');
      });

      button.classList.add('active');
      this.link.href = `./css/${button.classList[1]}.css`;
    }
  }

  getActiveTheme() {
    let activeTheme;

    this.buttons.forEach((button) => {
      if (button.className.includes('active')) {
        const [, nameTheme] = button.classList;
        activeTheme = nameTheme;
      }
    });

    return activeTheme;
  }

  applyTheme(themeName) {
    this.link.href = `./css/${themeName}.css`;

    this.buttons.forEach((button) => {
      if (button.className.includes(themeName)) {
        button.classList.add('active');
      }
    });
  }
}
