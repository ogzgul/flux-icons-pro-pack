import FluxIcon from './FluxIcon.vue';
import { icons } from './icons.js';

// Bileşeni ve ikon listesini dışarı aktar
export { FluxIcon, icons };

// Vue plugin olarak yükleme (app.use(FluxIcons) diyebilmeleri için)
export default {
  install: (app) => {
    app.component('FluxIcon', FluxIcon);
  }
};