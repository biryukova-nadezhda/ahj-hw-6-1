import DOM from './Dom';
import svgCollection from './svgCollection';
import Storage from './Storage';
import DnD from './DnD';
import Theme from './Theme';

const dom = new DOM('main', svgCollection);
const storage = new Storage(localStorage);
const dnd = new DnD();
const theme = new Theme();
theme.init();
dnd.init();

if (localStorage.content) {
  dom.displayData(storage.getData('content'));
  dom.initListener();
} else {
  dom.init();
}

if (localStorage.theme) {
  theme.applyTheme(storage.getData('theme'));
} else {
  theme.firstInit();
}

window.addEventListener('unload', () => {
  storage.addData(dom.getData(), 'content');
  storage.addData(theme.getActiveTheme(), 'theme');
});
